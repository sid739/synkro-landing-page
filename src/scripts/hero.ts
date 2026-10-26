// Homepage hero: the headline on the left and the sync timeline on the right. The headline's second
// word follows the timeline's cuts (Sync Film, Sync TV, ...) through one pass, then settles on
// Anything. Phones and narrow windows get the copy and the timeline stacked.

const WIDE_MIN = 900;                                   // narrower than this, the hero stacks
const PANEL_MIN = 380, PANEL_MAX = 640;                 // the timeline's width range beside the copy

// Every element the hero needs, or null when the page has no hero.
const hero = () => {
  const q = <T extends Element>(sel: string) => document.querySelector<T>(sel);
  const viewport = q<HTMLElement>("[data-viewport]"), copy = q<HTMLElement>("[data-copy]");
  const visual = q<HTMLElement>("[data-visual]"), word = q<HTMLElement>("[data-word]");
  if (!viewport || !copy || !visual || !word) return null;
  return { viewport, copy, visual, word };
};

export function initHero(): void {
  const els = hero();
  if (!els) return;
  const { viewport, copy, visual, word } = els;
  const final = word.textContent ?? "";
  const words: string[] = JSON.parse(word.dataset.words ?? "[]");
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  // Size the timeline to the space right of the copy, up to the content edge.
  const layout = () => {
    visual.style.removeProperty("width");
    const vr = viewport.getBoundingClientRect();
    const edge = vr.width - Math.max(16, (vr.width - 1200) / 2 + 16);
    // The copy is as wide as its widest moment, so measure the headline with each word it will show.
    const shown = word.textContent;
    let copyRight = 0;
    for (const w of [final, ...words]) {
      word.textContent = w;
      for (const el of copy.children) copyRight = Math.max(copyRight, el.getBoundingClientRect().right - vr.left);
    }
    word.textContent = shown;
    const byHeight = (vr.height - 48 - 230) / 0.5625;  // the panel is about 0.56 of its width plus 230 px tall
    const width = Math.min(PANEL_MAX, edge - copyRight - 56, byHeight);
    const stacked = innerWidth < WIDE_MIN || width < PANEL_MIN;
    root.classList.toggle("hero-static", stacked);
    if (stacked) return;
    visual.style.width = `${width}px`;
    visual.style.right = `${vr.width - edge}px`;
  };

  // The headline's word: one pass through the categories as the timeline cuts, then Anything for good.
  let started = false, settled = false, swap = Promise.resolve();
  const show = (text: string) => {
    swap = swap.then(async () => {
      await word.animate([{ transform: "none", opacity: 1 }, { transform: "translateY(-.25em)", opacity: 0, filter: "blur(4px)" }], { duration: 140, easing: "ease-in" }).finished;
      word.textContent = text;
      await word.animate([{ transform: "translateY(.3em)", opacity: 0, filter: "blur(6px)" }, { transform: "none", opacity: 1, filter: "blur(0)" }], { duration: 420, easing: "cubic-bezier(.2, .8, .2, 1)" }).finished;
    });
  };
  addEventListener("sync:cut", (e) => {
    if (settled || reduce.matches) return;
    const { index, label } = (e as CustomEvent<{ index: number; label: string }>).detail;
    if (!started) { if (index !== 0) return; started = true; show(label); return; }
    if (index === 0) { settled = true; show(final); return; }
    show(label);
  });

  let resizeTimer = 0;
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(layout, 100); });
  layout();
  document.fonts?.ready.then(layout);
}
