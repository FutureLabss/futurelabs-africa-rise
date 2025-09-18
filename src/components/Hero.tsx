import React from 'react';
import heroBackground from '@/assets/futurelabs-background.jpg';

const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center py-12 md:py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-roboto text-white">
            We are Africa's emergent deep tech innovation lab. Our mission is innovating for Africa's technological leap by accelerating human capital development
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
