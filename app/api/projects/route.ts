import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { verifyAdminAuthFromRequest } from "@/lib/auth";
import { getCachedData } from "@/lib/cache-service";
import { headers } from 'next/headers';

export async function GET() {
  try {
    const projects = await getCachedData(
      'projects:all',
      async () => await dbOperations.getProjects(),
      {
        revalidate: 3600, // 1 hour
        tags: ['projects']
      }
    );
    
    // Add cache control headers
    const headersList = headers();
    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
    const project = await dbOperations.createProject(body);
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
