"use client";
import { apiService } from "@/lib/api-service";
import type { BlogPost } from "@/types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Lazy load heavy components
const ReactMarkdown = dynamic(() => import("react-markdown"), {
  loading: () => <div className="animate-pulse bg-muted h-32 rounded"></div>,
});

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism as any),
  {
    loading: () => <div className="animate-pulse bg-muted h-20 rounded"></div>,
  }
);

// Import the theme synchronously for now to avoid complexity
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

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
        // Fetch the main post first for faster initial render
        const postData = await apiService.getBlogPost(params.id as string);

        if (postData && postData.published) {
          setPost(postData);
          setLoading(false); // Show main content immediately

          // Fetch related posts in the background
          try {
            const relatedData = await fetch(
              `/api/blog?limit=4&exclude=${params.id}`,
              {
                next: { revalidate: 300 },
              }
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

  const handleShare = async () => {
    if (!post) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

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

            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{post.read_time}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto text-xs sm:text-sm"
                >
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 sm:mb-8">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs sm:text-sm"
                  >
                    <Tag className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-6 sm:mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="markdown-content selectable">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({ node, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !match;
                        return !isInline ? (
                          <SyntaxHighlighter
                            style={tomorrow as any}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg text-sm"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => (
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-foreground border-b border-border pb-2">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3 text-foreground">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base sm:text-lg lg:text-xl font-medium mt-4 sm:mt-5 mb-2 text-foreground">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="mb-3 sm:mb-4 text-sm sm:text-base text-foreground/90 leading-6 sm:leading-7">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 text-sm sm:text-base text-foreground/90">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 text-sm sm:text-base text-foreground/90">
                          {children}
                        </ol>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-3 sm:pl-4 py-2 mb-3 sm:mb-4 bg-muted/50 rounded-r-md italic text-sm sm:text-base text-foreground/80">
                          {children}
                        </blockquote>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors text-sm sm:text-base"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      img: ({ src, alt }) => (
                        <img
                          src={src}
                          alt={alt}
                          className="rounded-lg mb-3 sm:mb-4 max-w-full h-auto"
                        />
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {(relatedPosts.length > 0 || relatedLoading) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 sm:mt-16"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {relatedLoading
                    ? // Loading skeletons for related posts
                      [...Array(3)].map((_, i) => (
                        <Card key={i} className="bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-0">
                            <div className="h-24 sm:h-32 bg-muted animate-pulse rounded-t-lg"></div>
                            <div className="p-3 sm:p-4">
                              <div className="h-3 sm:h-4 bg-muted animate-pulse rounded mb-2"></div>
                              <div className="h-2 sm:h-3 bg-muted animate-pulse rounded w-3/4"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    : relatedPosts.map((relatedPost) => (
                        <Card
                          key={relatedPost._id}
                          className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm"
                          onClick={() =>
                            router.push(`/blog/${relatedPost._id}`)
                          }
                        >
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden rounded-t-lg">
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <div className="p-3 sm:p-4">
                              <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                {relatedPost.excerpt}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
