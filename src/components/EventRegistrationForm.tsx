import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Calendar, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventData } from '@/data/events';
import { useRegistrations, registrationSchema } from '@/hooks/use-registrations';
import { z } from 'zod';

interface EventRegistrationFormProps {
  event: EventData;
  onRegistrationComplete?: (name: string, email: string) => void;
}

const EventRegistrationForm = ({ event, onRegistrationComplete }: EventRegistrationFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ name?: string; email?: string }>({});
  const { toast } = useToast();
  const { registerForEvent } = useRegistrations(event.id);

  const generateICSFile = (guestName: string, guestEmail: string) => {
    const startDate = new Date(event.date + ' ' + event.time);
    const endDate = event.endTime 
      ? new Date(event.date + ' ' + event.endTime)
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

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
ATTENDEE;CN=${guestName}:mailto:${guestEmail}
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

  const validateInputs = (): boolean => {
    const errors: { name?: string; email?: string } = {};
    
    try {
      registrationSchema.parse({ name, email });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          if (error.path[0] === 'name') {
            errors.name = error.message;
          } else if (error.path[0] === 'email') {
            errors.email = error.message;
          }
        });
      }
      setValidationErrors(errors);
      return false;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    setIsRegistering(true);
    
    const result = await registerForEvent({ name, email });
    
    if (result.success) {
      setIsRegistered(true);
      generateICSFile(name.trim(), email.trim());
      onRegistrationComplete?.(name.trim(), email.trim());
      
      toast({
        title: "You're registered!",
        description: "A calendar invite has been downloaded for you.",
      });
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "Please try again later.",
        variant: "destructive",
      });
    }
    
    setIsRegistering(false);
  };

  if (isRegistered) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">You're in!</h3>
        <p className="text-muted-foreground mb-4">
          Your calendar invite has been downloaded.
        </p>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => generateICSFile(name.trim(), email.trim())}
        >
          <Calendar className="h-4 w-4" />
          Download Calendar Invite Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Register for Event</h3>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (validationErrors.name) {
                setValidationErrors(prev => ({ ...prev, name: undefined }));
              }
            }}
            className={`h-12 rounded-xl bg-background border-border ${validationErrors.name ? 'border-destructive' : ''}`}
            maxLength={100}
          />
          {validationErrors.name && (
            <p className="text-sm text-destructive mt-1">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationErrors.email) {
                setValidationErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
            className={`h-12 rounded-xl bg-background border-border ${validationErrors.email ? 'border-destructive' : ''}`}
            maxLength={255}
          />
          {validationErrors.email && (
            <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
          )}
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
    </div>
  );
};

export default EventRegistrationForm;
