import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Resources = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [regCounts, setRegCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true })
      .then(({ data }) => {
        const evts = data || [];
        setEvents(evts);
        setLoading(false);
        if (evts.length > 0) {
          const ids = evts.map((e: any) => e.id);
          supabase.rpc('get_registration_counts', { event_ids: ids }).then(({ data: counts }) => {
            if (counts) {
              const map: Record<string, number> = {};
              (counts as { event_id: string; count: number }[]).forEach(r => { map[r.event_id] = Number(r.count); });
              setRegCounts(map);
            }
          });
        }
      });
  }, []);

  const now = new Date().toISOString();
  const upcomingEvents = events.filter(e => e.start_time >= now);
  const pastEvents = events.filter(e => e.start_time < now);
  const featuredEvent = events.find(e => e.featured);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-secondary" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-white text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Events & Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Upcoming Events & Opportunities
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Join our events to learn, connect, and grow with Africa's tech community.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#events">
                  Browse Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="section-padding">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : (
              <>
                {/* Featured Event */}
                {featuredEvent && (
                  <Link
                    to={`/events/${featuredEvent.slug}`}
                    className="group block relative overflow-hidden rounded-3xl bg-secondary mb-12"
                  >
                    <div className="absolute inset-0">
                      {featuredEvent.image_url && (
                        <img
                          src={featuredEvent.image_url}
                          alt={featuredEvent.title}
                          className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="relative p-8 md:p-12 lg:p-16">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                        <span>Featured Event</span>
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                        {featuredEvent.title}
                      </h2>
                      <p className="text-white/80 text-lg mb-6 max-w-2xl">
                        {featuredEvent.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
                        <span>{new Date(featuredEvent.start_time).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>{featuredEvent.location_type}</span>
                        {featuredEvent.location_details && (
                          <>
                            <span>·</span>
                            <span>{featuredEvent.location_details}</span>
                          </>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-full font-medium group-hover:gap-3 transition-all">
                        <span>View Event</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                )}

                {/* Upcoming Events */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
                </div>

                {upcomingEvents.length > 0 ? (
                  <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden mb-12">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={{
                        id: event.slug,
                        title: event.title,
                        date: new Date(event.start_time).toLocaleDateString(),
                        time: new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        location: event.location_details || event.location_type,
                        description: event.description || '',
                        type: event.location_type,
                        image: event.image_url || '',
                        featured: event.featured,
                      }} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-2xl mb-12">
                    <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
                  </div>
                )}

                {/* Past Events */}
                {pastEvents.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Past Events</h2>
                    <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden opacity-75">
                      {pastEvents.slice(0, 5).map((event) => (
                        <div key={event.id} className="flex gap-4 p-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl bg-muted flex items-center justify-center">
                            <span className="text-2xl font-bold text-muted-foreground">
                              {new Date(event.start_time).getDate()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <span>{new Date(event.start_time).toLocaleDateString()}</span>
                              <span>·</span>
                              <span>{event.location_details || event.location_type}</span>
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
                              {event.location_type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
