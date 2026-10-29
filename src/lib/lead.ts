// The early-access sign-up: the fields the form sends and the checks the server applies to them. The
// form takes its limits from here too, so the browser and the server refuse the same things.
import { roles } from "../data/roles";

export const interests = { waitlist: "Join the waitlist", demo: "Book a demo" } as const;
export type Interest = keyof typeof interests;

export const OTHER_ROLE = "Something else";
export const roleChoices: readonly string[] = [...roles.map((r) => r.name), OTHER_ROLE];

export const LIMITS = { name: 120, email: 254, company: 160, message: 2000 } as const;

export type Lead = { name: string; email: string; company: string; role: string; interest: Interest; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length <= max ? t : null;
};

// The lead, or the reason it was refused.
export function parseLead(input: unknown): { lead: Lead } | { error: string } {
  if (!input || typeof input !== "object") return { error: "The form was empty." };
  const f = input as Record<string, unknown>;
  const name = text(f.name, LIMITS.name);
  const email = text(f.email, LIMITS.email);
  const company = text(f.company, LIMITS.company);
  const message = text(f.message ?? "", LIMITS.message);
  const role = typeof f.role === "string" && roleChoices.includes(f.role) ? f.role : null;
  const interest = f.interest === "demo" || f.interest === "waitlist" ? f.interest : null;
  if (!name) return { error: "Please add your name." };
  if (!email || !EMAIL.test(email)) return { error: "Please add a valid work email." };
  if (!company) return { error: "Please add your company." };
  if (!role) return { error: "Please choose what describes you best." };
  if (!interest) return { error: "Please choose the waitlist or a demo." };
  if (message === null) return { error: `Please keep the message under ${LIMITS.message} characters.` };
  return { lead: { name, email, company, role, interest, message } };
}
