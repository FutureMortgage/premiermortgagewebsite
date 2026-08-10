import { NextResponse } from "next/server";
import { GATE_COOKIE, GATE_TOKEN, GATE_PASSWORD } from "@/lib/gate";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));

  if (password !== GATE_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_COOKIE, GATE_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
