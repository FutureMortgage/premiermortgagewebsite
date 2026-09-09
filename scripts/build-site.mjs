// Build only the public marketing experience. Existing gated company pages
// retain their normal Next.js build and are not included in the private preview.
import { cp, mkdir, mkdtemp, readFile, symlink, rename, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stagingParent = path.join(root, ".site-builds");
await mkdir(stagingParent, { recursive: true });
const staging = await mkdtemp(path.join(stagingParent, "preview-"));
const sources = ["package.json", "tsconfig.json", "postcss.config.mjs", "app/page.tsx", "app/layout.tsx", "app/globals.css", "app/fonts", "app/icon.svg", "components/PremierSite.tsx", "components/MortgageCalculator.tsx", "components/premier.module.css", "lib/mortgage.ts", "public/premier-logo.png", "public/hero.jpg", "app/team", "components/TeamPage.tsx", "components/team.module.css", "data/team.json", "public/team", "components/HomepageVideo.tsx", "public/premier-homepage.mp4", "public/premier-homepage-poster.jpg"];
sources.push("components/ServicePages.tsx", "components/services.module.css", ...["make-a-payment", "our-mission", "join-pmr", "careers", "job-opportunities", "contact-us", "privacy-policy", "legal", "state-licensing", "find-a-loan-officer"].map(route => `app/${route}`));
sources.push("components/StateLicenses.tsx");
sources.push("components/JoinExtras.tsx");
sources.push("components/AboutStory.tsx");
sources.push("app/loan-officer-careers");
for (const relative of sources) {
  const dest = path.join(staging, relative);
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(path.join(root, relative), dest, { recursive: true });
}
await cp(path.join(root, "scripts/site-next.config.ts"), path.join(staging, "next.config.ts"));
await symlink(path.join(root, "node_modules"), path.join(staging, "node_modules"), "dir");
const build = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], { cwd: staging, stdio: "inherit", env: process.env });
if (build.status !== 0) process.exit(build.status ?? 1);
const html = await readFile(path.join(staging, "out/index.html"), "utf8");
if (!html.includes("A place to call home.") || !html.includes("Estimated monthly principal")) throw new Error("Marketing export is incomplete.");
const output = path.join(root, "dist");
// Replace generated output only after a complete successful export.
await rm(output, { recursive: true, force: true });
await rename(path.join(staging, "out"), output);
console.log("Public marketing site exported to dist.");
