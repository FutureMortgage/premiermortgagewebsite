# Premier Mortgage Resources

A new public-facing marketing experience inspired by the clean layout of
https://trygenius.ai/home, using Premier's existing repository logo and home
photograph. Company details and outbound customer-service links were checked
against https://www.pmrloans.com/ on September 9, 2026.

## Team directory

`/team` has featured leadership, an expandable leadership gallery, and a searchable,
paginated directory. Data lives in `data/team.json`; add real roster records there
to extend it to the desired 250 loan officers, 50 branch managers, and five division
leaders. Counts are derived from records, never padded to target totals. The
initial public import contains 234 unique directory profiles and 21 leadership
records, with overlap deduplicated when shown. Categories retain original job
titles; the Division leaders filter groups production VPs and regional/division
managers. Referral-partner records are excluded. Public directory entries may
include named teams as well as individuals, so totals are labeled profiles.

Names, NMLS identifiers, phone numbers, and available headshot URLs were imported
from all 15 pages of Premier's public loan-officer directory on September 9, 2026.
Public leadership titles take precedence over older repository titles. The full
staff roster has not been provided, so `rosterComplete` remains false. Each record
retains its source URL; missing or unavailable portraits fall back to initials.

## Development

- `npm ci`
- `npm run dev` — Next.js development on port 4300.
- `npm run build` — normal build of the complete existing repository.
- `npm run build:site` — isolated static export of the new marketing homepage.
- `npm run test:calculator` — mortgage calculation and invalid-input checks.

The homepage contains purchase, refinance, and first-time-buyer paths; Premier's
values; a working principal-and-interest estimator; resource links; and contact
actions. Applications, officer lookup, and servicing use Premier's existing
official website. No borrower personal information is collected in this preview.

The hosted preview exports only the new marketing experience. Existing company
pages and the password-gate endpoint stay in the repository and are excluded
from that export. Local middleware allows the marketing homepage while retaining
the previous gate for all other existing page routes. Hosting is owner-private.

The calculator's default rate is an editable illustration, not a quoted rate.
Taxes, insurance, mortgage insurance, and HOA fees are excluded and disclosed.
Native range inputs and radio buttons support keyboard use. Reduced-motion
preferences are respected and navigation has a skip link and Escape handling.

An optional `configure_mortgage_estimate` WebMCP tool is feature-detected and
shares calculation logic and state with the visible calculator. A supporting
WebMCP validation context was unavailable in this environment; that optional
integration has not been runtime-verified. Browser visual QA was not requested.
