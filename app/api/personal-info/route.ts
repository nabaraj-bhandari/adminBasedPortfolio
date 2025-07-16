import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { verifyAdminAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const personalInfo = await dbOperations.getPersonalInfo();

    const response = NextResponse.json(personalInfo);

    // Add caching headers - personal info changes rarely
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=7200"
    );
    response.headers.set("CDN-Cache-Control", "public, s-maxage=3600");

    return response;
  } catch (error) {
    console.error("Error fetching personal info:", error);
    return NextResponse.json(
      { error: "Failed to fetch personal info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminAuthFromRequest(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const personalInfo = await dbOperations.updatePersonalInfo(body);
    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error("Error updating personal info:", error);
    return NextResponse.json(
      { error: "Failed to update personal info" },
      { status: 500 }
    );
  }
}
