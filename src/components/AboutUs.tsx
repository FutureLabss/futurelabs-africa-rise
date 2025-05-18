
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Who We Are</h3>
            <p className="text-gray-700 mb-6">
              FutureLabs is a digital innovation ecosystem based in Ikot Ekpene, Nigeria, dedicated to bridging the digital divide by upskilling underserved youth, incubating high-impact startups, and building a future-ready Africa.
            </p>
            <p className="text-gray-700 mb-6">
              Founded by educators and technologists, we blend technical education, startup incubation, and community-driven innovation to unlock Africa's potential — from the grassroots up.
            </p>
            
            <div className="mt-10">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary shadow-sm">
                <h4 className="font-bold text-xl mb-3 text-primary">Our Vision</h4>
                <p className="text-gray-700">To become Africa's most inclusive and impactful talent accelerator.</p>
              </div>
              
              <div className="bg-gray-50 mt-6 p-6 rounded-lg border-l-4 border-secondary shadow-sm">
                <h4 className="font-bold text-xl mb-3 text-secondary">Our Mission</h4>
                <p className="text-gray-700">To equip 1 million African youths by 2030 with digital and entrepreneurial skills that drive innovation, inclusion, and sustainable development.</p>
              </div>
            </div>
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
      </div>
    </section>
  );
};

export default AboutUs;
