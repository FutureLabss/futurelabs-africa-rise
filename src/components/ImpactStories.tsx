import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const ImpactStories = () => {
  const story = {
    name: "Amara Okafor",
    role: "Software Developer & Entrepreneur",
    location: "Lagos, Nigeria",
    quote: "FutureLabs.Africa Rise transformed my life. From having no coding experience to building solutions that serve my community, the program gave me both the technical skills and confidence to pursue my dreams in technology.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    achievement: "Built 3 mobile apps serving 10,000+ users"
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">Impact Stories</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Real stories from graduates who are making a difference across Africa
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{story.name}</h3>
                    <p className="text-white/90">{story.role}</p>
                    <p className="text-white/80 text-sm">{story.location}</p>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    <p className="text-foreground/80 text-lg leading-relaxed italic">
                      "{story.quote}"
                    </p>
                  </div>
                  
                  <div className="bg-accent/10 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-accent">Key Achievement:</p>
                    <p className="text-foreground/70">{story.achievement}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-foreground/70">Job Placement Rate</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl font-bold text-secondary mb-2">2,500+</div>
            <div className="text-foreground/70">Lives Impacted</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl font-bold text-accent mb-2">150+</div>
            <div className="text-foreground/70">Startups Launched</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;