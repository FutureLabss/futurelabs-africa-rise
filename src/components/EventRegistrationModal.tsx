import React, { useState } from 'react';
import { X, Loader2, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRegistrations, registrationSchema } from '@/hooks/use-registrations';
import { z } from 'zod';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Tables<'events'>;
  onSuccess?: (name: string, email: string) => void;
}

const EventRegistrationModal = ({ isOpen, onClose, event, onSuccess }: EventRegistrationModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const { toast } = useToast();
  const { registerForEvent } = useRegistrations(event.id);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      registrationSchema.parse({ name, email, phone });
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { name?: string; email?: string; phone?: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0] === 'name') newErrors.name = error.message;
          if (error.path[0] === 'email') newErrors.email = error.message;
          if (error.path[0] === 'phone') newErrors.phone = error.message;
        });
        setErrors(newErrors);
      }
      return;
    }

    setIsRegistering(true);
    const result = await registerForEvent({ name, email, phone });

    if (result.success) {
      setIsComplete(true);
      onSuccess?.(name.trim(), email.trim());
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "Please try again later.",
        variant: "destructive",
      });
    }
    setIsRegistering(false);
  };

  const eventDate = new Date(event.start_time);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-card rounded-[20px] shadow-xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {isComplete ? 'You\'re in!' : 'Register for Event'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Event Summary */}
        <div className="px-5 py-4 bg-muted/30 border-b border-border">
          <p className="font-semibold text-foreground text-sm">{event.title}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(eventDate, 'EEEE, MMMM d · h:mm a')}</span>
          </div>
        </div>

        {isComplete ? (
          <div className="p-6 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-foreground font-medium mb-1">Registration confirmed</p>
            <p className="text-sm text-muted-foreground mb-5">
              We'll send you event updates via email.
            </p>
            <Button
              variant="outline"
              className="rounded-xl h-10"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                }}
                className={`h-11 rounded-xl bg-background border-border ${errors.name ? 'border-destructive' : ''}`}
                maxLength={100}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                className={`h-11 rounded-xl bg-background border-border ${errors.email ? 'border-destructive' : ''}`}
                maxLength={255}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                }}
                className={`h-11 rounded-xl bg-background border-border ${errors.phone ? 'border-destructive' : ''}`}
                maxLength={20}
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Registering…
                </>
              ) : (
                'Register'
              )}
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              By registering, you agree to receive event updates via email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventRegistrationModal;
