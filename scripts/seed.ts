import { config } from "dotenv";
import {
  connectDB,
  PersonalInfo,
  Project,
  Skill,
  BlogPost,
} from "../lib/mongodb";

// Load environment variables
config({ path: ".env.local" });

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await PersonalInfo.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await BlogPost.deleteMany({});
    console.log("Cleared existing data");

    // No default seeding for production - admin will add real data
    console.log("✅ Database cleared successfully");
    console.log("✅ Blog posts seeded");

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
