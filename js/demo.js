/**
 * Background of realistic dog portraits whose pupils ('googly eye' overlays) track the cursor.
 * Photos courtesy of dog.ceo (free for personal and commercial use).
 */
(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  // Eye coords are fractions of each photo's 512x512 frame.
  const BREEDS = [
    { name: 'labrador',        src: 'assets/dogs/labrador.jpg',        eyes: [{fx: 0.43, fy: 0.36}, {fx: 0.62, fy: 0.36}] },
    { name: 'husky',           src: 'assets/dogs/husky.jpg',           eyes: [{fx: 0.40, fy: 0.55}, {fx: 0.62, fy: 0.55}] },
    { name: 'beagle',          src: 'assets/dogs/beagle.jpg',          eyes: [{fx: 0.43, fy: 0.45}, {fx: 0.69, fy: 0.42}] },
    { name: 'bulldog',         src: 'assets/dogs/bulldog.jpg',         eyes: [{fx: 0.40, fy: 0.30}, {fx: 0.63, fy: 0.30}] },
    { name: 'pug',             src: 'assets/dogs/pug.jpg',             eyes: [{fx: 0.36, fy: 0.44}, {fx: 0.63, fy: 0.44}] },
    { name: 'pomeranian',      src: 'assets/dogs/pomeranian.jpg',      eyes: [{fx: 0.40, fy: 0.18}, {fx: 0.57, fy: 0.18}] },
    { name: 'shiba',           src: 'assets/dogs/shiba.jpg',           eyes: [{fx: 0.30, fy: 0.39}, {fx: 0.49, fy: 0.40}] },
    { name: 'goldenretriever', src: 'assets/dogs/goldenretriever.jpg', eyes: [{fx: 0.31, fy: 0.30}, {fx: 0.49, fy: 0.31}] },
  ];

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function makeCircle(parent, cx, cy, r, fill, stroke) {
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', cx);
    c.setAttribute('cy', cy);
    c.setAttribute('r', r);
    c.setAttribute('fill', fill);
    if (stroke) {
      c.setAttribute('stroke', stroke);
      c.setAttribute('stroke-width', '1.5');
    }
    parent.appendChild(c);
    return c;
  }

  // Build a jittered grid of tiles that tiles the viewport.
  function layout(container, eyesSvg) {
    clear(container);
    clear(eyesSvg);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    eyesSvg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    eyesSvg.setAttribute('width', vw);
    eyesSvg.setAttribute('height', vh);

    const targetCell = vw < 600 ? 130 : 180;
    const cols = Math.max(2, Math.round(vw / targetCell));
    const rows = Math.max(2, Math.round(vh / targetCell));
    const cellW = vw / cols;
    const cellH = vh / rows;
    // Tile is square; size from the smaller cell dim, with a little overlap so we cover the viewport.
    const tile = Math.ceil(Math.max(cellW, cellH) * 1.05);
    const eyeR = tile * 0.075;
    const pupilR = tile * 0.038;
    const maxOffset = eyeR - pupilR - 1;

    const pupils = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const breed = BREEDS[(r * 3 + c * 5 + r * c) % BREEDS.length];
        const jitterX = (Math.random() - 0.5) * cellW * 0.15;
        const jitterY = (Math.random() - 0.5) * cellH * 0.15;
        const x = Math.round(c * cellW + (cellW - tile) / 2 + jitterX);
        const y = Math.round(r * cellH + (cellH - tile) / 2 + jitterY);

        const img = document.createElement('img');
        img.src = breed.src;
        img.alt = '';
        img.className = 'dog';
        img.draggable = false;
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.width = tile + 'px';
        img.style.height = tile + 'px';
        container.appendChild(img);

        for (const eye of breed.eyes) {
          const ex = x + eye.fx * tile;
          const ey = y + eye.fy * tile;
          makeCircle(eyesSvg, ex, ey, eyeR, '#ffffff', '#1a1a1a');
          const pupil = makeCircle(eyesSvg, ex, ey, pupilR, '#0d0d0d');
          pupils.push({ el: pupil, cx: ex, cy: ey, maxOffset });
        }
      }
    }
    return pupils;
  }

  function init() {
    const container = document.getElementById('dogs');
    const eyesSvg = document.getElementById('dog-eyes');
    if (!container || !eyesSvg) return;

    let pupils = layout(container, eyesSvg);
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let pending = false;

    function applyEyes() {
      pending = false;
      for (let i = 0; i < pupils.length; i++) {
        const p = pupils[i];
        const dx = mouseX - p.cx;
        const dy = mouseY - p.cy;
        const dist = Math.hypot(dx, dy);
        const k = dist > 0 ? Math.min(1, p.maxOffset / dist) : 0;
        const ox = (dx * k).toFixed(2);
        const oy = (dy * k).toFixed(2);
        p.el.setAttribute('transform', `translate(${ox} ${oy})`);
      }
    }

    function schedule() {
      if (!pending) {
        pending = true;
        requestAnimationFrame(applyEyes);
      }
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      schedule();
    }, { passive: true });

    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      function tick(t) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mouseX = cx + Math.cos(t / 1800) * window.innerWidth * 0.45;
        mouseY = cy + Math.sin(t / 2300) * window.innerHeight * 0.45;
        applyEyes();
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    } else {
      applyEyes();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        pupils = layout(container, eyesSvg);
        applyEyes();
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
