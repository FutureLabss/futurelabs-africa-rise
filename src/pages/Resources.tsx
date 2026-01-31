import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Video, FileText, Download, ExternalLink, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resourceCategories = [
  {
    icon: BookOpen,
    title: 'Learning Guides',
    description: 'Comprehensive guides and tutorials to kickstart your tech journey.',
    items: [
      { title: 'Getting Started with Web Development', type: 'Guide' },
      { title: 'Introduction to Data Science', type: 'Guide' },
      { title: 'Building Your First Mobile App', type: 'Guide' },
    ],
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch and learn from industry experts and program alumni.',
    items: [
      { title: 'Full-Stack Development Bootcamp', type: 'Course' },
      { title: 'Startup Pitch Masterclass', type: 'Workshop' },
      { title: 'UI/UX Design Fundamentals', type: 'Course' },
    ],
  },
  {
    icon: FileText,
    title: 'Research & Reports',
    description: 'Insights on Africa\'s tech ecosystem and emerging trends.',
    items: [
      { title: 'State of African Tech 2024', type: 'Report' },
      { title: 'Developer Skills Gap Analysis', type: 'Research' },
      { title: 'Startup Ecosystem Mapping', type: 'Report' },
    ],
  },
  {
    icon: Download,
    title: 'Templates & Tools',
    description: 'Free resources to help you build and launch faster.',
    items: [
      { title: 'Pitch Deck Template', type: 'Template' },
      { title: 'Business Model Canvas', type: 'Template' },
      { title: 'Developer Resume Guide', type: 'Template' },
    ],
  },
];

const featuredResources = [
  {
    title: 'The Complete Guide to Building a Tech Career in Africa',
    description: 'Everything you need to know about starting and growing your tech career on the continent.',
    type: 'Guide',
    readTime: '15 min read',
  },
  {
    title: 'African Startup Funding Report 2024',
    description: 'Comprehensive analysis of funding trends, top investors, and emerging sectors.',
    type: 'Report',
    readTime: '25 min read',
  },
  {
    title: 'Remote Work Toolkit for African Developers',
    description: 'Tools, tips, and best practices for working with global tech companies.',
    type: 'Toolkit',
    readTime: '10 min read',
  },
];

const Resources = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-primary font-semibold mb-4">Resources</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tools & Knowledge to Accelerate Your Growth
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Access curated guides, tutorials, reports, and templates designed to help African tech talent and startups thrive.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="#resources">
                    Browse Resources
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/blog">Read Our Blog</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Featured Resources</h2>
              <Link to="/blog" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <div
                  key={resource.title}
                  className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {resource.type}
                    </span>
                    <span className="text-muted-foreground text-xs">{resource.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section id="resources" className="section-padding bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary font-semibold mb-2">Resource Library</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground text-lg">
                From learning materials to templates, find resources that match your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {resourceCategories.map((category) => (
                <div
                  key={category.title}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-border">
                    {category.items.map((item) => (
                      <a
                        key={item.title}
                        href="#"
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
                            {item.type}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog CTA */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="bg-secondary rounded-3xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Newspaper className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stay Updated with Our Blog
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Get the latest insights on African tech, startup stories, career advice, and industry trends.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/blog">
                  Read Our Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
