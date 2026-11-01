"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Loader2, ChevronDown, Users } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import EventRegistrationModal from '@/components/EventRegistrationModal';
import CalendarDropdown from '@/components/CalendarDropdown';
import type { Tables } from '@/integrations/supabase/types';

type EventRow = Tables<'events'>;

/**
 * Event times in Lagos time, so the server-rendered HTML and the browser show the same
 * thing (date-fns `format` used the viewer's timezone, which differs from the server's).
 */
const TZ = 'Africa/Lagos';
const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: TZ, ...o }).format(d);
const fmtTime = (d: Date) => fmt(d, { hour: 'numeric', minute: '2-digit' });
const stripTags = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const EventDetailClient = ({ initialEvent = null }: { initialEvent?: EventRow | null }) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  // The server passes the event in so its content is in the HTML for search engines.
  const [event, setEvent] = useState<EventRow | null>(initialEvent);
  const [loading, setLoading] = useState(!initialEvent);
  // DOMPurify needs a browser, so the formatted description waits until after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [regCount, setRegCount] = useState(0);
  const [showRegModal, setShowRegModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [attendeeAvatars, setAttendeeAvatars] = useState<{ email_hash: string; initials: string }[]>([]);

  useEffect(() => {
    if (!id) return;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const query = supabase.from('events').select('*');
    const filtered = isUuid ? query.eq('id', id) : query.eq('slug', id);
    filtered.limit(1).single().then(({ data, error }) => {
      if (!error && data) {
        setEvent((prev) => (prev && JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
        // Fetch registration count
        supabase.rpc('get_registration_counts', { event_ids: [data.id] }).then(({ data: counts }) => {
          if (counts && counts.length > 0) {
            setRegCount(Number((counts as { event_id: string; count: number }[])[0].count));
          }
        });
      }
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!event) return;
    supabase.rpc('get_event_attendee_avatars', { p_event_id: event.id }).then(({ data }) => {
      if (data) setAttendeeAvatars(data as { email_hash: string; initials: string }[]);
    });
  }, [event, regCount]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: event?.title, text: event?.description || '', url });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Event link copied to clipboard." });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event not found</h1>
            <Link href="/events" className="text-primary hover:underline">Back to Events</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isPast = new Date(event.start_time) < new Date();
  const eventDate = new Date(event.start_time);
  const endDate = event.end_time ? new Date(event.end_time) : null;

  const StickyCard = () => (
    <div className="bg-card border border-border rounded-[20px] p-6 shadow-sm">
      {/* Date & Time */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-muted flex flex-col items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase leading-none">{fmt(eventDate, { month: 'short' })}</span>
            <span className="text-lg font-bold text-foreground leading-none">{fmt(eventDate, { day: 'numeric' })}</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{fmt(eventDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-sm text-muted-foreground">
              {fmtTime(eventDate)}
              {endDate && ` – ${fmtTime(endDate)}`} WAT
            </p>
          </div>
        </div>

        {/* Location */}
        {event.location_details && (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{event.location_details}</p>
              <p className="text-sm text-muted-foreground capitalize">{event.location_type}</p>
            </div>
          </div>
        )}
      </div>

      {/* Registration */}
      {!isPast ? (
        <div className="space-y-3">
          {isRegistered ? (
            <div className="text-center py-3">
              <p className="text-sm font-medium text-green-600">✓ You're registered!</p>
            </div>
          ) : (
            <Button
              onClick={() => setShowRegModal(true)}
              className="w-full h-12 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Register
            </Button>
          )}
          <CalendarDropdown event={event} />
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl gap-2 border-border text-foreground"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      ) : (
        <div className="text-center py-4 px-3 rounded-xl bg-muted">
          <p className="text-sm text-muted-foreground font-medium">This event has ended</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 py-5">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            All Events
          </Link>
        </div>

        {/* Hero Image */}
        {event.image_url && (
          <div className="max-w-5xl mx-auto px-4 mb-8">
            <div className="aspect-[2/1] md:aspect-[2.4/1] rounded-[20px] overflow-hidden bg-muted">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 pb-32 md:pb-16">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Title & Meta */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                    {event.location_type}
                  </span>
                  {isPast && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">Past</span>
                  )}
                </div>
                <h1 className="text-3xl md:text-[42px] font-bold text-foreground leading-tight tracking-tight">
                  {event.title}
                </h1>
              </div>

              {/* Host Section */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">FL</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hosted by</p>
                  <p className="font-semibold text-foreground text-sm">FutureLabs Africa</p>
                </div>
              </div>

              {/* Date/Time/Location - Mobile inline */}
              <div className="lg:hidden">
                <StickyCard />
              </div>

              {/* Description */}
              {event.description && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">About This Event</h2>
                  {mounted ? (
                    <div
                      className="prose prose-base max-w-none text-muted-foreground leading-relaxed [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_a]:text-primary"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }}
                    />
                  ) : (
                    <p className="text-base text-muted-foreground leading-relaxed">{stripTags(event.description)}</p>
                  )}
                </div>
              )}

              {/* Attendees / Social Proof */}
              {regCount > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    <Users className="inline h-5 w-5 mr-2 text-muted-foreground" />
                    {regCount} {regCount === 1 ? 'person' : 'people'} going
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
            </div>

            {/* Right Column - Sticky Card (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <StickyCard />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Footer */}
        {isMobile && !isPast && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground">{fmt(eventDate, { month: 'short', day: 'numeric' })} · {fmtTime(eventDate)} WAT</p>
            </div>
            {isRegistered ? (
              <span className="text-sm font-medium text-green-600 flex-shrink-0">✓ Registered</span>
            ) : (
              <Button
                onClick={() => setShowRegModal(true)}
                className="h-10 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
              >
                Register
              </Button>
            )}
          </div>
        )}
      </main>
      <Footer />

      {/* Registration Modal */}
      <EventRegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        event={event}
        onSuccess={(name, email) => {
          setIsRegistered(true);
          setRegCount(prev => prev + 1);
        }}
      />
    </div>
  );
};

export default EventDetailClient;
