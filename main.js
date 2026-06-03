// --- Bio: track to white panel in illustration ---
const LANDSCAPE = { w: 5504, h: 3072 };
const PANEL = { left: 0.00, top: 0.55, width: 0.20, height: 0.35 };

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
  const visCenterX = (visLeft + visRight) / 2;
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
