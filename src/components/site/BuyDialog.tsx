"use client";

import React, { useId, useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { callEdge } from '@/lib/edge';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { sitesLabel, type BillingInterval, type Currency, type PriceTier } from '@/data/products';

// Subscribing to a Pro tier: collect an email, then hand over to Paystack's
// hosted checkout. While a tier isn't on sale yet (`available: false`), the
// same form adds the visitor to `product_waitlist` instead.

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(254),
  name: z.string().trim().max(120, 'Keep your name under 120 characters.'),
});
type Details = z.infer<typeof schema>;

type Props = {
  product: { id: string; name: string };
  tier: PriceTier;
  interval: BillingInterval;
  currency: Currency;
  /** e.g. "$49 a year" */
  priceLabel: string;
  available: boolean;
  className?: string;
};

export default function BuyDialog({ product, tier, interval, currency, priceLabel, available, className }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Details>({ email: '', name: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [failure, setFailure] = useState<string | null>(null);
  const { checkRateLimit, recordSubmission } = useRateLimit(5000);
  const title = `${product.name} Pro · ${tier.name}`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Details] ??= issue.message;
      setErrors(next);
      return;
    }
    if (!checkRateLimit()) return;
    setErrors({});
    setFailure(null);
    setStatus('sending');
    try {
      if (available) {
        const { authorization_url } = await callEdge<{ authorization_url: string }>('create-checkout', {
          product: product.id,
          tier: tier.id,
          interval,
          currency,
          email: parsed.data.email,
          name: parsed.data.name,
        });
        recordSubmission();
        window.location.assign(authorization_url);
        return;
      }
      const { error } = await supabase.from('product_waitlist').insert({
        email: parsed.data.email,
        name: parsed.data.name || null,
        product: product.id,
        tier: tier.id,
      });
      if (error) throw new Error('Could not add you to the list. Please try again.');
      recordSubmission();
      setStatus('done');
    } catch (err) {
      setFailure(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  const set = <K extends keyof Details>(key: K, value: Details[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus('idle');
          setFailure(null);
          setOpen(true);
        }}
        className={cn('fl-btn', className)}
      >
        {available ? 'Subscribe' : 'Join the waitlist'}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[460px] gap-6 rounded-none border-0 bg-fl-graphite p-7 text-fl-paper shadow-[0_0_0_1px_rgba(242,240,234,.16)] sm:rounded-none [&>button]:text-fl-soft">
          {status === 'done' ? (
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-[24px] font-semibold tracking-[-0.03em]">You&apos;re on the list</DialogTitle>
              <DialogDescription className="fl-card-text m-0">
                We&apos;ll email you when {product.name} Pro is ready, with an early-subscriber price.
              </DialogDescription>
              <button type="button" onClick={() => setOpen(false)} className="fl-btn-ghost mt-2 w-full py-4">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-[24px] font-semibold tracking-[-0.03em]">{title}</DialogTitle>
                <DialogDescription className="fl-card-text m-0">
                  {available
                    ? `${priceLabel} for ${tier.sites === null ? 'unlimited sites' : sitesLabel(tier.sites)}. You'll pay on Paystack's secure checkout, and your license key arrives straight after. Cancel any time.`
                    : `Pro is almost ready. Leave your email and we'll tell you the day it launches.`}
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className="fl-label">Email</label>
                <input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@organization.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                  className="fl-input"
                />
                {errors.email && <p id={`${id}-email-error`} className="fl-error m-0" role="alert">{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-name`} className="fl-label">Name (optional)</label>
                <input
                  id={`${id}-name`}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  className="fl-input"
                />
                {errors.name && <p className="fl-error m-0" role="alert">{errors.name}</p>}
              </div>
              {failure && <p className="fl-error m-0" role="alert">{failure}</p>}
              <button type="submit" className="fl-btn mt-1 w-full py-4" disabled={status === 'sending'}>
                {status === 'sending'
                  ? available ? 'Opening checkout…' : 'Adding you…'
                  : available ? `Continue to payment · ${priceLabel}` : 'Notify me'}
              </button>
              <p className="m-0 text-[12.5px] leading-[1.5] text-fl-muted">
                {available
                  ? 'Your subscription renews automatically. Cancel or change your card any time from your account page. '
                  : 'We only use your email to tell you about this launch. '}
                See our{' '}
                <a href="/privacy" target="_blank" rel="noopener" className="text-fl-soft underline underline-offset-2 hover:text-fl-paper">Privacy Policy</a>.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
