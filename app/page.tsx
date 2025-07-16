"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState({
    full_name: "AI/ML Developer",
    title: "AI/ML Developer",
    description:
      "Building intelligent systems and sharing knowledge through code. Passionate about machine learning, deep learning, and creating innovative solutions.",
    resume_url: "#",
    profile_picture: "",
  });

  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [skills, setSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch("/api/personal-info");
        if (response.ok) {
          const info = await response.json();
          setPersonalInfo(info);
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    const fetchFeaturedProjects = async () => {
      try {
        console.log("Fetching featured projects...");
        const response = await fetch("/api/projects/featured");
        console.log("Featured projects response status:", response.status);
        if (response.ok) {
          const projects = await response.json();
          console.log("Featured projects data:", projects);
          setFeaturedProjects(projects);
        } else {
          console.error(
            "Failed to fetch featured projects:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const skillsData = await response.json();
          // Get only top 6 skills for home page preview
          setSkills(skillsData.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    fetchPersonalInfo();
    fetchFeaturedProjects();
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
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
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-primary to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    {personalInfo.profile_picture ? (
                      <img
                        src={personalInfo.profile_picture}
                        alt={personalInfo.full_name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center rounded-full">
                        <span className="text-2xl sm:text-3xl font-bold text-primary">
                          {personalInfo.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
            >
              {personalInfo.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {personalInfo.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
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
                  href={personalInfo.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-center mb-12"
            >
              Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoadingProjects ? (
                // Loading skeletons
                [...Array(3)].map((_, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="bg-card/50 backdrop-blur-sm">
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
                ))
              ) : featuredProjects.length > 0 ? (
                featuredProjects.map((project: any, index) => (
                  <motion.div key={project._id || index} variants={fadeInUp}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-primary/10 to-purple-600/10 border border-border/50">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
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
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
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
                        <div className="flex space-x-2">
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
                ))
              ) : (
                // No featured projects message
                <motion.div
                  variants={fadeInUp}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-muted-foreground text-lg">
                    No featured projects yet.{" "}
                    <Link
                      href="/projects"
                      className="text-primary hover:underline"
                    >
                      View all projects
                    </Link>
                  </p>
                </motion.div>
              )}
            </div>

            {/* View All Projects Button */}
            {!isLoadingProjects && featuredProjects.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href="/projects">
                    View All Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12">
              Skills & Technologies
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {isLoadingSkills ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border"
                  >
                    <div className="w-12 h-12 bg-muted animate-pulse rounded-lg mx-auto mb-2"></div>
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                  </motion.div>
                ))
              ) : skills.length > 0 ? (
                skills.map((skill: any) => (
                  <motion.div
                    key={skill._id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center border border-border/50">
                      <span className="text-primary font-bold">
                        {skill.name[0].toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-center">
                      {skill.name}
                    </h3>
                    <div className="mt-2 w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-primary to-purple-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-1">
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
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
              Let's Build Something Amazing Together
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
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
