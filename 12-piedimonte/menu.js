/* Menù pubblico Piedimonte 2.0 — stessa impalcatura del menù Blast, senza framework. */

const FOTOS = typeof FOTO !== 'undefined' ? new Set(FOTO) : new Set();

const eur = (n) => '€ ' + n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const el = (tag, cls, testo) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (testo != null) n.textContent = testo;
  return n;
};

/* ---------------------------------------------------------------- lingua */

const ETICHETTE = {
  it: {
    ingredienti: 'Ingredienti',
    allergeni: 'Allergeni',
    /* mai "nessun allergene" quando il dato manca: l'elenco vuoto significa solo
       che il locale non lo dichiara sul menù */
    chiediAlBanco: 'Per ingredienti e allergeni completi chiedi al personale di sala.',
    chiudi: 'Chiudi',
    scheda: 'Scheda prodotto',
  },
  en: {
    ingredienti: 'Ingredients',
    allergeni: 'Allergens',
    chiediAlBanco: 'For full ingredients and allergens, please ask our staff.',
    chiudi: 'Close',
    scheda: 'Product details',
  },
};

const VARIANTI_EN = {
  'naturale': 'Still', 'frizzante': 'Sparkling', 'effervescente naturale': 'Naturally sparkling',
};
const etichettaVariante = (e, lingua) => {
  if (lingua !== 'en') return e;
  const m = e.match(/^(.+?)\s+([\d,]+\s*cl)$/i);
  if (!m) return e;
  const base = VARIANTI_EN[m[1].trim().toLowerCase()];
  return base ? `${base} ${m[2]}` : e;
};

let lingua = localStorage.getItem('piedimonte-lingua') === 'en' ? 'en' : 'it';

/* ----------------------------------------------------------------- orari */

const GIORNI = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];
const NOMI = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

/** "mar 19:30-00:00" per riga → Map(giorno → "19:30-00:00") */
function leggiOrari(testo) {
  const righe = new Map();
  for (const r of (testo || '').split('\n')) {
    const m = r.trim().match(/^(\w{3})\s+(.+)$/);
    if (m && GIORNI.includes(m[1])) righe.set(m[1], m[2]);
  }
  return righe;
}

const minuti = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** aperto adesso? gestisce le fasce che scavallano la mezzanotte (19:30-01:00) */
function statoOra(righe) {
  if (!righe.size) return null;
  const ora = new Date();
  const oggi = (ora.getDay() + 6) % 7;
  const adesso = ora.getHours() * 60 + ora.getMinutes();

  for (const scarto of [0, 1]) {
    const i = (oggi - scarto + 7) % 7;
    const fascia = righe.get(GIORNI[i]);
    if (!fascia) continue;
    const m = fascia.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
    if (!m) continue;
    let da = minuti(m[1]);
    let a = minuti(m[2]);
    if (a <= da) a += 24 * 60; // chiude dopo la mezzanotte
    const t = adesso + scarto * 24 * 60;
    if (t >= da && t < a) return { aperto: true, fino: m[2] };
  }

  // prossima apertura utile
  for (let d = 0; d < 8; d++) {
    const i = (oggi + d) % 7;
    const fascia = righe.get(GIORNI[i]);
    if (!fascia) continue;
    const m = fascia.match(/(\d{1,2}:\d{2})/);
    if (!m) continue;
    if (d === 0 && minuti(m[1]) <= adesso) continue;
    return { aperto: false, quando: d === 0 ? 'oggi' : d === 1 ? 'domani' : NOMI[i].toLowerCase(), alle: m[1] };
  }
  return { aperto: false };
}

const fraseStato = (s) =>
  s.aperto
    ? `Aperto ora — fino alle ${s.fino}`
    : s.alle
      ? `Chiuso — apre ${s.quando} alle ${s.alle}`
      : 'Chiuso';

/* ------------------------------------------------------------------ voci */

const prezzoUnico = (v) => (v.prezzo != null ? v.prezzo : null);

function fotoVoce(v) {
  if (FOTOS.has(v.id)) {
    const img = el('img', 'm-foto');
    img.src = `img/piatti/${v.id}.thumb.webp`;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 256;
    img.height = 256;
    return img;
  }
  const d = el('div', 'm-foto m-foto-vuota', v.nome.charAt(0));
  d.setAttribute('aria-hidden', 'true');
  return d;
}

function bloccoVarianti(varianti, lang) {
  const box = el('div', 'm-varianti');
  for (const va of varianti) {
    const riga = el('div', 'm-var');
    riga.append(el('span', null, lang ? etichettaVariante(va.etichetta, lang) : va.etichetta));
    riga.append(el('span', 'm-prezzo', eur(va.prezzo)));
    box.append(riga);
  }
  return box;
}

function rigaVoce(v, apri, senzaFoto) {
  const b = el('button', senzaFoto ? 'm-voce senza-foto' : 'm-voce');
  b.type = 'button';
  b.addEventListener('click', () => apri(v));

  if (!senzaFoto) b.append(fotoVoce(v));

  const corpo = el('div', 'm-corpo');
  const testata = el('div', 'm-testata');
  testata.append(el('h3', 'm-nome', v.nome));
  const unico = prezzoUnico(v);
  if (unico != null) testata.append(el('span', 'm-prezzo', eur(unico)));
  corpo.append(testata);

  if (v.descrizione) corpo.append(el('p', 'm-descr', v.descrizione));
  if (v.nota) corpo.append(el('p', 'm-nota', v.nota));
  if (unico == null && v.varianti) corpo.append(bloccoVarianti(v.varianti));
  if (v.firma) corpo.append(el('span', 'm-firma', 'Della casa'));

  if (v.allergeni && v.allergeni.length) {
    const box = el('div', 'm-allergeni');
    box.setAttribute('aria-label', 'Allergeni: ' + v.allergeni.map((a) => ALLERGENI[a].it).join(', '));
    for (const a of v.allergeni) {
      const i = el('img');
      i.src = `img/allergeni/${a}.png`;
      i.alt = ALLERGENI[a].it;
      i.title = ALLERGENI[a].it;
      i.width = 21;
      i.height = 21;
      i.loading = 'lazy';
      box.append(i);
    }
    corpo.append(box);
  }

  b.append(corpo);
  b.append(el('span', 'm-chevron', '›'));
  return b;
}

function rigaListino(v) {
  const r = el('div', 'm-riga');
  const nome = el('span', 'm-r-nome', v.nome);
  r.append(nome);
  if (v.nota) nome.append(el('span', 'm-r-nota', ' — ' + v.nota));
  r.append(el('span', 'm-prezzo', eur(v.prezzo)));
  return r;
}

/* --------------------------------------------------------------- scheda */

function apriScheda(v) {
  const d = el('dialog', 'm-scheda');
  const t = () => ETICHETTE[lingua];

  const disegna = () => {
    d.textContent = '';
    d.setAttribute('aria-label', t().scheda);

    const testa = el('div', FOTOS.has(v.id) ? 'm-s-testa con-foto' : 'm-s-testa');
    if (FOTOS.has(v.id)) {
      const img = el('img', 'm-s-hero');
      img.src = `img/piatti/${v.id}.webp`;
      img.alt = '';
      img.width = 1024;
      img.height = 640;
      testa.append(img);
    }
    const barra = el('div', 'm-s-barra');
    const box = el('div', 'm-s-lingua');
    for (const l of ['it', 'en']) {
      const b = el('button', lingua === l ? 'attivo' : '', l.toUpperCase());
      b.type = 'button';
      b.addEventListener('click', () => {
        lingua = l;
        localStorage.setItem('piedimonte-lingua', l);
        disegna();
      });
      box.append(b);
    }
    barra.append(box);
    const chiudi = el('button', 'm-s-chiudi', '×');
    chiudi.type = 'button';
    chiudi.setAttribute('aria-label', t().chiudi);
    chiudi.addEventListener('click', () => d.close());
    barra.append(chiudi);
    testa.append(barra);
    d.append(testa);

    const corpo = el('div', 'm-s-corpo');
    corpo.append(el('h2', 'm-s-nome', (lingua === 'en' && v.nome_en) || v.nome));

    const unico = prezzoUnico(v);
    if (unico != null) corpo.append(el('p', 'm-s-prezzo', eur(unico)));
    else if (v.varianti) corpo.append(bloccoVarianti(v.varianti, lingua));

    const ingredienti = (lingua === 'en' && v.descrizione_en) || v.descrizione;
    if (ingredienti) {
      const s = el('section', 'm-s-sezione');
      s.append(el('h3', 'm-f-titolo', t().ingredienti));
      s.append(el('p', null, ingredienti));
      corpo.append(s);
    }
    if (v.nota) corpo.append(el('p', 'm-nota', v.nota));

    if (v.allergeni && v.allergeni.length) {
      const s = el('section', 'm-s-sezione');
      s.append(el('h3', 'm-f-titolo', t().allergeni));
      const ul = el('ul', 'm-s-allergeni');
      for (const a of v.allergeni) {
        const li = el('li');
        const i = el('img');
        i.src = `img/allergeni/${a}.png`;
        i.alt = '';
        i.width = 30;
        i.height = 30;
        li.append(i, el('b', null, ALLERGENI[a].n + '.'), document.createTextNode(' ' + ALLERGENI[a][lingua]));
        ul.append(li);
      }
      s.append(ul);
      corpo.append(s);
    }

    if (!ingredienti || !v.allergeni || !v.allergeni.length) {
      corpo.append(el('p', 'm-s-manca', t().chiediAlBanco));
    }
    d.append(corpo);
  };

  disegna();
  document.body.append(d);
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  d.addEventListener('close', () => d.remove());
  d.showModal();
}

/* ---------------------------------------------------------- consigliami */

/* Due domande sole. La prima è un fatto (c'è il pomodoro o no), la seconda
   sceglie il ripiano: il carattere della pizza lo dà già il reparto del menù. */
const DOMANDE = [
  {
    chiave: 'pomodoro',
    passo: 'Domanda 1 di 2',
    testo: 'Con il pomodoro o senza?',
    scelte: [
      { id: 'si', titolo: 'Con pomodoro', sotto: 'San Marzano, datterino, salse rosse e gialle' },
      { id: 'no', titolo: 'Senza pomodoro', sotto: 'Le bianche: creme, formaggi, verdure' },
      { id: 'boh', titolo: 'Indifferente', sotto: 'Scegliete voi' },
    ],
  },
  {
    chiave: 'stile',
    passo: 'Domanda 2 di 2',
    testo: 'E stasera che voglia hai?',
    scelte: [
      { id: 'tradizione', titolo: 'La tradizione', sotto: 'Napoletana e verace, come si è sempre fatta' },
      { id: 'autore', titolo: 'Qualcosa di particolare', sotto: 'Le contemporanee, fuori dal solito' },
      { id: 'forte', titolo: 'Il pezzo forte', sotto: 'Le premiate e le pizze di Sanremo' },
    ],
  },
];

const RIPIANI = {
  tradizione: ['napoletane', 'veraci'],
  autore: ['contemporanee'],
  forte: ['premiate', 'sanremo', 'picciotte'],
};

/** tutte le pizze del forno, con addosso la categoria di provenienza */
const pizzeDelForno = () =>
  DATI.categorie
    .filter((c) => Object.values(RIPIANI).flat().includes(c.id))
    .flatMap((c) => c.voci.map((v) => ({ ...v, categoria: c.id, reparto: c.occhiello })));

function scegliPizza(risposte) {
  const ripiano = pizzeDelForno().filter((v) => RIPIANI[risposte.stile].includes(v.categoria));
  const conPomodoro = (v) => v.pomodoro !== false;
  let rosa = ripiano;
  if (risposte.pomodoro === 'si') rosa = ripiano.filter(conPomodoro);
  if (risposte.pomodoro === 'no') rosa = ripiano.filter((v) => !conPomodoro(v));
  // se una combinazione restasse vuota vale il ripiano intero: meglio un consiglio
  // leggermente fuori bersaglio che un vicolo cieco
  if (!rosa.length) rosa = ripiano;
  return rosa[Math.floor(Math.random() * rosa.length)];
}

function apriConsiglio() {
  const risposte = {};
  const d = el('dialog', 'm-scheda');
  let i = 0;

  const passo = () => {
    d.textContent = '';
    const q = DOMANDE[i];
    const box = el('div', 'm-quiz');
    box.append(el('p', 'm-q-passo', q.passo));
    box.append(el('p', 'm-q-domanda', q.testo));
    const scelte = el('div', 'm-q-scelte');
    for (const s of q.scelte) {
      const b = el('button', 'm-q-scelta');
      b.type = 'button';
      b.append(el('span', 'm-q-titolo', s.titolo));
      b.append(el('span', 'm-q-sotto', s.sotto));
      b.addEventListener('click', () => {
        risposte[q.chiave] = s.id;
        i += 1;
        if (i < DOMANDE.length) passo();
        else {
          d.close();
          mostraSelezione(risposte);
        }
      });
      scelte.append(b);
    }
    box.append(scelte);
    d.append(box);
  };

  passo();
  document.body.append(d);
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  d.addEventListener('close', () => d.remove());
  d.showModal();
}

function mostraSelezione(risposte) {
  const v = scegliPizza(risposte);
  document.querySelector('.m-selezione')?.remove();

  const sez = el('section', 'm-sezione m-selezione');
  const h = el('h2', 'm-titolo');
  h.append(el('span', 'm-t-script', 'La nostra selezione'));
  h.append(el('span', 'm-t-occhiello', 'per te'));
  sez.append(h);
  sez.append(el('span', 'm-filo'));

  const pomodoro = { si: 'con pomodoro', no: 'senza pomodoro', boh: 'a scelta nostra' }[risposte.pomodoro];
  sez.append(el('p', 'm-sel-perche', `${v.reparto} · ${pomodoro}`));
  sez.append(rigaVoce(v, apriScheda));

  const ancora = el('button', 'm-sel-ancora', 'Proponimene un’altra');
  ancora.type = 'button';
  ancora.addEventListener('click', () => mostraSelezione(risposte));
  sez.append(ancora);

  const main = document.querySelector('main');
  main.prepend(sez);
  sez.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
}

/* -------------------------------------------------------------- rendering */

function rendiNav(categorie) {
  const nav = document.querySelector('.m-nav');
  const chips = new Map();
  for (const c of categorie) {
    const b = el('button', 'm-chip');
    b.type = 'button';
    b.textContent = c.occhiello || c.nome;
    b.addEventListener('click', () =>
      document.getElementById('cat-' + c.id)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    );
    nav.append(b);
    chips.set(c.id, b);
  }

  // la pill attiva segue la sezione a schermo e si porta in vista da sola
  const osserva = new IntersectionObserver(
    (voci) => {
      for (const v of voci) {
        if (!v.isIntersecting) continue;
        const b = chips.get(v.target.id.replace('cat-', ''));
        if (!b || b.classList.contains('attivo')) continue;
        for (const x of chips.values()) x.classList.remove('attivo');
        b.classList.add('attivo');
        // istantaneo: uno scroll morbido qui viene annullato da quello della pagina
        nav.scrollLeft = Math.max(0, b.offsetLeft - 20);
      }
    },
    { rootMargin: '-74px 0px -70% 0px' }
  );
  for (const c of categorie) osserva.observe(document.getElementById('cat-' + c.id));
}

function rendiMenu() {
  const main = document.querySelector('main');
  for (const c of DATI.categorie) {
    const sez = el('section', 'm-sezione');
    sez.id = 'cat-' + c.id;

    const h = el('h2', 'm-titolo');
    h.append(el('span', 'm-t-script', c.nome));
    if (c.occhiello) h.append(el('span', 'm-t-occhiello', c.occhiello));
    sez.append(h);
    sez.append(el('span', 'm-filo'));
    if (c.nota) sez.append(el('p', 'm-nota-sezione', c.nota));

    if (c.listino) {
      const box = el('div', 'm-listino');
      for (const v of c.voci) box.append(rigaListino(v));
      sez.append(box);
    } else {
      for (const v of c.voci) sez.append(rigaVoce(v, apriScheda, c.senzaFoto));
    }
    main.append(sez);
  }
  rendiNav(DATI.categorie);
}

function rendiPiede() {
  const imp = DATI.locale;
  const f = document.querySelector('.m-footer');

  const firma = el('div', 'm-f-firma');
  firma.append(el('span', 'm-f-filo'));
  firma.append(el('p', 'm-f-nome', imp.firma));
  firma.append(el('p', 'm-f-payoff', imp.payoff));
  f.append(firma);

  const azioni = el('div', 'm-f-azioni');
  const wa = el('a', 'm-f-btn primario', 'Scrivici su WhatsApp');
  wa.href = 'https://wa.me/' + imp.whatsapp.replace(/\D/g, '');
  wa.target = '_blank';
  wa.rel = 'noreferrer';
  const tel = el('a', 'm-f-btn', 'Chiama ' + imp.telefono);
  tel.href = 'tel:' + imp.telefono.replace(/\s+/g, '');
  azioni.append(wa, tel);
  f.append(azioni);

  const ig = el('a', 'm-f-ig', '@' + imp.instagram);
  ig.href = 'https://instagram.com/' + imp.instagram;
  ig.target = '_blank';
  ig.rel = 'noreferrer';
  f.append(ig);

  /* --- orari --- */
  const righe = leggiOrari(imp.orari);
  const stato = statoOra(righe);
  if (stato) {
    const blocco = el('section', 'm-f-blocco');
    const testa = el('button', 'm-f-orari-testa');
    testa.type = 'button';
    const pallino = el('span', 'm-f-pallino' + (stato.aperto ? ' acceso' : ''));
    pallino.setAttribute('aria-hidden', 'true');
    const frase = el('span', 'm-f-stato' + (stato.aperto ? ' aperto' : ''), fraseStato(stato));
    const freccia = el('span', 'm-f-freccia', '▾');
    testa.append(pallino, frase, freccia);

    // sempre nel DOM: in stampa la tabella compare al posto dello stato "aperto ora"
    const tab = el('table', 'm-f-orari');
    tab.hidden = true;
    const tbody = el('tbody');
    const oggi = (new Date().getDay() + 6) % 7;
    GIORNI.forEach((g, i) => {
      const tr = el('tr');
      if (i === oggi) tr.className = 'oggi';
      const th = el('th', null, NOMI[i]);
      th.scope = 'row';
      tr.append(th, el('td', null, righe.get(g) ?? 'chiuso'));
      tbody.append(tr);
    });
    tab.append(tbody);

    testa.setAttribute('aria-expanded', 'false');
    testa.addEventListener('click', () => {
      tab.hidden = !tab.hidden;
      testa.setAttribute('aria-expanded', String(!tab.hidden));
      freccia.textContent = tab.hidden ? '▾' : '▴';
    });
    blocco.append(testa, tab);
    f.append(blocco);
  }

  /* --- dove --- */
  const dove = el('section', 'm-f-blocco m-f-dove');
  dove.append(el('h2', 'm-f-titolo', 'Dove siamo'));
  dove.append(el('p', 'm-f-indirizzo', imp.indirizzo));
  const link = el('a', 'm-f-link', 'Indicazioni stradali →');
  link.href = imp.mappa;
  link.target = '_blank';
  link.rel = 'noreferrer';
  dove.append(link);
  f.append(dove);

  /* --- legenda dei 14 allergeni --- */
  const leg = el('details', 'm-f-blocco m-legenda m-f-note');
  leg.append(el('summary', null, 'Elenco dei 14 allergeni alimentari'));
  const griglia = el('div', 'm-l-griglia');
  for (const [slug, a] of Object.entries(ALLERGENI)) {
    const v = el('div', 'm-l-voce');
    const i = el('img');
    i.src = `img/allergeni/${slug}.png`;
    i.alt = '';
    i.width = 40;
    i.height = 40;
    i.loading = 'lazy';
    const testo = el('div');
    testo.append(el('p', 'm-l-nome', a.n + '. ' + a.it));
    testo.append(el('p', 'm-l-descr', a.voce));
    v.append(i, testo);
    griglia.append(v);
  }
  leg.append(griglia);
  f.append(leg);

  /* --- note di servizio --- */
  const note = el('details', 'm-f-note');
  note.append(el('summary', null, 'Note di servizio'));
  for (const n of imp.note) note.append(el('p', null, n));
  f.append(note);

  const legale = el('div', 'm-f-legale');
  legale.append(el('p', null, `© ${new Date().getFullYear()} ${imp.nome} ${imp.versione} — ${imp.firma}`));
  f.append(legale);

  const su = el('button', 'm-f-su', 'Torna su ↑');
  su.type = 'button';
  su.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  f.append(su);
}

rendiMenu();
rendiPiede();

document.querySelector('.m-consiglia').addEventListener('click', apriConsiglio);

document.querySelector('.m-chef').addEventListener('click', () => {
  const imp = DATI.locale;
  const d = el('dialog', 'm-scheda');
  const testa = el('div', 'm-s-testa con-foto');
  const foto = el('img', 'm-storia-foto');
  foto.src = 'img/brand/enzo.jpg';
  foto.alt = '';
  testa.append(foto);
  const barra = el('div', 'm-s-barra');
  barra.append(el('span'));
  const chiudi = el('button', 'm-s-chiudi', '×');
  chiudi.type = 'button';
  chiudi.setAttribute('aria-label', 'Chiudi');
  chiudi.addEventListener('click', () => d.close());
  barra.append(chiudi);
  testa.append(barra);

  const corpo = el('div', 'm-s-corpo m-storia');
  corpo.append(el('p', 'm-storia-cit', imp.citazione));
  corpo.append(el('p', 'm-storia-testo', imp.racconto));
  corpo.append(el('p', 'm-storia-firma', imp.firma));
  const premi = el('div', 'm-storia-premi');
  for (const [f, t] of [['gambero', 'Due Spicchi Gambero Rosso'], ['50top', '50 Top Pizza'],
                        ['sanremo', 'Casa Sanremo']]) {
    const i = el('img');
    i.src = `img/brand/${f}.jpg`;
    i.alt = t;
    i.title = t;
    premi.append(i);
  }
  corpo.append(premi);

  d.append(testa, corpo);
  document.body.append(d);
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  d.addEventListener('close', () => d.remove());
  d.showModal();
});

document.querySelector('.m-pdf').addEventListener('click', () => {
  // le note chiuse non finirebbero sul foglio
  document.querySelectorAll('details').forEach((d) => (d.open = true));
  window.print();
});
