
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden hero-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-8 mb-10 md:mb-0 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-roboto">
              Accelerating Africa's <span className="text-primary">Digital Future</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg">
              Future Labs is driving technology and innovation across Africa for sustainable impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary-dark text-white text-lg py-6 px-8 rounded-md font-medium">
                Explore Our Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="bg-white border-2 border-secondary text-secondary hover:bg-secondary/5 text-lg py-6 px-8 rounded-md font-medium">
                Join Our Community
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/90 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" 
                alt="African tech students collaborating" 
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/20 rounded-full filter blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/20 rounded-full filter blur-2xl"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
