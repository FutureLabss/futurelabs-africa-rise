import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGuest, GuestInfo } from '@/hooks/use-guest';
import { Check, Calendar, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventData } from '@/data/events';

interface EventRegistrationFormProps {
  event: EventData;
}

const EventRegistrationForm = ({ event }: EventRegistrationFormProps) => {
  const { guest, saveGuest, clearGuest, isLoading } = useGuest();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  const generateICSFile = (guestInfo: GuestInfo) => {
    const startDate = new Date(event.date + ' ' + event.time);
    const endDate = event.endTime 
      ? new Date(event.date + ' ' + event.endTime)
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FutureLabs Africa//Events//EN
BEGIN:VEVENT
UID:${event.id}@futurelabs.africa
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
ORGANIZER;CN=FutureLabs Africa:mailto:hello@futurelabs.africa
ATTENDEE;CN=${guestInfo.name}:mailto:${guestInfo.email}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegister = async (guestInfo: GuestInfo) => {
    setIsRegistering(true);
    
    // Simulate registration API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    saveGuest(guestInfo);
    setIsRegistered(true);
    
    // Auto-download calendar invite
    generateICSFile(guestInfo);
    
    toast({
      title: "You're registered!",
      description: "A confirmation email has been sent with your calendar invite.",
    });
    
    setIsRegistering(false);
  };

  const handleNewRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    handleRegister({ name: name.trim(), email: email.trim() });
  };

  const handleOneClickRegister = () => {
    if (guest) {
      handleRegister(guest);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-10 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">You're in!</h3>
        <p className="text-muted-foreground mb-4">
          Check your email for confirmation and calendar invite.
        </p>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => generateICSFile(guest!)}
        >
          <Calendar className="h-4 w-4" />
          Add to Calendar
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Register for Event</h3>
      
      {guest ? (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Welcome back!</p>
            <p className="font-medium text-foreground">{guest.name}</p>
            <p className="text-sm text-muted-foreground">{guest.email}</p>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium"
            onClick={handleOneClickRegister}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Registering...
              </>
            ) : (
              'One-Click Register'
            )}
          </Button>
          
          <button 
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={clearGuest}
          >
            Not you? Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={handleNewRegistration} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl bg-background border-border"
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-background border-border"
              required
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By registering, you agree to receive event updates via email.
          </p>
        </form>
      )}
    </div>
  );
};

export default EventRegistrationForm;
