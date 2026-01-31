import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Lightbulb, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
  {
    icon: Code,
    title: 'Developer Talent Programs',
    description: 'Intensive bootcamps and training programs to build job-ready software developers with real-world project experience.',
    features: ['Full-stack development', 'Industry mentorship', 'Job placement support'],
    href: '/programs',
  },
  {
    icon: Lightbulb,
    title: 'Startup Incubation',
    description: 'Early-stage support for founders building innovative solutions, from idea validation to market entry.',
    features: ['Business mentorship', 'Seed funding access', 'Demo day opportunities'],
    href: '/programs',
  },
  {
    icon: Building,
    title: 'Corporate Innovation Labs',
    description: 'Partnering with enterprises to accelerate digital transformation and build internal innovation capabilities.',
    features: ['Custom training', 'Innovation sprints', 'Tech consulting'],
    href: '/programs',
  },
];

const ProgramsHighlight = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-primary font-semibold mb-2">Our Programs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Empowering Africa's Tech Future
          </h2>
          <p className="text-muted-foreground text-lg">
            From talent development to startup acceleration, our programs are designed to create real impact across Africa's tech ecosystem.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5">
                  <program.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={program.href}
                  className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <Link to="/programs">
              View All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsHighlight;
