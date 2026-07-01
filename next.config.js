'use client';
// app/duck/[id]/UploadForm.js
import { useState, useRef } from 'react';

export default function UploadForm({ duckId, duckLabel }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [locMode, setLocMode] = useState('gps'); // 'gps' | 'manual'
  const [coords, setCoords] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [finderName, setFinderName] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle'); // idle | locating | saving | done | error
  const [errorMsg, setErrorMsg] = useState('');
  const [locationWarning, setLocationWarning] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const useGPS = () => {
    setLocMode('gps');
    setErrorMsg('');
    setStatus('locating');
    if (!navigator.geolocation) {
      setErrorMsg('GPS isn\u2019t available on this device. Try typing a place instead.');
      setStatus('idle');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setStatus('idle');
      },
      () => {
        setErrorMsg('Location access was blocked. Try typing a place instead.');
        setStatus('idle');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const submit = async () => {
    setErrorMsg('');
    setLocationWarning('');
    if (!photoFile) {
      setErrorMsg('Add a photo first.');
      return;
    }

    let lat, lon;
    if (locMode === 'gps') {
      if (!coords) {
        setErrorMsg('Tap "Use my GPS" first, or switch to typing a place.');
        return;
      }
      lat = coords.lat;
      lon = coords.lon;
    } else {
      if (!placeName.trim()) {
        setErrorMsg('Type the place where you found the duck.');
        return;
      }
    }

    setStatus('saving');
    try {
      const fd = new FormData();
      fd.append('duckId', duckId);
      fd.append('photo', photoFile);
      fd.append('finderName', finderName.trim() || 'A fellow cruiser');
      fd.append('note', note.trim());

      if (locMode === 'manual') {
        const res = await fetch(`/api/geocode?place=${encodeURIComponent(placeName.trim())}`);
        const geo = await res.json();
        fd.append('lat', geo.lat);
        fd.append('lon', geo.lon);
        fd.append('placeName', placeName.trim());
        if (geo.resolved === false) {
          // We still saved a position so the sighting isn't lost, but let
          // the finder know it's a rough guess rather than a real match.
          setLocationWarning(
            `We couldn't pin down "${placeName.trim()}" exactly, so it's placed roughly on the map. A more specific name (e.g. add the country) would help next time.`
          );
        }
      } else {
        fd.append('lat', lat);
        fd.append('lon', lon);
        fd.append('placeName', '');
      }

      const res = await fetch('/api/sightings', { method: 'POST', body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong.');
      }
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Couldn\u2019t save \u2014 check your connection and try again.');
    }
  };

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <p style={{ fontSize: 40, margin: 0 }}>🦆</p>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--cloud)', fontSize: 22, margin: '8px 0' }}>
          Logged on the chart!
        </h2>
        <p style={{ color: 'var(--foam-light)', fontSize: 14, lineHeight: 1.5 }}>
          {duckLabel}&apos;s journey just got one stop longer. Don&apos;t forget to hide them
          somewhere good for the next finder.
        </p>
        {locationWarning && (
          <p style={{ background: 'rgba(255,183,3,0.15)', color: 'var(--brass)', padding: '10px 12px', borderRadius: 10, fontSize: 13, textAlign: 'left', marginTop: 12 }}>
            {locationWarning}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={labelStyle}>Photo</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%',
            border: '2px dashed rgba(142,202,230,0.35)',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            padding: photoPreview ? 0 : '28px 0',
            overflow: 'hidden',
            color: 'var(--foam-light)',
            fontSize: 14,
          }}
        >
          {photoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoPreview} alt="Selected duck" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
          ) : (
            'Tap to take or choose a photo'
          )}
        </button>
      </div>

      <div>
        <label style={labelStyle}>Where?</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button
            onClick={useGPS}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              border: 'none',
              fontWeight: 600,
              fontSize: 14,
              background: locMode === 'gps' ? 'var(--foam)' : 'rgba(255,255,255,0.06)',
              color: locMode === 'gps' ? 'var(--navy-deep)' : 'var(--foam-light)',
            }}
          >
            {status === 'locating' ? 'Locating…' : coords && locMode === 'gps' ? '📍 Got it' : 'Use my GPS'}
          </button>
          <button
            onClick={() => setLocMode('manual')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              border: 'none',
              fontWeight: 600,
              fontSize: 14,
              background: locMode === 'manual' ? 'var(--foam)' : 'rgba(255,255,255,0.06)',
              color: locMode === 'manual' ? 'var(--navy-deep)' : 'var(--foam-light)',
            }}
          >
            Type a place
          </button>
        </div>
        {locMode === 'manual' && (
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="e.g. Cozumel, Mexico"
            style={inputStyle}
          />
        )}
      </div>

      <div>
        <label style={labelStyle}>Your name <span style={{ opacity: 0.5, fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
        <input
          type="text"
          value={finderName}
          onChange={(e) => setFinderName(e.target.value)}
          placeholder="e.g. Sam from cabin 8042"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Note <span style={{ opacity: 0.5, fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Where you're hiding it next…"
          style={inputStyle}
        />
      </div>

      {errorMsg && (
        <p style={{ background: 'rgba(251,86,7,0.15)', color: '#FFB8A0', padding: '10px 12px', borderRadius: 10, fontSize: 14, margin: 0 }}>
          {errorMsg}
        </p>
      )}

      <button
        onClick={submit}
        disabled={status === 'saving'}
        style={{
          padding: '14px 0',
          borderRadius: 999,
          border: 'none',
          fontWeight: 700,
          fontSize: 15,
          background: status === 'saving' ? 'rgba(255,183,3,0.5)' : 'var(--brass)',
          color: 'var(--navy-deep)',
        }}
      >
        {status === 'saving' ? 'Logging the sighting…' : 'Log this sighting'}
      </button>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--foam)',
  marginBottom: 6,
};

const inputStyle = {
  width: '100%',
  padding: '11px 12px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.08)',
  color: 'var(--cloud)',
  fontSize: 14,
  outline: 'none',
};
