// Simple site-wide password gate config (shared by middleware + unlock API).
export const GATE_COOKIE = "premier_gate";
export const GATE_PASSWORD = process.env.SITE_PASSWORD;
export async function gateToken() {
  const secret = process.env.SITE_GATE_SECRET;
  if (!secret || !GATE_PASSWORD) return null;
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${secret}:${GATE_PASSWORD}`));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
}
