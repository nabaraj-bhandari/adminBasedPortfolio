"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PersonalInfo } from "@/types";

export default function PersonalInfoManager() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    full_name: "",
    title: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    resume_url: "",
    profile_picture: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch("/api/personal-info");
        if (response.ok) {
          const info = await response.json();
          setPersonalInfo(info);
        } else {
          // Set default placeholder values if no data exists
          setPersonalInfo({
            full_name: "Your Full Name",
            title: "Your Professional Title",
            description:
              "Brief description about yourself and your expertise...",
            email: "your.email@example.com",
            phone: "+1 (555) 123-4567",
            location: "Your City, Country",
            resume_url: "",
            profile_picture: "",
            github: "https://github.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername",
            twitter: "https://twitter.com/yourusername",
            website: "https://yourwebsite.com",
          });
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
        // Set default placeholder values on error
        setPersonalInfo({
          full_name: "Your Full Name",
          title: "Your Professional Title",
          description: "Brief description about yourself and your expertise...",
          email: "your.email@example.com",
          phone: "+1 (555) 123-4567",
          location: "Your City, Country",
          resume_url: "",
          profile_picture: "",
          github: "https://github.com/yourusername",
          linkedin: "https://linkedin.com/in/yourusername",
          twitter: "https://twitter.com/yourusername",
          website: "https://yourwebsite.com",
        });
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/personal-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
      });

      if (response.ok) {
        toast.success("Personal information updated successfully!");
      } else {
        throw new Error("Failed to update personal information");
      }
    } catch (error) {
      console.error("Error saving personal info:", error);
      toast.error("Failed to save personal information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <Button
          onClick={handleSave}
          disabled={isLoading || isInitialLoading}
          className="shadow-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {isInitialLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Loading skeleton */}
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded w-1/3"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
                    <div className="h-10 bg-muted animate-pulse rounded"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={personalInfo.full_name}
                    onChange={(e) =>
                      handleInputChange("full_name", e.target.value)
                    }
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={personalInfo.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., AI/ML Developer"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Bio/Description</Label>
                  <Textarea
                    id="description"
                    value={personalInfo.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Brief description about yourself"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="City, State/Country"
                  />
                </div>

                <div>
                  <Label htmlFor="resumeUrl">Resume URL</Label>
                  <Input
                    id="resumeUrl"
                    value={personalInfo.resume_url}
                    onChange={(e) =>
                      handleInputChange("resume_url", e.target.value)
                    }
                    placeholder="https://example.com/resume.pdf"
                  />
                </div>

                <div>
                  <Label htmlFor="profilePicture">Profile Picture URL</Label>
                  <Input
                    id="profilePicture"
                    value={personalInfo.profile_picture || ""}
                    onChange={(e) =>
                      handleInputChange("profile_picture", e.target.value)
                    }
                    placeholder="https://example.com/profile.jpg"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload your image to a service like Imgur, Cloudinary, or
                    use a direct URL
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Social Media & Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github" className="flex items-center">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      value={personalInfo.github}
                      onChange={(e) =>
                        handleInputChange("github", e.target.value)
                      }
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      value={personalInfo.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter" className="flex items-center">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter Profile
                    </Label>
                    <Input
                      id="twitter"
                      value={personalInfo.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website" className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Personal Website
                    </Label>
                    <Input
                      id="website"
                      value={personalInfo.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {!isInitialLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <p className="text-sm text-muted-foreground">
                This is how your information will appear on the public site
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4 p-6 bg-muted/30 rounded-lg">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {personalInfo.title || "Your Professional Title"}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {personalInfo.description ||
                    "Brief description about yourself and your expertise..."}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {personalInfo.email || "your.email@example.com"}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {personalInfo.location || "Your City, Country"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
