import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATE_COOKIE, gateToken } from "./lib/gate";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow the gate page and the unlock endpoint through.
  if (pathname === "/gate" || pathname === "/api/gate") {
    return NextResponse.next();
  }

  // Unlocked?
  const token = await gateToken();
  if (token && req.cookies.get(GATE_COOKIE)?.value === token) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.searchParams.set("from", pathname + (req.nextUrl.search || ""));
  return NextResponse.redirect(url);
}

export const config = {
  // Gate pages, APIs and media; allow only framework assets and the gate logo.
  matcher: [
    "/((?!_next/static|_next/webpack-hmr|favicon.ico|premier-logo.png).*)",
  ],
};
