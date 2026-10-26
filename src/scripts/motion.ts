// Scroll-triggered motion. Every animated element is fully visible in the HTML; the `js` class on
// <html> (set in the head) is what hides the start states, so without JavaScript, or with reduced
// motion, visitors and crawlers see the finished content.
//
//   data-reveal       fades and lifts in when it enters the viewport
//   data-play         gets `.play` when 35% visible; CSS keys staggered children off it
//   data-loop="ms"    (with data-play) plays again every ms milliseconds while on screen
//   data-type         (inside data-play) types its text out
//   data-count="n"    (inside data-play) counts up from 0 to n

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const format = (n: number) => Math.round(n).toLocaleString("en-US");

function type(el: HTMLElement) {
  const full = el.dataset.full ?? el.textContent ?? "";
  el.dataset.full = full;
  el.textContent = "";
  el.classList.add("typing");
  const delay = Number(el.dataset.delay ?? 0);
  let i = 0;
  const tick = () => {
    el.textContent = full.slice(0, ++i);
    if (i < full.length) setTimeout(tick, 28);
    else el.classList.remove("typing");
  };
  setTimeout(tick, delay);
}

function count(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? "";
  const prefix = el.dataset.prefix ?? "";
  const start = performance.now();
  const ms = 1400;
  const frame = (t: number) => {
    const p = Math.min(1, (t - start) / ms);
    el.textContent = prefix + format(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

export function play(el: HTMLElement) {
  el.classList.remove("play");
  void el.offsetWidth; // restart CSS animations when replayed (workflow tabs)
  el.classList.add("play");
  if (reduce) return;
  el.querySelectorAll<HTMLElement>("[data-type]").forEach(type);
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
}

if (reduce) {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("in"));
  document.querySelectorAll<HTMLElement>("[data-play]").forEach((el) => el.classList.add("play"));
} else {
  const reveal = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

  const loops = new Map<Element, number>();
  const player = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement, every = Number(el.dataset.loop);
      if (!every) { if (e.isIntersecting) { play(el); player.unobserve(el); } continue; }
      clearInterval(loops.get(el));
      loops.delete(el);
      if (e.isIntersecting) { play(el); loops.set(el, window.setInterval(() => play(el), every)); }
    }
  }, { threshold: 0.35 });
  document.querySelectorAll("[data-play]:not([data-manual])").forEach((el) => player.observe(el));
}
