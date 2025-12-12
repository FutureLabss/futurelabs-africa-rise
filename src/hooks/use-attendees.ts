import { useState, useEffect, useCallback } from 'react';

export interface Attendee {
  name: string;
  email: string;
  registeredAt: string;
}

export interface EventAttendees {
  [eventId: string]: Attendee[];
}

const STORAGE_KEY = 'futurelabs_event_attendees';

export function useAttendees(eventId: string) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const allAttendees: EventAttendees = JSON.parse(stored);
      setAttendees(allAttendees[eventId] || []);
    }
    setIsLoading(false);
  }, [eventId]);

  const addAttendee = useCallback((attendee: Omit<Attendee, 'registeredAt'>) => {
    const newAttendee: Attendee = {
      ...attendee,
      registeredAt: new Date().toISOString(),
    };

    setAttendees(prev => {
      // Check if already registered
      if (prev.some(a => a.email === attendee.email)) {
        return prev;
      }

      const updated = [...prev, newAttendee];
      
      // Update localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      const allAttendees: EventAttendees = stored ? JSON.parse(stored) : {};
      allAttendees[eventId] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allAttendees));
      
      return updated;
    });

    return newAttendee;
  }, [eventId]);

  return { attendees, addAttendee, isLoading, count: attendees.length };
}
