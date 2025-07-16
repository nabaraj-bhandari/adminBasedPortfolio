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

// MongoDB connection
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Schemas
const PersonalInfoSchema = new mongoose.Schema(
  {
    full_name: { type: String, default: "Your Name" },
    title: { type: String, default: "AI/ML Developer" },
    description: {
      type: String,
      default:
        "Building intelligent systems and sharing knowledge through code.",
    },
    email: { type: String, default: "your.email@example.com" },
    phone: { type: String, default: "+1 (555) 123-4567" },
    location: { type: String, default: "San Francisco, CA" },
    resume_url: { type: String, default: "#" },
    profile_picture: { type: String, default: "" },
    github: { type: String, default: "https://github.com/yourusername" },
    linkedin: { type: String, default: "https://linkedin.com/in/yourusername" },
    twitter: { type: String, default: "https://twitter.com/yourusername" },
    website: { type: String, default: "https://yourwebsite.com" },
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
  async getBlogPosts() {
    try {
      await connectDB();
      const posts = await BlogPost.find({ published: true }).sort({ date: -1 });
      return posts.map((post) => post.toObject());
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },

  async getAllBlogPosts() {
    try {
      await connectDB();
      const posts = await BlogPost.find().sort({ date: -1 });
      return posts.map((post) => post.toObject());
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
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
      const post = await BlogPost.create(data);
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
      const post = await BlogPost.findByIdAndUpdate(id, data, { new: true });
      return post ? post.toObject() : null;
    } catch (error) {
      console.error("Error updating blog post:", error);
      return null;
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
};

export { connectDB, PersonalInfo, Project, Skill, BlogPost };
