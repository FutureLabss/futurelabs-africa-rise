import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { upcomingEvents, pastEvents } from '@/data/events';
import { ArrowRight, Sparkles, Users, Mic, BookOpen, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GetInvolvedModal from '@/components/GetInvolvedModal';
import communityImage from '@/assets/african-school-outreach.jpg';

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
                  Join a vibrant community of developers, founders, and tech enthusiasts shaping Africa's digital future. Attend events, learn, and grow together.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <a href="#events">
                      Browse Events
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => handleOpenModal('community')}
                  >
                    Join Community
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

        {/* Featured Event */}
        <section id="events" className="section-padding">
          <div className="container mx-auto px-4">
            {upcomingEvents.filter(e => e.featured).map(event => (
              <Link 
                key={event.id}
                to={`/events/${event.id}`}
                className="group block relative overflow-hidden rounded-3xl bg-secondary mb-12"
              >
                <div className="absolute inset-0">
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="relative p-8 md:p-12 lg:p-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                    <span>Featured Event</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                    {event.title}
                  </h2>
                  <p className="text-white/80 text-lg mb-6 max-w-2xl">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
                    <span>{event.date}</span>
                    <span>·</span>
                    <span>{event.time}</span>
                    <span>·</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-full font-medium group-hover:gap-3 transition-all">
                    <span>View Event</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Upcoming Events */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
            </div>
            
            <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden mb-12">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {upcomingEvents.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-2xl mb-12">
                <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
              </div>
            )}

            {/* Past Events */}
            <h2 className="text-2xl font-bold text-foreground mb-6">Past Events</h2>
            <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden opacity-75">
              {pastEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex gap-4 p-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>{event.date}</span>
                      <span>·</span>
                      <span>{event.location}</span>
                    </div>
                    <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-start">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
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
