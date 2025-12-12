import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import AttendeesModal from '@/components/AttendeesModal';
import { getEventById } from '@/data/events';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAttendees } from '@/hooks/use-attendees';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = getEventById(id || '');
  const { toast } = useToast();
  const { attendees, addAttendee, count } = useAttendees(id || '');

  const handleRegistrationComplete = (name: string, email: string) => {
    addAttendee({ name, email });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description,
          url
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Event link copied to clipboard."
      });
    }
  };

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event not found</h1>
            <Link to="/events" className="text-primary hover:underline">
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isPast = event.isPast;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/events" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Header Image */}
              {event.image && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Event Info */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isPast 
                      ? 'bg-muted text-muted-foreground' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {event.type}
                  </span>
                  {isPast && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                      Past Event
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {event.title}
                </h1>

                {event.host && (
                  <p className="text-muted-foreground mb-6">
                    Hosted by <span className="text-foreground font-medium">{event.host}</span>
                  </p>
                )}

                {/* Event Meta */}
                <div className="flex flex-wrap gap-6 p-6 bg-muted/30 rounded-2xl mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">
                        {event.time}{event.endTime && ` - ${event.endTime}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Attendees</p>
                      <p className="font-medium text-foreground">
                        {count}{event.maxAttendees && ` / ${event.maxAttendees}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {event.longDescription || event.description}
                  </p>

                  {event.learnings && event.learnings.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-4">What You'll Learn</h2>
                      <ul className="space-y-3">
                        {event.learnings.map((learning, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {!isPast ? (
                  <EventRegistrationForm 
                    event={event} 
                    onRegistrationComplete={handleRegistrationComplete}
                  />
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <p className="text-muted-foreground">This event has ended.</p>
                  </div>
                )}

                {/* Attendees Button */}
                <AttendeesModal attendees={attendees} eventTitle={event.title} />

                {/* Share Button */}
                <Button 
                  variant="outline" 
                  className="w-full h-12 gap-2"
                  onClick={handleShare}
                >
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
