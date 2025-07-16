import type { Metadata } from "next";
import {
  generateMetadata as createMetadata,
  generateBlogPostMetadata,
} from "@/lib/metadata";
import { dbOperations } from "@/lib/mongodb";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await dbOperations.getBlogPost(params.id);

    if (!post || !post.published) {
      return createMetadata({
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      });
    }

    const blogMetadata = generateBlogPostMetadata({
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      date: post.date.toString(),
      image: post.image,
      slug: params.id,
    });

    return createMetadata(blogMetadata);
  } catch (error) {
    console.error("Error generating blog post metadata:", error);
    return createMetadata({
      title: "Blog Post",
      description: "Technical blog post",
    });
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
