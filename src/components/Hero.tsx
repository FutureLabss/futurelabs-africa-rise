import React from 'react';
import heroBackground from '@/assets/hero-background.jpg';

const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-roboto text-white">
            Accelerating Human Capital Development to innovate for Africa's Technological Leap
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
