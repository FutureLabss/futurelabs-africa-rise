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
      highlights: ["Hands-on Projects", "Industry Mentorship", "Job Placement Support"],
      link: "https://www.futurelabs.ng"
    },
    {
      icon: <Rocket className="h-10 w-10 text-secondary" />,
      title: "Startup Accelerator",
      description: "Intensive program for early-stage African startups to scale their solutions and access funding.",
      duration: "3-6 months",
      level: "Early-stage Startups",
      highlights: ["Funding Access", "Expert Mentorship", "Demo Day Pitching"],
      link: "/program-details"
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: "Leadership & Innovation Program",
      description: "Building the next generation of African tech leaders through comprehensive leadership training and intensive innovation workshops.",
      duration: "4 months",
      level: "Mid to Senior Level",
      highlights: ["Executive Coaching", "Strategic Thinking", "Problem-Solving", "Rapid Prototyping"],
      link: "/program-details"
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Future Studios",
      description: "Creative technology studio where innovation meets design. Build cutting-edge solutions with our expert team.",
      duration: "Ongoing",
      level: "All Levels",
      highlights: ["Creative Solutions", "Expert Team", "Technology Innovation"],
      link: "https://studio.futurelabs.ng"
    }
  ];

  return (
    <section className="py-16 bg-muted/30 w-[85%] mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">Our Programs</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Future Labs runs accelerator and capacity-building programs to nurture Africa's next generation of tech leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card 
              key={index} 
              className="overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => {
                if (program.link.startsWith('http')) {
                  window.open(program.link, '_blank');
                } else {
                  window.location.href = program.link;
                }
              }}
            >
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-background rounded-lg">
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 font-roboto text-foreground">
                      {program.title}
                    </h3>
                    <div className="flex gap-4 text-xs font-semibold text-foreground/60 mb-3">
                      <span><span className='text-accent'>Duration:</span> {program.duration}</span>
                      <span><span className='text-accent'>Level:</span> {program.level}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground/70 mb-6 leading-relaxed text-sm font-semibold flex-grow">
                  {program.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-foreground mb-3 text-sm">Program Highlights:</h4>
                  <ul className="space-y-2">
                    {program.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-sm text-foreground/70 flex items-center font-medium">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Programs;