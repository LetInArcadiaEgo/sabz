// scripts/seedListing.js

import fetch from 'node-fetch';                 // npm i node-fetch@3  (if you don’t have it)
import { randomUUID } from 'crypto';

const API =
  process.env.REACT_APP_API_BASE_URL      // ← the one from .env.local
  ?? process.env.VITE_API_BASE           // (second choice, if you ever add it)
  ?? 'http://localhost:5000';            // fallback for local dev

  
const demoListing = {
  title:       `Demo ${randomUUID().slice(0, 6)}`,
  description: 'Seed script — created automatically',
  price:       1234567,                         // number or string OK
  // optional fields you’ll add later:
  // location: 'Lahore, Punjab',
  // image:    'https://placehold.co/600x400',
};

(async () => {
  const r = await fetch(`${API}/api/listings`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(demoListing),
  });

  if (!r.ok) {
    console.error(`❌  API returned ${r.status}`);
    console.error(await r.text());
    process.exit(1);
  }

  console.log('✅  Listing seeded — will appear after approval');
})();