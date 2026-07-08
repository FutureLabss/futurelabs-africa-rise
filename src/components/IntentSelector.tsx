"use client";

import React, { useState, useEffect } from 'react';
import { Code, Lightbulb, Building, X, ArrowRight } from 'lucide-react';

const IntentSelector = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('hide-intent-selector');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('hide-intent-selector', 'true');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  const pathways = [
    {
      id: 'program-developer',
      icon: Code,
      title: 'Tech Academy',
      subtitle: 'For Aspiring Developers',
      description: 'Acquire high-demand software engineering, design, and product skills to launch a global tech career.',
      cta: 'Explore Academy Path',
      color: 'from-blue-500/10 to-indigo-500/10 hover:border-blue-500/30'
    },
    {
      id: 'program-founder',
      icon: Lightbulb,
      title: 'Startup Incubation',
      subtitle: 'For Startup Founders',
      description: 'Get validation support, hands-on mentorship, and access to seed funding pipelines to scale your startup.',
      cta: 'Explore Founder Path',
      color: 'from-amber-500/10 to-orange-500/10 hover:border-amber-500/30'
    },
    {
      id: 'program-corporate',
      icon: Building,
      title: 'Corporate Innovation',
      subtitle: 'For Enterprises & Companies',
      description: 'Partner with us to hire vetted tech talent, run innovation labs, and build bespoke digital solutions.',
      cta: 'Explore Corporate Path',
      color: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="relative bg-card/60 backdrop-blur-md border border-border/80 shadow-xl rounded-3xl p-6 md:p-10 overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          aria-label="Dismiss selection widget"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="max-w-2xl mb-8">
          <span className="text-primary text-xs uppercase tracking-wider font-bold">Personalize Your Journey</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            What brings you to FutureLabs?
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Select your primary objective below to jump directly to the programs, events, and initiatives built for you.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {pathways.map((path) => (
            <button
              key={path.title}
              onClick={() => scrollToSection(path.id)}
              className={`group flex flex-col text-left p-6 rounded-2xl bg-gradient-to-br ${path.color} border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full`}
            >
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <path.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary mb-1">{path.subtitle}</span>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {path.title}
              </h3>
              <p className="text-muted-foreground text-sm flex-grow leading-relaxed mb-6">
                {path.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary mt-auto">
                <span>{path.cta}</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntentSelector;
