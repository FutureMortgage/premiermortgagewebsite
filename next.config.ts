import type { NextConfig } from "next";

// Retired pages from the original site design. Each now points at the closest
// page in the current design so old links and bookmarks still land somewhere useful.
const RETIRED_PAGES: [string, string][] = [
  ["/leadership", "/team"],
  ["/org-chart", "/team"],
  ["/brand", "/"],
  ["/frontline", "/join-pmr"],
  ["/employee-reviews", "/join-pmr"],
  ["/news", "/"],
  ["/loan-process", "/"],
  ["/loan-programs", "/"],
  ["/we-give-back", "/our-mission"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return RETIRED_PAGES.map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    }));
  },
};

export default nextConfig;
