// app/duck/[id]/page.js
import { isValidDuckId, duckName, duckForId } from '../../../lib/ducks';
import UploadForm from './UploadForm';
import Link from 'next/link';

export function generateMetadata({ params }) {
  const name = isValidDuckId(params.id) ? duckName(params.id) : 'Unknown duck';
  return {
    title: `You found ${name}! — Captain Coquet`,
  };
}

export default function DuckPage({ params }) {
  const { id } = params;
  const duck = duckForId(id);

  if (!isValidDuckId(id)) {
    return (
      <main style={styles.main}>
        <div style={styles.card}>
          <p style={{ fontSize: 44 }}>🦆</p>
          <h1 style={styles.h1}>We don&apos;t recognise this duck</h1>
          <p style={styles.p}>This QR code doesn&apos;t match any duck in Captain Coquet&apos;s fleet. Double-check the sticker, or head to the map to see who else is out there.</p>
          <Link href="/map" style={styles.button}>See the map</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <Link href="/" style={styles.back}>← Captain Coquet</Link>
        <div style={styles.passportTop}>
          <span style={styles.number}>Duck {duck.number}</span>
          <span style={styles.emoji}>{duck.emoji}</span>
        </div>
        <p style={styles.kicker}>You found</p>
        <h1 style={styles.h1}>{duck.name}</h1>
        <p style={styles.role}>{duck.role}</p>
        <p style={styles.quote}>&ldquo;{duck.motto}&rdquo;</p>
        <div style={styles.details}>
          <div><strong>Origin</strong><span>{duck.origin}</span></div>
          <div><strong>Mission</strong><span>{duck.mission}</span></div>
        </div>
        <p style={styles.p}>
          Snap a photo, tell us where you found {duck.name}, and add them to the captain&apos;s log. Then hide them somewhere safe and fun for the next cruiser to discover.
        </p>
        <UploadForm duckId={id} duckLabel={duck.name} />
        <Link href="/map" style={{ ...styles.button, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--foam-light)', marginTop: 12 }}>
          See the whole fleet&apos;s journey
        </Link>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 16px',
    background: 'radial-gradient(circle at 10% 0%, rgba(217,164,65,0.20), transparent 32rem), linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 100%)',
  },
  card: { width: '100%', maxWidth: 560, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 24, padding: 26, boxShadow: '0 24px 70px rgba(0,0,0,.24)' },
  back: { display: 'inline-block', color: 'var(--foam-light)', fontSize: 13, textDecoration: 'none', marginBottom: 16, opacity: .8 },
  passportTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  number: { color: 'var(--brass)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 800 },
  emoji: { fontSize: 48 },
  kicker: { fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brass)', fontWeight: 800, margin: 0 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1, fontWeight: 700, margin: '6px 0 8px', color: 'var(--parchment)' },
  role: { color: 'var(--foam)', fontWeight: 800, fontSize: 15, margin: '0 0 14px' },
  quote: { color: 'var(--cream)', fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.35, margin: '0 0 18px' },
  details: { display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginBottom: 18 },
  p: { color: 'var(--foam-light)', fontSize: 15, lineHeight: 1.6, margin: '0 0 20px' },
  button: { display: 'inline-block', textAlign: 'center', width: '100%', padding: '14px 0', borderRadius: 999, background: 'var(--brass)', color: 'var(--navy-deep)', fontWeight: 800, fontSize: 15, textDecoration: 'none' },
};
