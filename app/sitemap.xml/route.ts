import { NextResponse } from "next/server";
import { dbOperations } from "@/lib/mongodb";

const baseUrl = "https://your-portfolio-domain.com"; // Replace with your actual domain

export async function GET() {
  try {
    // Fetch all published blog posts
    const blogPosts = await dbOperations.getBlogPosts();

    // Static pages
    const staticPages = ["", "/projects", "/blog", "/skills", "/contact"];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
${blogPosts
  .filter((post) => post.published)
  .map(
    (post) => `
  <url>
    <loc>${baseUrl}/blog/${post._id}</loc>
    <lastmod>${new Date(
      post.updatedAt || post.createdAt || post.date
    ).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
