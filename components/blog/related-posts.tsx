"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BlogPost } from "@/types";
import { useRouter } from "next/navigation";

interface RelatedPostsProps {
  posts: BlogPost[];
  loading?: boolean;
}

export function RelatedPosts({ posts, loading = false }: RelatedPostsProps) {
  const router = useRouter();

  if (!loading && posts.length === 0) {
    return null;
  }

  return (
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
        {loading
          ? [...Array(3)].map((_, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm">
                <div className="p-0">
                  <div className="h-24 sm:h-32 bg-muted animate-pulse rounded-t-lg"></div>
                  <div className="p-3 sm:p-4">
                    <div className="h-3 sm:h-4 bg-muted animate-pulse rounded mb-2"></div>
                    <div className="h-2 sm:h-3 bg-muted animate-pulse rounded w-3/4"></div>
                  </div>
                </div>
              </Card>
            ))
          : posts.map((post) => (
              <Card
                key={post._id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm"
                onClick={() => router.push(`/blog/${post._id}`)}
              >
                <div className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </motion.div>
  );
}
