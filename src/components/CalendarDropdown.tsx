import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

interface CalendarDropdownProps {
  event: Tables<'events'>;
}

const CalendarDropdown = ({ event }: CalendarDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const start = new Date(event.start_time);
  const end = event.end_time ? new Date(event.end_time) : new Date(start.getTime() + 2 * 3600000);

  const fmtICS = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const downloadICS = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FutureLabs Africa//Events//EN
BEGIN:VEVENT
UID:${event.id}@futurelabs.africa
DTSTAMP:${fmtICS(new Date())}
DTSTART:${fmtICS(start)}
DTEND:${fmtICS(end)}
SUMMARY:${event.title}
DESCRIPTION:${(event.description || '').replace(/<[^>]*>/g, '').substring(0, 200)}
LOCATION:${event.location_details || ''}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.slug || event.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const googleUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${fmtICS(start)}/${fmtICS(end)}`,
      details: (event.description || '').replace(/<[^>]*>/g, '').substring(0, 200),
      location: event.location_details || '',
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const outlookUrl = () => {
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      startdt: start.toISOString(),
      enddt: end.toISOString(),
      body: (event.description || '').replace(/<[^>]*>/g, '').substring(0, 200),
      location: event.location_details || '',
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const options = [
    { label: 'Google Calendar', action: () => { window.open(googleUrl(), '_blank'); setOpen(false); } },
    { label: 'Apple Calendar', action: downloadICS },
    { label: 'Outlook', action: () => { window.open(outlookUrl(), '_blank'); setOpen(false); } },
    { label: 'Download .ics', action: downloadICS },
  ];

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        className="w-full h-11 rounded-xl gap-2 border-border text-foreground"
        onClick={() => setOpen(!open)}
      >
        <Calendar className="h-4 w-4" />
        Add to Calendar
        <ChevronDown className={`h-3.5 w-3.5 ml-auto transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.action}
              className="w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-muted transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
