
import React from 'react';

const Impact = () => {
  const stats = [
    { number: 1000, suffix: '+', label: 'Youth Trained', color: 'bg-primary' },
    { number: 10, suffix: '', label: 'Startups Incubated', color: 'bg-secondary' },
    { number: 5000, suffix: '+', label: 'Community Members', color: 'bg-accent' },
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
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
              <div className={`w-16 h-1 ${stat.color} mx-auto mb-4`}></div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.number.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Impact;
