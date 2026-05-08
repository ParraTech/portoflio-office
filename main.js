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

// --- Entry animations ---
gsap.from(['.clock', '.bio'], {
  opacity: 0,
  duration: 1.2,
  delay: 0.4,
  stagger: 0.3,
  ease: 'power2.out',
});
