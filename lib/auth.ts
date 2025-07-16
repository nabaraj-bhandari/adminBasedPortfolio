import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) {
      return false;
    }

    // Verify the JWT token
    const decoded = verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as any;

    // Check if token contains admin flag
    return decoded && decoded.admin === true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export async function verifyAdminAuthFromRequest(
  request: NextRequest
): Promise<boolean> {
  try {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return false;
    }

    // Verify the JWT token
    const decoded = verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as any;

    // Check if token contains admin flag
    return decoded && decoded.admin === true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}
