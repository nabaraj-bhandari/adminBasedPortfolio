"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  Code,
  BookOpen,
  Plus,
  Edit,
  User,
  Mail,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectManager from "./project-manager";
import SkillManager from "./skill-manager";
import BlogManager from "./blog-manager";
import PersonalInfoManager from "./personal-info-manager";
import ContactMessageManager from "./contact-message-manager";
import EmailTestPanel from "./email-test-panel";
import LogoutButton from "./logout-button";

type TabType =
  | "dashboard"
  | "projects"
  | "skills"
  | "blog"
  | "personal"
  | "contact"
  | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    publishedPosts: 0,
    totalBlogs: 0,
    skillsListed: 0,
    recentProjects: 0,
    recentBlogs: 0,
    recentSkills: 0,
    pageViews: 0,
    latestProjects: [],
    latestBlogs: [],
    skillCategories: [],
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard-stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (activeTab === "dashboard") {
      fetchStats();
    }
  }, [activeTab]);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "personal", name: "Personal Info", icon: User },
    { id: "projects", name: "Projects", icon: FolderOpen },
    { id: "skills", name: "Skills", icon: Code },
    { id: "blog", name: "Blog", icon: BookOpen },
    { id: "contact", name: "Contact Messages", icon: Mail },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  // Create display stats from real data
  const displayStats = [
    {
      name: "Total Projects",
      value: isLoadingStats ? "..." : stats.totalProjects.toString(),
      change: isLoadingStats ? "..." : `+${stats.recentProjects} this month`,
    },
    {
      name: "Featured Projects",
      value: isLoadingStats ? "..." : stats.featuredProjects.toString(),
      change: isLoadingStats ? "..." : `${stats.featuredProjects} on home page`,
    },
    {
      name: "Published Posts",
      value: isLoadingStats ? "..." : stats.publishedPosts.toString(),
      change: isLoadingStats ? "..." : `+${stats.recentBlogs} this month`,
    },
    {
      name: "Skills Listed",
      value: isLoadingStats ? "..." : stats.skillsListed.toString(),
      change: isLoadingStats ? "..." : `+${stats.recentSkills} this month`,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoManager />;
      case "projects":
        return <ProjectManager />;
      case "skills":
        return <SkillManager />;
      case "blog":
        return <BlogManager />;
      case "contact":
        return <ContactMessageManager />;
      case "settings":
        return <EmailTestPanel />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayStats.map((stat) => (
                <Card key={stat.name} className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.name}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest Projects */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Latest Projects
                  </h3>
                  {isLoadingStats ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 bg-muted animate-pulse rounded"
                        />
                      ))}
                    </div>
                  ) : stats.latestProjects.length > 0 ? (
                    <div className="space-y-3">
                      {stats.latestProjects.map((project: any, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm truncate">
                            {project.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm mb-2">
                        No projects yet
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveTab("projects")}
                      >
                        Add your first project
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Latest Blog Posts */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Latest Blog Posts
                  </h3>
                  {isLoadingStats ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 bg-muted animate-pulse rounded"
                        />
                      ))}
                    </div>
                  ) : stats.latestBlogs.length > 0 ? (
                    <div className="space-y-3">
                      {stats.latestBlogs.map((blog: any, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm truncate">
                              {blog.title}
                            </span>
                            {blog.published && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Published
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm mb-2">
                        No blog posts yet
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveTab("blog")}
                      >
                        Write your first post
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Skill Categories */}
            {!isLoadingStats && stats.skillCategories.length > 0 && (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Skills by Category
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.skillCategories.map((category: any, index) => (
                      <div key={index} className="text-center">
                        <p className="text-2xl font-bold">{category.count}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {category._id}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No Skills Message */}
            {!isLoadingStats && stats.skillCategories.length === 0 && (
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center py-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Skills by Category
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      No skills added yet
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTab("skills")}
                    >
                      Add your first skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("projects")}
                  >
                    <Plus className="w-5 h-5" />
                    Add Project
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("blog")}
                  >
                    <Edit className="w-5 h-5" />
                    Write Post
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("skills")}
                  >
                    <Code className="w-5 h-5" />
                    Add Skill
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("personal")}
                  >
                    <User className="w-5 h-5" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-card border-r border-border overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>

            <nav className="mt-8 flex-1 px-4">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => setActiveTab(item.id as TabType)}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="mr-3 w-5 h-5" />
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 mt-auto">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 lg:p-8"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                {navigation.find((item) => item.id === activeTab)?.name}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === "dashboard" &&
                  "Manage your portfolio content and view analytics"}
                {activeTab === "personal" &&
                  "Update your personal information and contact details"}
                {activeTab === "projects" && "Manage your portfolio projects"}
                {activeTab === "skills" &&
                  "Organize your technical skills and expertise"}
                {activeTab === "blog" && "Create and manage your blog posts"}
              </p>
            </div>

            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
