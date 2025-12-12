import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { EventData } from '@/data/events';

interface EventCardProps {
  event: EventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const typeColors: Record<string, string> = {
    Conference: 'bg-primary/10 text-primary',
    Workshop: 'bg-blue-100 text-blue-700',
    Hackathon: 'bg-purple-100 text-purple-700',
    Meetup: 'bg-green-100 text-green-700',
    Bootcamp: 'bg-amber-100 text-amber-700'
  };

  return (
    <Link 
      to={`/events/${event.id}`}
      className="group block"
    >
      <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
        {/* Event Image */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <Calendar className="h-6 w-6 text-primary/60" />
            </div>
          )}
        </div>

        {/* Event Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{event.date}</span>
            <span>·</span>
            <span>{event.time}</span>
          </div>
          
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {event.title}
          </h3>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            {event.attendees && (
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{event.attendees} going</span>
              </div>
            )}
          </div>
        </div>

        {/* Type Badge */}
        <div className="flex-shrink-0 self-start">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[event.type] || 'bg-muted text-muted-foreground'}`}>
            {event.type}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
