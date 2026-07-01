:root {
  --navy: #0B2545;
  --navy-deep: #061528;
  --navy-soft: #123A5F;
  --cream: #F5E9D0;
  --parchment: #FFF7E6;
  --foam: #8ECAE6;
  --foam-light: #D6ECF6;
  --brass: #D9A441;
  --brass-deep: #A97220;
  --coral: #E26D4B;
  --sea: #6BA6A6;
  --ink: #152033;
  --cloud: #F8F9FA;
  --font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
html, body {
  margin: 0;
  padding: 0;
  background: var(--navy-deep);
  color: var(--cloud);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}
button { font-family: inherit; cursor: pointer; }
input, textarea, button { -webkit-tap-highlight-color: transparent; }
a { color: inherit; }
::selection { background: var(--brass); color: var(--navy-deep); }
:focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }

.page-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(217,164,65,0.20), transparent 34rem),
    radial-gradient(circle at 90% 10%, rgba(107,166,166,0.16), transparent 28rem),
    linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 48%, #082033 100%);
}
.container { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
.nav {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 20px 0; color: var(--foam-light);
}
.brand { display: flex; align-items: center; gap: 10px; font-weight: 800; text-decoration: none; }
.brand-mark { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; background: rgba(245,233,208,0.12); border: 1px solid rgba(245,233,208,0.22); }
.nav-links { display: flex; gap: 16px; font-size: 14px; }
.nav-links a { text-decoration: none; opacity: .86; }
.nav-links a:hover { opacity: 1; }
.hero { padding: 56px 0 38px; display: grid; grid-template-columns: 1.1fr .9fr; gap: 36px; align-items: center; }
.kicker { color: var(--brass); text-transform: uppercase; letter-spacing: .18em; font-size: 12px; font-weight: 800; }
.hero h1 { font-family: var(--font-display); font-size: clamp(52px, 8vw, 96px); line-height: .9; margin: 14px 0; color: var(--parchment); }
.hero p { color: var(--foam-light); font-size: 18px; line-height: 1.7; max-width: 640px; }
.cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
.btn { display: inline-flex; align-items: center; justify-content: center; padding: 14px 22px; border-radius: 999px; font-weight: 800; text-decoration: none; border: 1px solid rgba(255,255,255,.14); }
.btn.primary { background: var(--brass); color: var(--navy-deep); border-color: transparent; }
.btn.secondary { color: var(--foam-light); background: rgba(255,255,255,.06); }
.passport-card { background: rgba(255,247,230,.08); border: 1px solid rgba(245,233,208,.22); border-radius: 28px; padding: 26px; box-shadow: 0 24px 70px rgba(0,0,0,.25); transform: rotate(1.5deg); }
.passport-inner { min-height: 390px; border-radius: 22px; padding: 28px; background: linear-gradient(135deg, var(--parchment), var(--cream)); color: var(--ink); position: relative; overflow: hidden; }
.passport-inner:after { content: ''; position: absolute; inset: auto -20% -35% -20%; height: 65%; background: repeating-linear-gradient(-8deg, rgba(11,37,69,.08), rgba(11,37,69,.08) 2px, transparent 2px, transparent 16px); }
.duck-stamp { position: relative; z-index: 1; font-size: 96px; margin: 20px 0; }
.passport-inner h2 { position: relative; z-index: 1; font-family: var(--font-display); font-size: 38px; margin: 0; color: var(--navy); }
.passport-inner p { position: relative; z-index: 1; color: #45546b; line-height: 1.6; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 22px; }
.stat { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 14px; }
.stat strong { display: block; color: var(--parchment); font-family: var(--font-display); font-size: 28px; }
.stat span { color: var(--foam-light); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
.section { padding: 62px 0; }
.section h2 { font-family: var(--font-display); color: var(--parchment); font-size: clamp(34px, 5vw, 56px); margin: 0 0 12px; }
.section-lead { color: var(--foam-light); line-height: 1.7; max-width: 760px; font-size: 17px; }
.crew-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 26px; }
.crew-card { background: rgba(255,255,255,.055); border: 1px solid rgba(255,255,255,.10); border-radius: 22px; padding: 18px; text-decoration: none; transition: transform .18s ease, background .18s ease; }
.crew-card:hover { transform: translateY(-4px); background: rgba(255,255,255,.085); }
.crew-card .emoji { font-size: 34px; }
.crew-card h3 { font-family: var(--font-display); color: var(--parchment); margin: 10px 0 3px; font-size: 23px; }
.crew-card p { color: var(--foam-light); line-height: 1.5; font-size: 14px; margin: 0; }
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
.step { background: rgba(245,233,208,.08); border: 1px solid rgba(245,233,208,.16); border-radius: 22px; padding: 22px; }
.step b { color: var(--brass); }
.step h3 { font-family: var(--font-display); color: var(--parchment); font-size: 24px; margin: 10px 0; }
.step p { color: var(--foam-light); line-height: 1.6; }
.footer { padding: 34px 0; border-top: 1px solid rgba(255,255,255,.08); color: rgba(214,236,246,.75); font-size: 14px; }

@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; padding-top: 28px; }
  .passport-card { transform: none; }
  .crew-grid { grid-template-columns: repeat(2, 1fr); }
  .steps, .stats { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 520px) { .crew-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
