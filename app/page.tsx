'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'AI/ML Developer',
    title: 'AI/ML Developer',
    description: 'Building intelligent systems and sharing knowledge through code. Passionate about machine learning, deep learning, and creating innovative solutions.',
    resumeUrl: '#'
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem('personalInfo');
    if (savedInfo) {
      setPersonalInfo(JSON.parse(savedInfo));
    }
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
              <Button size="lg" className="group shadow-lg">
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group shadow-lg" asChild>
                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
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
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-lg mb-4 flex items-center justify-center border border-border/50">
                        <span className="text-muted-foreground">Project Image</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Project Title {i}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        Description of the project and the technologies used to build it.
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-12"
            >
              Skills & Technologies
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {['Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js', 'AWS'].map((skill) => (
                <motion.div
                  key={skill}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center border border-border/50">
                    <span className="text-primary font-bold">{skill[0]}</span>
                  </div>
                  <h3 className="text-sm font-medium">{skill}</h3>
                </motion.div>
              ))}
            </div>
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
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-6"
            >
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