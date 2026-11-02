/* ==========================================================================
   Nền tương tác "Bàn cờ sống"
   --------------------------------------------------------------------------
   Không dùng thư viện ngoài. Toàn bộ token được vẽ bằng canvas từ các ma trận
   pixel nhỏ, rất nhẹ và hợp với phong cách pixel art của website.

   Tương tác:
   - Di chuột / kéo tay: token và hạt sáng bị đẩy nhẹ.
   - Chạm vùng trống: gợn sóng vàng, token gần đó nảy nhẹ.
   - Cuộn trang: parallax 2 lớp.
   - Nút "Nền động": bật/tắt, lưu lựa chọn trên thiết bị.
   - Tự dừng khi vào phòng thi hoặc chuyển tab.
   ========================================================================== */
(function (g, d) {
  'use strict';

  var HTML = d.documentElement;
  var BODY = d.body || HTML;
  var scene = d.getElementById('bg-scene');
  var canvas = d.getElementById('bg-canvas');
  if (!scene || !canvas) return;

  var ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return;

  var STORE_KEY = 'ontap:bg';
  var reduceQuery = g.matchMedia ? g.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var mobileQuery = g.matchMedia ? g.matchMedia('(max-width: 720px)') : null;
  var mobile = !!(mobileQuery && mobileQuery.matches);
  var connection = g.navigator && (g.navigator.connection || g.navigator.mozConnection || g.navigator.webkitConnection);
  var lowPower = !!(connection && connection.saveData) ||
    (typeof g.navigator.deviceMemory === 'number' && g.navigator.deviceMemory <= 4);

  var width = 0;
  var height = 0;
  var dpr = 1;
  var running = false;
  var enabled = true;
  var pausedByExam = false;
  var raf = 0;
  var lastDraw = 0;
  var scrollY = 0;
  var ripples = [];
  var tokens = [];
  var dots = [];
  var resizeTimer = 0;
  var frameInterval = (mobile || lowPower) ? 34 : 16;

  var pointer = { x: -9999, y: -9999, active: false, type: 'mouse' };

  var THEMES = {
    board: { dot: '#1f8a3b', line: '#1f8a3b', glow: '#f5b800' },
    anh: { dot: '#1b4aa5', line: '#1b4aa5', glow: '#f5b800' },
    'tu-vung': { dot: '#d9232a', line: '#d9232a', glow: '#f5b800' },
    hoa: { dot: '#1f8a3b', line: '#1f8a3b', glow: '#f5b800' },
    sinh: { dot: '#b88600', line: '#1f8a3b', glow: '#f5b800' }
  };

  /* ------------------------------------------------------------------ */
  /* Pixel sprites                                                       */
  /* ------------------------------------------------------------------ */
  function makeSprite(rows, colors, base) {
    var w = 0;
    for (var i = 0; i < rows.length; i++) if (rows[i].length > w) w = rows[i].length;
    return { rows: rows, colors: colors, w: w, h: rows.length, base: base || 2.8 };
  }

  var SPRITES = {
    dice: makeSprite([
      'KKKKKKKK',
      'KWWWWWWK',
      'KWWKWWWK',
      'KWWWWWWK',
      'KWWWKWWK',
      'KWWWWWWK',
      'KWWKWWWK',
      'KKKKKKKK'
    ], { K: '#111613', W: '#ffffff' }, 2.9),

    house: makeSprite([
      '...KK...',
      '..KRRK..',
      '.KRRRRK.',
      'KRRRRRRK',
      'KWWWWWWK',
      'KWWDDWWK',
      'KWWDDWWK',
      'KKKKKKKK'
    ], { K: '#111613', R: '#1f8a3b', W: '#e6f3e8', D: '#d9232a' }, 2.9),

    hotel: makeSprite([
      'KKKKKKKKKK',
      'KRRRRRRRRK',
      'KRWRWRWRRK',
      'KRRRRRRRRK',
      'KRWRWRWRRK',
      'KRRRRRRRRK',
      'KRRDDDDRRK',
      'KRRDDDDRRK',
      'KKKKKKKKKK'
    ], { K: '#111613', R: '#d9232a', W: '#f5b800', D: '#111613' }, 2.5),

    coin: makeSprite([
      '..KKKK..',
      '.KGGGGK.',
      'KGGWWGGK',
      'KGWGGWGK',
      'KGWGGWGK',
      'KGGWWGGK',
      '.KGGGGK.',
      '..KKKK..'
    ], { K: '#111613', G: '#f5b800', W: '#fff8db' }, 3.2),

    star: makeSprite([
      '...K...',
      '..KGK..',
      '.KGGGK.',
      'KGGGGGK',
      '.KGGGK.',
      '..KGK..',
      '...K...'
    ], { K: '#111613', G: '#f5b800' }, 3.3),

    card: makeSprite([
      'KKKKKKKK',
      'KWWWWWWK',
      'KWWGGWWK',
      'KWGGGGWK',
      'KGGGGGGK',
      'KWGGGGWK',
      'KWWGGWWK',
      'KWWWWWWK',
      'KWWWWWWK',
      'KKKKKKKK'
    ], { K: '#111613', W: '#ffffff', G: '#f5b800' }, 2.6)
  };

  var TOKEN_TYPES = ['dice', 'house', 'hotel', 'coin', 'star', 'card'];
  var SLOTS = [
    [0.08, 0.18], [0.22, 0.72], [0.36, 0.30], [0.50, 0.82],
    [0.64, 0.20], [0.78, 0.64], [0.90, 0.34], [0.15, 0.45],
    [0.31, 0.90], [0.46, 0.12], [0.58, 0.55], [0.72, 0.88],
    [0.86, 0.12], [0.04, 0.86], [0.94, 0.72]
  ];

  function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

  function rgba(hex, alpha) {
    var h = String(hex || '#111613').replace('#', '');
    if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
    var n = parseInt(h, 16);
    if (isNaN(n)) n = 0;
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }

  function themePalette() {
    var name = BODY.getAttribute('data-bg-theme') || 'board';
    return THEMES[name] || THEMES.board;
  }

  function wrap(v, min, max) {
    var span = max - min;
    if (span <= 0) return min;
    return ((v - min) % span + span) % span + min;
  }

  /* ------------------------------------------------------------------ */
  /* Khởi tạo cảnh                                                       */
  /* ------------------------------------------------------------------ */
  function buildScene() {
    var tokenCount = mobile ? (width < 480 ? 8 : 9) : (lowPower ? 11 : 15);
    var dotCount = mobile ? 24 : (lowPower ? 20 : 46);

    tokens = [];
    for (var i = 0; i < tokenCount; i++) {
      var slot = SLOTS[Math.floor(i * SLOTS.length / tokenCount)] || SLOTS[0];
      var type = TOKEN_TYPES[i % TOKEN_TYPES.length];
      tokens.push({
        nx: clamp(slot[0] + (Math.random() - 0.5) * 0.07, 0.04, 0.96),
        ny: clamp(slot[1] + (Math.random() - 0.5) * 0.07, 0.04, 0.96),
        sprite: SPRITES[type],
        scale: SPRITES[type].base * (mobile ? 0.94 : 1.28),
        phase: Math.random() * Math.PI * 2,
        rot: (Math.random() - 0.5) * 0.20,
        spin: 0,
        vx: 0,
        vy: 0,
        alpha: 0.48 + Math.random() * 0.20
      });
    }

    dots = [];
    for (var j = 0; j < dotCount; j++) {
      dots.push({
        nx: 0.02 + Math.random() * 0.96,
        ny: 0.03 + Math.random() * 0.94,
        r: 0.8 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.55 + Math.random() * 0.8
      });
    }
  }

  function resize() {
    width = Math.max(1, g.innerWidth || HTML.clientWidth || 1);
    height = Math.max(1, g.innerHeight || HTML.clientHeight || 1);
    dpr = Math.min(g.devicePixelRatio || 1, mobile ? 1.5 : 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }

  /* ------------------------------------------------------------------ */
  /* Vẽ                                                                  */
  /* ------------------------------------------------------------------ */
  function drawSprite(sprite, x, y, scale, alpha, rot) {
    var w = sprite.w * scale;
    var h = sprite.h * scale;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    if (rot) ctx.rotate(rot);
    ctx.translate(-w / 2, -h / 2);
    for (var r = 0; r < sprite.h; r++) {
      var row = sprite.rows[r];
      for (var c = 0; c < sprite.w; c++) {
        var color = sprite.colors[row.charAt(c)];
        if (!color) continue;
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(c * scale), Math.round(r * scale), Math.ceil(scale), Math.ceil(scale));
      }
    }
    ctx.restore();
  }

  function draw(time, dt) {
    var pal = themePalette();
    var t = time || 0;
    var yScroll = scrollY || 0;

    ctx.clearRect(0, 0, width, height);

    /* Quầng sáng theo con trỏ */
    if (pointer.active && pointer.x > -500) {
      var glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 130);
      glow.addColorStop(0, rgba(pal.glow, 0.15));
      glow.addColorStop(0.5, rgba(pal.glow, 0.055));
      glow.addColorStop(1, rgba(pal.glow, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(pointer.x - 130, pointer.y - 130, 260, 260);
    }

    /* Hạt sáng + đường nối */
    var i, j, dot, px, py, dx, dy, dist;
    var dotOffset = (yScroll * 0.025) % (height + 80);
    for (i = 0; i < dots.length; i++) {
      dot = dots[i];
      px = dot.nx * width + Math.sin(t * 0.00026 * dot.speed + dot.phase) * 14;
      py = wrap(dot.ny * height - dotOffset + Math.cos(t * 0.00031 * dot.speed + dot.phase) * 10, -40, height + 40);

      if (pointer.active) {
        dx = px - pointer.x;
        dy = py - pointer.y;
        dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 105) {
          var df = (1 - dist / 105) * 12;
          px += (dx / dist) * df;
          py += (dy / dist) * df;
        }
      }
      dot.px = px;
      dot.py = py;

      var twinkle = 0.16 + 0.16 * (0.5 + 0.5 * Math.sin(t * 0.0016 + dot.phase));
      ctx.beginPath();
      ctx.arc(px, py, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(pal.dot, twinkle);
      ctx.fill();
    }

    if (!lowPower || !mobile) {
      for (i = 0; i < dots.length; i++) {
        for (j = i + 1; j < dots.length; j++) {
          dx = dots[i].px - dots[j].px;
          dy = dots[i].py - dots[j].py;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 108) {
            ctx.beginPath();
            ctx.moveTo(dots[i].px, dots[i].py);
            ctx.lineTo(dots[j].px, dots[j].py);
            ctx.strokeStyle = rgba(pal.line, (1 - dist / 108) * 0.11);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }

    /* Token pixel */
    var tokenOffset = (yScroll * 0.055) % (height + 140);
    for (i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      px = token.nx * width + Math.sin(t * 0.00030 + token.phase) * 10 + token.vx;
      py = wrap(token.ny * height - tokenOffset + Math.sin(t * 0.00042 + token.phase) * 8 + token.vy, -70, height + 70);

      if (pointer.active) {
        dx = px - pointer.x;
        dy = py - pointer.y;
        dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 145) {
          var tf = (1 - dist / 145) * 0.62;
          token.vx += (dx / dist) * tf;
          token.vy += (dy / dist) * tf;
        }
      }
      token.vx *= 0.90;
      token.vy *= 0.90;
      token.spin *= 0.92;

      var rot = token.rot + token.spin + Math.sin(t * 0.00018 + token.phase) * 0.035;
      drawSprite(token.sprite, px, py, token.scale, token.alpha, rot);
    }

    /* Gợn sóng khi chạm */
    for (i = ripples.length - 1; i >= 0; i--) {
      var rip = ripples[i];
      rip.life += dt;
      if (rip.life < 0) continue;
      if (rip.life >= rip.ttl) { ripples.splice(i, 1); continue; }
      var progress = rip.life / rip.ttl;
      var radius = rip.start + (rip.maxR - rip.start) * progress;
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(rip.color, (1 - progress) * 0.5);
      ctx.lineWidth = Math.max(0.5, rip.width * (1 - progress * 0.6));
      ctx.stroke();
    }
  }

  function loop(ts) {
    if (!running) return;
    raf = g.requestAnimationFrame(loop);
    if (pausedByExam || d.hidden) return;

    if (!lastDraw) lastDraw = ts;
    var elapsed = ts - lastDraw;
    if (elapsed < frameInterval) return;
    var dt = Math.min(60, elapsed);
    lastDraw = ts - (elapsed % frameInterval);
    draw(ts, dt);
  }

  function start() {
    if (running || !enabled || pausedByExam || d.hidden) return;
    running = true;
    lastDraw = 0;
    // Vẽ ngay một khung hình để nền không bị trống trong lúc chờ animation frame.
    draw((g.performance && g.performance.now) ? g.performance.now() : Date.now(), 16);
    raf = g.requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (raf) g.cancelAnimationFrame(raf);
    raf = 0;
  }

  /* ------------------------------------------------------------------ */
  /* Tương tác                                                           */
  /* ------------------------------------------------------------------ */
  function isInteractive(target) {
    if (!target || target.nodeType !== 1 || !target.closest) return false;
    return !!target.closest(
      'a,button,input,select,textarea,label,summary,dialog,[role="button"],' +
      '[contenteditable="true"],.opt,.pal,.blank,.flag,.auth-google'
    );
  }

  function spawnRipple(x, y) {
    var pal = themePalette();
    if (ripples.length > 18) ripples.splice(0, ripples.length - 18);
    ripples.push({ x: x, y: y, life: 0, ttl: 860, start: 5, maxR: 86, width: 2.4, color: pal.glow });
    ripples.push({ x: x, y: y, life: -130, ttl: 1080, start: 4, maxR: 132, width: 1.5, color: pal.dot });
  }

  function onPointerMove(e) {
    if (!enabled || pausedByExam) return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
    pointer.type = e.pointerType || 'mouse';
  }

  function onPointerDown(e) {
    if (!enabled || pausedByExam) return;
    if (typeof e.button === 'number' && e.button !== 0) return;
    if (isInteractive(e.target)) return;

    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
    pointer.type = e.pointerType || 'mouse';
    spawnRipple(e.clientX, e.clientY);

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var dx = token.nx * width - e.clientX;
      var dy = token.ny * height - e.clientY;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < 190) {
        var force = (1 - dist / 190) * 7;
        token.vx += (dx / dist) * force;
        token.vy += (dy / dist) * force;
        token.spin += (Math.random() - 0.5) * 0.35;
      }
    }
  }

  function onPointerUp(e) {
    if ((e.pointerType || 'mouse') !== 'mouse') pointer.active = false;
  }

  function onPointerLeave() { pointer.active = false; }

  /* ------------------------------------------------------------------ */
  /* Bật/tắt                                                            */
  /* ------------------------------------------------------------------ */
  function updateToggle() {
    var btn = d.getElementById('bg-toggle');
    if (!btn) return;
    btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    btn.setAttribute('aria-label', enabled ? 'Tắt nền động' : 'Bật nền động');
    btn.setAttribute('title', enabled ? 'Tắt hiệu ứng nền' : 'Bật hiệu ứng nền');
    var label = btn.querySelector('.bg-toggle-label');
    if (label) label.textContent = enabled ? 'Nền động' : 'Bật nền';
  }

  function setEnabled(on, persist) {
    enabled = !!on;
    HTML.setAttribute('data-bg', enabled ? 'on' : 'off');
    if (persist) {
      try { g.localStorage.setItem(STORE_KEY, enabled ? 'on' : 'off'); } catch (e) { /* bỏ qua */ }
    }
    updateToggle();
    if (enabled) {
      resize();
      start();
    } else {
      stop();
      if (width && height) ctx.clearRect(0, 0, width, height);
    }
  }

  function buildToggle() {
    if (d.getElementById('bg-toggle')) return;
    var btn = d.createElement('button');
    btn.id = 'bg-toggle';
    btn.type = 'button';
    btn.className = 'bg-toggle';
    btn.innerHTML = '<span class="bg-toggle-dot" aria-hidden="true"></span><span class="bg-toggle-label"></span>';
    d.body.appendChild(btn);
    btn.addEventListener('click', function () { setEnabled(!enabled, true); });
  }

  /* ------------------------------------------------------------------ */
  /* Chế độ thi + vòng đời                                               */
  /* ------------------------------------------------------------------ */
  function syncExamMode() {
    var next = BODY.classList.contains('exam-active');
    if (next === pausedByExam) return;
    pausedByExam = next;
    if (pausedByExam) stop();
    else if (enabled && !d.hidden) start();
  }

  function onResize() {
    if (resizeTimer) g.clearTimeout(resizeTimer);
    resizeTimer = g.setTimeout(function () {
      resizeTimer = 0;
      resize();
      if (enabled && !pausedByExam && !d.hidden) start();
    }, 160);
  }

  function onVisibility() {
    if (d.hidden) stop();
    else if (enabled && !pausedByExam) start();
  }

  function init() {
    var saved = null;
    try { saved = g.localStorage.getItem(STORE_KEY); } catch (e) { /* bỏ qua */ }
    var reduce = !!(reduceQuery && reduceQuery.matches);
    enabled = saved === 'on' || (saved !== 'off' && !reduce);

    buildToggle();
    resize();
    buildScene();
    scrollY = g.scrollY || g.pageYOffset || 0;
    HTML.setAttribute('data-bg', enabled ? 'on' : 'off');
    updateToggle();

    g.addEventListener('pointermove', onPointerMove, { passive: true });
    g.addEventListener('pointerdown', onPointerDown, { passive: true });
    g.addEventListener('pointerup', onPointerUp, { passive: true });
    g.addEventListener('pointercancel', onPointerUp, { passive: true });
    g.addEventListener('blur', onPointerLeave);
    g.addEventListener('resize', onResize, { passive: true });
    g.addEventListener('scroll', function () { scrollY = g.scrollY || g.pageYOffset || 0; }, { passive: true });
    d.addEventListener('visibilitychange', onVisibility);

    if (g.MutationObserver) {
      new g.MutationObserver(syncExamMode).observe(BODY, { attributes: true, attributeFilter: ['class'] });
    }
    syncExamMode();

    if (reduceQuery) {
      var onReduceChange = function (e) {
        var stored = null;
        try { stored = g.localStorage.getItem(STORE_KEY); } catch (err) { /* bỏ qua */ }
        if (!stored) setEnabled(!e.matches, false);
      };
      if (reduceQuery.addEventListener) reduceQuery.addEventListener('change', onReduceChange);
      else if (reduceQuery.addListener) reduceQuery.addListener(onReduceChange);
    }

    if (enabled && !pausedByExam && !d.hidden) start();
  }

  init();

  // Công cụ kiểm tra nhanh khi phát triển: thêm ?bgdebug=1 vào URL.
  if (/[?&]bgdebug=1/.test(g.location.search)) {
    g.OntapBackground = {
      state: function () {
        return {
          enabled: enabled,
          running: running,
          pausedByExam: pausedByExam,
          tokens: tokens.length,
          dots: dots.length,
          ripples: ripples.length,
          width: width,
          height: height
        };
      },
      drawOnce: function () {
        if (!width || !height) resize();
        draw((g.performance && g.performance.now) ? g.performance.now() : Date.now(), 16);
      },
      setEnabled: setEnabled
    };
  }
})(window, document);
