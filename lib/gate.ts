// Simple site-wide password gate config (shared by middleware + unlock API).
export const GATE_COOKIE = "premier_gate";
export const GATE_TOKEN = "premier-2026-ok";
// Override with SITE_PASSWORD env var in production if desired.
export const GATE_PASSWORD = process.env.SITE_PASSWORD || "Cory2026";
