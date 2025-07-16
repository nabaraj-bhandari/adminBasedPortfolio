import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const authCookie = cookieStore.get("admin-auth")?.value;

    // Simple check for authentication cookie
    return authCookie === "authenticated";
  } catch (error) {
    console.error("Auth verification failed:", error);
    return false;
  }
}

export async function verifyAdminAuthFromRequest(
  request: NextRequest
): Promise<boolean> {
  try {
    const authCookie = request.cookies.get("admin-auth")?.value;

    // Simple check for authentication cookie
    return authCookie === "authenticated";
  } catch (error) {
    console.error("Auth verification from request failed:", error);
    return false;
  }
}
