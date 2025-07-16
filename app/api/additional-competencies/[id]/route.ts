import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { verifyAdminAuthFromRequest } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminAuthFromRequest(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const competency = await dbOperations.updateAdditionalCompetency(
      params.id,
      body
    );

    if (!competency) {
      return NextResponse.json(
        { error: "Additional competency not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(competency);
  } catch (error) {
    console.error("Error updating additional competency:", error);
    return NextResponse.json(
      { error: "Failed to update additional competency" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminAuthFromRequest(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const success = await dbOperations.deleteAdditionalCompetency(params.id);

    if (!success) {
      return NextResponse.json(
        { error: "Additional competency not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Additional competency deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting additional competency:", error);
    return NextResponse.json(
      { error: "Failed to delete additional competency" },
      { status: 500 }
    );
  }
}
