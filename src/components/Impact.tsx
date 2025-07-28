
import React from 'react';
import { Progress } from '@/components/ui/progress';

const Impact = () => {
  const stats = [
    { number: '1,000+', label: 'Youth Trained', color: 'bg-primary' },
    { number: '7', label: 'Startups Incubated', color: 'bg-secondary' },
    { number: '5,000+', label: 'Community Members', color: 'bg-accent' },
  ];

  return (
    <section id="impact" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact So Far</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border-t-4 border-primary">
              <div className={`w-16 h-1 ${stat.color} mx-auto mb-4`}></div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sustainability Progress */}
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto border-l-4 border-primary">
          <h3 className="text-xl font-bold mb-6 text-center">Sustainability Progress</h3>
          <div className="space-y-2 mb-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">87.5% Self-sustaining</span>
              <span className="text-sm font-medium text-primary">87.5%</span>
            </div>
            <Progress value={87.5} className="h-3 bg-gray-200" />
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Our goal is to achieve 100% sustainability through our programs and services by 2025.
          </p>
        </div>
        
        {/* Partners Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">Partners & Supporters</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="bg-white h-20 w-32 md:w-40 flex items-center justify-center rounded-lg shadow-md border border-primary/20">
              <div className="text-primary font-bold">Ritman University</div>
            </div>
            <div className="bg-white h-20 w-32 md:w-40 flex items-center justify-center rounded-lg shadow-md border border-primary/20">
              <div className="text-primary font-bold">NITDA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
