import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for registrations
export const registrationSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export interface Registration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  status: 'registered' | 'cancelled' | 'attended';
  check_in_token: string;
  created_at: string;
}

export function useRegistrations(eventId: string) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch registration count for public display
  const fetchRegistrationCount = useCallback(async () => {
    if (!eventId) return;
    
    try {
      // Use RPC or count query - since SELECT is admin-only, we'll track count differently
      // For now, we just don't show attendee list to non-admins
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchRegistrationCount();
  }, [fetchRegistrationCount]);

  const registerForEvent = useCallback(async (input: RegistrationInput): Promise<{ success: boolean; error?: string }> => {
    // Validate input client-side first
    const validation = registrationSchema.safeParse(input);
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || 'Invalid input';
      return { success: false, error: errorMessage };
    }

    const { name, email } = validation.data;

    try {
      // Use edge function for rate-limited registration
      const { data, error } = await supabase.functions.invoke('register-event', {
        body: {
          event_id: eventId,
          full_name: name,
          email: email.toLowerCase(),
        },
      });

      if (error) {
        // Handle edge function errors
        if (import.meta.env.DEV) {
          console.error('Registration error:', error);
        }
        return { success: false, error: 'Failed to register. Please try again.' };
      }

      // Handle response from edge function
      if (data?.error) {
        return { success: false, error: data.error };
      }

      return { success: true };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Registration error:', err);
      }
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [eventId]);

  return {
    registrations,
    isLoading,
    error,
    registerForEvent,
    count: registrations.length
  };
}
