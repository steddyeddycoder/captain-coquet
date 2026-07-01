// app/api/geocode/route.js
import { NextResponse } from 'next/server';
import { resolvePlace } from '../../../lib/geocode';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const place = searchParams.get('place') || '';
  if (!place.trim()) {
    return NextResponse.json({ error: 'No place provided.' }, { status: 400 });
  }
  const coords = await resolvePlace(place);
  return NextResponse.json(coords);
}

