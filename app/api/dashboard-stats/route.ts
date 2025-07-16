import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuthFromRequest } from "@/lib/auth";
import {
  connectDB,
  PersonalInfo,
  Project,
  Skill,
  BlogPost,
} from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminAuthFromRequest(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Get counts from database
    const [projectCount, blogCount, skillCount, featuredProjectCount] =
      await Promise.all([
        Project.countDocuments(),
        BlogPost.countDocuments(),
        Skill.countDocuments(),
        Project.countDocuments({ featured: true }),
      ]);

    // Get published blog posts count
    const publishedBlogCount = await BlogPost.countDocuments({
      published: true,
    });

    // Get recent projects (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentProjectsCount = await Project.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Get recent blog posts (last 30 days)
    const recentBlogCount = await BlogPost.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Get recent skills (last 30 days)
    const recentSkillsCount = await Skill.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Calculate skill categories
    const skillCategories = await Skill.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get latest projects for recent activity
    const latestProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt");

    // Get latest blog posts for recent activity
    const latestBlogs = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt published");

    const stats = {
      totalProjects: projectCount,
      featuredProjects: featuredProjectCount,
      publishedPosts: publishedBlogCount,
      totalBlogs: blogCount,
      skillsListed: skillCount,
      recentProjects: recentProjectsCount,
      recentBlogs: recentBlogCount,
      recentSkills: recentSkillsCount,
      skillCategories,
      latestProjects,
      latestBlogs,
      // Simulated page views (you can integrate with analytics service)
      pageViews: Math.floor(Math.random() * 5000) + 1000,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
