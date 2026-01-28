import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Calendar, Loader2, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { registerForEvent, downloadICSFile, type Event } from '@/lib/supabase-helpers';
import QRCode from 'react-qr-code';

interface EventRegistrationModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete?: () => void;
}

const EventRegistrationModal = ({ event, isOpen, onClose, onRegistrationComplete }: EventRegistrationModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInToken, setCheckInToken] = useState('');
  const { toast } = useToast();

  // Check for returning guest
  React.useEffect(() => {
    const savedGuest = localStorage.getItem('futurelabs_guest');
    if (savedGuest) {
      const guest = JSON.parse(savedGuest);
      setFullName(guest.name || '');
      setEmail(guest.email || '');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registration = await registerForEvent(event.id, fullName, email);
      
      // Save guest info for next time
      localStorage.setItem('futurelabs_guest', JSON.stringify({ name: fullName, email }));
      
      setCheckInToken(registration.check_in_token);
      setStep('success');
      onRegistrationComplete?.();
      
      toast({
        title: "You're registered!",
        description: `You've successfully registered for ${event.title}.`,
      });
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: 'Already registered',
          description: 'You are already registered for this event with this email.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Registration failed',
          description: error.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToGoogleCalendar = () => {
    const startDate = new Date(event.start_time);
    const endDate = event.end_time ? new Date(event.end_time) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const formatGoogleDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', event.title);
    url.searchParams.set('dates', `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`);
    url.searchParams.set('details', event.description || '');
    url.searchParams.set('location', event.location_details || '');
    
    window.open(url.toString(), '_blank');
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  const checkInUrl = `${window.location.origin}/check-in/${checkInToken}`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Register for Event</DialogTitle>
              <DialogDescription>
                {event.title}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Reserve your spot'
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-2xl">You're going!</DialogTitle>
              <DialogDescription>
                You've successfully registered for {event.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* QR Code */}
              <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">Your check-in QR code</p>
                <div className="bg-white p-3 rounded-lg">
                  <QRCode value={checkInUrl} size={150} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Show this at the event for check-in</p>
              </div>
              
              {/* Add to Calendar buttons */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-center">Add to calendar</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleAddToGoogleCalendar}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => downloadICSFile(event)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Apple / Outlook
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
