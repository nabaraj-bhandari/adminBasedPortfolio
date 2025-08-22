import { NextRequest, NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { pdfUrl } = body;

    // Transform Google Drive URL to direct download link if needed
    const transformedUrl = pdfUrl.includes('drive.google.com/file/d/') 
      ? pdfUrl.replace('/view?usp=sharing', '').replace('/view', '')
      : pdfUrl;

    const updatedPost = await dbOperations.updatePdfDownloadCount(params.id, transformedUrl);
    if (!updatedPost) {
      return NextResponse.json(
        { error: "Failed to update PDF download count" },
        { status: 500 }
      );
    }

    // Return both the updated post and the download URL
    return NextResponse.json({
      post: updatedPost,
      downloadUrl: transformedUrl
    });
  } catch (error) {
    console.error("Error updating PDF download count:", error);
    return NextResponse.json(
      { error: "Failed to update PDF download count" },
      { status: 500 }
    );
  }
}
