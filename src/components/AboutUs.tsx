
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">About Future Labs</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            We inspire, empower, and incubate high-impact tech ideas and startups shaping the African continent.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 font-roboto text-foreground">Who We Are</h3>
            <p className="text-foreground/80 mb-6">
              Future Labs is a digital innovation ecosystem driving technology and innovation across Africa for sustainable impact. We are dedicated to bridging the digital divide by upskilling underserved youth, incubating high-impact startups, and building a future-ready Africa.
            </p>
            <p className="text-foreground/80 mb-6">
              Founded by educators and technologists, we blend technical education, startup incubation, and community-driven innovation to unlock Africa's potential — from the grassroots up.
            </p>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="FutureLabs Team" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-dots rounded-full"></div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        {/* <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-primary">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed">
                To inspire, empower, and incubate high-impact tech ideas and startups that shape the African continent. We are committed to bridging the digital divide by providing world-class technical education, startup incubation, and community-driven innovation programs that unlock Africa's potential from the grassroots up.
              </p>
            </div>

            <div className="bg-secondary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-secondary">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed">
                To become Africa's leading innovation ecosystem that transforms communities through technology, creating a future where every African youth has access to digital opportunities and the tools to build solutions that drive sustainable economic growth across the continent.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutUs;
