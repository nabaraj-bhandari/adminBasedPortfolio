"use client";

import { Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface BlogHeaderProps {
  title: string;
  date: Date | string;
  readTime: string;
  tags: string[];
  image: string;
}

export function BlogHeader({
  title,
  date,
  readTime,
  tags,
  image,
}: BlogHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      className="mb-6 sm:mb-8"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">{readTime}</span>
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
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="tag-badge">
            <Tag className="tag-icon" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="blog-header-image relative rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </motion.div>
  );
}
