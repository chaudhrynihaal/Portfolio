import { NextResponse } from "next/server";

// Replace the console.log with your email provider (Resend, Nodemailer, etc.)
export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  console.log("Contact form submission:", body);
  return NextResponse.json({ ok: true });
}
