"use client";
import { apiService } from "@/lib/api-service";
import type { BlogPost } from "@/types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { PdfViewer } from "@/components/blog/pdf-viewer";
import { RelatedPosts } from "@/components/blog/related-posts";
import { fadeInUp } from "@/lib/animations";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;

      try {
        const postData = await apiService.getBlogPost(params.id as string);
        if (postData && postData.published) {
          setPost(postData);
          setLoading(false);

          try {
            const relatedData = await fetch(
              `/api/blog?limit=4&exclude=${params.id}`,
              { cache: "no-store" }
            ).then((res) => (res.ok ? res.json() : []));

            const related = Array.isArray(relatedData)
              ? relatedData
                  .filter((p: BlogPost) => p._id !== params.id && p.published)
                  .slice(0, 3)
              : [];
            setRelatedPosts(related);
          } catch (relatedError) {
            console.error("Error fetching related posts:", relatedError);
          } finally {
            setRelatedLoading(false);
          }
        } else {
          router.push("/blog");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        router.push("/blog");
      }
    };

    fetchData();
  }, [params.id, router]);

  // Page components handle their own functionality

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Button>

            <BlogHeader
              title={post.title}
              date={post.date}
              readTime={post.read_time}
              tags={post.tags}
              image={post.image}
            />

            <BlogContent content={post.content} />

            <PdfViewer pdfs={post.pdfs || []} />

            <RelatedPosts posts={relatedPosts} loading={relatedLoading} />
          </motion.div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
