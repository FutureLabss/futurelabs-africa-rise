
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhatWeDo = () => {
  const services = [
    {
      title: "The Academy",
      description: "A skills development engine focused on practical, beginner-friendly training in digital skills like Web & Mobile Development, Digital Marketing, Product Design, Data & AI Fundamentals, and No-Code Tools.",
      details: "Programs are optimized for mobile users and first-time learners.",
      icon: "👨‍🎓",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Startup Incubation",
      description: "We nurture early-stage founders solving local problems with scalable digital solutions. Our support includes Business Model Validation, Product-Market Fit, Mentorship & Advisory, and Access to Early Funding & Demo Days.",
      details: "",
      icon: "🚀",
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Innovation Center",
      description: "A physical and virtual space that sparks collaboration. From coworking spaces and community events to bootcamps and hackathons, the FutureLabs Innovation Center is where ideas come to life.",
      details: "",
      icon: "💡",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Impact & Research",
      description: "We work with partners to generate data and insights that inform digital policy, economic inclusion, and the future of work in Africa.",
      details: "",
      icon: "📊",
      color: "bg-gray-700/10 text-gray-700",
    }
  ];

  return (
    <section id="what-we-do" className="py-20 bg-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Our comprehensive approach to nurturing talent and innovation in Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className={`${service.color} p-6`}>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{service.icon}</span>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">{service.description}</p>
                {service.details && <p className="text-gray-600 italic">{service.details}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Why FutureLabs?</h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">01</span>
              </div>
              <h4 className="font-bold mb-2">Community-Centered</h4>
              <p className="text-gray-600 text-sm">Built by and for African youth.</p>
            </div>
            
            <div className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary text-2xl font-bold">02</span>
              </div>
              <h4 className="font-bold mb-2">Hybrid Learning</h4>
              <p className="text-gray-600 text-sm">We combine offline support with mobile-first learning.</p>
            </div>
            
            <div className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl font-bold">03</span>
              </div>
              <h4 className="font-bold mb-2">Inclusive by Design</h4>
              <p className="text-gray-600 text-sm">We prioritize women, underserved communities, and non-technical backgrounds.</p>
            </div>
            
            <div className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-gray-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-700 text-2xl font-bold">04</span>
              </div>
              <h4 className="font-bold mb-2">Local Roots, Global Ambition</h4>
              <p className="text-gray-600 text-sm">We grow local talent with global relevance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
