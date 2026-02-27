/* ═══════════════════════════════════════════════════════════════
   Chronos — Scroll-Driven Disassembling Watch
   app.js
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   1. Starfield canvas
───────────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3200);
    for (let i = 0; i < count; i++) {
      stars.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.3 + 0.15,
        alpha: Math.random()
      });
    }
  }

  function drawStars(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Deep-space gradient backdrop
    const bg = ctx.createRadialGradient(
      canvas.width * .5, canvas.height * .45, 0,
      canvas.width * .5, canvas.height * .45, Math.max(canvas.width, canvas.height) * .75
    );
    bg.addColorStop(0,   `rgba(16,14,28,${0.4 + progress * .5})`);
    bg.addColorStop(1,   `rgba(7,7,13,1)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars — brighten as scroll advances
    stars.forEach(s => {
      const a = s.alpha * (0.18 + progress * 0.82);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,210,235,${a})`;
      ctx.fill();
    });
  }

  window._drawStars = drawStars;
  window.addEventListener('resize', resize);
  resize();
  drawStars(0);
})();


/* ─────────────────────────────────────────────────────────────
   2. Build SVG dial markers & bezel flutes procedurally
───────────────────────────────────────────────────────────── */
(function () {
  const cx = 119, cy = 119;
  const outerR = 97, innerR = 88, minInnerR = 92;

  /* Sunburst */
  const sunburst = document.getElementById('sunburst');
  const RAYS = 72;
  for (let i = 0; i < RAYS; i++) {
    const angle = (i / RAYS) * Math.PI * 2;
    const x1 = cx + 6  * Math.cos(angle);
    const y1 = cy + 6  * Math.sin(angle);
    const x2 = cx + 96 * Math.cos(angle);
    const y2 = cy + 96 * Math.sin(angle);
    const line = svgEl('line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    sunburst.appendChild(line);
  }

  /* Hour markers */
  const hg = document.getElementById('hour-markers');
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const isCard = (i % 3 === 0);
    const x1 = cx + outerR  * Math.cos(angle);
    const y1 = cy + outerR  * Math.sin(angle);
    const x2 = cx + (outerR - (isCard ? 12 : 8)) * Math.cos(angle);
    const y2 = cy + (outerR - (isCard ? 12 : 8)) * Math.sin(angle);
    const line = svgEl('line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#c9a84c');
    line.setAttribute('stroke-width', isCard ? '3' : '2');
    line.setAttribute('stroke-linecap', 'round');
    hg.appendChild(line);
  }

  /* Minute markers */
  const mg = document.getElementById('min-markers');
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue;
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + outerR * Math.cos(angle);
    const y1 = cy + outerR * Math.sin(angle);
    const x2 = cx + (outerR - 5) * Math.cos(angle);
    const y2 = cy + (outerR - 5) * Math.sin(angle);
    const line = svgEl('line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#505062');
    line.setAttribute('stroke-width', '1');
    mg.appendChild(line);
  }

  /* Sub-seconds ticks */
  const sst = document.getElementById('sub-second-ticks');
  const sCx = 119, sCy = 150, sR = 20;
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const x1 = sCx + sR * Math.cos(angle);
    const y1 = sCy + sR * Math.sin(angle);
    const x2 = sCx + (sR - (i % 5 === 0 ? 5 : 3)) * Math.cos(angle);
    const y2 = sCy + (sR - (i % 5 === 0 ? 5 : 3)) * Math.sin(angle);
    const line = svgEl('line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#444458');
    line.setAttribute('stroke-width', i % 5 === 0 ? '1.2' : '.7');
    sst.appendChild(line);
  }

  /* Bezel fluting */
  const bg = document.getElementById('bezel-flutes');
  const bCx = 139, bCy = 139, bRo = 132, bRi = 122;
  const FLUTES = 140;
  for (let i = 0; i < FLUTES; i++) {
    const angle = (i / FLUTES) * Math.PI * 2;
    const x1 = bCx + bRi * Math.cos(angle);
    const y1 = bCy + bRi * Math.sin(angle);
    const x2 = bCx + bRo * Math.cos(angle);
    const y2 = bCy + bRo * Math.sin(angle);
    const line = svgEl('line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    bg.appendChild(line);
  }

  function svgEl(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  }
})();


/* ─────────────────────────────────────────────────────────────
   3. Live clock hands
───────────────────────────────────────────────────────────── */
(function () {
  const hourG   = document.getElementById('hour-hand-g');
  const minuteG = document.getElementById('minute-hand-g');
  const secondG = document.getElementById('second-hand-g');
  const cx = 119, cy = 119;

  function tick() {
    const now = new Date();
    const ms  = now.getMilliseconds();
    const s   = now.getSeconds()   + ms / 1000;
    const m   = now.getMinutes()   + s / 60;
    const h   = (now.getHours() % 12) + m / 60;

    const sDeg = s * 6;
    const mDeg = m * 6;
    const hDeg = h * 30;

    if (hourG)   hourG  .setAttribute('transform', `rotate(${hDeg} ${cx} ${cy})`);
    if (minuteG) minuteG.setAttribute('transform', `rotate(${mDeg} ${cx} ${cy})`);
    if (secondG) secondG.setAttribute('transform', `rotate(${sDeg} ${cx} ${cy})`);

    requestAnimationFrame(tick);
  }
  tick();
})();


/* ─────────────────────────────────────────────────────────────
   4. Scroll-driven disassembly engine
───────────────────────────────────────────────────────────── */
(function () {
  /*
   * Parts are listed in disassembly order (outermost first).
   * Each part specifies:
   *   id        — DOM element id
   *   name      — display name
   *   desc      — description (shown in label)
   *   tx / ty   — final exploded translation (px)
   *   rot       — final exploded rotation (deg)
   *   scale     — final exploded scale (1 = no change)
   *   start/end — scroll progress range [0, 1] for animation
   */
  const parts = [
    {
      id: 'layer-strap-top',
      name: 'Top Strap',
      desc: 'Full-grain alligator leather\nHand-stitched, 20mm width',
      tx: 0, ty: -310, rot: -18, scale: 0.92,
      start: 0.04, end: 0.16
    },
    {
      id: 'layer-strap-bottom',
      name: 'Bottom Strap',
      desc: 'Deployant clasp in steel\nQuick-release spring bars',
      tx: 0, ty: 310, rot: 18, scale: 0.92,
      start: 0.04, end: 0.16
    },
    {
      id: 'layer-crown',
      name: 'Screw-Down Crown',
      desc: 'Triple-sealed, 300m rated\nOnyx cabochon insert',
      tx: 280, ty: 0, rot: 25, scale: 1.05,
      start: 0.13, end: 0.24
    },
    {
      id: 'layer-bezel',
      name: 'Bezel',
      desc: '18k white gold, 140-flute\nknurling, sapphire-set pip',
      tx: 0, ty: -250, rot: -10, scale: 1.08,
      start: 0.21, end: 0.33
    },
    {
      id: 'layer-crystal',
      name: 'Sapphire Crystal',
      desc: 'Anti-reflective both sides\n3.2 mm flat sapphire',
      tx: 270, ty: -160, rot: 14, scale: 1.0,
      start: 0.30, end: 0.42
    },
    {
      id: 'layer-second',
      name: 'Seconds Hand',
      desc: 'Red-tipped sweep\nPowered by lever escapement',
      tx: 240, ty: 180, rot: 200, scale: 1.15,
      start: 0.39, end: 0.50
    },
    {
      id: 'layer-minute',
      name: 'Minute Hand',
      desc: 'Poire-blued steel\nLeaf-shaped, Super-LumiNova',
      tx: -260, ty: 140, rot: -35, scale: 1.15,
      start: 0.46, end: 0.57
    },
    {
      id: 'layer-hour',
      name: 'Hour Hand',
      desc: 'Polished & bevelled steel\nFilled with Swiss lume',
      tx: -240, ty: -150, rot: 28, scale: 1.15,
      start: 0.53, end: 0.63
    },
    {
      id: 'layer-dial',
      name: 'Dial',
      desc: 'Lacquered sunburst finish\nApplied gold-tone indices',
      tx: 0, ty: 250, rot: 12, scale: 1.08,
      start: 0.59, end: 0.70
    },
    {
      id: 'layer-rotor',
      name: 'Oscillating Rotor',
      desc: '21,600 vph bidirectional\nTungsten sector, 45% weight',
      tx: -260, ty: 180, rot: -120, scale: 1.1,
      start: 0.65, end: 0.76
    },
    {
      id: 'layer-barrel',
      name: 'Mainspring Barrel',
      desc: '72-hour power reserve\nStress-relieved Nivaflex',
      tx: 270, ty: 80, rot: 30, scale: 1.1,
      start: 0.71, end: 0.82
    },
    {
      id: 'layer-movement',
      name: 'Calibre 9001',
      desc: '36,000 vph, 29 jewels\nCôtes de Genève finishing',
      tx: 0, ty: -280, rot: -15, scale: 1.2,
      start: 0.78, end: 0.90
    },
    {
      id: 'layer-caseback',
      name: 'Case & Lugs',
      desc: '316L stainless steel\nSatin + mirror polish',
      tx: 0, ty: 290, rot: 10, scale: 0.95,
      start: 0.85, end: 0.97
    }
  ];

  const progressBar = document.getElementById('progress-bar');
  const heroText    = document.getElementById('hero-text');
  const scrollHint  = document.getElementById('scroll-hint');
  const partLabel   = document.getElementById('part-label');
  const labelName   = partLabel.querySelector('.label-name');
  const labelDesc   = partLabel.querySelector('.label-desc');
  const partCounter = document.getElementById('part-counter');
  const totalParts  = parts.length;

  /* Ease in-out cubic */
  function ease(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* Interpolate two values */
  function lerp(a, b, t) { return a + (b - a) * t; }

  let lastRaw = -1;
  let rafId   = null;

  function update() {
    rafId = null;
    const scrollY   = window.scrollY;
    const maxScroll = document.getElementById('scroll-track').scrollHeight - window.innerHeight;
    const raw       = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    if (Math.abs(raw - lastRaw) < 0.0001) return;
    lastRaw = raw;

    /* Progress bar */
    progressBar.style.width = (raw * 100).toFixed(2) + '%';

    /* Starfield */
    window._drawStars(raw);

    /* Hero / scroll-hint fade out early */
    const heroAlpha = Math.max(0, 1 - raw * 10);
    heroText.style.opacity   = heroAlpha;
    scrollHint.style.opacity = heroAlpha;

    /* Part counter */
    let explodedCount = 0;
    parts.forEach(p => {
      const t = Math.min(Math.max((raw - p.start) / (p.end - p.start), 0), 1);
      if (t > 0.05) explodedCount++;
    });

    if (explodedCount > 0 && raw > 0.03) {
      partCounter.textContent = `${explodedCount} / ${totalParts} parts`;
      partCounter.style.opacity = '1';
    } else {
      partCounter.style.opacity = '0';
    }

    /* Per-layer transform */
    let activePart  = null;
    let activeProg  = 0;
    let mostRecent  = -1;

    parts.forEach(p => {
      const el = document.getElementById(p.id);
      if (!el) return;

      const rangeLen = p.end - p.start;
      const rawT     = (raw - p.start) / rangeLen;
      const t        = Math.min(Math.max(rawT, 0), 1);
      const e        = ease(t);

      const tx  = lerp(0, p.tx,  e);
      const ty  = lerp(0, p.ty,  e);
      const rot = lerp(0, p.rot, e);

      /* Subtle perspective scale — parts appear to come towards viewer
         as they disassemble, then settle at final scale */
      const sc = 1 + (p.scale - 1) * e * (1 - e * 0.4);

      /* Opacity: full → slightly transparent when exploded */
      const op = t === 0 ? 1 : Math.max(0.12, lerp(1, 0.22, e));

      el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${sc})`;
      el.style.opacity   = op;

      /* Determine the part currently being animated */
      if (t > 0 && t < 1) {
        activePart = p;
        activeProg = t;
      } else if (t > 0 && raw > p.start && mostRecent < p.start) {
        /* Most-recently finished = last label shown */
        mostRecent = p.start;
        if (activePart === null) {
          activePart = p;
          activeProg = t;
        }
      }
    });

    /* Part label */
    if (activePart && raw > 0.035) {
      labelName.textContent = activePart.name;
      labelDesc.textContent = activePart.desc;

      /* Fade in at start of range, fade out near end */
      const labelAlpha = Math.min(activeProg * 5, 1) * Math.min((1 - activeProg) * 5 + 0.3, 1);
      partLabel.style.opacity = Math.min(labelAlpha, 1).toFixed(3);
    } else {
      partLabel.style.opacity = '0';
    }
  }

  window.addEventListener('scroll', () => {
    if (!rafId) rafId = requestAnimationFrame(update);
  }, { passive: true });

  /* Initial draw */
  update();
})();
