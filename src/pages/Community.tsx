import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Sparkles, Users, Mic, BookOpen, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GetInvolvedModal from '@/components/GetInvolvedModal';
import communityImage from '@/assets/community-2.jpg';

const involvementOptions = [
  {
    icon: Users,
    title: 'Join as a Member',
    description: 'Get access to exclusive events, resources, and networking opportunities.',
    cta: 'Join Now',
    type: 'community',
  },
  {
    icon: Mic,
    title: 'Speak at Events',
    description: 'Share your expertise and inspire the next generation of African tech talent.',
    cta: 'Apply to Speak',
    type: 'train',
  },
  {
    icon: BookOpen,
    title: 'Become a Mentor',
    description: 'Guide aspiring developers and founders on their tech journey.',
    cta: 'Become a Mentor',
    type: 'mentor',
  },
  {
    icon: HandHeart,
    title: 'Partner With Us',
    description: 'Collaborate with us to drive tech innovation across Africa.',
    cta: 'Partner Now',
    type: 'partner',
  },
];

const Community = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-secondary" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-white text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span>FutureLabs Community</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Where Africa's Tech{' '}
                  <span className="text-primary">Innovators</span> Connect
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8">
                  Join a vibrant community of developers, founders, and tech enthusiasts shaping Africa's digital future. Learn, and grow together.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleOpenModal('community')}
                  >
                    Join Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img 
                    src={communityImage}
                    alt="FutureLabs Community"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">10,000+</p>
                <p className="text-muted-foreground">Community Members</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
                <p className="text-muted-foreground">Events Per Year</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">20+</p>
                <p className="text-muted-foreground">Partner Organizations</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">5</p>
                <p className="text-muted-foreground">African Cities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="section-padding bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary font-semibold mb-2">Get Involved</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Be Part of Africa's Tech Movement
              </h2>
              <p className="text-muted-foreground text-lg">
                There are many ways to contribute to our growing community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {involvementOptions.map((option) => (
                <div
                  key={option.title}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {option.description}
                  </p>
                  <button 
                    onClick={() => handleOpenModal(option.type)}
                    className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {option.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GetInvolvedModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType}
      />
    </div>
  );
};

export default Community;
