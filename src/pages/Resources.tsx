import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const categories = [
    { icon: BookOpen, label: 'Guides', color: 'bg-blue-500' },
    { icon: FileText, label: 'Articles', color: 'bg-green-500' },
    { icon: Lightbulb, label: 'Tutorials', color: 'bg-yellow-500' },
    { icon: TrendingUp, label: 'Research', color: 'bg-purple-500' },
  ];

  const featuredResources = [
    {
      title: 'Getting Started in Tech: A Beginner\'s Guide',
      description: 'A comprehensive roadmap for anyone looking to start a career in technology, covering essential skills, learning paths, and career opportunities.',
      category: 'Guides',
      readTime: '15 min read',
    },
    {
      title: 'Building a Startup in Africa: Lessons Learned',
      description: 'Insights and practical advice from founders who have built successful startups in the African ecosystem.',
      category: 'Articles',
      readTime: '10 min read',
    },
    {
      title: 'The State of Tech Talent in Africa 2024',
      description: 'Our annual report on the African tech talent landscape, including trends, opportunities, and challenges.',
      category: 'Research',
      readTime: '25 min read',
    },
  ];

  const resourceList = [
    {
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript.',
      category: 'Tutorials',
      tag: 'Beginner',
    },
    {
      title: 'Data Science for Impact',
      description: 'How to use data to solve real-world problems in Africa.',
      category: 'Articles',
      tag: 'Intermediate',
    },
    {
      title: 'Fundraising 101 for African Startups',
      description: 'Navigate the funding landscape and pitch to investors.',
      category: 'Guides',
      tag: 'All Levels',
    },
    {
      title: 'AI & Machine Learning Basics',
      description: 'Get started with artificial intelligence and ML concepts.',
      category: 'Tutorials',
      tag: 'Beginner',
    },
    {
      title: 'Climate Tech Opportunities in Africa',
      description: 'Exploring the intersection of technology and climate action.',
      category: 'Research',
      tag: 'All Levels',
    },
    {
      title: 'Building Remote-First Teams',
      description: 'Best practices for distributed team management.',
      category: 'Articles',
      tag: 'Advanced',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Knowledge Hub
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Articles, insights, and tools on tech, innovation, and the future of work in Africa. 
              Learn from experts and accelerate your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <SectionContainer className="bg-background -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center`}>
                <cat.icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </SectionContainer>

      {/* Featured Resources */}
      <SectionContainer className="bg-muted/30">
        <SectionHeading 
          title="Featured Resources" 
          subtitle="Our top picks for you"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all border-0 overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-primary to-secondary"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {resource.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* All Resources */}
      <SectionContainer>
        <SectionHeading 
          title="All Resources" 
          subtitle="Browse our complete library"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceList.map((resource, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {resource.category}
                  </span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">
                    {resource.tag}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            Load More Resources
          </Button>
        </div>
      </SectionContainer>

      {/* Newsletter CTA */}
      <SectionContainer className="bg-secondary text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get Fresh Content Delivered</h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter and never miss new articles, guides, and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Resources;
