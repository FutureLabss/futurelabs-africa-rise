import React from 'react';
import schoolOutreachImage from '@/assets/african-school-outreach.jpg';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-roboto text-foreground">
              Applying human capital development to drive sustainable development, economic growth and Africa's technological leap
            </h1>
          </div>
          
          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src={schoolOutreachImage} 
              alt="African secondary school technology outreach program showing students learning with laptops and digital devices"
              className="w-full max-w-lg rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
