
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(rgba(45, 42, 124, 0.8), rgba(0, 195, 160, 0.8)), url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80")'}}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-roboto text-white">
              Accelerating Africa's <span className="text-accent">Digital Future</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg">
              FutureLabs is an innovation hub with the mandate leveraging technology to create a more prosperous African Future
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
