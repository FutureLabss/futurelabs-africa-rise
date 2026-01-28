import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/Hero';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Rocket, Building2, Users, Zap, Target } from 'lucide-react';
import Partners from '@/components/partner';
import aboutTeamImage from '@/assets/about-team.jpg';

const Index = () => {
  const pillars = [
    {
      icon: GraduationCap,
      title: 'Tech Talent',
      description: 'World-class training programs developing Africa\'s next generation of developers, designers, and tech leaders.',
    },
    {
      icon: Rocket,
      title: 'Startup Support',
      description: 'Incubation and acceleration programs helping African startups go from idea to scale.',
    },
    {
      icon: Building2,
      title: 'Corporate Innovation',
      description: 'Partnering with organizations to drive digital transformation and innovation.',
    },
    {
      icon: Users,
      title: 'Community & Events',
      description: 'A thriving ecosystem of builders, dreamers, and change-makers across Africa.',
    },
  ];

  const programs = [
    {
      title: 'Developer Talent Programs',
      description: 'Comprehensive training in software development, data science, and emerging technologies.',
      link: '/programs',
    },
    {
      title: 'Startup Incubation',
      description: 'Intensive programs for early-stage startups to validate, build, and scale their solutions.',
      link: '/programs',
    },
    {
      title: 'Corporate Innovation Labs',
      description: 'Custom innovation programs for enterprises looking to build internal capabilities.',
      link: '/programs',
    },
  ];

  const startups = [
    { name: 'FutureLabs Academy', sector: 'EdTech', description: 'Technical education platform' },
    { name: 'FutureResume', sector: 'Career Tech', description: 'AI-powered career tools' },
    { name: 'Opportunitylab', sector: 'Opportunities', description: 'Scholarship & grants hub' },
    { name: 'Cleverclass', sector: 'EdTech', description: 'Modern classroom platform' },
  ];

  const stats = [
    { number: '1,000+', label: 'Youth Trained' },
    { number: '10+', label: 'Startups Supported' },
    { number: '20+', label: 'Hiring Partners' },
    { number: '5,000+', label: 'Community Members' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      
      {/* Value Pillars */}
      <SectionContainer className="bg-background">
        <SectionHeading 
          title="What We Do" 
          subtitle="FutureLabs is a digital innovation ecosystem driving technology and sustainable impact across Africa"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <Card key={index} className="group hover:shadow-xl hover:border-primary/30 transition-all border-2">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Programs Highlight */}
      <SectionContainer className="bg-muted/30">
        <SectionHeading 
          title="Our Programs" 
          subtitle="Accelerator and capacity-building programs nurturing Africa's tech leaders"
        />
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {programs.map((program, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all overflow-hidden border-0">
              <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                <Link 
                  to={program.link}
                  className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/programs">
              View All Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Impact Stats */}
      <SectionContainer className="bg-secondary text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Measurable outcomes that demonstrate our commitment to building Africa's tech ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Featured Startups */}
      <SectionContainer>
        <SectionHeading 
          title="Startups We've Built" 
          subtitle="Ventures we're building, supporting and nurturing within our ecosystem"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {startups.map((startup, index) => (
            <Card key={index} className="group hover:shadow-lg hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                  {startup.sector}
                </div>
                <h3 className="font-semibold mb-1">{startup.name}</h3>
                <p className="text-sm text-muted-foreground">{startup.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/startups">
              View All Startups <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Community Teaser */}
      <SectionContainer className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src={aboutTeamImage} 
              alt="FutureLabs Community" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
          <div>
            <SectionHeading 
              title="Join Our Community" 
              subtitle="Be part of Africa's most vibrant tech ecosystem"
              centered={false}
            />
            <p className="text-muted-foreground mb-6">
              Connect with thousands of developers, founders, and innovators. Attend events, 
              learn new skills, find opportunities, and build the future of Africa together.
            </p>
            <Button asChild size="lg">
              <Link to="/community">
                Join the Community <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* Newsletter */}
      <SectionContainer className="bg-primary/5">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-8">
            Get updates on programs, events, and opportunities delivered to your inbox.
          </p>
          <form 
            action="https://formsubmit.co/hello@futurelabs.africa"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input type="hidden" name="_subject" value="New Newsletter Subscription" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </SectionContainer>

      <Partners />
    </div>
  );
};

export default Index;
