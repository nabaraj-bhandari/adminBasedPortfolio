import React from "react";

interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs: string[];
  address?: {
    "@type": string;
    addressLocality: string;
    addressCountry: string;
  };
}

interface WebsiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  author: {
    "@type": string;
    name: string;
  };
}

interface BlogPostSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image?: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

interface ProjectSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url?: string;
  image?: string;
  author: {
    "@type": string;
    name: string;
  };
  programmingLanguage?: string[];
  applicationCategory: string;
}

export function generatePersonSchema(personalInfo?: {
  full_name: string;
  title: string;
  description: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
}): PersonSchema {
  const defaultInfo = {
    full_name: "Your Name",
    title: "Full Stack Developer",
    description:
      "Experienced full-stack developer specializing in modern web technologies",
    location: "Your Location",
    website: "https://your-portfolio-domain.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  };

  const info = personalInfo || defaultInfo;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: info.full_name,
    jobTitle: info.title,
    description: info.description,
    url: info.website,
    sameAs: [info.github, info.linkedin, info.twitter, info.website].filter(
      Boolean
    ),
    address: {
      "@type": "PostalAddress",
      addressLocality: info.location.split(",")[0] || "City",
      addressCountry: info.location.split(",")[1]?.trim() || "Country",
    },
  };
}

export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    name: "Portfolio - Full Stack Developer",
    url: "https://your-portfolio-domain.com",
    description:
      "Personal portfolio showcasing full-stack development projects, skills, and technical blog posts",
    author: {
      "@type": "Person",
      name: "Your Name",
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  updatedAt?: string;
  slug: string;
}): BlogPostSchema {
  const baseUrl = "https://your-portfolio-domain.com";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    publisher: {
      "@type": "Person",
      name: "Your Name",
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  demo?: string;
  image?: string;
  tags: string[];
}): ProjectSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.demo,
    image: project.image,
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    programmingLanguage: project.tags,
    applicationCategory: "Web Application",
  };
}

// Helper function to generate script tag content
export function generateStructuredDataScript(data: any): string {
  return JSON.stringify(data);
}
