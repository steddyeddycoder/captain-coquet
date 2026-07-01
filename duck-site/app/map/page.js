'use client';
// app/map/page.js
import { useEffect, useState, useCallback } from 'react';
import { DUCKS, duckName } from '../../lib/ducks';

const MAP_W = 1000;
const MAP_H = 500;

function lonToX(lon) {
  return ((lon + 180) / 360) * MAP_W;
}
function latToY(lat) {
  return ((90 - lat) / 180) * MAP_H;
}
function hueForDuck(id) {
  const idx = parseInt(id.split('-')[1], 10) - 1;
  return (idx * 137.5) % 360;
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MapPage() {
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedDuck, setSelectedDuck] = useState(null);
  const [activeSighting, setActiveSighting] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/sightings');
      const body = await res.json();
      if (!res.ok) throw new Error(body.error);
      setSightings(
        body.sightings.map((s) => ({
          id: s.id,
          duckId: s.duck_id,
          lat: s.lat,
          lon: s.lon,
          placeName: s.place_name,
          finderName: s.finder_name,
          note: s.note,
          photoUrl: s.photo_url,
          timestamp: new Date(s.created_at).getTime(),
        }))
      );
      setLoadError(false);
    } catch (e) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const grouped = {};
  for (const s of sightings) {
    if (!grouped[s.duckId]) grouped[s.duckId] = [];
    grouped[s.duckId].push(s);
  }
  Object.values(grouped).forEach((arr) => arr.sort((a, b) => a.timestamp - b.timestamp));

  const countFor = (id) => sightings.filter((s) => s.duckId === id).length;
  const recentFive = [...sightings].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);
  const totalSpan = new Set(sightings.map((s) => s.duckId)).size;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy-deep)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brass)', fontWeight: 600, margin: 0 }}>
              Fleet Map
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, margin: '2px 0 0', color: 'var(--cloud)' }}>
              Captain Coquet
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--brass)', margin: 0 }}>
              {sightings.length}
            </p>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7, color: 'var(--foam-light)', margin: 0 }}>
              sightings logged
            </p>
          </div>
        </div>
        <p style={{ color: 'var(--foam-light)', fontSize: 14, marginTop: 8 }}>
          {totalSpan > 0
            ? `${totalSpan} of ${DUCKS.length} ducks have set sail. Each dotted line is one duck's journey, hand to hand.`
            : `${DUCKS.length} ducks are hidden aboard, waiting to be found.`}
        </p>
      </header>

      <div style={{ position: 'relative', height: '46vh', minHeight: 280 }}>
        {loading ? (
          <Centered>Charting the waters…</Centered>
        ) : loadError ? (
          <Centered>
            <p>Couldn&apos;t load the chart. Check your connection.</p>
            <button onClick={refresh} style={pillButton}>Retry</button>
          </Centered>
        ) : (
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 100%)' }}
          >
            <g stroke="var(--foam)" strokeOpacity="0.08" strokeWidth="1">
              {Array.from({ length: 12 }, (_, i) => (
                <line key={`v${i}`} x1={(i * MAP_W) / 12} y1="0" x2={(i * MAP_W) / 12} y2={MAP_H} />
              ))}
              {Array.from({ length: 6 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={(i * MAP_H) / 6} x2={MAP_W} y2={(i * MAP_H) / 6} />
              ))}
            </g>
            <line x1="0" y1={MAP_H / 2} x2={MAP_W} y2={MAP_H / 2} stroke="var(--foam)" strokeOpacity="0.18" strokeWidth="1.5" />

            {Object.entries(grouped).map(([duckId, list]) => {
              const dim = selectedDuck && selectedDuck !== duckId;
              const hue = hueForDuck(duckId);
              const color = `hsl(${hue}, 70%, 65%)`;
              const points = list.map((s) => `${lonToX(s.lon)},${latToY(s.lat)}`).join(' ');
              return (
                <g key={duckId} opacity={dim ? 0.15 : 1} style={{ transition: 'opacity 0.3s' }}>
                  {list.length > 1 && (
                    <polyline points={points} fill="none" stroke={color} strokeWidth={dim ? 1 : 1.75} strokeDasharray="2 5" strokeLinecap="round" opacity="0.7" />
                  )}
                  {list.map((s, i) => (
                    <g key={s.id} transform={`translate(${lonToX(s.lon)}, ${latToY(s.lat)})`} onClick={() => setActiveSighting(s)} style={{ cursor: 'pointer' }}>
                      <circle r={i === list.length - 1 ? 6 : 3.5} fill={color} stroke="var(--navy-deep)" strokeWidth="1.2" />
                      {i === list.length - 1 && (
                        <circle r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5">
                          <animate attributeName="r" values="6;14;6" dur="2.8s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {DUCKS.map((d) => {
            const active = selectedDuck === d.id;
            const hue = hueForDuck(d.id);
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDuck(active ? null : d.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.12)'}`,
                  background: active ? `hsl(${hue}, 70%, 65%)` : 'rgba(255,255,255,0.06)',
                  color: active ? 'var(--navy-deep)' : 'var(--foam-light)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? 'var(--navy-deep)' : `hsl(${hue}, 70%, 65%)` }} />
                {d.name}
                <span style={{ opacity: 0.6 }}>· {countFor(d.id)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '16px 20px', flex: 1 }}>
        <h2 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--foam)', marginBottom: 10 }}>
          Latest logged
        </h2>
        {sightings.length === 0 && !loading ? (
          <div style={{ borderRadius: 12, padding: 20, textAlign: 'center', background: 'rgba(255,255,255,0.04)', color: 'var(--foam-light)' }}>
            No sightings yet — the ducks are still hiding.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentFive.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSighting(s)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12, padding: 8, textAlign: 'left', background: 'rgba(255,255,255,0.04)', border: 'none' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photoUrl} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--cloud)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {duckName(s.duckId)}
                  </p>
                  <p style={{ fontSize: 12, opacity: 0.75, color: 'var(--foam-light)', margin: 0 }}>
                    {s.placeName || 'Logged location'} · {formatDate(s.timestamp)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {!loading && (
        <p style={{ textAlign: 'center', fontSize: 11, opacity: 0.4, color: 'var(--foam-light)', padding: '4px 0 12px' }}>
          Location data &copy;{' '}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
            OpenStreetMap
          </a>{' '}
          contributors
        </p>
      )}

      {activeSighting && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setActiveSighting(null); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}
        >
          <div style={{ width: '100%', maxWidth: 420, borderRadius: 16, background: 'var(--navy)', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--cloud)', margin: 0 }}>{duckName(activeSighting.duckId)}</h3>
              <button onClick={() => setActiveSighting(null)} style={{ background: 'none', border: 'none', color: 'var(--foam-light)', fontSize: 22, lineHeight: 1 }}>×</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeSighting.photoUrl} alt="" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 260, marginTop: 10 }} />
            <p style={{ color: 'var(--foam)', fontWeight: 600, fontSize: 14, margin: '10px 0 2px' }}>
              {activeSighting.placeName || `${activeSighting.lat.toFixed(2)}, ${activeSighting.lon.toFixed(2)}`}
            </p>
            <p style={{ color: 'var(--foam-light)', fontSize: 13, opacity: 0.85, margin: 0 }}>
              Spotted by {activeSighting.finderName} · {formatDate(activeSighting.timestamp)}
            </p>
            {activeSighting.note && (
              <p style={{ color: 'var(--foam-light)', fontStyle: 'italic', fontSize: 13, marginTop: 8 }}>&ldquo;{activeSighting.note}&rdquo;</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Centered({ children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--foam-light)', textAlign: 'center', padding: '0 24px' }}>
      {children}
    </div>
  );
}

const pillButton = {
  padding: '6px 16px',
  borderRadius: 999,
  background: 'var(--brass)',
  color: 'var(--navy-deep)',
  fontWeight: 600,
  fontSize: 13,
  border: 'none',
};
