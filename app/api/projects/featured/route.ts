import { NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";

export async function GET() {
  try {
    const featuredProjects = await dbOperations.getFeaturedProjects();

    return NextResponse.json(featuredProjects);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured projects" },
      { status: 500 }
    );
  }
}
