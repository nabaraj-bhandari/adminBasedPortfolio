import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const exclude = searchParams.get("exclude");

    const posts = await dbOperations.getBlogPosts();

    let filteredPosts = posts;

    // Filter out excluded post
    if (exclude) {
      filteredPosts = posts.filter((post) => post._id.toString() !== exclude);
    }

    // Limit the results
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        filteredPosts = filteredPosts.slice(0, limitNum);
      }
    }

    return NextResponse.json(filteredPosts, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
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
