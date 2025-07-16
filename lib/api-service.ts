import { PersonalInfo, Project, BlogPost } from "@/types";

// Client-side API service
export const apiService = {
  // Personal Info
  async getPersonalInfo(): Promise<PersonalInfo | null> {
    try {
      const response = await fetch("/api/personal-info");
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error fetching personal info:", error);
      return null;
    }
  },

  async updatePersonalInfo(
    data: Partial<PersonalInfo>
  ): Promise<PersonalInfo | null> {
    try {
      const response = await fetch("/api/personal-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update");
      return await response.json();
    } catch (error) {
      console.error("Error updating personal info:", error);
      return null;
    }
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },

  async getBlogPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }
  },
};
