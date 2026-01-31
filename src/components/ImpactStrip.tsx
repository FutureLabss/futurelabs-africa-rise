import React from 'react';
import { useCounter } from '@/hooks/use-counter';
import { useInView } from '@/hooks/use-in-view';

const stats = [
  { value: 5000, suffix: '+', label: 'Youths Trained' },
  { value: 150, suffix: '+', label: 'Startups Supported' },
  { value: 50, suffix: '+', label: 'Partner Organizations' },
  { value: 95, suffix: '%', label: 'Placement Rate' },
];

const StatItem = ({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCounter({ end: inView ? value : 0, duration: 2000, trigger: inView });
  
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </p>
      <p className="text-white/70 text-sm sm:text-base">{label}</p>
    </div>
  );
};

const ImpactStrip = () => {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStrip;
