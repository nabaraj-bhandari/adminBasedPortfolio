'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Code, 
  BookOpen, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  User,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ProjectManager from './project-manager';
import SkillManager from './skill-manager';
import BlogManager from './blog-manager';
import PersonalInfoManager from './personal-info-manager';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'projects' | 'skills' | 'blog' | 'personal';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'blog', name: 'Blog', icon: BookOpen },
  ];

  const stats = [
    { name: 'Total Projects', value: '4', change: '+2 this month' },
    { name: 'Published Posts', value: '12', change: '+3 this month' },
    { name: 'Skills Listed', value: '36', change: '+5 this month' },
    { name: 'Page Views', value: '2.4K', change: '+15% this month' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoManager />;
      case 'projects':
        return <ProjectManager />;
      case 'skills':
        return <SkillManager />;
      case 'blog':
        return <BlogManager />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.name} className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Published new blog post</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Updated project portfolio</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Added new skills</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('projects')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Project
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('blog')}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Write Blog Post
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('skills')}>
                      <Code className="w-4 h-4 mr-2" />
                      Update Skills
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Public Site
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-card/30 backdrop-blur-sm border-r border-border lg:min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Manage your portfolio</p>
          </div>
          
          <Separator />
          
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Button
                      variant={activeTab === item.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(item.id as TabType)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="mb-6">
              <h1 className="text-3xl font-bold capitalize">{activeTab === 'personal' ? 'Personal Information' : activeTab}</h1>
              <p className="text-muted-foreground">
                {activeTab === 'dashboard' && 'Overview of your portfolio'}
                {activeTab === 'personal' && 'Manage your personal information'}
                {activeTab === 'projects' && 'Manage your projects'}
                {activeTab === 'skills' && 'Manage your skills'}
                {activeTab === 'blog' && 'Manage your blog posts'}
              </p>
            </div>
            
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}