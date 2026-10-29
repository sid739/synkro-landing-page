// Custom events for Vercel Web Analytics. Vercel records them on Pro plans; on Hobby only page views
// are kept and these calls are ignored.
type Va = (kind: "event", payload: { name: string; data?: Record<string, string> }) => void;

export function track(name: string, data?: Record<string, string>): void {
  (window as unknown as { va?: Va }).va?.("event", { name, data });
}

// A click on any "Book a demo" link, wherever it is, with the page it came from.
export function trackDemoLinks(): void {
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-demo]");
    if (a) track("Demo click", { from: location.pathname });
  });
}
