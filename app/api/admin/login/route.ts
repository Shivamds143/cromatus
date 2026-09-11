import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, generateSessionToken } from "@/lib/admin-auth";
import { verifyAdminLogin } from "@/lib/admin-credentials";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
    }

    const { username, password } = body as Record<string, string>;

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: "Please provide both username and password." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminLogin(username, password);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Incorrect username or password." },
        { status: 401 }
      );
    }

    // Set secure auth cookie
    const token = generateSessionToken(username);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Login failed." },
      { status: 500 }
    );
  }
}
