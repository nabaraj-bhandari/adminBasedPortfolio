'use client';

import { motion } from 'framer-motion';
import { Code, Database, Cloud, Brain, Wrench, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'R', level: 75 }
    ]
  },
  {
    title: 'AI/ML Frameworks',
    icon: Brain,
    skills: [
      { name: 'TensorFlow', level: 92 },
      { name: 'PyTorch', level: 90 },
      { name: 'Scikit-learn', level: 95 },
      { name: 'Keras', level: 88 },
      { name: 'OpenCV', level: 85 }
    ]
  },
  {
    title: 'Web Technologies',
    icon: Palette,
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Node.js', level: 82 },
      { name: 'Express', level: 80 },
      { name: 'FastAPI', level: 88 }
    ]
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Neo4j', level: 70 },
      { name: 'Elasticsearch', level: 78 }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 82 },
      { name: 'Terraform', level: 70 }
    ]
  },
  {
    title: 'Tools & Others',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 88 },
      { name: 'Jupyter', level: 92 },
      { name: 'Tableau', level: 78 },
      { name: 'Figma', level: 75 }
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Skills() {
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
              A comprehensive overview of my technical skills and expertise across different domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <Icon className="w-6 h-6 mr-3 text-primary" />
                        <h2 className="text-xl font-semibold">{category.title}</h2>
                      </div>
                      
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: (categoryIndex * 0.1) + (skillIndex * 0.05) 
                            }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </motion.div>
                        ))}
                      </div>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Data Analysis', 'Machine Learning', 'Deep Learning', 'Computer Vision',
                'Natural Language Processing', 'API Development', 'Agile Methodology', 'Team Leadership'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <span className="text-sm font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}