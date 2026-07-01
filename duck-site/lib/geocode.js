// lib/geocode.js
import { KNOWN_PORTS } from './ducks';

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Tries the curated port list first (instant, no network call - covers this
// cruise's own itinerary). If that doesn't match, falls through to OpenStreetMap's
// free Nominatim geocoding service, since ducks sometimes leave the ship: someone
// takes one home and logs a sighting from an entirely different trip later.
//
// Nominatim's public API is free but has a strict usage policy:
// https://operations.osmfoundation.org/policies/nominatim/
// Key points this app follows: max 1 request/second (we're nowhere close - this
// only fires once per manual location entry, directly triggered by a person
// typing a place), and a real identifying User-Agent (set below). The policy
// also requires visible attribution to OpenStreetMap wherever results are shown -
// see the small "Location data (c) OpenStreetMap contributors" credit on the
// map page. If this app ever needs to do bulk or automated geocoding (not just
// occasional manual entries), it should switch to a paid provider or a
// self-hosted Nominatim instance instead of this public endpoint.
export async function resolvePlace(placeName) {
  const norm = placeName.trim().toLowerCase();

  // Match on whole words/phrases, not raw substrings - a plain .includes()
  // check would let short port names like "bar" false-match unrelated
  // places that merely contain those letters (e.g. "Barcelona", "Bari").
  const known = KNOWN_PORTS.find(([name]) => {
    const wordBoundary = new RegExp(`\\b${escapeRegExp(name)}\\b`);
    return wordBoundary.test(norm);
  });
  if (known) {
    return { lat: known[1], lon: known[2], resolved: true };
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      placeName
    )}&limit=1`;
    const res = await fetch(url, {
      headers: {
        // Nominatim's usage policy asks for an identifying User-Agent.
        'User-Agent': 'cruise-duck-tracker (personal hobby project)',
      },
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), resolved: true };
    }
  } catch (e) {
    // network error or API unavailable - fall through to the scatter below
  }

  // Last resort: nothing matched and the live lookup failed (offline, typo,
  // API hiccup, etc). Give back a deterministic, distinct point rather than
  // failing outright, but flag it as unresolved so the caller can warn the
  // person submitting the sighting that the location is a rough guess.
  let hash = 0;
  for (const c of norm) hash += c.charCodeAt(0);
  return {
    lat: 10 + (hash % 50) - 25,
    lon: -40 + ((hash * 7) % 80) - 40,
    resolved: false,
  };
}

