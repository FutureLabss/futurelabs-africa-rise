import { useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Simple client-side rate limiter.
 * @param cooldownMs - minimum milliseconds between allowed submissions (default 30s)
 */
export function useRateLimit(cooldownMs = 30000) {
  const lastSubmit = useRef<number>(0);
  const { toast } = useToast();

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const elapsed = now - lastSubmit.current;
    if (lastSubmit.current > 0 && elapsed < cooldownMs) {
      const remaining = Math.ceil((cooldownMs - elapsed) / 1000);
      toast({
        title: 'Please wait',
        description: `You can submit again in ${remaining} second${remaining !== 1 ? 's' : ''}.`,
        variant: 'destructive',
      });
      return false;
    }
    return true;
  }, [cooldownMs, toast]);

  const recordSubmission = useCallback(() => {
    lastSubmit.current = Date.now();
  }, []);

  return { checkRateLimit, recordSubmission };
}
