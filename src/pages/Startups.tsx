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
    link: 'https://www.futurelabs.ng',
  },
  {
    name: 'FutureResume',
    category: 'Career Tech',
    description:
      'AI-powered resume and portfolio tools helping talent showcase skills and land opportunities.',
    link: 'https://futureresume-tbyt.onrender.com/',
  },
  {
    name: 'Opportunitylab.net',
    category: 'Opportunities Platform',
    description:
      'A curated hub for scholarships, fellowships, grants and career programs for African youth.',
    link: 'https://www.opportunitylab.net',
  },
  {
    name: 'Cleverclass',
    category: 'EdTech',
    description:
      'A modern classroom platform powering learning communities with seamless tools and delightful UX.',
    link: 'https://cleverclass.vercel.app/',
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
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden block"
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
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-10 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Incubation Approach</h2>
              <p className="text-foreground/80">
                We incubate ventures from idea to initial traction by pairing product strategy with hands-on execution. Our model blends discovery sprints, user-centric design, technical build, go-to-market, and founder support. Startups receive access to mentors, talent pipelines, and partnerships to accelerate validation and growth across Africa.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Startups;


