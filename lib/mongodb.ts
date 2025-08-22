import mongoose from "mongoose";
import type {
  PersonalInfo,
  Project,
  Skill,
  AdditionalCompetency,
  BlogPost,
} from "@/types";

// Ensure this only runs on server side
if (typeof window !== "undefined") {
  throw new Error("MongoDB connection should only be used on server side");
}

import { connectToDatabase } from './db-connection';

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await connectToDatabase();
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Schemas
const PersonalInfoSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    resume_url: { type: String },
    profile_picture: { type: String },
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, default: 50 },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const AdditionalCompetencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// PDF Schema for blog posts
const PdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  downloadCount: { type: Number, default: 0 },
});

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    date: { type: Date, default: Date.now },
    read_time: { type: String, default: "5 min read" },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    pdfs: { type: [PdfSchema], default: [] }, // Add PDFs array
  },
  { 
    timestamps: true,
    index: [
      { published: 1, featured: 1, date: -1 },
      { published: 1, date: -1 }
    ]
  }
);

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

// Models
const PersonalInfo =
  mongoose.models.PersonalInfo ||
  mongoose.model("PersonalInfo", PersonalInfoSchema);
const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
const AdditionalCompetency =
  mongoose.models.AdditionalCompetency ||
  mongoose.model("AdditionalCompetency", AdditionalCompetencySchema);
const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);

// Database operations
export const dbOperations = {
  // Personal Info
  async getPersonalInfo() {
    try {
      await connectDB();
      let personalInfo = await PersonalInfo.findOne();

      if (!personalInfo) {
        personalInfo = await PersonalInfo.create({});
      }

      return personalInfo.toObject();
    } catch (error) {
      console.error("Error fetching personal info:", error);
      return null;
    }
  },

  async updatePersonalInfo(
    data: Partial<PersonalInfo>
  ): Promise<PersonalInfo | null> {
    try {
      await connectDB();
      let personalInfo = await PersonalInfo.findOne();

      if (!personalInfo) {
        personalInfo = await PersonalInfo.create(data);
      } else {
        personalInfo = await PersonalInfo.findOneAndUpdate({}, data, {
          new: true,
        });
      }

      return personalInfo.toObject();
    } catch (error) {
      console.error("Error updating personal info:", error);
      return null;
    }
  },

  // Projects
  async getProjects() {
    try {
      await connectDB();
      const projects = await Project.find().sort({ date: -1 });
      return projects.map((project) => project.toObject());
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },

  async getFeaturedProjects() {
    try {
      await connectDB();
      const projects = await Project.find({ featured: true })
        .sort({ date: -1 })
        .limit(6);
      return projects.map((project) => project.toObject());
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      return [];
    }
  },

  async getProject(id: string): Promise<Project | null> {
    try {
      await connectDB();
      const project = await Project.findById(id);
      return project ? project.toObject() : null;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  },

  async createProject(
    data: Omit<Project, "_id" | "createdAt" | "updatedAt">
  ): Promise<Project | null> {
    try {
      await connectDB();
      const project = await Project.create(data);
      return project.toObject();
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  },

  async updateProject(
    id: string,
    data: Partial<Project>
  ): Promise<Project | null> {
    try {
      await connectDB();
      const project = await Project.findByIdAndUpdate(id, data, { new: true });
      return project ? project.toObject() : null;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    try {
      await connectDB();
      await Project.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  },

  // Skills
  async getSkills() {
    try {
      await connectDB();
      const skills = await Skill.find().sort({ level: -1 });
      return skills.map((skill) => skill.toObject());
    } catch (error) {
      console.error("Error fetching skills:", error);
      return [];
    }
  },

  async createSkill(
    data: Omit<Skill, "_id" | "createdAt" | "updatedAt">
  ): Promise<Skill | null> {
    try {
      await connectDB();
      const skill = await Skill.create(data);
      return skill.toObject();
    } catch (error) {
      console.error("Error creating skill:", error);
      return null;
    }
  },

  async updateSkill(id: string, data: Partial<Skill>): Promise<Skill | null> {
    try {
      await connectDB();
      const skill = await Skill.findByIdAndUpdate(id, data, { new: true });
      return skill ? skill.toObject() : null;
    } catch (error) {
      console.error("Error updating skill:", error);
      return null;
    }
  },

  async deleteSkill(id: string): Promise<boolean> {
    try {
      await connectDB();
      await Skill.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Error deleting skill:", error);
      return false;
    }
  },

  // Additional Competencies
  async getAdditionalCompetencies() {
    try {
      await connectDB();
      const competencies = await AdditionalCompetency.find().sort({
        order: 1,
        createdAt: 1,
      });
      return competencies.map((competency) => competency.toObject());
    } catch (error) {
      console.error("Error fetching additional competencies:", error);
      return [];
    }
  },

  async createAdditionalCompetency(
    data: Omit<AdditionalCompetency, "_id" | "createdAt" | "updatedAt">
  ): Promise<AdditionalCompetency | null> {
    try {
      await connectDB();
      const competency = await AdditionalCompetency.create(data);
      return competency.toObject();
    } catch (error) {
      console.error("Error creating additional competency:", error);
      return null;
    }
  },

  async updateAdditionalCompetency(
    id: string,
    data: Partial<AdditionalCompetency>
  ): Promise<AdditionalCompetency | null> {
    try {
      await connectDB();
      const competency = await AdditionalCompetency.findByIdAndUpdate(
        id,
        data,
        { new: true }
      );
      return competency ? competency.toObject() : null;
    } catch (error) {
      console.error("Error updating additional competency:", error);
      return null;
    }
  },

  async deleteAdditionalCompetency(id: string): Promise<boolean> {
    try {
      await connectDB();
      await AdditionalCompetency.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Error deleting additional competency:", error);
      return false;
    }
  },

  // Blog Posts
  async getBlogPosts(options: { limit?: number; excludeId?: string; featured?: boolean } = {}) {
    try {
      await connectDB();
      let query: Record<string, any> = { published: true };
      
      // Add featured filter if specified
      if (options.featured !== undefined) {
        query.featured = options.featured;
      }
      
      // Exclude specific post if needed
      if (options.excludeId) {
        query._id = { $ne: options.excludeId };
      }
      
      let postsQuery = BlogPost.find(query).sort({ date: -1 });
      
      // Apply limit if specified
      if (options.limit) {
        postsQuery = postsQuery.limit(options.limit);
      }
      
      const posts = await postsQuery;
      return posts.map(post => post.toObject());
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },

  async getAllBlogPosts() {
    try {
      await connectDB();
      const posts = await BlogPost.find()
        .sort({ featured: -1, date: -1 })
        .collation({ locale: 'en_US', numericOrdering: true });
      return posts.map((post) => post.toObject());
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      return [];
    }
  },
  
  async getFeaturedBlogPosts(limit = 3) {
    try {
      await connectDB();
      const posts = await BlogPost.find({ 
        published: true,
        featured: true 
      })
        .sort({ date: -1 })
        .limit(limit);
      return posts.map(post => post.toObject());
    } catch (error) {
      console.error("Error fetching featured blog posts:", error);
      return [];
    }
  },

  async getBlogPost(id: string): Promise<BlogPost | null> {
    try {
      await connectDB();
      const post = await BlogPost.findById(id);
      return post ? post.toObject() : null;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }
  },

  async createBlogPost(
    data: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">
  ): Promise<BlogPost | null> {
    try {
      await connectDB();
      const post = await BlogPost.create({
        ...data,
        pdfs: data.pdfs?.map(pdf => ({
          ...pdf,
          downloadCount: pdf.downloadCount || 0
        }))
      });
      return post.toObject();
    } catch (error) {
      console.error("Error creating blog post:", error);
      return null;
    }
  },

  async updateBlogPost(
    id: string,
    data: Partial<BlogPost>
  ): Promise<BlogPost | null> {
    try {
      await connectDB();
      
      const updateData = { ...data };

      // If pdfs are being updated, ensure proper structure and preserve download counts
      if (data.pdfs) {
        const existingPost = await BlogPost.findById(id);
        if (existingPost) {
          updateData.pdfs = data.pdfs.map(newPdf => {
            const existingPdf: { title: string; url: string; downloadCount: number } | undefined = existingPost.pdfs?.find((p: { url: string }) => p.url === newPdf.url);
            return {
              title: newPdf.title?.trim(),
              url: newPdf.url?.trim(),
              downloadCount: existingPdf?.downloadCount || newPdf.downloadCount || 0
            };
          });
        }
      }

      // Use runValidators to ensure schema validation is applied during update
      const post = await BlogPost.findByIdAndUpdate(
        id, 
        updateData, 
        { 
          new: true,
          runValidators: true
        }
      );
      return post ? post.toObject() : null;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw error; // Let the API handle the error response
    }
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    try {
      await connectDB();
      await BlogPost.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return false;
    }
  },

  // Update PDF download count
  async updatePdfDownloadCount(postId: string, pdfUrl: string): Promise<BlogPost | null> {
    try {
      await connectDB();
      const post = await BlogPost.findById(postId);
      if (!post) return null;

      const pdfIndex = (post.pdfs as { url: string }[] | undefined)?.findIndex((p: { url: string }) => p.url === pdfUrl);
      if (typeof pdfIndex !== "number" || pdfIndex < 0) return null;

      post.pdfs[pdfIndex].downloadCount = (post.pdfs[pdfIndex].downloadCount || 0) + 1;
      await post.save();

      return post.toObject();
    } catch (error) {
      console.error("Error updating PDF download count:", error);
      return null;
    }
  },

  // Contact Messages
  async createContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any | null> {
    try {
      await connectDB();
      const contactMessage = new ContactMessage(data);
      await contactMessage.save();
      return contactMessage.toObject();
    } catch (error) {
      console.error("Error creating contact message:", error);
      return null;
    }
  },

  async getContactMessages(): Promise<any[]> {
    try {
      await connectDB();
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return messages.map((message) => message.toObject());
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return [];
    }
  },

  async updateContactMessage(
    id: string,
    data: { read?: boolean; replied?: boolean; priority?: string }
  ): Promise<any | null> {
    try {
      await connectDB();
      const message = await ContactMessage.findByIdAndUpdate(id, data, {
        new: true,
      });
      return message ? message.toObject() : null;
    } catch (error) {
      console.error("Error updating contact message:", error);
      return null;
    }
  },

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      await connectDB();
      await ContactMessage.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Error deleting contact message:", error);
      return false;
    }
  },
};

export { connectDB, PersonalInfo, Project, Skill, BlogPost, ContactMessage };
