import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { getCachedData, createCacheKey } from "@/lib/cache-service";
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const exclude = searchParams.get("exclude");

    const featured = searchParams.get("featured");
    
    const options = {
      limit: limit ? parseInt(limit, 10) : undefined,
      excludeId: exclude || undefined,
      featured: featured ? featured === 'true' : undefined
    };
    const posts = await dbOperations.getBlogPosts(options);

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "no-store", // Disable caching
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPost = await dbOperations.createBlogPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
