// Ownership ring: an SVG circle with one arc per rights holder, drawn in a 30x30 viewBox.
export function ownershipRing(holders: number): string {
  const r = 11, c = 2 * Math.PI * r, gap = holders > 1 ? 7 : 0, len = c / holders - gap;
  return `<circle class="bg" cx="15" cy="15" r="${r}"/>` + Array.from({ length: holders }, (_, i) =>
    `<circle class="arc" cx="15" cy="15" r="${r}" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-(i * c) / holders + c / 4}"/>`).join("");
}
