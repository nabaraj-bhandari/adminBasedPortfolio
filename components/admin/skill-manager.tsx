'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Code, Database, Cloud, Brain, Wrench, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
}

const skillCategories = [
  { id: 'programming', name: 'Programming Languages', icon: Code },
  { id: 'ai-ml', name: 'AI/ML Frameworks', icon: Brain },
  { id: 'web', name: 'Web Technologies', icon: Palette },
  { id: 'database', name: 'Databases', icon: Database },
  { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud },
  { id: 'tools', name: 'Tools & Others', icon: Wrench }
];

const mockSkills: Skill[] = [
  { id: 1, name: 'Python', level: 95, category: 'programming' },
  { id: 2, name: 'JavaScript', level: 88, category: 'programming' },
  { id: 3, name: 'TensorFlow', level: 92, category: 'ai-ml' },
  { id: 4, name: 'React', level: 90, category: 'web' },
  { id: 5, name: 'PostgreSQL', level: 85, category: 'database' },
  { id: 6, name: 'AWS', level: 85, category: 'cloud' },
];

export default function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkill) {
      setSkills(skills.map(s => 
        s.id === editingSkill.id 
          ? { ...formData, id: editingSkill.id }
          : s
      ));
      toast.success('Skill updated successfully!');
    } else {
      const newSkill = {
        ...formData,
        id: Date.now()
      };
      setSkills([...skills, newSkill]);
      toast.success('Skill added successfully!');
    }

    setIsDialogOpen(false);
    setEditingSkill(null);
    setFormData({
      name: '',
      level: 50,
      category: ''
    });
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    toast.success('Skill deleted successfully!');
  };

  const groupedSkills = skillCategories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category === category.id)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skill Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
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
                <Label htmlFor="level">Skill Level: {formData.level}%</Label>
                <Slider
                  value={[formData.level]}
                  onValueChange={(value) => setFormData({...formData, level: value[0]})}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSkill ? 'Update' : 'Add'} Skill
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groupedSkills.map((category) => {
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
                      <div key={skill.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-1 ml-4">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(skill.id)}>
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
    </div>
  );
}