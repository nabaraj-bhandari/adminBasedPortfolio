"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    title: "",
    description: "",
    resume_url: "",
    profile_picture: "",
  });

  const [isLoadingPersonalInfo, setIsLoadingPersonalInfo] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [skills, setSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for better viewport detection
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch all data in parallel for better performance
    const fetchAllData = async () => {
      try {
        const [personalInfoResponse, featuredProjectsResponse, skillsResponse] =
          await Promise.all([
            fetch("/api/personal-info", {
              cache: "no-store", // Always fetch fresh data
            }),
            fetch("/api/projects/featured", {
              cache: "no-store", // Always fetch fresh data
            }),
            fetch("/api/skills", {
              cache: "no-store", // Always fetch fresh data
            }),
          ]);

        // Process personal info
        if (personalInfoResponse.ok) {
          const info = await personalInfoResponse.json();
          setPersonalInfo(info);
        }
        setIsLoadingPersonalInfo(false);

        // Process featured projects
        if (featuredProjectsResponse.ok) {
          const projects = await featuredProjectsResponse.json();
          setFeaturedProjects(projects);
        } else {
          console.error(
            "Failed to fetch featured projects:",
            featuredProjectsResponse.statusText
          );
        }
        setIsLoadingProjects(false);

        // Process skills
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          // Get more skills for desktop view, fewer for mobile
          setSkills(skillsData.slice(0, 8));
        }
        setIsLoadingSkills(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoadingPersonalInfo(false);
        setIsLoadingProjects(false);
        setIsLoadingSkills(false);
      }
    };

    fetchAllData();
  }, []);

  // Fallback for animation issues - ensure content is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
      hiddenElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
        }
      });
    }, 3000); // Fallback after 3 seconds

    return () => clearTimeout(timer);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="h-[100dvh] sm:min-h-screen flex items-center pt-16 pb-8 sm:pt-24 sm:pb-16 lg:pb-32 px-4 sm:px-6 lg:px-8 hero-section">
        <div className="max-w-7xl mx-auto w-full">
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
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-alternate featured-section section-divider">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2, margin: "-50px" }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-center mb-12 unselectable"
            >
              Featured Projects
            </motion.h2>

            {isLoadingProjects ? (
              // Loading skeletons
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="theme-card">
                      <CardContent className="p-6">
                        <div className="h-48 bg-muted animate-pulse rounded-lg mb-4"></div>
                        <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                        <div className="h-4 bg-muted animate-pulse rounded mb-4"></div>
                        <div className="flex space-x-2">
                          <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
                          <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : featuredProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {featuredProjects.map((project: any, index) => (
                    <motion.div key={project._id || index} variants={fadeInUp}>
                      <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 theme-card h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={192}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XqoFXDrOinP2rMZgNNuEV8XaM4mJgVJeg654EZWO5v2KjXZg="
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-muted-foreground">
                                  Project Image
                                </span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-grow">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags
                              .slice(0, 3)
                              .map((tag: string, tagIndex: number) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2 mt-auto">
                            {project.github && (
                              <Button size="sm" variant="outline" asChild>
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="w-4 h-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                            {project.demo && (
                              <Button size="sm" asChild>
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Demo
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* View All Projects Button */}
                <motion.div variants={fadeInUp} className="mt-12 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/projects">
                      View All Projects
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </>
            ) : (
              // No featured projects message
              <motion.div variants={fadeInUp} className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    No Featured Projects Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Featured projects will appear here once they're marked as
                    featured. In the meantime, check out all available projects.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/projects">
                      Browse All Projects
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 skills-section section-divider">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2, margin: "-50px" }}
            variants={staggerChildren}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-12 unselectable"
            >
              Skills & Technologies
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 max-w-6xl mx-auto">
              {isLoadingSkills ? (
                // Loading skeletons
                [...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="p-4 md:p-6 theme-card rounded-lg"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-muted animate-pulse rounded-lg mx-auto mb-3"></div>
                    <div className="h-4 md:h-5 bg-muted animate-pulse rounded"></div>
                  </motion.div>
                ))
              ) : skills.length > 0 ? (
                skills.map((skill: any) => (
                  <motion.div
                    key={skill._id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 md:p-6 theme-card rounded-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center border border-border/50">
                      <span className="text-primary font-bold text-base md:text-lg">
                        {skill.name[0].toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-medium text-center line-clamp-1 mb-2">
                      {skill.name}
                    </h3>
                    <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/60 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
                      {skill.level}%
                    </p>
                  </motion.div>
                ))
              ) : (
                // No skills message
                <motion.div
                  variants={fadeInUp}
                  className="col-span-full text-center py-8"
                >
                  <p className="text-muted-foreground">
                    No skills added yet.{" "}
                    <Link
                      href="/skills"
                      className="text-primary hover:underline"
                    >
                      View skills page
                    </Link>
                  </p>
                </motion.div>
              )}
            </div>

            {/* View All Skills Button */}
            {!isLoadingSkills && skills.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-8">
                <Button variant="outline" asChild>
                  <Link href="/skills">
                    View All Skills
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
            viewport={{ once: true, amount: 0.3, margin: "-50px" }}
            variants={staggerChildren}
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
