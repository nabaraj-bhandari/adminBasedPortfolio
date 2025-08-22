import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await dbOperations.getBlogPost(params.id);
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate PDFs in the request body
    if (body.pdfs) {
      body.pdfs = body.pdfs.map((pdf: any) => ({
        title: pdf.title?.trim(),
        url: pdf.url?.trim(),
        downloadCount: pdf.downloadCount || 0
      }));
    }

    const updatedPost = await dbOperations.updateBlogPost(params.id, body);
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Invalid blog post data", details: error.message },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbOperations.deleteBlogPost(params.id);
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
