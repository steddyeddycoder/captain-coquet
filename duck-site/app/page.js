// app/page.js
import Link from 'next/link';
import { DUCKS } from '../lib/ducks';

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="brand">
            <span className="brand-mark">⚓</span>
            <span>Captain Coquet</span>
          </Link>
          <div className="nav-links">
            <a href="#story">Story</a>
            <a href="#crew">Crew</a>
            <Link href="/map">Fleet Map</Link>
          </div>
        </nav>

        <section className="hero">
          <div>
            <p className="kicker">Northumbrian Cruise Ducks</p>
            <h1>From Amble to Anywhere</h1>
            <p>
              Twelve little ducks have set sail from the Northumberland coast with the Edminson family.
              If you found one, you are now part of the crew. Log a sighting, add a photo and help their adventure continue.
            </p>
            <div className="cta-row">
              <a className="btn primary" href="#crew">Meet the Crew</a>
              <Link className="btn secondary" href="/map">View the Fleet Map</Link>
            </div>
            <div className="stats">
              <div className="stat"><strong>12</strong><span>ducks</span></div>
              <div className="stat"><strong>2026</strong><span>first voyage</span></div>
              <div className="stat"><strong>∞</strong><span>possible stories</span></div>
            </div>
          </div>

          <div className="passport-card" aria-label="Captain Coquet passport preview">
            <div className="passport-inner">
              <p className="kicker" style={{ color: 'var(--brass-deep)' }}>Duck Passport 001</p>
              <div className="duck-stamp">🦆</div>
              <h2>Captain Coquet</h2>
              <p>
                A tiny captain from Amble Harbour, sailing the world to collect stories, smiles and new friends.
              </p>
            </div>
          </div>
        </section>

        <section id="story" className="section">
          <p className="kicker">The legend</p>
          <h2>The fleet sails on.</h2>
          <p className="section-lead">
            Long ago, off the wild Northumberland coast, sailors whispered of a tiny captain who never sailed for treasure.
            He sailed to collect stories. Every time someone finds a duck, the voyage grows by one more memory.
          </p>
        </section>

        <section id="crew" className="section">
          <p className="kicker">Meet the Crew</p>
          <h2>Twelve personalities. Twelve missions.</h2>
          <p className="section-lead">
            Each duck has its own QR code, passport page, mission and role aboard the SS Coquet.
          </p>
          <div className="crew-grid">
            {DUCKS.map((duck) => (
              <Link key={duck.id} href={`/duck/${duck.id}`} className="crew-card">
                <div className="emoji">{duck.emoji}</div>
                <p className="kicker" style={{ fontSize: 10 }}>Duck {duck.number}</p>
                <h3>{duck.name}</h3>
                <p><strong>{duck.role}</strong></p>
                <p>{duck.personality}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="kicker">Found a duck?</p>
          <h2>Here is how it works.</h2>
          <div className="steps">
            <div className="step">
              <b>01</b>
              <h3>Scan the QR code</h3>
              <p>Each duck has a unique page, so the right passport opens automatically.</p>
            </div>
            <div className="step">
              <b>02</b>
              <h3>Log a sighting</h3>
              <p>Add a photo, your first name, where you found them and a quick note for the captain&apos;s log.</p>
            </div>
            <div className="step">
              <b>03</b>
              <h3>Hide them again</h3>
              <p>Leave the duck somewhere safe and fun so the next traveller can keep the voyage going.</p>
            </div>
          </div>
          <div className="cta-row">
            <Link className="btn primary" href="/map">Open the Live Map</Link>
          </div>
        </section>

        <footer className="footer">
          <p>Captain Coquet · From Northumberland to the World · Built for the Edminson family.</p>
        </footer>
      </div>
    </main>
  );
}
