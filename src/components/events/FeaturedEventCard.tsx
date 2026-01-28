import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import type { Event } from '@/lib/supabase-helpers';

interface FeaturedEventCardProps {
  event: Event;
}

const FeaturedEventCard = ({ event }: FeaturedEventCardProps) => {
  const startDate = new Date(event.start_time);
  const locationText = event.location_type === 'virtual' 
    ? 'Virtual Event' 
    : event.location_details || 'Location TBD';

  return (
    <Link 
      to={`/community/events/${event.slug}`}
      className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-secondary/80"
    >
      <div className="absolute inset-0">
        {event.image_url && (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="relative p-8 md:p-12 lg:p-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Featured Event</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
          {event.title}
        </h2>
        <p className="text-white/80 text-lg mb-6 max-w-2xl line-clamp-2">
          {event.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(startDate, 'EEEE, MMMM d, yyyy')}
          </span>
          <span>·</span>
          <span>{format(startDate, 'h:mm a')}</span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {locationText}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-full font-medium group-hover:gap-3 transition-all">
          <span>View Event</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedEventCard;
