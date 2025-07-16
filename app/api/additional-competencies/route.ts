import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { verifyAdminAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const competencies = await dbOperations.getAdditionalCompetencies();
    return NextResponse.json(competencies);
  } catch (error) {
    console.error("Error fetching additional competencies:", error);
    return NextResponse.json(
      { error: "Failed to fetch additional competencies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminAuthFromRequest(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const competency = await dbOperations.createAdditionalCompetency(body);
    return NextResponse.json(competency);
  } catch (error) {
    console.error("Error creating additional competency:", error);
    return NextResponse.json(
      { error: "Failed to create additional competency" },
      { status: 500 }
    );
  }
}
