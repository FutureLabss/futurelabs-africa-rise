import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Calendar, Mic, Handshake, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import EventCardNew from '@/components/events/EventCardNew';
import FeaturedEventCard from '@/components/events/FeaturedEventCard';
import EventRegistrationModal from '@/components/events/EventRegistrationModal';
import { getUpcomingEvents, getPastEvents, getFeaturedEvent, getRegistrationCount, type Event } from '@/lib/supabase-helpers';
import aboutTeamImage from '@/assets/about-team.jpg';

const Community = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcoming, past, featured] = await Promise.all([
          getUpcomingEvents(),
          getPastEvents(),
          getFeaturedEvent(),
        ]);
        
        setUpcomingEvents(upcoming || []);
        setPastEvents((past || []).slice(0, 5));
        setFeaturedEvent(featured);

        // Fetch counts for upcoming events
        const counts: Record<string, number> = {};
        for (const event of upcoming || []) {
          counts[event.id] = await getRegistrationCount(event.id);
        }
        setEventCounts(counts);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const waysToGetInvolved = [
    {
      icon: Users,
      title: 'Join as a Member',
      description: 'Become part of our vibrant community of developers, founders, and innovators.',
    },
    {
      icon: Calendar,
      title: 'Attend Events',
      description: 'Participate in workshops, hackathons, meetups, and networking events.',
    },
    {
      icon: Mic,
      title: 'Mentor or Speak',
      description: 'Share your expertise and help shape the next generation of tech talent.',
    },
    {
      icon: Handshake,
      title: 'Partner with Us',
      description: 'Collaborate with FutureLabs to drive innovation and impact across Africa.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>FutureLabs Community</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join Africa's most <span className="text-primary">vibrant tech community</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
              Connect with developers, founders, and innovators. Attend events, learn new skills, 
              and be part of a movement shaping Africa's digital future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join the Community
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Explore Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Story */}
      <SectionContainer className="bg-background">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading 
              title="More Than a Space" 
              subtitle="A living community of builders and dreamers"
              centered={false}
            />
            <p className="text-muted-foreground mb-6">
              FutureLabs isn't just a building — it's a thriving ecosystem of developers, 
              designers, entrepreneurs, and change-makers united by a common vision: to build 
              technology solutions that transform Africa.
            </p>
            <p className="text-muted-foreground mb-6">
              From late-night hackathons to morning coffee conversations, our community shares 
              knowledge, celebrates wins, and supports each other through the challenges of 
              building in Africa's unique tech landscape.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Partner Orgs</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={aboutTeamImage} 
              alt="FutureLabs Community" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </SectionContainer>

      {/* Events Section */}
      <SectionContainer className="bg-muted/30">
        <SectionHeading 
          title="Community Events" 
          subtitle="Join us for workshops, meetups, hackathons, and more"
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Featured Event */}
            {featuredEvent && (
              <div className="mb-12">
                <FeaturedEventCard event={featuredEvent} />
              </div>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
                <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
                  {upcomingEvents.map((event) => (
                    <EventCardNew 
                      key={event.id} 
                      event={event}
                      attendeeCount={eventCounts[event.id]}
                      onRegisterClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              </div>
            )}

            {upcomingEvents.length === 0 && !featuredEvent && (
              <div className="text-center py-12 bg-muted/30 rounded-2xl">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming events at the moment.</p>
                <p className="text-sm text-muted-foreground">Check back soon for new events!</p>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Past Events</h3>
                <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden opacity-70">
                  {pastEvents.map((event) => (
                    <EventCardNew 
                      key={event.id} 
                      event={event}
                      showRegisterButton={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </SectionContainer>

      {/* Ways to Get Involved */}
      <SectionContainer>
        <SectionHeading 
          title="Get Involved" 
          subtitle="There are many ways to be part of the FutureLabs community"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {waysToGetInvolved.map((item, index) => (
            <div 
              key={index}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Social Links */}
      <SectionContainer className="bg-secondary text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Follow us on social media for the latest updates, stories, and opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://twitter.com/futurelabsafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="sr-only">X (Twitter)</span>
              𝕏
            </a>
            <a 
              href="https://linkedin.com/company/futurelabsafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              in
            </a>
            <a 
              href="https://instagram.com/futurelabsafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              📷
            </a>
            <a 
              href="https://facebook.com/futurelabsafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              f
            </a>
          </div>
        </div>
      </SectionContainer>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </Layout>
  );
};

export default Community;
