"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useProjects } from "@/hooks/use-cached-data";
import { Project } from "@/types";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Projects() {
  const { projects, isLoading: loading, error } = useProjects();

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
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of AI/ML projects and applications I've built,
              showcasing different technologies and approaches.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-48 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-muted rounded w-20"></div>
                    <div className="h-8 bg-muted rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={project.image || "/api/placeholder/600/300"}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">
                            {project.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.date
                              ? new Date(project.date).toLocaleDateString()
                              : new Date(
                                  project.createdAt || Date.now()
                                ).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag: string) => (
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

                        <div className="flex space-x-3">
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
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground">
                Projects showcasing AI/ML applications and other innovative
                solutions will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
