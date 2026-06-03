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
  const panelCenterX = offX + (PANEL.left + PANEL.width / 2) * imgW;
  const panelCenterY = offY + (PANEL.top + PANEL.height / 2) * imgH;
  const panelW = PANEL.width * imgW;

  bio.style.left      = panelCenterX + 'px';
  bio.style.top       = panelCenterY + 'px';
  bio.style.width     = Math.max(40, panelW) + 'px';
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
