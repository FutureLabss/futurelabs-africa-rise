
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">About FutureLabs.Africa Rise</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Empowering Africa's youth through digital innovation and leadership development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 font-roboto text-foreground">Who We Are</h3>
            <p className="text-foreground/80 mb-6">
              FutureLabs.Africa Rise is a transformative initiative dedicated to accelerating Africa's digital future. We focus on empowering the next generation of African leaders through cutting-edge technology training, innovative research, and practical skill development.
            </p>
            <p className="text-foreground/80 mb-6">
              Our mission is simple yet powerful: to bridge the digital divide across Africa by providing world-class training, fostering innovation, and creating sustainable pathways for youth to become technology leaders and change-makers in their communities.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-primary/10 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-foreground/70">Youth Trained</div>
              </div>
              <div className="bg-secondary/10 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-sm text-foreground/70">Communities Reached</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/assets/african-school-outreach.jpg" 
                alt="FutureLabs.Africa Rise Team" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
