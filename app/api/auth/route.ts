import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Check if password matches the admin password from environment
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create JWT token
    const token = sign(
      { admin: true, timestamp: Date.now() },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    // Create response with JWT cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Logout endpoint - clear the cookie
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin-token");
  return response;
}
