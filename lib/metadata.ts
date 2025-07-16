import type { Metadata } from "next";

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

const defaultMetadata: PageMetadata = {
  title: "Nabaraj Bhandari - Portfolio",
  description:
    "Personal portfolio of Nabaraj Bhandari - Computer Engineer, Full Stack Developer, and AI/ML Engineer showcasing innovative projects, skills, and technical expertise. Built with Next.js, TypeScript, and MongoDB.",
  keywords: [
    "Nabaraj Bhandari",
    "Portfolio",
    "Computer Engineer",
    "Full Stack Developer",
    "AI ML Engineer",
    "Machine Learning",
    "Artificial Intelligence",
    "Next.js",
    "TypeScript",
    "MongoDB",
    "React",
    "Web Development",
    "Frontend",
    "Backend",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "Data Science",
    "Python",
  ],
  image: "/og-image.svg",
  url: "https://nabaraj-bhandari.com.np",
  type: "website",
  authors: ["Nabaraj Bhandari"],
};

export function generateMetadata(
  pageMetadata: Partial<PageMetadata> = {}
): Metadata {
  const merged = { ...defaultMetadata, ...pageMetadata };

  const title = merged.title;
  const description = merged.description!;
  const keywords = merged.keywords!.join(", ");
  const image = merged.image!;
  const url = merged.url!;

  return {
    metadataBase: new URL("https://nabaraj-bhandari.com.np"),
    title,
    description,
    keywords,
    authors: merged.authors?.map((name) => ({ name })),
    creator: merged.authors?.[0],
    publisher: merged.authors?.[0],

    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: "Nabaraj Bhandari - Computer Engineer & Full Stack Developer",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: merged.type as any,
      ...(merged.type === "article" && {
        publishedTime: merged.publishedTime,
        modifiedTime: merged.modifiedTime,
        authors: merged.authors,
        section: merged.section,
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@nabaraj_bhandari", // Updated with your name
    },

    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification
    verification: {
      google: "qneidnnOhPJiK57aVDlDSXM2hcRiHiEwT9Hz811VNBc",
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },

    // Manifest
    manifest: "/manifest.json",

    // Icons
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "manifest",
          url: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          url: "/favicon.svg",
          color: "#000000",
        },
      ],
    },

    // Additional meta tags
    other: {
      "theme-color": "#000000",
      "msapplication-TileColor": "#000000",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title:
      "Nabaraj Bhandari - Computer Engineer | Full Stack Developer & AI/ML Engineer",
    description:
      "Computer Engineer Nabaraj Bhandari specializing in Full Stack Development and AI/ML Engineering. Expert in Next.js, React, TypeScript, MongoDB, Python, and Machine Learning. Explore innovative projects and technical expertise.",
    keywords: [
      "Nabaraj Bhandari",
      "Computer Engineer",
      "Full Stack Developer",
      "AI ML Engineer",
      "Machine Learning Engineer",
      "Artificial Intelligence",
      "Portfolio",
      "Next.js Developer",
      "React Developer",
      "TypeScript",
      "MongoDB",
      "Python",
      "Data Science",
      "Web Development",
      "Frontend Development",
      "Backend Development",
    ],
  },

  projects: {
    title:
      "Projects - Nabaraj Bhandari | Full Stack Development & AI/ML Portfolio",
    description:
      "Explore Nabaraj Bhandari's collection of full-stack development and AI/ML projects built with modern technologies like Next.js, React, TypeScript, MongoDB, and Python.",
    keywords: [
      "Nabaraj Bhandari Projects",
      "Projects",
      "Full Stack Projects",
      "AI ML Projects",
      "Next.js Projects",
      "React Projects",
      "TypeScript Projects",
      "Python Projects",
      "Web Applications",
      "Portfolio Projects",
    ],
  },

  blog: {
    title: "Blog - Nabaraj Bhandari | Technical Articles & Tutorials",
    description:
      "Read technical articles and tutorials by Nabaraj Bhandari about web development, Next.js, React, TypeScript, and modern development practices.",
    keywords: [
      "Nabaraj Bhandari Blog",
      "Blog",
      "Technical Blog",
      "Web Development Blog",
      "Next.js Tutorials",
      "React Tutorials",
      "TypeScript Articles",
      "Programming Blog",
    ],
  },

  skills: {
    title: "Skills - Nabaraj Bhandari | Technical Expertise & Proficiency",
    description:
      "Comprehensive overview of Nabaraj Bhandari's technical skills including frontend, backend, databases, and development tools.",
    keywords: [
      "Nabaraj Bhandari Skills",
      "Skills",
      "Technical Skills",
      "Programming Languages",
      "Frontend Skills",
      "Backend Skills",
      "Web Development Skills",
      "Technology Stack",
    ],
  },

  contact: {
    title: "Contact - Nabaraj Bhandari | Get In Touch",
    description:
      "Get in touch with Nabaraj Bhandari for collaboration opportunities, project inquiries, or technical discussions. Available for freelance and full-time opportunities.",
    keywords: [
      "Contact Nabaraj Bhandari",
      "Contact",
      "Hire Developer",
      "Freelance Developer",
      "Collaboration",
      "Project Inquiry",
      "Full Stack Developer Contact",
    ],
  },

  admin: {
    title: "Admin Panel - Nabaraj Bhandari | Content Management",
    description:
      "Secure admin panel for Nabaraj Bhandari's portfolio content management.",
    keywords: ["Admin", "Content Management", "Dashboard", "Nabaraj Bhandari"],
  },
};

// Helper function to generate blog post metadata
export function generateBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  image?: string;
  slug?: string;
}): PageMetadata {
  return {
    title: `${post.title} - Nabaraj Bhandari's Blog`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      "Blog",
      "Technical Article",
      "Tutorial",
      "Nabaraj Bhandari",
    ],
    image: post.image || "/og-image.svg",
    url: `https://nabaraj-bhandari.com.np/blog/${post.slug}`,
    type: "article",
    publishedTime: new Date(post.date).toISOString(),
    section: "Technology",
  };
}

// Helper function to generate project metadata
export function generateProjectMetadata(project: {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  slug?: string;
}): PageMetadata {
  return {
    title: `${project.title} - Nabaraj Bhandari's Portfolio`,
    description: project.description,
    keywords: [
      ...project.tags,
      "Project",
      "Portfolio",
      "Web Development",
      "Nabaraj Bhandari",
    ],
    image: project.image || "/og-image.svg",
    url: `https://nabaraj-bhandari.com.np/projects/${project.slug}`,
    type: "website",
  };
}
