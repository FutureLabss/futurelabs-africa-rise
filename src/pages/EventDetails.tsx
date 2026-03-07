import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

type EventRow = Tables<'events'>;

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [event, setEvent] = useState<EventRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // Try matching by slug first, then by id
    supabase
      .from('events')
      .select('*')
      .or(`slug.eq.${id},id.eq.${id}`)
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setEvent(data);
        setLoading(false);
      });
  }, [id]);

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
        <main className="flex-grow pt-20 flex items-center justify-center">
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
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event not found</h1>
            <Link to="/events" className="text-primary hover:underline">Back to Events</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isPast = new Date(event.start_time) < new Date();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-6">
          <Link to="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {event.image_url && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                  <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                    {event.location_type}
                  </span>
                  {isPast && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">Past Event</span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{event.title}</h1>

                <div className="flex flex-wrap gap-6 p-6 bg-muted/30 rounded-2xl mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{format(new Date(event.start_time), 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">
                        {format(new Date(event.start_time), 'h:mm a')}
                        {event.end_time && ` - ${format(new Date(event.end_time), 'h:mm a')}`}
                      </p>
                    </div>
                  </div>
                  
                  {event.location_details && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{event.location_details}</p>
                      </div>
                    </div>
                  )}
                </div>

                {event.description && (
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-xl font-semibold text-foreground mb-4">About This Event</h2>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {!isPast ? (
                  <EventRegistrationForm event={{
                    id: event.id,
                    title: event.title,
                    date: format(new Date(event.start_time), 'MMMM d, yyyy'),
                    time: format(new Date(event.start_time), 'h:mm a'),
                    location: event.location_details || 'TBA',
                    type: 'Conference',
                    description: event.description || '',
                    maxAttendees: event.capacity || undefined,
                  }} />
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <p className="text-muted-foreground">This event has ended.</p>
                  </div>
                )}

                <Button variant="outline" className="w-full h-12 gap-2" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
