"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface DynamicLogoProps {
  className?: string;
}

// Cache for logo text to prevent glitching
let cachedLogoText: string | null = null;
let isFetching = false;

export default function DynamicLogo({ className = "" }: DynamicLogoProps) {
  const [logoText, setLogoText] = useState(cachedLogoText || "Portfolio");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only fetch if we don't have cached data and not already fetching
    if (!cachedLogoText && !isFetching) {
      isFetching = true;
      const fetchPersonalInfo = async () => {
        try {
          const response = await fetch("/api/personal-info");
          if (response.ok) {
            const info = await response.json();
            const processedText = getLogoText(info.full_name || "Portfolio");
            cachedLogoText = processedText;
            setLogoText(processedText);
          }
        } catch (error) {
          console.error("Error fetching personal info:", error);
        } finally {
          isFetching = false;
        }
      };

      fetchPersonalInfo();
    } else if (cachedLogoText) {
      setLogoText(cachedLogoText);
    }
  }, []);

  // Extract initials or first two words
  const getLogoText = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return words.slice(0, 2).join(" ");
    }
    return name;
  };

  if (!mounted) {
    return <div className={`text-2xl font-bold ${className}`}>Portfolio</div>;
  }

  // Create gradient classes based on theme
  const gradientClass =
    theme === "dark"
      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`text-2xl font-bold ${className}`}
    >
      <span className={gradientClass}>{logoText}</span>
    </motion.div>
  );
}
