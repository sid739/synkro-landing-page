// Homepage hero: a vinyl record on a turntable, drawn on a canvas.
// Grooves run from 1956 at the label to this week at the edge, and the needle rests on an example
// track from 1974. Scrolling the sticky stage fades the copy out, the example results in, and streams
// light from the grooves to each result's ownership ring.
// Phones and reduced motion get a still record placed between the copy and the results.

const Y0 = 1956, Y1 = 2026, EX_YEAR = 1974;
const LABEL = 0.34;                                     // label radius as a share of the disc
const radiusOf = (year: number) => LABEL + 0.05 + ((year - Y0) / (Y1 - Y0)) * (1 - LABEL - 0.08);
const STYLUS_ANGLE = 0.42;                              // where the needle sits, in screen space
const TILT = 0.58;
const WIDE_MIN = 900;                                   // narrower than this, the hero stacks
const GLOW = "#8b7dff";

type Geom = { R: number; cx: number; cy: number };
type Pt = { x: number; y: number };

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Every element the hero needs, or null when the page has no hero.
const hero = () => {
  const q = <T extends Element>(sel: string) => document.querySelector<T>(sel);
  const stage = q<HTMLElement>("[data-stage]"), viewport = q<HTMLElement>("[data-viewport]");
  const canvas = q<HTMLCanvasElement>("[data-disc]"), slot = q<HTMLElement>("[data-slot]");
  const copy = q<HTMLElement>("[data-copy]"), results = q<HTMLElement>("[data-results]"), legend = q<HTMLElement>("[data-legend]");
  const ctx = canvas?.getContext("2d");
  if (!stage || !viewport || !canvas || !slot || !copy || !results || !legend || !ctx) return null;
  return { stage, viewport, canvas, slot, copy, results, legend, ctx };
};

export function initRecord(): void {
  const root = document.documentElement;
  const els = hero();
  if (!els) return;
  const { stage, viewport, canvas, slot, copy, results, legend, ctx } = els;
  const rows = [...document.querySelectorAll<HTMLElement>("[data-row]")];
  const rings = rows.map((r) => r.querySelector<SVGElement>(".ring"));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  // The rotating part: vinyl, grooves, the example groove and the printed label.
  const OS = 1400, C = OS / 2, RR = OS / 2 - 3;
  const disc = document.createElement("canvas");
  disc.width = disc.height = OS;
  const buildDisc = () => {
    const d = disc.getContext("2d");
    if (!d) return;
    seed = 7;
    d.clearRect(0, 0, OS, OS);
    const base = d.createRadialGradient(C, C, RR * 0.3, C, C, RR);
    base.addColorStop(0, "#141416"); base.addColorStop(0.7, "#0c0c0e"); base.addColorStop(1, "#060607");
    d.fillStyle = base; d.beginPath(); d.arc(C, C, RR, 0, Math.PI * 2); d.fill();

    const decadeR: number[] = [];
    for (let y = 1960; y <= 2020; y += 10) decadeR.push(radiusOf(y) * RR);
    const inGap = (r: number) => decadeR.some((g) => Math.abs(r - g) < 4.5);
    const r0 = (LABEL + 0.03) * RR, r1 = RR * 0.975;
    // Fine grooves: hundreds of thin rings with slightly varying sheen.
    for (let r = r0; r < r1; r += 1.25) {
      if (inGap(r)) continue;
      d.strokeStyle = rand() > 0.5 ? `rgba(255,255,255,${0.025 + rand() * 0.05})` : `rgba(0,0,0,${0.3 + rand() * 0.3})`;
      d.lineWidth = 0.7;
      d.beginPath(); d.arc(C, C, r, 0, Math.PI * 2); d.stroke();
    }
    // Smooth bands between decades, like the gaps between tracks.
    for (const g of decadeR) {
      d.strokeStyle = "#0a0a0b"; d.lineWidth = 8; d.beginPath(); d.arc(C, C, g, 0, Math.PI * 2); d.stroke();
      d.strokeStyle = "rgba(255,255,255,.06)"; d.lineWidth = 1; d.beginPath(); d.arc(C, C, g - 4, 0, Math.PI * 2); d.stroke();
    }
    // The example track's groove glows.
    const er = radiusOf(EX_YEAR) * RR;
    d.save();
    d.shadowColor = "rgba(139,125,255,.9)"; d.shadowBlur = 14;
    for (let k = -4; k <= 4; k++) {
      d.strokeStyle = `rgba(139,125,255,${0.55 - Math.abs(k) * 0.1})`; d.lineWidth = 1;
      d.beginPath(); d.arc(C, C, er + k * 1.25, 0, Math.PI * 2); d.stroke();
    }
    d.restore();
    // Lead-in edge and rim.
    d.strokeStyle = "#0b0b0c"; d.lineWidth = RR * 0.02; d.beginPath(); d.arc(C, C, RR * 0.988, 0, Math.PI * 2); d.stroke();
    d.strokeStyle = "rgba(255,255,255,.22)"; d.lineWidth = 2; d.beginPath(); d.arc(C, C, RR - 1, 0, Math.PI * 2); d.stroke();
    // Dust, very faint.
    d.fillStyle = "rgba(255,255,255,.05)";
    for (let k = 0; k < 2500; k++) { const a = rand() * Math.PI * 2, r = r0 + rand() * (r1 - r0); d.fillRect(C + Math.cos(a) * r, C + Math.sin(a) * r, 1, 1); }

    // Printed centre label.
    const L = LABEL * RR;
    const paper = d.createRadialGradient(C - L * 0.2, C - L * 0.25, L * 0.1, C, C, L);
    paper.addColorStop(0, "#7062f2"); paper.addColorStop(1, "#4232c2");
    d.fillStyle = paper; d.beginPath(); d.arc(C, C, L, 0, Math.PI * 2); d.fill();
    d.strokeStyle = "rgba(0,0,0,.35)"; d.lineWidth = 3; d.beginPath(); d.arc(C, C, L, 0, Math.PI * 2); d.stroke();
    d.strokeStyle = "rgba(255,255,255,.28)"; d.lineWidth = 1.5; d.beginPath(); d.arc(C, C, L * 0.9, 0, Math.PI * 2); d.stroke();
    d.fillStyle = "#fff"; d.textAlign = "center"; d.textBaseline = "middle";
    d.font = `900 ${L * 0.36}px "Archivo Variable", "Arial Black", sans-serif`; d.fillText("Synkro", C, C - L * 0.42);
    d.font = `700 ${L * 0.085}px "Manrope Variable", sans-serif`; d.globalAlpha = 0.85;
    d.fillText("SYNC ANYTHING", C, C - L * 0.16);
    d.fillText("SIDE A  ·  1956 — THIS WEEK", C, C + L * 0.3);
    d.font = `600 ${L * 0.075}px "Manrope Variable", sans-serif`; d.globalAlpha = 0.65;
    d.fillText("33⅓ RPM", C, C + L * 0.48);
    d.fillText("MASTER  ·  PUBLISHING  ·  SPLITS", C, C + L * 0.64);
    d.globalAlpha = 1;
    // Spindle hole.
    const hole = d.createRadialGradient(C, C, 0, C, C, L * 0.07);
    hole.addColorStop(0, "#d9d9e0"); hole.addColorStop(0.55, "#8a8a95"); hole.addColorStop(1, "#2a2a30");
    d.fillStyle = hole; d.beginPath(); d.arc(C, C, L * 0.065, 0, Math.PI * 2); d.fill();
  };

  // The fixed part: light reflecting off the grooves. Rebuilt only when the light angle moves.
  const SH = 800, sheen = document.createElement("canvas");
  sheen.width = sheen.height = SH;
  let sheenAngle: number | null = null;
  const buildSheen = (a: number) => {
    sheenAngle = a;
    const d = sheen.getContext("2d"), c = SH / 2;
    if (!d) return;
    d.clearRect(0, 0, SH, SH);
    if (!d.createConicGradient) return;
    d.save();
    d.beginPath(); d.arc(c, c, c - 2, 0, Math.PI * 2); d.arc(c, c, c * LABEL, 0, Math.PI * 2, true); d.clip("evenodd");
    const g = d.createConicGradient(a, c, c);
    const peak = (p: number, w: number, v: number) => { g.addColorStop(Math.max(0, p - w), "rgba(255,255,255,0)"); g.addColorStop(p, `rgba(255,255,255,${v})`); g.addColorStop(Math.min(1, p + w), "rgba(255,255,255,0)"); };
    g.addColorStop(0, "rgba(255,255,255,0)");
    peak(0.06, 0.05, 0.2); peak(0.56, 0.05, 0.14);
    g.addColorStop(1, "rgba(255,255,255,0)");
    d.fillStyle = g; d.fillRect(0, 0, SH, SH);
    // Fade the sheen toward the label and the rim.
    d.globalCompositeOperation = "destination-in";
    const m = d.createRadialGradient(c, c, c * LABEL, c, c, c);
    m.addColorStop(0, "rgba(0,0,0,.25)"); m.addColorStop(0.55, "rgba(0,0,0,1)"); m.addColorStop(1, "rgba(0,0,0,.5)");
    d.fillStyle = m; d.fillRect(0, 0, SH, SH);
    d.restore();
  };

  // ---- Frame state ----
  let W = 0, H = 0, dpr = 1, angle = 0, last = performance.now();
  let tilt = TILT, tiltTarget = TILT, skew = 0, skewTarget = 0;
  let isStatic = false, visible = true, raf = 0;
  let g: Geom = { R: 0, cx: 0, cy: 0 };
  let theme = { fg: "", muted: "", dark: false };

  // Light particles that lift off the record into the search results.
  const STREAM = 420, sYear = new Float32Array(STREAM), sAng = new Float32Array(STREAM), sRow = new Uint8Array(STREAM), sDelay = new Float32Array(STREAM), sBend = new Float32Array(STREAM);
  for (let k = 0; k < STREAM; k++) {
    sYear[k] = k % 3 === 0 ? EX_YEAR + (rand() - 0.5) * 0.8 : Y0 + rand() * (Y1 - Y0);
    sAng[k] = rand() * Math.PI * 2; sRow[k] = k % Math.max(1, rows.length); sDelay[k] = rand() * 0.35; sBend[k] = (rand() - 0.5) * 80;
  }

  // Place the record in the space the copy and the legend leave free, so nothing overlaps at any width.
  // The tonearm reaches about 0.25R right of the disc, so the disc's right edge keeps that clear.
  const layout = (): Geom => {
    if (isStatic) {
      const R = Math.min(W * 0.36, H * 0.72);
      return { R, cx: W / 2 - R * 0.08, cy: H * 0.5 };
    }
    const cr = canvas.getBoundingClientRect();
    let copyRight = 0;
    for (const el of copy.children) copyRight = Math.max(copyRight, el.getBoundingClientRect().right - cr.left);
    const legendTop = legend.getBoundingClientRect().top - cr.top;
    const free = W - 48 - copyRight;                    // 24px either side of the record and arm
    const R = Math.max(80, Math.min(free / 2.3, H * 0.44));
    const cx = W - 24 - R * 1.3;
    // The example label sits 30px below the disc and must clear the legend.
    const cy = Math.max(R * TILT + 24, Math.min(H * 0.47, legendTop - 24 - R * TILT - 30));
    return { R, cx, cy };
  };

  const onDisc = (r: number, a: number): Pt => {        // r as a share of the radius, a in screen space
    const x = Math.cos(a) * r * g.R, y = Math.sin(a) * r * g.R * tilt;
    return { x: g.cx + x + y * skew, y: g.cy + y };
  };

  const readTheme = () => {
    const cs = getComputedStyle(root);
    theme = { fg: cs.getPropertyValue("--fg").trim(), muted: cs.getPropertyValue("--muted").trim(), dark: cs.colorScheme.includes("dark") };
  };

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    g = layout();
    draw(0);
  };

  // Share of the sticky stage scrolled, measured below the fixed header.
  const progress = () => {
    if (isStatic) return 0;
    const r = stage.getBoundingClientRect(), nav = innerHeight - viewport.offsetHeight;
    return Math.min(1, Math.max(0, (nav - r.top) / (r.height - viewport.offsetHeight)));
  };

  const drawArm = (stylus: Pt) => {
    const pivot = { x: g.cx + g.R * 1.06, y: g.cy - g.R * tilt * 0.95 };
    const dx = stylus.x - pivot.x, dy = stylus.y - pivot.y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const nx = -uy, ny = ux;
    const t = Math.max(5, g.R * 0.024);
    // Shadow on the record.
    ctx.save();
    ctx.lineCap = "round";
    for (const [w, a] of [[t * 3, 0.12], [t * 1.6, 0.2]]) {
      ctx.strokeStyle = `rgba(0,0,0,${a})`; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(pivot.x + 12, pivot.y + 22); ctx.quadraticCurveTo(pivot.x + dx * 0.55 + nx * 26 + 12, pivot.y + dy * 0.55 + ny * 26 + 22, stylus.x + 10, stylus.y + 18); ctx.stroke();
    }
    ctx.restore();
    // Counterweight behind the pivot.
    const cwx = pivot.x - ux * g.R * 0.16, cwy = pivot.y - uy * g.R * 0.16;
    ctx.save(); ctx.translate(cwx, cwy); ctx.rotate(Math.atan2(uy, ux));
    const cw = ctx.createLinearGradient(0, -t * 1.6, 0, t * 1.6);
    cw.addColorStop(0, "#5a5a63"); cw.addColorStop(0.45, "#e9e9ef"); cw.addColorStop(1, "#4a4a52");
    ctx.fillStyle = cw; ctx.beginPath(); ctx.roundRect(-t * 2.4, -t * 1.6, t * 4.4, t * 3.2, t * 0.6); ctx.fill();
    ctx.restore();
    // The arm: a gently curved tube.
    const mid = { x: pivot.x + dx * 0.55 + nx * 26, y: pivot.y + dy * 0.55 + ny * 26 };
    const tube = ctx.createLinearGradient(pivot.x + nx * t, pivot.y + ny * t, pivot.x - nx * t, pivot.y - ny * t);
    tube.addColorStop(0, "#6b6b75"); tube.addColorStop(0.4, "#f4f4f8"); tube.addColorStop(1, "#5b5b64");
    ctx.strokeStyle = tube; ctx.lineWidth = t; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(pivot.x, pivot.y); ctx.quadraticCurveTo(mid.x, mid.y, stylus.x - ux * t * 3, stylus.y - uy * t * 3); ctx.stroke();
    // Headshell and cartridge.
    ctx.save(); ctx.translate(stylus.x, stylus.y); ctx.rotate(Math.atan2(uy, ux) + 0.35);
    ctx.fillStyle = "#1b1b20"; ctx.beginPath(); ctx.roundRect(-t * 3.6, -t * 1.3, t * 4.2, t * 2.6, t * 0.5); ctx.fill();
    ctx.fillStyle = "#c9c9d2"; ctx.fillRect(-t * 3.6, -t * 1.3, t * 4.2, t * 0.5);
    ctx.fillStyle = "#5443d8"; ctx.fillRect(-t * 1.2, -t * 0.6, t * 1.2, t * 1.2);
    ctx.restore();
    // Pivot base.
    const base = ctx.createRadialGradient(pivot.x - 4, pivot.y - 4, 2, pivot.x, pivot.y, t * 3.2);
    base.addColorStop(0, "#f3f3f7"); base.addColorStop(0.6, "#8d8d97"); base.addColorStop(1, "#3c3c44");
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(pivot.x + 6, pivot.y + 10, t * 3.4, t * 3.4 * tilt, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = base; ctx.beginPath(); ctx.arc(pivot.x, pivot.y, t * 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#2a2a31"; ctx.beginPath(); ctx.arc(pivot.x, pivot.y, t * 1.2, 0, Math.PI * 2); ctx.fill();
  };

  function draw(dt: number) {
    const p = progress();
    if (!isStatic) {
      const out = smooth(0.06, 0.3, p);
      copy.style.opacity = String(1 - out);
      copy.style.transform = `translateY(${-50 * out}px)`;
      copy.style.visibility = out > 0.99 ? "hidden" : "visible";
      legend.style.opacity = String(1 - out);
      const inn = smooth(0.24, 0.44, p);
      results.style.opacity = String(inn);
      results.style.transform = `translateY(calc(-50% + ${24 * (1 - inn)}px))`;
      results.style.pointerEvents = inn > 0.5 ? "auto" : "none";
    }
    const s = isStatic ? 0 : smooth(0.3, 0.86, p);
    angle += dt * 0.0011;                               // an easy turn, slower than a real 33 rpm
    tilt += (tiltTarget - tilt) * 0.06;
    skew += (skewTarget - skew) * 0.06;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // Ambient glow and contact shadow.
    // On phones the canvas is a box in the page, so the glow fades out before its edges.
    const glowR = isStatic ? Math.min(g.R * 1.5, g.cx, W - g.cx, g.cy, H - g.cy) : g.R * 1.5;
    const glow = ctx.createRadialGradient(g.cx, g.cy, Math.min(g.R * 0.3, glowR * 0.5), g.cx, g.cy, glowR);
    glow.addColorStop(0, `rgba(84,67,216,${theme.dark ? 0.22 : 0.12})`); glow.addColorStop(1, "rgba(84,67,216,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.translate(g.cx + 8, g.cy + g.R * tilt * 0.1); ctx.scale(1, tilt);
    const sh = ctx.createRadialGradient(0, 0, g.R * 0.85, 0, 0, g.R * 1.12);
    sh.addColorStop(0, `rgba(0,0,0,${theme.dark ? 0.8 : 0.35})`); sh.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = sh; ctx.beginPath(); ctx.arc(0, 0, g.R * 1.12, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // The record.
    ctx.save();
    ctx.translate(g.cx, g.cy); ctx.transform(1, 0, skew, 1, 0, 0); ctx.scale(1, tilt);
    ctx.save(); ctx.rotate(angle); ctx.drawImage(disc, -g.R, -g.R, g.R * 2, g.R * 2); ctx.restore();
    const la = -0.95 + skew * 4 + (tilt - TILT) * 3;
    if (sheenAngle === null || Math.abs(la - sheenAngle) > 0.02) buildSheen(la);
    ctx.drawImage(sheen, -g.R, -g.R, g.R * 2, g.R * 2);
    ctx.restore();

    // Needle on the example groove.
    const stylus = onDisc(radiusOf(EX_YEAR), STYLUS_ANGLE);
    drawArm(stylus);

    // Stream into the results.
    const cr = canvas.getBoundingClientRect();
    const target = (i: number): Pt => {
      const b = rings[i]?.getBoundingClientRect();
      return b ? { x: b.left - cr.left + b.width / 2, y: b.top - cr.top + b.height / 2 } : stylus;
    };
    if (s > 0 && s < 1) {
      const targets = rows.map((_, i) => target(i));
      ctx.fillStyle = GLOW;
      for (let k = 0; k < STREAM; k++) {
        const u = Math.min(1, Math.max(0, (s - sDelay[k]) / 0.6));
        if (u <= 0 || u >= 1) continue;
        const from = onDisc(radiusOf(sYear[k]), sAng[k]), to = targets[sRow[k]], e = ease(u);
        const x = from.x + (to.x - from.x) * e, y = from.y + (to.y - from.y) * e + Math.sin(e * Math.PI) * sBend[k];
        ctx.globalAlpha = 0.3 + 0.7 * Math.sin(e * Math.PI);
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    rows.forEach((r, i) => r.classList.toggle("lit", isStatic || s > 0.55 + i * 0.06));

    // The example track's light: it starts under the needle and travels to its result row.
    if (s < 0.98 || isStatic) {
      const eu = isStatic ? 0 : ease(Math.min(1, Math.max(0, (s - 0.1) / 0.8)));
      const to = target(1), pos = { x: stylus.x + (to.x - stylus.x) * eu, y: stylus.y + (to.y - stylus.y) * eu };
      const pulse = reduce.matches ? 0.6 : (Math.sin(performance.now() / 420) + 1) / 2;
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 7 + pulse * 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139,125,255,${0.6 - pulse * 0.45})`; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff"; ctx.shadowColor = GLOW; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = "#5443d8"; ctx.lineWidth = 2; ctx.stroke();
      if (!isStatic && s < 0.05) {
        // Leader line down past the record's edge, so the label sits on the page background.
        const ly = g.cy + g.R * tilt + 30;
        ctx.globalAlpha = 1 - smooth(0.02, 0.1, p);
        ctx.strokeStyle = theme.muted; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(stylus.x, stylus.y + 8); ctx.lineTo(stylus.x, ly - 10); ctx.stroke();
        ctx.font = `700 13px "Manrope Variable", sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = theme.fg;
        ctx.fillText("Example track · 1974", Math.min(stylus.x, W - 90), ly);
        ctx.globalAlpha = 1;
      }
    }
  }

  const animating = () => visible && !document.hidden && !reduce.matches;
  const loop = (t: number) => { const dt = Math.min(50, t - last); last = t; draw(dt); raf = requestAnimationFrame(loop); };
  const sync = () => {
    cancelAnimationFrame(raf);
    if (animating()) { last = performance.now(); raf = requestAnimationFrame(loop); } else draw(0);
  };

  const applyMode = () => {
    isStatic = reduce.matches || innerWidth < WIDE_MIN;
    root.classList.toggle("hero-static", isStatic);
    root.classList.toggle("hero-wide", !isStatic);
    if (isStatic && canvas.parentElement !== slot) slot.appendChild(canvas);
    if (!isStatic && canvas.parentElement !== viewport) viewport.insertBefore(canvas, viewport.firstChild);
    if (isStatic) for (const el of [copy, results, legend]) el.removeAttribute("style");
    readTheme();
    resize();
    sync();
  };

  addEventListener("pointermove", (e) => {
    if (reduce.matches) return;
    tiltTarget = TILT - (e.clientY / innerHeight - 0.5) * 0.14;
    skewTarget = (e.clientX / innerWidth - 0.5) * 0.14;
  }, { passive: true });
  addEventListener("scroll", () => { if (!animating()) draw(0); }, { passive: true });
  let resizeTimer = 0;
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(applyMode, 100); });
  reduce.addEventListener("change", applyMode);
  const retheme = () => { readTheme(); draw(0); };
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", retheme);
  new MutationObserver(retheme).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("visibilitychange", sync);
  // Stop drawing once the hero has scrolled away.
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(stage);

  buildDisc();
  applyMode();
  document.fonts?.ready.then(() => { buildDisc(); g = layout(); draw(0); });
}
