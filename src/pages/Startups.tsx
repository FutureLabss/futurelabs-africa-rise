import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Lightbulb, Users, Briefcase, Rocket } from 'lucide-react';

const Startups = () => {
  const startups = [
    {
      name: 'FutureLabs Academy',
      category: 'EdTech',
      description: 'Technical education and talent accelerator building Africa\'s next generation of tech leaders.',
      link: 'https://www.futurelabs.ng',
      status: 'Active',
    },
    {
      name: 'FutureResume',
      category: 'Career Tech',
      description: 'AI-powered resume and portfolio tools helping talent showcase skills and land opportunities.',
      link: 'https://futureresume-tbyt.onrender.com/',
      status: 'Active',
    },
    {
      name: 'Opportunitylab.net',
      category: 'Opportunities Platform',
      description: 'A curated hub for scholarships, fellowships, grants and career programs for African youth.',
      link: 'https://www.opportunitylab.net',
      status: 'Active',
    },
    {
      name: 'Cleverclass',
      category: 'EdTech',
      description: 'A modern classroom platform powering learning communities with seamless tools and delightful UX.',
      link: 'https://cleverclass.vercel.app/',
      status: 'Beta',
    },
  ];

  const supportAreas = [
    {
      icon: Lightbulb,
      title: 'Ideation & Validation',
      description: 'Discovery sprints and market research to validate your idea before building.',
    },
    {
      icon: Briefcase,
      title: 'Business Support',
      description: 'Business model development, pitch deck creation, and go-to-market strategy.',
    },
    {
      icon: Users,
      title: 'Technical Mentorship',
      description: 'Access to experienced developers and product builders for technical guidance.',
    },
    {
      icon: Rocket,
      title: 'Investor Introductions',
      description: 'Connections to angel investors, VCs, and funding opportunities across Africa.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Startups
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              We support startups building solutions for Africa's future. From ideation to scale, 
              we provide the resources and mentorship needed to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Startup Portfolio */}
      <SectionContainer>
        <SectionHeading 
          title="Our Portfolio" 
          subtitle="Ventures we're building, supporting and nurturing within our ecosystem"
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          {startups.map((startup) => (
            <a
              key={startup.name}
              href={startup.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {startup.category}
                      </span>
                      <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">
                        {startup.name}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      startup.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {startup.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{startup.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </SectionContainer>

      {/* How We Support */}
      <SectionContainer className="bg-muted/30">
        <SectionHeading 
          title="How We Support Startups" 
          subtitle="Our comprehensive approach to startup incubation"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportAreas.map((area, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <area.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Incubation Model</h3>
              <p className="text-muted-foreground mb-4">
                We incubate ventures from idea to initial traction by pairing product strategy 
                with hands-on execution. Our model blends discovery sprints, user-centric design, 
                technical build, go-to-market, and founder support.
              </p>
              <p className="text-muted-foreground">
                Startups receive access to mentors, talent pipelines, workspace, and partnerships 
                to accelerate validation and growth across Africa.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                <div>
                  <div className="font-medium">Discovery Phase</div>
                  <div className="text-sm text-muted-foreground">Problem validation & research</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">2</div>
                <div>
                  <div className="font-medium">Build Phase</div>
                  <div className="text-sm text-muted-foreground">MVP development & iteration</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">3</div>
                <div>
                  <div className="font-medium">Launch Phase</div>
                  <div className="text-sm text-muted-foreground">Go-to-market & growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-primary text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Are You Building a Startup?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            If you're working on a solution that can impact Africa, we'd love to hear from you. 
            Apply to join our next cohort or reach out to learn more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/programs">
                Apply to Accelerator
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                Partner with Us
              </Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Startups;
