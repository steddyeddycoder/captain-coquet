# Captain Coquet — Cruise Duck Adventures

A free-to-run website for the Edminson family's Northumbrian cruise duck fleet. Each duck gets a unique QR code and passport page. When someone finds a duck, they can upload a photo, add a place and leave a note. The shared fleet map shows the journey as it grows.

This version is branded around **Captain Coquet** and the 12-duck crew:

1. Captain Coquet
2. Puffin Pete
3. Admiral Amble
4. Navigator Nelly
5. Lighthouse Lily
6. Craster
7. Sir Warkworth
8. Druridge
9. Breezy Bamburgh
10. Tern Tim
11. Skipper Seaton
12. Rosie Rosebay

---

## Cost plan

You can run this with no recurring cost to start:

- **Hosting:** Vercel free tier
- **Database and photo storage:** Supabase free tier
- **QR codes:** generated locally for free
- **Domain:** optional later, roughly £10–15/year if you want `captaincoquet.com`

Start with the free Vercel URL. Only buy a domain once you are happy with the project.

---

## What you are building

1. A public landing page for Captain Coquet
2. Individual duck pages at URLs like `/duck/captain-coquet`
3. A photo/location upload form for finders
4. A live fleet map of all sightings
5. Printable QR codes for all 12 ducks

---

## Step 1 — Put the code on GitHub

1. Go to GitHub and create a free account.
2. Create a new repository called `captain-coquet`.
3. Upload the contents of this folder into that repository.
4. Commit the files.

You do not need to be a developer for this bit. GitHub is just where the website code lives so Vercel can deploy it.

---

## Step 2 — Create Supabase

1. Go to Supabase and create a free project.
2. Open the SQL Editor.
3. Copy everything from `supabase-setup.sql`.
4. Paste it into the SQL editor and run it.
5. Check Storage and confirm the `duck-photos` bucket exists and is public.
6. Go to Settings → API and copy:
   - Project URL
   - anon public key

Keep those two values handy for Vercel.

---

## Step 3 — Deploy to Vercel

1. Go to Vercel and sign in with GitHub.
2. Import the `captain-coquet` repository.
3. Add these Environment Variables before deploying:

```text
NEXT_PUBLIC_SUPABASE_URL=your Supabase Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=your Supabase anon public key
```

4. Click Deploy.
5. Vercel gives you a live URL such as:

```text
https://captain-coquet-yourname.vercel.app
```

That is enough to use the site publicly.

---

## Step 4 — Generate QR codes

Each duck uses its own URL:

```text
/duck/captain-coquet
/duck/puffin-pete
/duck/admiral-amble
/duck/navigator-nelly
/duck/lighthouse-lily
/duck/craster
/duck/sir-warkworth
/duck/druridge
/duck/breezy-bamburgh
/duck/tern-tim
/duck/skipper-seaton
/duck/rosie-rosebay
```

### Easiest no-code option

Use any free QR generator and create 12 QR codes pointing to your live Vercel URL plus the duck path.

Example:

```text
https://captain-coquet-yourname.vercel.app/duck/captain-coquet
```

### Local option

If you have Node.js installed:

1. Copy `.env.local.example` to `.env.local`.
2. Add your live site URL:

```text
SITE_URL=https://your-vercel-url.vercel.app
```

3. Run:

```bash
npm install
npm run seed-qr
```

The QR PNG files will appear in `public/qr/`.

---

## Editing the ducks

All duck names, personalities, missions and known locations are in:

```text
lib/ducks.js
```

Change that file and redeploy. Vercel will usually update automatically after you commit the change to GitHub.

---

## Privacy and moderation notes

This is intentionally lightweight. There is no login system, which keeps it simple and free. Anyone with a QR code can post a sighting. That is fine for a family cruise game, but avoid asking people for anything sensitive.

Suggested wording for the physical duck card:

```text
You found one of Captain Coquet's cruise ducks!
Please scan the QR code, add a photo and tell us where you found them.
Then hide the duck somewhere safe for the next traveller.
From the Edminson family, Amble, Northumberland.
```

---

## Future upgrades

Good next upgrades, only if you want them:

- Add a custom domain
- Add moderation before photos appear publicly
- Add collection pages for future holidays
- Add printable passport cards for each duck
- Add a Hall of Fame for most-travelled duck
