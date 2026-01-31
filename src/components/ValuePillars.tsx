import React from 'react';
import { GraduationCap, Rocket, Building2, Users } from 'lucide-react';

const pillars = [
  {
    icon: GraduationCap,
    title: 'Tech Talent Development',
    description: 'Equipping African youth with world-class technical skills and industry-ready experience.',
  },
  {
    icon: Rocket,
    title: 'Startup Support',
    description: 'Incubating and accelerating high-impact startups solving real African challenges.',
  },
  {
    icon: Building2,
    title: 'Corporate Innovation',
    description: 'Partnering with organizations to drive digital transformation and innovation.',
  },
  {
    icon: Users,
    title: 'Community & Events',
    description: 'Building a vibrant ecosystem of developers, founders, and tech enthusiasts.',
  },
];

const ValuePillars = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;
