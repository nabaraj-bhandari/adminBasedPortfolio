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

    // Seed Personal Info
    const personalInfo = await PersonalInfo.create({
      full_name: "Your Name",
      title: "Full Stack Developer",
      description:
        "Passionate developer building modern web applications with cutting-edge technologies.",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "Your City, Country",
      resume_url: "#",
      profile_picture:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
      website: "https://yourwebsite.com",
    });
    console.log("✅ Personal info seeded");

    // Seed Projects (2 sample projects)
    const projects = await Project.insertMany([
      {
        title: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with Next.js, MongoDB, and Stripe integration.",
        image:
          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
        tags: ["Next.js", "MongoDB", "Stripe", "TypeScript"],
        github: "https://github.com/yourusername/ecommerce",
        demo: "https://yourecommerce.vercel.app",
        date: new Date("2024-01-15"),
        featured: true,
      },
      {
        title: "Task Management App",
        description:
          "Modern task management application with real-time collaboration features.",
        image:
          "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
        tags: ["React", "Node.js", "Socket.io", "PostgreSQL"],
        github: "https://github.com/yourusername/taskapp",
        demo: "https://yourtaskapp.vercel.app",
        date: new Date("2024-02-20"),
        featured: true,
      },
    ]);
    console.log("✅ Projects seeded");

    // Seed Skills (essential skills only)
    const skills = await Skill.insertMany([
      { name: "JavaScript", level: 90, category: "programming" },
      { name: "TypeScript", level: 85, category: "programming" },
      { name: "React", level: 88, category: "web" },
      { name: "Next.js", level: 85, category: "web" },
      { name: "Node.js", level: 82, category: "web" },
      { name: "MongoDB", level: 80, category: "database" },
      { name: "PostgreSQL", level: 75, category: "database" },
      { name: "Docker", level: 78, category: "cloud" },
    ]);
    console.log("✅ Skills seeded");

    // Seed Blog Posts (2 sample posts)
    const blogPosts = await BlogPost.insertMany([
      {
        title: "Getting Started with Next.js 14",
        excerpt:
          "A comprehensive guide to building modern web applications with Next.js 14 and its new features.",
        content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements that make building web applications faster and more efficient.

## Key Features

- **App Router**: New file-based routing system
- **Server Components**: Improved performance with server-side rendering
- **Turbopack**: Faster development with the new bundler

## Creating Your First App

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will create a new Next.js application with all the latest features enabled.`,
        image:
          "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
        tags: ["Next.js", "React", "Web Development"],
        date: new Date("2024-01-15"),
        read_time: "5 min read",
        published: true,
      },
      {
        title: "Modern State Management in React",
        excerpt:
          "Exploring different state management solutions in React applications and when to use them.",
        content: `# Modern State Management in React

State management is crucial for building scalable React applications. Let's explore the modern approaches.

## Built-in Solutions

React provides several built-in hooks for state management:

\`\`\`jsx
import { useState, useReducer, useContext } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

This covers the basics of React state management with hooks.`,
        image:
          "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400",
        tags: ["React", "State Management", "JavaScript"],
        date: new Date("2024-02-20"),
        read_time: "7 min read",
        published: true,
      },
    ]);
    console.log("✅ Blog posts seeded");

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
