// Homepage hero: the headline on the left and the sync timeline on the right. Scrolling the sticky
// stage fades the headline out and the example results in, while the timeline stays put.
// Phones, narrow windows and reduced motion get the copy, the timeline and the results stacked.

const WIDE_MIN = 900;                                   // narrower than this, the hero stacks
const PANEL_MIN = 380, PANEL_MAX = 640;                 // the timeline's width range beside the copy

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// Every element the hero needs, or null when the page has no hero.
const hero = () => {
  const q = <T extends Element>(sel: string) => document.querySelector<T>(sel);
  const stage = q<HTMLElement>("[data-stage]"), viewport = q<HTMLElement>("[data-viewport]");
  const copy = q<HTMLElement>("[data-copy]"), results = q<HTMLElement>("[data-results]"), visual = q<HTMLElement>("[data-visual]");
  if (!stage || !viewport || !copy || !results || !visual) return null;
  return { stage, viewport, copy, results, visual };
};

export function initHero(): void {
  const els = hero();
  if (!els) return;
  const { stage, viewport, copy, results, visual } = els;
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let isStatic = false;

  // Size the timeline to the space right of the copy, up to the content edge, and keep the results
  // panel (which takes the copy's place on scroll) clear of it.
  const layout = () => {
    for (const el of [visual, results]) el.style.removeProperty("width");
    const vr = viewport.getBoundingClientRect();
    const edge = vr.width - Math.max(16, (vr.width - 1200) / 2 + 16);
    let copyRight = 0;
    for (const el of copy.children) copyRight = Math.max(copyRight, el.getBoundingClientRect().right - vr.left);
    const byHeight = (vr.height - 48 - 230) / 0.5625;  // the panel is about 0.56 of its width plus 230 px tall
    const width = Math.min(PANEL_MAX, edge - copyRight - 56, byHeight);
    isStatic = reduce.matches || innerWidth < WIDE_MIN || width < PANEL_MIN;
    root.classList.toggle("hero-static", isStatic);
    if (isStatic) { for (const el of [copy, results]) el.removeAttribute("style"); return; }
    visual.style.width = `${width}px`;
    visual.style.right = `${vr.width - edge}px`;
    const resultsLeft = results.getBoundingClientRect().left - vr.left;
    results.style.width = `${Math.min(600, edge - width - 40 - resultsLeft)}px`;
  };

  // Share of the sticky stage scrolled, measured below the fixed header.
  const progress = () => {
    const r = stage.getBoundingClientRect(), nav = innerHeight - viewport.offsetHeight;
    return Math.min(1, Math.max(0, (nav - r.top) / (r.height - viewport.offsetHeight)));
  };
  const update = () => {
    if (isStatic) return;
    const p = progress();
    const out = smooth(0.06, 0.3, p);
    copy.style.opacity = String(1 - out);
    copy.style.transform = `translateY(${-50 * out}px)`;
    copy.style.visibility = out > 0.99 ? "hidden" : "visible";
    const inn = smooth(0.24, 0.44, p);
    results.style.opacity = String(inn);
    results.style.transform = `translateY(calc(-50% + ${24 * (1 - inn)}px))`;
    results.style.pointerEvents = inn > 0.5 ? "auto" : "none";
  };

  let frame = 0;
  addEventListener("scroll", () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }, { passive: true });
  let resizeTimer = 0;
  const relayout = () => { layout(); update(); };
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(relayout, 100); });
  reduce.addEventListener("change", relayout);
  relayout();
  document.fonts?.ready.then(relayout);
}
