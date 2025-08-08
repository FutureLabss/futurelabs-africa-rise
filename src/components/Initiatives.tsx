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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(23rem,1fr))] justify-items-between gap-14">
          {initiatives.map((initiative, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg">
              <CardContent className="p-7 flex flex-col">
                <div className="mb-4">
                  {initiative.icon}
                </div>
                <h3 className="text-2xl mb-4 font-roboto text-foreground font-[800]">
                  {initiative.title}
                </h3>
                <p className="text-foreground/70 mb-4 text-sm font-[600] leading-relaxed">
                  {initiative.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {initiative.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm font-[500] text-foreground/60 flex items-center">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-[95%] mx-auto bg-primary hover:bg-primary/90 text-white text-base font-[600] py-6 rounded-lg hover:scale-[1.02]"
                  onClick={() => {
                    if (initiative.title === 'Youth Collaboration Programs') {
                      window.location.href = '/youth-collaboration';
                    } else if (initiative.title === 'Research & Innovation Labs') {
                      window.location.href = '/research-labs';
                    } else {
                      // Default action for other initiatives
                      console.log('Learn more about', initiative.title);
                    }
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;