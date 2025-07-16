"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch("/api/personal-info");
        if (response.ok) {
          const info = await response.json();
          setPersonalInfo(info);
        } else {
          // Set default placeholder values
          setPersonalInfo({
            email: "contact@example.com",
            phone: "+1 (555) 123-4567",
            location: "Your City, Country",
            github: "https://github.com/username",
            linkedin: "https://linkedin.com/in/username",
            twitter: "https://twitter.com/username",
            website: "https://example.com",
          });
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
        // Set default placeholder values on error
        setPersonalInfo({
          email: "contact@example.com",
          phone: "+1 (555) 123-4567",
          location: "Your City, Country",
          github: "https://github.com/username",
          linkedin: "https://linkedin.com/in/username",
          twitter: "https://twitter.com/username",
          website: "https://example.com",
        });
      } finally {
        setIsLoadingInfo(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I&apos;m always interested in new opportunities and
              collaborations. Let&apos;s discuss your project!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    Send a Message
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Input
                        {...register("name")}
                        placeholder="Your Name"
                        className="w-full"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Your Email"
                        className="w-full"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        {...register("subject")}
                        placeholder="Subject"
                        className="w-full"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        {...register("message")}
                        placeholder="Your Message"
                        rows={6}
                        className="w-full"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full group shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    Contact Information
                  </h2>

                  {isLoadingInfo ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                        <div>
                          <div className="h-4 w-12 bg-gray-300 rounded animate-pulse mb-1" />
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                        <div>
                          <div className="h-4 w-12 bg-gray-300 rounded animate-pulse mb-1" />
                          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                        <div>
                          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mb-1" />
                          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">
                            {personalInfo.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">
                            {personalInfo.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">
                            {personalInfo.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Follow Me</h2>

                  {isLoadingInfo ? (
                    <div className="flex flex-wrap gap-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-300 rounded-lg animate-pulse w-11 h-11"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {[
                        {
                          icon: Github,
                          href: personalInfo.github,
                          label: "GitHub",
                        },
                        {
                          icon: Linkedin,
                          href: personalInfo.linkedin,
                          label: "LinkedIn",
                        },
                        {
                          icon: Twitter,
                          href: personalInfo.twitter,
                          label: "Twitter",
                        },
                        {
                          icon: Globe,
                          href: personalInfo.website,
                          label: "Website",
                        },
                      ].map((social) => {
                        const Icon = social.icon;
                        return (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-muted/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                          </motion.a>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4">
                    Let&apos;s Collaborate
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    I&apos;m open to discussing:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• AI/ML consulting projects</li>
                    <li>• Full-stack development opportunities</li>
                    <li>• Technical writing and content creation</li>
                    <li>• Open source contributions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
