import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="flex items-center justify-center md:pt-40 md:pb-28 bg-cover bg-center bg-no-repeat w-full" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80&sat=-100")' }}>
      <div className="mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl animate-fade-in-up flex flex-col items-center gap-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-roboto text-white">
              Start your tech career with <span className="text-accent">FutureLabs</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Join Africa's leading innovation ecosystem. Build market-ready skills, launch your startup, and be part of the digital transformation shaping our continent's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="font-medium">
                <a href="#programs">Explore Programs</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium bg-white/10 text-white border-white/20 hover:bg-white/20">
                <a href="#about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
