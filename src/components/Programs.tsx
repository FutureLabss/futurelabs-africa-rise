import React from 'react';
import { GraduationCap, Rocket, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Programs = () => {
  const programs = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Tech Academy",
      description: "Comprehensive training programs in software development, data science, and emerging technologies.",
      duration: "6-12 months",
      level: "Beginner to Advanced",
      highlights: ["Hands-on Projects", "Industry Mentorship", "Job Placement Support"]
    },
    {
      icon: <Rocket className="h-10 w-10 text-secondary" />,
      title: "Startup Accelerator",
      description: "Intensive program for early-stage African startups to scale their solutions and access funding.",
      duration: "3-6 months",
      level: "Early-stage Startups",
      highlights: ["Funding Access", "Expert Mentorship", "Demo Day Pitching"]
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: "Leadership Development",
      description: "Building the next generation of African tech leaders through comprehensive leadership training.",
      duration: "4 months",
      level: "Mid to Senior Level",
      highlights: ["Executive Coaching", "Strategic Thinking", "Team Building"]
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Innovation Bootcamp",
      description: "Intensive workshops focused on solving real-world African challenges through technology innovation.",
      duration: "2 weeks",
      level: "All Levels",
      highlights: ["Problem-Solving", "Rapid Prototyping", "Market Validation"]
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">Our Programs</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Future Labs runs accelerator and capacity-building programs to nurture Africa's next generation of tech leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-background rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 font-roboto text-foreground">
                      {program.title}
                    </h3>
                    <div className="flex gap-4 text-sm text-foreground/60 mb-3">
                      <span>Duration: {program.duration}</span>
                      <span>Level: {program.level}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {program.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Program Highlights:</h4>
                  <ul className="space-y-2">
                    {program.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-sm text-foreground/70 flex items-center">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    if (program.title === 'Tech Academy') {
                      window.open('https://www.futurelabs.ng', '_blank');
                    } else {
                      window.location.href = '/program-details';
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

export default Programs;