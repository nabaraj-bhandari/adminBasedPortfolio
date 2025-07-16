"use client";

import { motion } from "framer-motion";
import { Code, Database, Cloud, Brain, Wrench, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";

const skillCategoryConfig = [
  { id: "programming", title: "Programming Languages", icon: Code },
  { id: "ai-ml", title: "AI/ML Frameworks", icon: Brain },
  { id: "web", title: "Web Technologies", icon: Palette },
  { id: "database", title: "Databases", icon: Database },
  { id: "cloud", title: "Cloud & DevOps", icon: Cloud },
  { id: "tools", title: "Tools & Others", icon: Wrench },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [additionalCompetencies, setAdditionalCompetencies] = useState([]);
  const [isLoadingCompetencies, setIsLoadingCompetencies] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    const fetchAdditionalCompetencies = async () => {
      try {
        const response = await fetch("/api/additional-competencies");
        if (response.ok) {
          const competencies = await response.json();
          setAdditionalCompetencies(competencies);
        }
      } catch (error) {
        console.error("Error fetching additional competencies:", error);
      } finally {
        setIsLoadingCompetencies(false);
      }
    };

    fetchSkills();
    fetchAdditionalCompetencies();
  }, []);

  // Group skills by category
  const groupedSkills = skillCategoryConfig.map((category) => ({
    ...category,
    skills: skills.filter((skill: any) => skill.category === category.id),
  }));

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
            <h1 className="text-4xl font-bold mb-4">Skills & Technologies</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and expertise
              across different domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoadingSkills
              ? // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-6">
                          <div className="w-6 h-6 mr-3 bg-muted animate-pulse rounded"></div>
                          <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
                        </div>
                        <div className="space-y-4">
                          {Array.from({ length: 4 }).map((_, skillIndex) => (
                            <div key={skillIndex} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                                <div className="h-4 w-10 bg-muted animate-pulse rounded"></div>
                              </div>
                              <div className="w-full h-2 bg-muted animate-pulse rounded"></div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              : groupedSkills.map((category, categoryIndex) => {
                  const Icon = category.icon;

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-6">
                            <Icon className="w-6 h-6 mr-3 text-primary" />
                            <h2 className="text-xl font-semibold">
                              {category.title}
                            </h2>
                          </div>

                          {category.skills.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">
                              No skills in this category yet.
                            </p>
                          ) : (
                            <div className="space-y-4">
                              {category.skills.map((skill: any, skillIndex) => (
                                <motion.div
                                  key={skill._id || skillIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay:
                                      categoryIndex * 0.1 + skillIndex * 0.05,
                                  }}
                                  className="space-y-2"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                      {skill.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {skill.level}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={skill.level}
                                    className="h-2"
                                  />
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
          </div>

          {/* Additional Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-8">Additional Competencies</h2>
            {isLoadingCompetencies ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted rounded-lg animate-pulse"
                  >
                    <div className="h-4 bg-muted-foreground/20 rounded"></div>
                  </div>
                ))}
              </div>
            ) : additionalCompetencies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {additionalCompetencies.map((competency: any, index) => (
                  <motion.div
                    key={competency._id || index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {competency.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">
                No additional competencies available.
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
