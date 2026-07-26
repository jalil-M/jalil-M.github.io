// Particle field — successor to the jquery.particleground background,
// rewritten dependency-free and recolored to the site accent.
(function () {
  var canvas = document.getElementById('particles');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var COLOR = '#9184d9';
  var LINK = 190;      // px at CSS scale before a link fades out
  var DENSITY = 26000; // one dot per N css px²
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pts = [], W = 0, H = 0, raf;

  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var n = Math.max(12, Math.round((W * H) / DENSITY));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (!reduce) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = COLOR;
      ctx.fill();
    }
    for (var a = 0; a < pts.length; a++) {
      for (var b = a + 1; b < pts.length; b++) {
        var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          ctx.beginPath();
          ctx.moveTo(pts[a].x, pts[a].y);
          ctx.lineTo(pts[b].x, pts[b].y);
          ctx.strokeStyle = COLOR;
          ctx.globalAlpha = 1 - d / LINK;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(size, 150);
  });

  size();
  draw();

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(raf); }
    else { raf = requestAnimationFrame(draw); }
  });
})();
