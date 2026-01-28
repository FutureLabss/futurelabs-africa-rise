import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Share2, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { getEventBySlug, getRegistrationCount, type Event } from '@/lib/supabase-helpers';
import EventRegistrationModal from '@/components/events/EventRegistrationModal';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CommunityEventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!slug) return;
      
      try {
        const eventData = await getEventBySlug(slug);
        setEvent(eventData);
        
        if (eventData) {
          const count = await getRegistrationCount(eventData.id);
          setAttendeeCount(count);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  // Subscribe to realtime registration updates
  useEffect(() => {
    if (!event) return;

    const channel = supabase
      .channel(`registrations-${event.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'registrations',
          filter: `event_id=eq.${event.id}`,
        },
        () => {
          setAttendeeCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [event?.id]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.title,
        text: event?.description || '',
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Event link copied to clipboard.',
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Event not found</h1>
          <p className="text-muted-foreground mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/community">Back to Community</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const startDate = new Date(event.start_time);
  const endDate = event.end_time ? new Date(event.end_time) : null;
  const isPast = startDate < new Date();
  const isFull = event.capacity ? attendeeCount >= event.capacity : false;

  const locationIcon = event.location_type === 'virtual' ? '🌐' : '📍';
  const locationText = event.location_type === 'virtual' 
    ? 'Virtual Event' 
    : event.location_details || 'Location TBD';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back button */}
        <Link 
          to="/community" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Event image */}
            {event.image_url && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img 
                  src={event.image_url} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event type badge */}
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                {event.location_type === 'virtual' ? '🌐 Virtual' : event.location_type === 'hybrid' ? '🔄 Hybrid' : '📍 In-Person'}
              </Badge>
              {event.featured && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Featured</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {event.title}
            </h1>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="whitespace-pre-wrap">{event.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                {/* Date & time */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{format(startDate, 'EEEE, MMMM d, yyyy')}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(startDate, 'h:mm a')}
                        {endDate && ` - ${format(endDate, 'h:mm a')}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{locationText}</p>
                      <p className="text-sm text-muted-foreground capitalize">{event.location_type} event</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{attendeeCount} registered</p>
                      {event.capacity && (
                        <p className="text-sm text-muted-foreground">
                          {event.capacity - attendeeCount} spots left
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Register button */}
                {isPast ? (
                  <div className="text-center py-3 px-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground font-medium">This event has ended</p>
                  </div>
                ) : isFull ? (
                  <div className="text-center py-3 px-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground font-medium">Event is full</p>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Register Now
                  </Button>
                )}

                {/* Share button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration modal */}
      <EventRegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegistrationComplete={() => {
          // Count will be updated via realtime subscription
        }}
      />
    </Layout>
  );
};

export default CommunityEventDetail;
