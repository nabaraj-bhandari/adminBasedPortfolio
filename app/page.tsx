"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { fadeInUp, staggerChildren } from "@/lib/animations";

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    title: "",
    description: "",
    resume_url: "",
    profile_picture: "",
  });

  const [isLoadingPersonalInfo, setIsLoadingPersonalInfo] = useState(true);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for better viewport detection
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch all data in parallel for better performance
    const fetchAllData = async () => {
      try {
        const [personalInfoResponse, featuredBlogsResponse] = await Promise.all(
          [
            fetch("/api/personal-info", {
              next: { revalidate: 3600 }, // Cache for 1 hour
            }),
            fetch("/api/blog?limit=3", {
              next: { revalidate: 300 }, // Cache for 5 minutes
            }),
          ]
        );

        // Process personal info
        if (personalInfoResponse.ok) {
          const info = await personalInfoResponse.json();
          setPersonalInfo(info);
        }
        setIsLoadingPersonalInfo(false);

        // Process featured blogs
        if (featuredBlogsResponse.ok) {
          const blogs = await featuredBlogsResponse.json();
          setFeaturedBlogs(blogs.slice(0, 3)); // Get top 3 blogs
        }
        setIsLoadingBlogs(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoadingPersonalInfo(false);
        setIsLoadingBlogs(false);
      }
    };

    fetchAllData();
  }, []);

  // Optimize animations and ensure cleanup
  useEffect(() => {
    // Add will-change hint for smoother animations
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.willChange = "transform, opacity";
      }
    });

    // Cleanup animation styles after they complete
    const cleanup = () => {
      animatedElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.willChange = "auto";
        }
      });
    };

    const timer = setTimeout(cleanup, 1000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [mounted]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              className="text-center"
            >
              {/* Profile Picture */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center mb-6 sm:mb-8"
              >
                <div className="relative">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 p-1">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {isLoadingPersonalInfo ? (
                        <div className="w-full h-full bg-muted animate-pulse rounded-full"></div>
                      ) : personalInfo.profile_picture ? (
                        <Image
                          src={personalInfo.profile_picture}
                          alt={personalInfo.full_name}
                          width={224}
                          height={224}
                          className="w-full h-full object-cover rounded-full"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XqoFXDrOinP2rMZgNNuEV8XaM4mJgVJeg654EZWO5v2KjXZg=="
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center rounded-full">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                            {personalInfo.full_name
                              ? personalInfo.full_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6 unselectable leading-tight lg:leading-tight xl:leading-tight px-2 sm:px-4"
              >
                {isLoadingPersonalInfo ? (
                  <div className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 bg-gradient-to-r from-muted via-muted to-muted animate-pulse rounded-lg w-full max-w-6xl mx-auto"></div>
                ) : (
                  <span className="block break-words text-center max-w-6xl mx-auto px-2 sm:px-4">
                    {personalInfo.title || "Enter your title in admin panel"}
                  </span>
                )}
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed unselectable px-2 sm:px-4"
              >
                {isLoadingPersonalInfo ? (
                  <div className="space-y-2">
                    <div className="h-6 bg-muted animate-pulse rounded w-full"></div>
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4 mx-auto"></div>
                  </div>
                ) : (
                  <p>
                    {personalInfo.description ||
                      "Add your description in the admin panel"}
                  </p>
                )}
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {isLoadingPersonalInfo ? (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="h-12 w-40 bg-muted animate-pulse rounded-lg"></div>
                    <div className="h-12 w-44 bg-muted animate-pulse rounded-lg"></div>
                  </div>
                ) : (
                  <>
                    <Button size="lg" className="group shadow-lg" asChild>
                      <Link href="/projects">
                        View My Work
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group shadow-lg"
                      asChild
                    >
                      <a
                        href={personalInfo.resume_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 w-4 h-4" />
                        Download Resume
                      </a>
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 blog-section section-divider">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center animate-on-scroll"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-12 unselectable"
            >
              Latest Blog Posts
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {isLoadingBlogs ? (
                // Loading skeletons
                [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="rounded-lg overflow-hidden theme-card"
                  >
                    <div className="h-48 bg-muted animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-muted animate-pulse rounded mb-4"></div>
                      <div className="h-4 bg-muted animate-pulse rounded mb-2 w-2/3"></div>
                      <div className="h-4 bg-muted animate-pulse rounded mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                        <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : featuredBlogs.length > 0 ? (
                featuredBlogs.map((blog: any) => (
                  <motion.div
                    key={blog._id}
                    variants={fadeInUp}
                    className="group"
                  >
                    <Link href={`/blog/${blog._id}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border hover:border-primary/20">
                        <div className="h-48 overflow-hidden">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6 text-left">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              {new Date(blog.date).toLocaleDateString()}
                            </div>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full ml-auto">
                              {blog.read_time}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-left">
                            {blog.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 mb-4 text-left">
                            {blog.excerpt}
                          </p>
                          <div className="flex flex-wrap items-start gap-2">
                            {blog.tags
                              .slice(0, 2)
                              .map((tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              ) : (
                // No blog posts message
                <motion.div
                  variants={fadeInUp}
                  className="col-span-full text-center py-8"
                >
                  <p className="text-muted-foreground">
                    No blog posts published yet.{" "}
                    <Link href="/blog" className="text-primary hover:underline">
                      View blog page
                    </Link>
                  </p>
                </motion.div>
              )}
            </div>

            {/* View All Blog Posts Button */}
            {!isLoadingBlogs && featuredBlogs.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-12">
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    Read More Posts
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1, margin: "-100px" }}
            variants={staggerChildren}
            className="animate-on-scroll"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-6 unselectable"
            >
              Let's Build Something Amazing Together
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 leading-relaxed unselectable"
            >
              I'm always interested in new opportunities and collaborations.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button size="lg" className="group shadow-lg" asChild>
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
