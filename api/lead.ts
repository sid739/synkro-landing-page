// Vercel Function behind the early-access form: checks the sign-up and emails it to the team through
// Resend. Environment (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  required; from resend.com → API Keys
//   LEAD_TO         where sign-ups go; defaults to the site's email
//   LEAD_FROM       a sender on a domain verified in Resend, e.g. "Synkro <signups@synkro.com>".
//                   Without one, Resend's test sender is used, which only delivers to the Resend
//                   account's own address.
import { interests, parseLead, type Lead } from "../src/lib/lead";
import { site } from "../src/data/site";

const MAX_BODY = 16 * 1024;
const MIN_FILL_MS = 2500;   // humans take longer than this to fill the form in

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const rows = (lead: Lead): [string, string][] => [
  ["Wants", interests[lead.interest]],
  ["Name", lead.name],
  ["Email", lead.email],
  ["Company", lead.company],
  ["Role", lead.role],
  ["Message", lead.message || "(none)"],
];

export async function POST(request: Request): Promise<Response> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("lead: RESEND_API_KEY is not set");
    return json(503, { error: "Sign-ups are not set up yet." });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return json(413, { error: "That was too long." });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "The form could not be read." });
  }
  // Bots fill the hidden field or submit instantly; tell them it worked and send nothing.
  const startedAt = Number(body.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return json(200, { ok: true });

  const parsed = parseLead(body);
  if ("error" in parsed) return json(400, { error: parsed.error });
  const { lead } = parsed;

  const subject = `${interests[lead.interest]}: ${lead.name}, ${lead.company}`;
  const text = rows(lead).map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font:14px/1.5 sans-serif">${rows(lead)
    .map(([k, v]) => `<tr><td style="color:#6b6b76;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM || "Synkro sign-ups <onboarding@resend.dev>",
      to: (process.env.LEAD_TO || site.email).split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject,
      text,
      html,
    }),
  }).catch((e: unknown) => e);

  if (!(res instanceof Response) || !res.ok) {
    const detail = res instanceof Response ? `${res.status} ${await res.text()}` : String(res);
    console.error("lead: Resend refused the email:", detail);
    return json(502, { error: "We couldn't send that just now." });
  }
  console.log("lead: sent", lead.interest, lead.role);
  return json(200, { ok: true });
}

export function GET(): Response {
  return json(405, { error: "Use POST." });
}
