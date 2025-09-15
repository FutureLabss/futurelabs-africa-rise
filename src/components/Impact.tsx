
import React, { useState, useEffect, useRef } from 'react';
import { useCounter } from '@/hooks/use-counter';

const AnimatedCounter = ({ target, suffix = '', trigger }: { target: number; suffix?: string; trigger: boolean }) => {
  const count = useCounter({ end: target, duration: 2500, trigger });
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 1000, suffix: '+', label: 'Youth Trained', color: 'bg-primary' },
    { number: 10, suffix: '', label: 'Startups Incubated', color: 'bg-secondary' },
    { number: 5000, suffix: '+', label: 'Community Members', color: 'bg-accent' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className="py-20 bg-primary/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact So Far</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border-t-4 border-primary animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className={`w-16 h-1 ${stat.color} mx-auto mb-4`}></div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} trigger={isVisible} />
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
