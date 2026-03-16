import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, ExternalLink, Brain, Lightbulb, Rocket, BookOpen } from 'lucide-react';
import { format, nextThursday, addWeeks } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import FellowshipRegistrationModal from '@/components/FellowshipRegistrationModal';
import fellowshipHero from '@/assets/ai-fellow.jpg';

const FELLOWSHIP_EVENT_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

function getNextThursdays(count: number): Date[] {
  const now = new Date();
  const isThursday = now.getDay() === 4;
  const firstThursday = isThursday && now.getHours() < 17
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0)
    : nextThursday(now);
  firstThursday.setHours(10, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => addWeeks(firstThursday, i));
}

const agenda = [
  {
    icon: Brain,
    title: 'Deep Dives',
    desc: 'Expert-led sessions exploring cutting-edge AI topics — from large language models to computer vision and beyond.',
  },
  {
    icon: Rocket,
    title: 'Implementation Lab',
    desc: 'Hands-on building time. Work on real projects, get peer feedback, and ship AI-powered solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Future-Proof Mindset',
    desc: 'Discussions on AI ethics, career strategy, and how to stay ahead as the technology landscape evolves.',
  },
];

const AIFellowship = () => {
  const isMobile = useIsMobile();
  const [showRegModal, setShowRegModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [regCount, setRegCount] = useState(0);
  const [attendeeAvatars, setAttendeeAvatars] = useState<{ email_hash: string; initials: string }[]>([]);

  const upcomingThursdays = useMemo(() => getNextThursdays(3), []);
  const nextSession = upcomingThursdays[0];

  useEffect(() => {
    supabase.rpc('get_registration_counts', { event_ids: [FELLOWSHIP_EVENT_ID] }).then(({ data }) => {
      if (data && data.length > 0) {
        setRegCount(Number((data as { event_id: string; count: number }[])[0].count));
      }
    });
    supabase.rpc('get_event_attendee_avatars', { p_event_id: FELLOWSHIP_EVENT_ID }).then(({ data }) => {
      if (data) setAttendeeAvatars(data as { email_hash: string; initials: string }[]);
    });
  }, []);

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=FutureLabs+Hub+Ikot+Ekpene';

  const StickyCard = () => (
    <div className="bg-card border border-border rounded-[20px] p-6 shadow-sm">
      {/* Date */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-muted flex flex-col items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Every Thursday</p>
            <p className="text-sm text-muted-foreground">10:00 AM — 1:00 PM WAT</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Next: {format(nextSession, 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">FutureLabs Hub, Ikot Ekpene</p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-0.5"
            >
              Get Directions <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      {isRegistered ? (
        <div className="text-center py-3">
          <p className="text-sm font-medium text-green-600">✓ You're registered!</p>
        </div>
      ) : (
        <Button
          onClick={() => setShowRegModal(true)}
          className="w-full h-12 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Join the Fellowship
        </Button>
      )}

      {/* Attendee count */}
      {regCount > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          {regCount} {regCount === 1 ? 'person has' : 'people have'} joined
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-4 pt-5 mb-8">
          <div className="aspect-[2.4/1] rounded-[20px] overflow-hidden bg-muted">
            <img
              src={fellowshipHero}
              alt="FutureLabs AI Fellowship — community members collaborating in a tech hub"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 pb-32 md:pb-16">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Weekly · In-Person
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                    Open to All
                  </span>
                </div>
                <h1 className="text-3xl md:text-[42px] font-bold text-foreground leading-tight tracking-tight">
                  FutureLabs AI Fellowship
                </h1>
                <p className="text-lg text-muted-foreground mt-3">
                  Stay ahead in today's world. Every Thursday at FutureLabs.
                </p>
              </div>

              {/* Host */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">FL</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hosted by</p>
                  <p className="font-semibold text-foreground text-sm">FutureLabs Africa</p>
                </div>
              </div>

              {/* Mobile card */}
              <div className="lg:hidden">
                <StickyCard />
              </div>

              {/* Social Proof — Who's Going */}
              {(regCount > 0 || attendeeAvatars.length > 0) && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    <Users className="inline h-5 w-5 mr-2 text-muted-foreground" />
                    {regCount > 0 ? `${regCount} ${regCount === 1 ? 'person' : 'people'} going` : "Who's Going"}
                  </h2>
                  <div className="flex items-center">
                    <div className="flex -space-x-2.5">
                      {attendeeAvatars.map((a, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted flex items-center justify-center"
                        >
                          <img
                            src={`https://www.gravatar.com/avatar/${a.email_hash}?d=mp&s=80`}
                            alt={a.initials}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xs font-semibold text-muted-foreground">${a.initials}</span>`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {regCount > 8 && (
                      <span className="ml-3 text-sm text-muted-foreground">+{regCount - 8} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* About */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  <BookOpen className="inline h-5 w-5 mr-2 text-muted-foreground" />
                  What Is This?
                </h2>
                <div className="prose prose-base max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    The <strong className="text-foreground">FutureLabs AI Fellowship</strong> is a weekly gathering 
                    for developers, creators, researchers, and curious minds who want to understand and build with 
                    artificial intelligence. Every Thursday, we come together for <strong className="text-foreground">discussion and enlightenment</strong> — 
                    exploring how AI is reshaping industries, learning new tools, and collaborating on projects 
                    that solve real problems.
                  </p>
                  <p>
                    Whether you're writing your first Python script or deploying production ML models, 
                    there's a seat for you. No prerequisites, no gatekeeping — just bring your curiosity and a laptop.
                  </p>
                </div>
              </div>

              {/* Weekly Agenda */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-6">What to Expect</h2>
                <div className="space-y-0">
                  {agenda.map((item, i) => (
                    <div key={item.title} className="flex gap-4">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        {i < agenda.length - 1 && (
                          <div className="w-px flex-1 bg-border my-2" />
                        )}
                      </div>
                      <div className={`pb-8 ${i === agenda.length - 1 ? 'pb-0' : ''}`}>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  <Clock className="inline h-5 w-5 mr-2 text-muted-foreground" />
                  Upcoming Sessions
                </h2>
                <div className="space-y-2">
                  {upcomingThursdays.map((date, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                      <div className="w-10 h-10 rounded-xl bg-muted flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-semibold text-muted-foreground uppercase leading-none">{format(date, 'MMM')}</span>
                        <span className="text-sm font-bold text-foreground leading-none">{format(date, 'd')}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{format(date, 'EEEE, MMMM d')}</p>
                        <p className="text-xs text-muted-foreground">10:00 AM — 1:00 PM WAT</p>
                      </div>
                      {i === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                          Next
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column — Sticky Card (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <StickyCard />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Footer */}
        {isMobile && !isRegistered && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">AI Fellowship</p>
              <p className="text-xs text-muted-foreground">Every Thursday · 10 AM</p>
            </div>
            <Button
              onClick={() => setShowRegModal(true)}
              className="h-10 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
            >
              Join
            </Button>
          </div>
        )}
      </main>
      <Footer />

      {/* Registration Modal */}
      <FellowshipRegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        eventId={FELLOWSHIP_EVENT_ID}
        upcomingDates={upcomingThursdays}
        onSuccess={() => {
          setIsRegistered(true);
          setRegCount(prev => prev + 1);
        }}
      />
    </div>
  );
};

export default AIFellowship;
