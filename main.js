// --- Bio: track to white panel in illustration ---
const LANDSCAPE = { w: 5504, h: 3072 };
const PANEL = { left: 0.04, top: 0.57, width: 0.18, height: 0.240 };

function positionBio() {
  const bio = document.querySelector('.bio');
  if (window.innerWidth <= 600) {
    ['left', 'top', 'width', 'transform'].forEach(p => bio.style.removeProperty(p));
    return;
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const imgAspect = LANDSCAPE.w / LANDSCAPE.h;
  const vpAspect  = vw / vh;
  let imgW, imgH, offX, offY;
  if (vpAspect >= imgAspect) {
    imgW = vw; imgH = vw / imgAspect; offX = 0; offY = (vh - imgH) / 2;
  } else {
    imgH = vh; imgW = vh * imgAspect; offX = (vw - imgW) / 2; offY = 0;
  }
  const panelLeft  = offX + PANEL.left * imgW;
  const panelRight = offX + (PANEL.left + PANEL.width) * imgW;
  const visLeft    = Math.max(0, panelLeft);
  const visRight   = Math.min(vw, panelRight);
  // shift right by 10% of the visible panel width to match illustration panel
  const visCenterX = (visLeft + visRight) / 2 + (visRight - visLeft) * 0.10;
  const visCenterY = offY + (PANEL.top + PANEL.height / 2) * imgH;

  bio.style.left      = visCenterX + 'px';
  bio.style.top       = visCenterY + 'px';
  bio.style.width     = Math.max(40, visRight - visLeft) + 'px';
  bio.style.transform = 'translate(-50%, -50%)';
}

positionBio();
window.addEventListener('resize', positionBio);

// --- Entry animation ---
gsap.from('.bio', {
  opacity: 0,
  duration: 1.2,
  delay: 0.4,
  ease: 'power2.out',
});

// --- Day/night scene by visitor's local time ---
const NIGHT_START = 19, NIGHT_END = 7; // night = 7pm–7am
const SCENES = {
  day:   { el: document.getElementById('bg-day'),   src: 'media/light-mode-office.png' },
  night: { el: document.getElementById('bg-night'), src: 'media/dark-mode-office.png' },
};

let manualNight = null; // set by the ?debug toggle; wins over URL param and clock

function isNight() {
  if (manualNight !== null) return manualNight;
  const override = new URLSearchParams(location.search).get('scene');
  if (override) return override === 'night';
  const h = new Date().getHours();
  return h >= NIGHT_START || h < NIGHT_END;
}

function applyScene() {
  const night = isNight();
  document.body.classList.toggle('night', night);
  document.getElementById('scene-toggle').textContent = night ? '☀' : '☾';
}

applyScene();

if (new URLSearchParams(location.search).has('debug')) {
  document.body.classList.add('debug');
  document.getElementById('scene-toggle').addEventListener('click', () => {
    manualNight = !isNight();
    applyScene();
  });
}

// load the active scene first, then preload the other for the crossfade
const active = isNight() ? SCENES.night : SCENES.day;
const inactive = active === SCENES.night ? SCENES.day : SCENES.night;
active.el.addEventListener('load', () => { inactive.el.src = inactive.src; }, { once: true });
active.el.src = active.src;

// arm the slow crossfade only after first paint
requestAnimationFrame(() => document.body.classList.add('scene-ready'));

setInterval(applyScene, 60_000);
