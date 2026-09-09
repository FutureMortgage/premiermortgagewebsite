import { writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";

// Server-only runtime configuration. Never print values or expose NEXT_PUBLIC keys.
const password = process.env.SITE_PASSWORD;
if (!password || /[\r\n]/.test(password)) throw new Error("SITE_PASSWORD must be configured in Amplify before deployment.");
const secret = process.env.SITE_GATE_SECRET || randomBytes(32).toString("hex");
await writeFile(".env.production", `SITE_PASSWORD=${JSON.stringify(password)}\nSITE_GATE_SECRET=${JSON.stringify(secret)}\n`, { mode: 0o600 });
console.log("Server-side password protection configured.");
