import { connectDB } from "../lib/mongodb";

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    await connectDB();
    console.log("✅ MongoDB connection successful!");
    process.exit(0);
  } catch (error) {
    console.error(
      "❌ MongoDB connection failed:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

testConnection();
