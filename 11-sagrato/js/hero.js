import { Viewer, SYSTEM } from '@photo-sphere-viewer/core';
import { AutorotatePlugin } from '../vendor/autorotate-plugin.js';

// Stesso criterio del visore: oltre 2 il rapporto pixel costa e non si vede.
SYSTEM.load();
SYSTEM.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

function livello() {
  let maxTex = 4096;
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
            || document.createElement('canvas').getContext('webgl');
    if (gl) maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
  } catch { /* senza WebGL resta l'immagine di posa */ }
  if (maxTex < 2048) return null;
  const corto = Math.min(innerWidth, innerHeight) * Math.min(devicePixelRatio || 1, 2);
  if (maxTex < 4096 || corto <= 500 || (navigator.deviceMemory || 8) <= 4) return 1024;
  return corto <= 900 ? 2048 : 4096;
}

const liv = livello();
if (liv) {
  new Viewer({
    container: 'hero-pano',
    panorama: `pano/hero@${liv}.webp`,
    defaultZoomLvl: 22,
    defaultPitch: 0.12,
    navbar: false,
    mousewheel: false,
    touchmoveTwoFingers: true,
    plugins: [AutorotatePlugin.withConfig({
      autostartDelay: 400,
      autorotateSpeed: '0.42rpm',
      autorotatePitch: 0.12,
    })],
  });
}
