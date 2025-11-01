import React from 'react';
import heroBackground from '@/assets/futurelabs-background.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className="h-screen flex items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1930]/95 via-[#0B1930]/85 to-primary/50"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-roboto text-white">
            We Are Africa's Emergent Deep Tech Innovation Lab.
          </h1>
          <p className="mt-4 text-white/85 text-base md:text-lg">
            We Are Innovating For Africa's Technological Leap By Accelerating Human Capital Development.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Programs
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-md bg-white/10 px-5 py-3 text-white font-medium hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
