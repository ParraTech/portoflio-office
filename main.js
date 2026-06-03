const WEATHER = 'sunny'; // 'sunny' | 'rain' | 'snow'

// --- Clock ---
const clockTimeEl = document.querySelector('.clock-time');
const clockTzEl = document.querySelector('.clock-tz');

clockTzEl.textContent = new Date()
  .toLocaleTimeString('en-US', { timeZoneName: 'short' })
  .split(' ')
  .pop();

function updateClock() {
  clockTimeEl.textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
setInterval(updateClock, 1000);
updateClock();

// --- Weather ---
if (WEATHER === 'sunny') {
  gsap.to('.sun', {
    scale: 1.12,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    transformOrigin: 'center center',
  });
}

// --- Bio: track to white panel in illustration ---
const LANDSCAPE = { w: 5504, h: 3072 };
const PANEL = { left: 0.00, top: 0.55, width: 0.20, height: 0.35 };

function positionBio() {
  const bio = document.querySelector('.bio');
  if (window.innerWidth <= 600) {
    ['left', 'top', 'width'].forEach(p => bio.style.removeProperty(p));
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
  const panelX = offX + PANEL.left * imgW;
  const panelW = PANEL.width * imgW;
  const visLeft  = Math.max(0, panelX);
  const visWidth = panelW - (visLeft - panelX);

  bio.style.left  = visLeft + 'px';
  bio.style.top   = (offY + PANEL.top * imgH) + 'px';
  bio.style.width = Math.max(40, visWidth) + 'px';
}

positionBio();
window.addEventListener('resize', positionBio);

// --- Entry animations ---
gsap.from(['.clock', '.bio'], {
  opacity: 0,
  duration: 1.2,
  delay: 0.4,
  stagger: 0.3,
  ease: 'power2.out',
});
