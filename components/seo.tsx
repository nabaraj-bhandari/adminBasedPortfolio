"use client";

import Head from "next/head";
import { StructuredData } from "./structured-data";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any;
}

export function SEO({
  title = "Portfolio - Full Stack Developer",
  description = "Personal portfolio showcasing full-stack development projects, skills, and technical blog posts.",
  keywords = "Portfolio, Full Stack Developer, Next.js, TypeScript, MongoDB, React, Web Development",
  image = "/og-image.jpg",
  url = "https://your-portfolio-domain.com",
  type = "website",
  publishedTime,
  modifiedTime,
  structuredData,
}: SEOProps) {
  const fullImageUrl = image.startsWith("http") ? image : `${url}${image}`;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta
          property="og:site_name"
          content="Portfolio - Full Stack Developer"
        />

        {type === "article" && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {type === "article" && modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImageUrl} />
        <meta name="twitter:creator" content="@yourusername" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Canonical URL */}
        <link rel="canonical" href={url} />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Structured Data */}
      {structuredData && <StructuredData data={structuredData} />}
    </>
  );
}
