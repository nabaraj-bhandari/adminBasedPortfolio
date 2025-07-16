"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Code,
  Database,
  Cloud,
  Brain,
  Wrench,
  Palette,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Skill {
  _id?: string;
  name: string;
  level: number;
  category: string;
}

interface AdditionalCompetency {
  _id?: string;
  name: string;
  order?: number;
}

const skillCategories = [
  { id: "programming", name: "Programming Languages", icon: Code },
  { id: "ai-ml", name: "AI/ML Frameworks", icon: Brain },
  { id: "web", name: "Web Technologies", icon: Palette },
  { id: "database", name: "Databases", icon: Database },
  { id: "cloud", name: "Cloud & DevOps", icon: Cloud },
  { id: "tools", name: "Tools & Others", icon: Wrench },
];

export default function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [additionalCompetencies, setAdditionalCompetencies] = useState<
    AdditionalCompetency[]
  >([]);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isCompetencyDialogOpen, setIsCompetencyDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingCompetency, setEditingCompetency] =
    useState<AdditionalCompetency | null>(null);
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    level: 50,
    category: "",
  });
  const [competencyFormData, setCompetencyFormData] = useState({
    name: "",
  });

  // Fetch skills and additional competencies
  useEffect(() => {
    fetchSkills();
    fetchAdditionalCompetencies();
  }, []);

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
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSkill) {
        const response = await fetch(`/api/skills/${editingSkill._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillFormData),
        });

        if (response.ok) {
          toast.success("Skill updated successfully!");
          fetchSkills(); // Refresh the skills list
        }
      } else {
        const response = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillFormData),
        });

        if (response.ok) {
          toast.success("Skill added successfully!");
          fetchSkills(); // Refresh the skills list
        }
      }
    } catch (error) {
      toast.error("Failed to save skill");
    }

    setIsSkillDialogOpen(false);
    setEditingSkill(null);
    setSkillFormData({
      name: "",
      level: 50,
      category: "",
    });
  };

  const handleCompetencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCompetency) {
        const response = await fetch(
          `/api/additional-competencies/${editingCompetency._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(competencyFormData),
          }
        );

        if (response.ok) {
          toast.success("Competency updated successfully!");
          fetchAdditionalCompetencies();
        }
      } else {
        const response = await fetch("/api/additional-competencies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(competencyFormData),
        });

        if (response.ok) {
          toast.success("Competency added successfully!");
          fetchAdditionalCompetencies();
        }
      }
    } catch (error) {
      toast.error("Failed to save competency");
    }

    setIsCompetencyDialogOpen(false);
    setEditingCompetency(null);
    setCompetencyFormData({ name: "" });
  };

  const handleSkillEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setIsSkillDialogOpen(true);
  };

  const handleCompetencyEdit = (competency: AdditionalCompetency) => {
    setEditingCompetency(competency);
    setCompetencyFormData({
      name: competency.name,
    });
    setIsCompetencyDialogOpen(true);
  };

  const handleSkillDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Skill deleted successfully!");
        fetchSkills(); // Refresh the skills list
      }
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const handleCompetencyDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/additional-competencies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Competency deleted successfully!");
        fetchAdditionalCompetencies();
      }
    } catch (error) {
      toast.error("Failed to delete competency");
    }
  };

  const groupedSkills = skillCategories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.category === category.id),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skill Management</h2>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills" className="flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="competencies" className="flex items-center">
            <Tags className="w-4 h-4 mr-2" />
            Additional Competencies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Technical Skills</h3>
            <Dialog
              open={isSkillDialogOpen}
              onOpenChange={setIsSkillDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSkill ? "Edit Skill" : "Add New Skill"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSkillSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Skill Name</Label>
                    <Input
                      id="name"
                      value={skillFormData.name}
                      onChange={(e) =>
                        setSkillFormData({
                          ...skillFormData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={skillFormData.category}
                      onValueChange={(value) =>
                        setSkillFormData({ ...skillFormData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="level">
                      Skill Level: {skillFormData.level}%
                    </Label>
                    <Slider
                      value={[skillFormData.level]}
                      onValueChange={(value) =>
                        setSkillFormData({ ...skillFormData, level: value[0] })
                      }
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsSkillDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSkill ? "Update" : "Add"} Skill
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoadingSkills
              ? // Loading skeleton for skills
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <div className="w-5 h-5 mr-2 bg-muted animate-pulse rounded"></div>
                          <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, skillIndex) => (
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
              : groupedSkills.map((category) => {
                  const Icon = category.icon;

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Icon className="w-5 h-5 mr-2" />
                            {category.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {category.skills.map((skill) => (
                              <div
                                key={skill._id}
                                className="flex items-center justify-between"
                              >
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">
                                      {skill.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {skill.level}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                      className="bg-primary h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${skill.level}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="flex space-x-1 ml-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSkillEdit(skill)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleSkillDelete(skill._id!)
                                    }
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}

                            {category.skills.length === 0 && (
                              <p className="text-muted-foreground text-sm text-center py-4">
                                No skills in this category yet.
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
          </div>
        </TabsContent>

        <TabsContent value="competencies" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Additional Competencies</h3>
            <Dialog
              open={isCompetencyDialogOpen}
              onOpenChange={setIsCompetencyDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Competency
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCompetency
                      ? "Edit Competency"
                      : "Add New Competency"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCompetencySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="competency-name">Competency Name</Label>
                    <Input
                      id="competency-name"
                      value={competencyFormData.name}
                      onChange={(e) =>
                        setCompetencyFormData({
                          ...competencyFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g. Data Analysis, Team Leadership"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCompetencyDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCompetency ? "Update" : "Add"} Competency
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tags className="w-5 h-5 mr-2" />
                Competencies List
              </CardTitle>
            </CardHeader>
            <CardContent>
              {additionalCompetencies.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No additional competencies added yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {additionalCompetencies.map((competency) => (
                    <motion.div
                      key={competency._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <span className="font-medium">{competency.name}</span>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCompetencyEdit(competency)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleCompetencyDelete(competency._id!)
                          }
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
