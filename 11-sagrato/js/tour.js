import { Viewer, SYSTEM } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '../vendor/virtual-tour-plugin.js';
import { MarkersPlugin } from '../vendor/markers-plugin.js';
import { MapPlugin } from '../vendor/map-plugin.js';
import { TOURS } from '../data/tours.js';

const slug = new URLSearchParams(location.search).get('chiesa');
const tour = TOURS[slug] || TOURS[Object.keys(TOURS)[0]];

const $ = (id) => document.getElementById(id);

/* ---------- quanta risoluzione regge questo dispositivo ----------
   Un equirettangolare 7680 px richiede MAX_TEXTURE_SIZE >= 8192 e ~118 MB di
   memoria video: su parecchie GPU integrate e su molti telefoni non si carica
   affatto. Si parte sempre dal gradino piu' basso, che compare all'istante,
   e si sale fino al massimo che la macchina regge davvero. */

const LIVELLI = [1024, 2048, 4096, 7680];
const BASE = 1024;
const FOV_V = 72;          // campo visivo verticale a riposo, in gradi

// Oltre 2 il rapporto pixel non si vede piu' e raddoppia il lavoro della GPU:
// su un telefono e' la differenza fra scorrevole e a scatti.
// SYSTEM si popola da solo alla creazione del visore e sovrascriverebbe il
// valore: lo si carica prima, cosi' il limite resta quello scelto qui.
const DPR = Math.min(window.devicePixelRatio || 1, 2);
SYSTEM.load();
SYSTEM.pixelRatio = DPR;

function tetto() {
  let maxTex = 4096;
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
            || document.createElement('canvas').getContext('webgl');
    if (gl) maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
  } catch { /* senza WebGL non si arriva qui comunque */ }

  let t = Math.min(maxTex, 7680);

  // La memoria e' il vincolo vero: un equirettangolare 7680 occupa ~118 MB di
  // memoria video. Su Safari deviceMemory non esiste, ma i dispositivi vecchi
  // si tradiscono con un MAX_TEXTURE_SIZE basso, che li limita da solo.
  const mem = navigator.deviceMemory || 8;
  if (mem <= 3) t = Math.min(t, 1024);
  else if (mem <= 4) t = Math.min(t, 2048);
  else if (mem <= 6) t = Math.min(t, 4096);

  // Quanta immagine serve davvero: sullo schermo entrano FOV_V gradi, cioe'
  // (livello/2 * FOV_V/180) pixel di sorgente. Oltre ~1,5x di ingrandimento
  // il dettaglio si sfalda; sotto, si scaricherebbero pixel invisibili.
  const ideale = (2 * innerHeight * DPR * 180) / (FOV_V * 1.5);
  t = Math.min(t, LIVELLI.find((l) => l >= ideale) || 7680);

  return LIVELLI.filter((l) => l <= t).pop() || BASE;
}

const TETTO = tetto();

// Con la banda larga si salta diretti al massimo; sulle reti lente si fa un
// gradino intermedio, cosi' l'immagine migliora invece di far aspettare.
function catena() {
  const rete = navigator.connection?.effectiveType || '4g';
  if (TETTO <= BASE) return [];
  if (rete === 'slow-2g' || rete === '2g') return [2048].filter((l) => l <= TETTO);
  if (rete === '3g') return [2048, TETTO].filter((l, i, a) => l <= TETTO && a.indexOf(l) === i);
  return [TETTO];
}

const url = (tappa, livello) => `${tappa.pano}@${livello}.webp`;

const precarica = (src) => new Promise((ok, ko) => {
  const i = new Image();
  i.onload = ok;
  i.onerror = ko;
  i.src = src;
});

$('soglia-luogo').textContent = `${tour.luogo} — ${tour.epoca}`;
$('soglia-nome').textContent = tour.nome;
$('soglia-intro').textContent = tour.intro;
$('nome-chiesa').textContent = tour.nome;
document.title = `${tour.nome} · Sagrato`;

// I dati del tour parlano di tappe e opere; qui diventano nodi e marker della libreria.
const nodi = tour.tappe.map((t, i) => ({
  id: t.id,
  panorama: url(t, BASE),
  name: t.nome,
  map: t.mappa,
  links: t.link.map((l) => ({ nodeId: l.a, position: { yaw: l.yaw, pitch: l.pitch ?? '-22deg' } })),
  markers: (t.opere || []).map((o) => ({
    id: o.id,
    position: { yaw: o.yaw, pitch: o.pitch },
    html: '<div class="opera-pin">✦</div>',
    size: { width: 34, height: 34 },
    anchor: 'center center',
    tooltip: { content: o.titolo, position: 'top center' },
    data: o,
  })),
  data: { indice: i },
}));

const viewer = new Viewer({
  container: 'viewer',
  defaultZoomLvl: 34,
  minFov: 26,
  maxFov: 96,
  navbar: false,
  keyboard: 'always',
  plugins: [
    MarkersPlugin.withConfig({}),
    // L'immagine della planimetria va dichiarata sul tour (vedi sotto): il MapPlugin
    // qui riceve solo l'aspetto, e il tour gli passa la mappa della chiesa scelta.
    MapPlugin.withConfig({
      center: tour.mappaCentro,
      rotation: tour.mappaRotazione || 0,
      size: matchMedia('(max-width: 720px)').matches ? '118px' : '190px',
      position: 'bottom left',
      shape: 'square',
      coneColor: '#c9a227',
      coneSize: 30,
      pinImage: null,
      buttons: { close: false, north: false, reset: false, maximize: true },
      spotStyle: { size: 13, color: 'rgba(245,241,233,.55)', hoverSize: 19, hoverColor: '#c9a227', borderColor: 'rgba(20,17,9,.7)' },
      defaultZoom: 42,
      minimizeOnHotspotClick: false,
    }),
    VirtualTourPlugin.withConfig({
      dataMode: 'client',
      positionMode: 'manual',
      renderMode: '3d',
      startNodeId: tour.tappe[0].id,
      nodes: nodi,
      map: { imageUrl: tour.mappa },
      // Cambio tappa: dissolvenza. Affinamento della stessa tappa: nessun
      // effetto, altrimenti a ogni gradino di qualita' si vedrebbe un lampo.
      transitionOptions: (node, fromNode) => (fromNode && fromNode.id === node.id
        ? { effect: 'none', rotation: false, showLoader: false }
        : { effect: 'fade', speed: '18rpm', rotation: true, showLoader: true }),
      arrowStyle: { color: '#f5f1e9', hoverColor: '#c9a227', outlineColor: 'rgba(20,17,9,.6)', opacity: 0.85, size: { width: 76, height: 76 } },
      arrowsPosition: { minPitch: 0.24, maxPitch: 0.6 },
    }),
  ],
});

const virtual = viewer.getPlugin(VirtualTourPlugin);
const markers = viewer.getPlugin(MarkersPlugin);

/* ---------- striscia delle tappe ---------- */

const strip = $('tappe');
tour.tappe.forEach((t, i) => {
  const b = document.createElement('button');
  b.textContent = String(i + 1).padStart(2, '0');
  b.title = t.nome;
  b.addEventListener('click', () => virtual.setCurrentNode(t.id));
  strip.append(b);
});

virtual.addEventListener('node-changed', ({ node }) => {
  const i = node.data.indice;
  $('nome-tappa').innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b> / ${String(tour.tappe.length).padStart(2, '0')} — ${node.name}`;
  strip.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-current', String(j === i)));
  strip.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  chiudiScheda();
  // l'affinamento riemette node-changed sullo stesso nodo: qui va ignorato
  if (node.id !== inCorso) {
    inCorso = node.id;
    affina(tour.tappe[i]);
  }
});

/* ---------- affinamento progressivo ----------
   La tappa e' gia' a schermo al gradino basso: da qui si sale in sottofondo.
   Se nel frattempo si cambia tappa, il giro in corso viene abbandonato. */

let giro = 0;
let inCorso = null;

// Non si affina se il visore ha gia' un cambio tappa in volo: due caricamenti
// in concorrenza si abortiscono a vicenda e la tappa smetterebbe di cambiare.
const libero = (tappa, mio) => mio === giro
  && virtual.getCurrentNode()?.id === tappa.id
  && !virtual.state.loadingNode;

async function affina(tappa) {
  const mio = ++giro;
  for (const livello of catena()) {
    try {
      await precarica(url(tappa, livello));   // scarica in rete, non ancora a schermo
    } catch {
      return;                                 // livello assente: si tiene quello attuale
    }
    if (!libero(tappa, mio)) return;
    // Il cambio passa dal plugin, non da viewer.setPanorama, perche' il plugin
    // serializza i caricamenti e tiene coerente lo stato del tour.
    virtual.updateNode({ id: tappa.id, panorama: url(tappa, livello) });
  }
  // il salto alla tappa vicina deve essere immediato: se ne scalda l'anteprima
  tappa.link.forEach((l) => {
    const vicina = tour.tappe.find((t) => t.id === l.a);
    if (vicina) precarica(url(vicina, BASE)).catch(() => {});
  });
}

/* ---------- scheda dell'opera ---------- */

const scheda = $('scheda');

markers.addEventListener('select-marker', ({ marker }) => {
  const o = marker.data;
  if (!o) return;
  $('scheda-occhiello').textContent = o.occhiello || 'Opera';
  $('scheda-titolo').textContent = o.titolo;
  $('scheda-testo').innerHTML = o.testo.map((p) => `<p>${p}</p>`).join('');
  $('scheda-dettagli').textContent = o.dettagli || '';
  scheda.classList.add('aperta');
  scheda.setAttribute('aria-hidden', 'false');
});

function chiudiScheda() {
  scheda.classList.remove('aperta');
  scheda.setAttribute('aria-hidden', 'true');
}
$('chiudi-scheda').addEventListener('click', chiudiScheda);
addEventListener('keydown', (e) => { if (e.key === 'Escape') chiudiScheda(); });

/* ---------- comandi ---------- */

const audio = $('ambiente');
const btnAudio = $('btn-audio');
audio.volume = 0;

btnAudio.addEventListener('click', () => {
  const acceso = btnAudio.getAttribute('aria-pressed') === 'true';
  acceso ? sfuma(audio, 0, () => audio.pause()) : (audio.play(), sfuma(audio, 0.34));
  btnAudio.setAttribute('aria-pressed', String(!acceso));
});

// L'ambiente non deve entrare a schiaffo: sale e scende in un paio di secondi.
function sfuma(el, verso, poi) {
  const da = el.volume;
  const t0 = performance.now();
  const passo = (t) => {
    const k = Math.min((t - t0) / 1400, 1);
    el.volume = da + (verso - da) * k;
    if (k < 1) requestAnimationFrame(passo);
    else poi?.();
  };
  requestAnimationFrame(passo);
}

$('btn-pieno').addEventListener('click', () => viewer.toggleFullscreen());

/* ---------- soglia ---------- */

const entra = $('entra');
viewer.addEventListener('ready', () => {
  entra.disabled = false;
  entra.textContent = 'Entra';
}, { once: true });

entra.addEventListener('click', () => {
  $('soglia').classList.add('via');
  audio.play().then(() => {
    sfuma(audio, 0.34);
    btnAudio.setAttribute('aria-pressed', 'true');
  }).catch(() => { /* se il browser rifiuta, resta il pulsante */ });
});
