import React from 'react';
import heroBackground from '@/assets/hero-african-tech-youth.jpg';

const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center py-12 md:py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-roboto text-white mb-6">
            Accelerating Africa's Future
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Empowering the next generation of leaders through digital skills and innovation
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
