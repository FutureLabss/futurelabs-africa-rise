import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import type { Event } from '@/lib/supabase-helpers';

interface EventCardProps {
  event: Event;
  showRegisterButton?: boolean;
  onRegisterClick?: () => void;
  attendeeCount?: number;
}

const EventCardNew = ({ event, showRegisterButton = true, onRegisterClick, attendeeCount }: EventCardProps) => {
  const navigate = useNavigate();
  const startDate = new Date(event.start_time);
  const isPast = startDate < new Date();

  const locationIcon = event.location_type === 'virtual' ? '🌐' : '📍';
  const locationText = event.location_type === 'virtual' 
    ? 'Virtual Event' 
    : event.location_details || 'Location TBD';

  return (
    <div 
      className={`group flex gap-4 p-4 md:p-6 hover:bg-muted/50 transition-colors cursor-pointer ${isPast ? 'opacity-60' : ''}`}
      onClick={() => navigate(`/community/events/${event.slug}`)}
    >
      {/* Date Box */}
      <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-primary uppercase">
          {format(startDate, 'MMM')}
        </span>
        <span className="text-xl md:text-2xl font-bold text-primary">
          {format(startDate, 'd')}
        </span>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-1">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {format(startDate, 'h:mm a')}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <span>{locationIcon}</span>
            <span className="truncate">{locationText}</span>
          </span>
        </div>
        
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
          {event.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        
        {attendeeCount !== undefined && (
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{attendeeCount} registered</span>
            {event.capacity && <span className="text-muted-foreground/60">/ {event.capacity}</span>}
          </div>
        )}
      </div>
      
      {/* Action */}
      <div className="flex-shrink-0 self-center flex items-center gap-2">
        {showRegisterButton && !isPast && (
          <Button 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRegisterClick?.();
            }}
          >
            Register
          </Button>
        )}
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

export default EventCardNew;
