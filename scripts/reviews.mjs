// Recensioni Google per le demo: interroga Places, applica la policy e scrive data/reviews.json.
// Policy: rating>=4.5 e count>=max(50, mediana settore-citta') -> "full"; rating>=4.5 -> "rating"; altrimenti "none".
// Il frontend mostra SOLO cio' che c'e' nel JSON: la decisione vive qui, una volta sola.
const KEY = process.env.GOOGLE_PLACES_KEY;
if (!KEY) { console.error('GOOGLE_PLACES_KEY mancante'); process.exit(1); }

// mediana recensioni del set settore+citta' (pasticcerie/panifici Messina, da Lead Radar, 2026-08: n=53)
const MEDIANA = 156;
const ATTIVITA = [
  { slug: 'delia',    place: 'ChIJRWVQzHpOFBMRq243q0DENdc' },
  { slug: 'freni',    place: 'ChIJ_7TW6OJOFBMRyFkdcuUccjs' },
  { slug: 'delcorso', place: 'ChIJ4R9cRdZNFBMRhfW1KFzeFIY' },
  { slug: 'irrera',   place: null }, // multi-sede: rating 4.3 sotto soglia, resta "none" senza chiamata
];

const out = { aggiornato: new Date().toISOString().slice(0, 10) };
for (const a of ATTIVITA) {
  if (!a.place) { out[a.slug] = { show: 'none' }; continue; }
  const r = await fetch(`https://places.googleapis.com/v1/places/${a.place}`, {
    headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'rating,userRatingCount' },
  });
  if (!r.ok) { console.error(a.slug, 'HTTP', r.status); out[a.slug] = { show: 'none' }; continue; }
  const { rating, userRatingCount: n } = await r.json();
  if (rating >= 4.5 && n >= Math.max(50, MEDIANA)) out[a.slug] = { show: 'full', rating, count: n };
  else if (rating >= 4.5 && n >= 50)               out[a.slug] = { show: 'rating', rating };
  else                                             out[a.slug] = { show: 'none' };
}
const { writeFileSync } = await import('node:fs');
writeFileSync('data/reviews.json', JSON.stringify(out) + '\n');
console.log(JSON.stringify(out));
