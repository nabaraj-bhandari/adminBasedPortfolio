import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";
import { getCachedData, createCacheKey } from "@/lib/cache-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const limitNum = limit ? parseInt(limit, 10) : 3;

    const cacheKey = createCacheKey('blog', 'featured', limitNum.toString());
    
    const posts = await getCachedData(
      cacheKey,
      async () => await dbOperations.getFeaturedBlogPosts(limitNum),
      {
        revalidate: 300, // 5 minutes
        tags: ['blog', 'featured']
      }
    );

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured blog posts" },
      { status: 500 }
    );
  }
}
