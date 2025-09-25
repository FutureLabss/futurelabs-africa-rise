import React from 'react';
import { Users, Lightbulb, Code, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Initiatives = () => {
  const initiatives = [
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Youth Collaboration Programs",
      description: "Fostering collaboration among young African tech talents through hackathons, workshops, and peer-to-peer learning networks.",
      features: ["Monthly Hackathons", "Peer Learning Groups", "Collaborative Projects"]
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Research & Innovation Labs", 
      description: "Supporting cutting-edge research in emerging technologies while addressing Africa-specific challenges and opportunities.",
      features: ["AI Research", "Blockchain Innovation", "IoT Solutions"]
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Professional Development",
      description: "Comprehensive skill-building programs designed to elevate the capabilities of tech professionals across the continent.",
      features: ["Technical Training", "Leadership Development", "Industry Certification"]
    },
    {
      icon: <Globe className="h-8 w-8 text-secondary" />,
      title: "Entrepreneurship Ecosystem",
      description: "Building a supportive ecosystem for African entrepreneurs to launch, scale, and sustain innovative tech startups.",
      features: ["Startup Incubation", "Mentorship Network", "Funding Access"]
    }
  ];

  return (
    <section className="py-16 bg-background w-[85%] mx-auto ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">Our Initiatives</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Our diverse initiatives foster collaboration, research, and entrepreneurship for youth and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {initiatives.map((initiative, index) => (
            <Card 
              key={index} 
              className="group relative shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-muted/20 rounded-2xl border-0 cursor-pointer hover:scale-[1.01]"
              onClick={() => {
                if (initiative.title === 'Youth Collaboration Programs') {
                  window.location.href = '/youth-collaboration';
                } else if (initiative.title === 'Research & Innovation Labs') {
                  window.location.href = '/research-labs';
                } else {
                  console.log('Learn more about', initiative.title);
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="relative p-8 flex flex-col h-full">
                <div className="mb-6 p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 w-fit">
                  {initiative.icon}
                </div>
                <h3 className="text-2xl mb-4 font-roboto text-foreground font-bold group-hover:text-primary transition-colors duration-300">
                  {initiative.title}
                </h3>
                <p className="text-foreground/70 mb-6 text-sm font-medium leading-relaxed flex-grow">
                  {initiative.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {initiative.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm font-medium text-foreground/60 flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 group-hover:scale-110 transition-transform duration-300"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm">Learn More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;