import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { upcomingEvents, pastEvents } from '@/data/events';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section - Luma-inspired clean design */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>FutureLabs Events</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover <span className="text-primary">events</span> that shape Africa's future.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Join our community of innovators, founders, and tech enthusiasts. Register for workshops, conferences, and meetups across Africa.
            </p>
          </div>
        </div>

        {/* Featured Event */}
        {upcomingEvents.filter(e => e.featured).map(event => (
          <div key={event.id} className="container mx-auto px-4 mb-16">
            <Link 
              to={`/events/${event.id}`}
              className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-secondary/80"
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
          </div>
        ))}

        {/* Upcoming Events List */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
          </div>
          
          <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-2xl">
              <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Past Events */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Past Events</h2>
          
          <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden opacity-75">
            {pastEvents.map((event) => (
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
