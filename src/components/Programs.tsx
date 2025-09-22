import React from 'react';
import { BookOpen, Microscope, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Programs = () => {
  const programs = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Skills Training",
      description: "Comprehensive digital skills training programs designed to equip African youth with cutting-edge technical abilities in software development, data analysis, and digital marketing.",
      highlights: ["Hands-on Coding", "Industry Mentorship", "Job Placement", "Certification"]
    },
    {
      icon: <Microscope className="h-12 w-12 text-secondary" />,
      title: "Research",
      description: "Collaborative research initiatives focused on solving Africa's unique challenges through technology innovation, working with local universities and international partners.",
      highlights: ["Applied Research", "Academic Partnership", "Published Papers", "Community Solutions"]
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-accent" />,
      title: "Innovation Labs",
      description: "State-of-the-art innovation laboratories where ideas come to life. Providing space, resources, and mentorship for breakthrough technological solutions.",
      highlights: ["Rapid Prototyping", "Expert Guidance", "Funding Opportunities", "Market Access"]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">Our Programs</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Comprehensive programs designed to develop Africa's next generation of technology leaders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group rounded-2xl cursor-pointer hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-background rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {program.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 font-roboto text-foreground">
                  {program.title}
                </h3>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {program.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Program Highlights:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {program.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="text-sm text-foreground/70 bg-muted/50 rounded-lg py-2 px-3">
                        {highlight}
                      </div>
                    ))}
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

export default Programs;