import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Target, Users, Zap, Globe, Cpu } from 'lucide-react';
import aboutTeamImage from '@/assets/about-team.jpg';
import Partners from '@/components/partner';

const About = () => {
  const focusAreas = [
    {
      icon: Cpu,
      title: 'Tech Talent Development',
      description: 'Training the next generation of African developers, designers, and tech professionals.',
    },
    {
      icon: Zap,
      title: 'Startup & Venture Building',
      description: 'Incubating and accelerating high-impact startups solving African challenges.',
    },
    {
      icon: Globe,
      title: 'Corporate & Government Innovation',
      description: 'Partnering with organizations to drive digital transformation.',
    },
    {
      icon: Users,
      title: 'Digital Community & Storytelling',
      description: 'Building and nurturing a thriving ecosystem of innovators across Africa.',
    },
  ];

  const team = [
    {
      name: 'Team Member',
      role: 'Executive Director',
      bio: 'Leading FutureLabs\' mission to build Africa\'s tech ecosystem.',
    },
    {
      name: 'Team Member',
      role: 'Programs Director',
      bio: 'Overseeing talent development and accelerator programs.',
    },
    {
      name: 'Team Member',
      role: 'Community Lead',
      bio: 'Building and nurturing the FutureLabs community.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About Future Labs
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              We inspire, empower, and incubate high-impact tech ideas and startups 
              shaping the African continent.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <SectionContainer>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading 
              title="Who We Are" 
              centered={false}
            />
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Future Labs is a digital innovation ecosystem driving technology and innovation 
              across Africa for sustainable impact. We're dedicated to bridging the digital 
              divide by upskilling underserved youth, incubating high-impact startups, and 
              building a future-ready Africa.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Founded by educators and technologists, we blend technical education, startup 
              incubation, and community-driven innovation to unlock Africa's potential — 
              from the grassroots up.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Based in Akwa Ibom State, Nigeria, we're building a model that can be 
              replicated across the continent, focusing on deep-tech areas like AI, 
              data science, and climate technology.
            </p>
          </div>
          <div className="relative">
            <img 
              src={aboutTeamImage} 
              alt="FutureLabs Team" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </SectionContainer>

      {/* Vision & Mission */}
      <SectionContainer className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Africa's leading innovation ecosystem that transforms communities 
                through technology, creating a future where every African youth has access to 
                digital opportunities and the tools to build solutions that drive sustainable 
                economic growth across the continent.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-secondary"></div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To inspire, empower, and incubate high-impact tech ideas and startups that 
                shape the African continent. We're committed to bridging the digital divide 
                by providing world-class technical education, startup incubation, and 
                community-driven innovation programs.
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>

      {/* Focus Areas */}
      <SectionContainer>
        <SectionHeading 
          title="Our Focus Areas" 
          subtitle="The pillars that drive our work across Africa"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <Card key={index} className="group hover:shadow-xl hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <area.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* What Makes Us Different */}
      <SectionContainer className="bg-secondary text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Makes Us Different</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Unlike other innovation hubs, FutureLabs is deeply rooted in the African context. 
            We focus on practical, real-world skills that lead to actual employment and 
            entrepreneurship outcomes. Our programs are designed for the realities of 
            building in Africa — from infrastructure challenges to unique market opportunities.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-white/70">Africa-Focused</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Deep-Tech</div>
              <div className="text-white/70">AI, Data, Climate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Outcomes</div>
              <div className="text-white/70">Jobs & Startups</div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Partners */}
      <Partners />
    </Layout>
  );
};

export default About;
