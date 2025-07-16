"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { useState, useEffect } from "react";
import { apiService } from "@/lib/api-service";
import { BlogPost } from "@/types";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Blog() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await apiService.getBlogPosts();
        setBlogPosts(posts.filter((post: BlogPost) => post.published));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Technical Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sharing insights, tutorials, and thoughts on AI, machine learning,
              and software development.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-48 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 h-full cursor-pointer bg-card/50 backdrop-blur-sm">
                    <CardContent
                      className="p-0"
                      onClick={() => handlePostClick(post._id!)}
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={post.image || "/api/placeholder/400/200"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date
                              ? new Date(post.date).toLocaleDateString()
                              : new Date(
                                  post.createdAt || Date.now()
                                ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.read_time || "5 min read"}
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button variant="outline" className="group/btn mt-auto">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3>
              <p className="text-muted-foreground">
                Check back later for articles and insights on AI, ML, and
                software development.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
