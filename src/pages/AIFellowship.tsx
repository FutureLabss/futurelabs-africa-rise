import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Brain, Eye, MessageSquare, Shield, Rocket, GraduationCap, Users, ArrowRight } from 'lucide-react';

const modules = [
  { icon: Brain, title: 'AI & ML Fundamentals', desc: 'Master the core concepts of artificial intelligence, machine learning algorithms, and data science pipelines.' },
  { icon: MessageSquare, title: 'Natural Language Processing', desc: 'Build intelligent language models, chatbots, and text analysis systems using cutting-edge NLP techniques.' },
  { icon: Eye, title: 'Computer Vision', desc: 'Develop image recognition, object detection, and visual AI applications for real-world use cases.' },
  { icon: Shield, title: 'AI Ethics & Governance', desc: 'Explore responsible AI development, bias mitigation, fairness frameworks, and African data sovereignty.' },
  { icon: Rocket, title: 'Capstone Project', desc: 'Apply your skills to build a production-ready AI solution addressing a real challenge in Africa.' },
];

const mentors = [
  { name: 'Dr. Amina Osei', role: 'AI Research Lead, Google DeepMind', initials: 'AO' },
  { name: 'Chukwuemeka Nwosu', role: 'CTO, TechAfrica Labs', initials: 'CN' },
  { name: 'Fatima Al-Rashid', role: 'ML Engineer, Microsoft', initials: 'FA' },
  { name: 'Kwame Asante', role: 'Founder, AfriAI Institute', initials: 'KA' },
];

const AIFellowship = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="FutureLabs AI Fellowship"
        subtitle="A 12-week intensive program empowering Africa's next generation of AI builders, researchers, and innovators."
        backgroundImageUrl="/images/futurelabs-hero.jpeg"
      />

      {/* Overview */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Now Accepting Applications
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Build the Future with AI
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The FutureLabs AI Fellowship is a fully funded, hands-on program designed for ambitious developers, 
            researchers, and entrepreneurs across Africa. Fellows receive mentorship from world-class AI practitioners, 
            access to compute resources, and a pathway to launch impactful AI products.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '12', label: 'Weeks' },
              { value: '30', label: 'Fellows per Cohort' },
              { value: '100%', label: 'Funded' },
              { value: '4', label: 'Expert Mentors' },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <GraduationCap className="inline h-8 w-8 mr-2 text-primary" />
              Curriculum
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A rigorous, project-based curriculum designed with input from leading AI labs and African tech companies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div key={mod.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <mod.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <Users className="inline h-8 w-8 mr-2 text-primary" />
              Meet the Mentors
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Learn from industry leaders who are shaping the future of AI across the continent and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="text-center p-6 bg-card border border-border rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{mentor.initials}</span>
                </div>
                <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{mentor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Shape the Future?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Applications for Cohort 3 are now open. Join a community of innovators building AI solutions for Africa's biggest challenges.
          </p>
          <Button
            size="lg"
            className="h-14 px-8 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            onClick={() => window.open('https://forms.gle/placeholder', '_blank')}
          >
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-white/50 text-sm mt-4">Application deadline: April 30, 2026</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIFellowship;
