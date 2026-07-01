// app/api/sightings/route.js
import { NextResponse } from 'next/server';
import { getSupabase } from '../../../lib/supabase';
import { isValidDuckId } from '../../../lib/ducks';

export const runtime = 'nodejs';

// GET /api/sightings -> list every sighting, newest first
export async function GET() {
  let supabase;
  try {
    supabase = getSupabase();
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('sightings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ sightings: data });
}

// POST /api/sightings -> create a new sighting
// Expects multipart/form-data with fields:
// duckId, lat, lon, placeName, finderName, note, photo (file)
export async function POST(request) {
  try {
    const supabase = getSupabase();
    const formData = await request.formData();
    const duckId = formData.get('duckId');
    const lat = parseFloat(formData.get('lat'));
    const lon = parseFloat(formData.get('lon'));
    const placeName = formData.get('placeName') || '';
    const finderName = formData.get('finderName') || 'A fellow cruiser';
    const note = formData.get('note') || '';
    const photo = formData.get('photo');

    if (!duckId || !isValidDuckId(duckId)) {
      return NextResponse.json({ error: 'Unknown duck.' }, { status: 400 });
    }
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json({ error: 'Missing location.' }, { status: 400 });
    }
    if (!photo || typeof photo === 'string') {
      return NextResponse.json({ error: 'Missing photo.' }, { status: 400 });
    }

    // Upload the photo to Supabase Storage
    const arrayBuffer = await photo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = (photo.name || 'jpg').split('.').pop().toLowerCase().slice(0, 5) || 'jpg';
    const fileName = `${duckId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('duck-photos')
      .upload(fileName, buffer, {
        contentType: photo.type || 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: `Photo upload failed: ${uploadError.message}` }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from('duck-photos')
      .getPublicUrl(fileName);

    const { data, error: insertError } = await supabase
      .from('sightings')
      .insert({
        duck_id: duckId,
        lat,
        lon,
        place_name: placeName,
        finder_name: finderName,
        note,
        photo_url: publicUrlData.publicUrl,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ sighting: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Unexpected error.' }, { status: 500 });
  }
}
