import { NextResponse } from "next/server";
import { GATE_COOKIE, gateToken, GATE_PASSWORD } from "@/lib/gate";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));

  if (!GATE_PASSWORD || typeof password !== "string" || password !== GATE_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await gateToken();
  if (!token) return NextResponse.json({ ok: false }, { status: 503 });
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(GATE_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
