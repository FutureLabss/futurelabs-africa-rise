import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { GraduationCap, FileText, Globe, BookOpen, ShoppingBag, type LucideIcon } from 'lucide-react';

type Startup = {
  name: string;
  category: string;
  description: string;
  link?: string;
  icon: LucideIcon;
  screenshot: string;
};

const startups: Startup[] = [
  {
    name: 'FutureLabs Academy',
    category: 'Education',
    description:
      'Technical education and talent accelerator building Africa\'s next generation of tech leaders.',
    link: 'https://www.futurelabs.ng',
    icon: GraduationCap,
    screenshot: '/startups/futurelabs-academy.png',
  },
  {
    name: 'FutureResume',
    category: 'Career Tech',
    description:
      'AI-powered resume and portfolio tools helping talent showcase skills and land opportunities.',
    link: 'https://futureresume-tbyt.onrender.com/',
    icon: FileText,
    screenshot: '/startups/futureresume.png',
  },
  {
    name: 'Opportunitylab.net',
    category: 'Opportunities Platform',
    description:
      'A curated hub for scholarships, fellowships, grants and career programs for African youth.',
    link: 'https://www.opportunitylab.net',
    icon: Globe,
    screenshot: '/startups/opportunitylab.png',
  },
  {
    name: 'Cleverclass',
    category: 'EdTech',
    description:
      'A modern classroom platform powering learning communities with seamless tools and delightful UX.',
    link: 'https://cleverclass.vercel.app/',
    icon: BookOpen,
    screenshot: '/startups/cleverclass.png',
  },
  {
    name: 'Salely',
    category: 'Social Commerce',
    description:
      'A simple storefront builder for African vendors — create one link for all your products and let customers browse and order directly via WhatsApp. No app needed.',
    link: 'https://salely.app',
    icon: ShoppingBag,
    screenshot: '/startups/salely.png',
  },
];

const Startups = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageHero
          title="Startups"
          subtitle="Ventures we're building, supporting and nurturing within our ecosystem."
        />

        <section className="mx-4 md:mx-10 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
              {startups.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-xl border border-border bg-card backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden block"
                  >
                    {/* Animated background icon */}
                    <div className="absolute -right-6 -bottom-6 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500">
                      <Icon className="w-40 h-40 text-primary animate-float" strokeWidth={1} />
                    </div>

                    <div className="relative p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                          {s.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {s.name}
                      </h3>
                      <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-4 md:mx-10 pb-16">
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
