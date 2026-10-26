// Feature cards: a soft light follows the pointer across the card under it.
for (const card of document.querySelectorAll<HTMLElement>(".fcard")) {
  card.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
}
