import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

type Startup = {
  name: string;
  category: string;
  description: string;
  link?: string;
};

const startups: Startup[] = [
  {
    name: 'FutureLabs Academy',
    category: 'Education',
    description:
      'Technical education and talent accelerator building Africa’s next generation of tech leaders.',
  },
  {
    name: 'FutureResume',
    category: 'Career Tech',
    description:
      'AI-powered resume and portfolio tools helping talent showcase skills and land opportunities.',
  },
  {
    name: 'Opportunitylab.net',
    category: 'Opportunities Platform',
    description:
      'A curated hub for scholarships, fellowships, grants and career programs for African youth.',
  },
  {
    name: 'Flowz Financial',
    category: 'Fintech',
    description:
      'Financial tools and services enabling individuals and small businesses to manage and grow wealth.',
  },
  {
    name: 'Afro Food',
    category: 'Food & Beverage',
    description:
      'Celebrating African cuisine through digital community, content and commerce experiences.',
  },
];

const Startups = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageHero
          title="Startups"
          subtitle="Ventures we’re building, supporting and nurturing within our ecosystem."
        />

        <section className="mx-10 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {startups.map((s) => (
                <div
                  key={s.name}
                  className="group rounded-xl border border-white/10 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-primary mb-2">
                      {s.category}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Startups;


