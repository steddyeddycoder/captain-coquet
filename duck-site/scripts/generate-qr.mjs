// scripts/generate-qr.mjs
// Run with: npm run seed-qr
// Reads SITE_URL from .env.local and generates one QR code PNG per duck
// into public/qr/. Each QR points to {SITE_URL}/duck/{id}.

import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { DUCKS } from '../lib/ducks.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const outDir = path.join(__dirname, '..', 'public', 'qr');
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log(`Generating Captain Coquet QR codes pointing at: ${SITE_URL}\n`);
  for (const duck of DUCKS) {
    const url = `${SITE_URL}/duck/${duck.id}`;
    const filePath = path.join(outDir, `${duck.number}-${duck.id}.png`);
    await QRCode.toFile(filePath, url, {
      width: 600,
      margin: 2,
      color: { dark: '#0B2545', light: '#FFF7E6' },
    });
    console.log(`✓ ${duck.number} ${duck.name.padEnd(20)} -> ${url}`);
  }
  console.log(`\nDone. Files saved in public/qr/. Print these and stick one on each duck.`);
}

run().catch((err) => {
  console.error('Failed to generate QR codes:', err);
  process.exit(1);
});
