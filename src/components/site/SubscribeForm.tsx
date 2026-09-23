"use client";

import React, { useId, useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { sendForm } from '@/lib/formsubmit';
import { useRateLimit } from '@/hooks/use-rate-limit';

const emailSchema = z.string().trim().email('Enter a valid email address.').max(255);

type Props = {
  /** Subject line of the email the team receives. */
  subject: string;
  /** Button label. */
  submitLabel?: string;
  /** Optional role select (Events calendar). */
  roleOptions?: string[];
  roleLabel?: string;
  /** `stacked` = labelled field over a full-width button; `inline` = one-line bar. */
  variant?: 'stacked' | 'inline';
  successText?: string;
  className?: string;
};

export default function SubscribeForm({
  subject,
  submitLabel = 'Subscribe',
  roleOptions,
  roleLabel = 'I am a',
  variant = 'stacked',
  successText = "You're on the list. We'll be in touch.",
  className,
}: Props) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    if (!checkRateLimit()) return;
    setError('');
    setStatus('sending');
    try {
      await sendForm(subject, { Email: parsed.data, ...(role ? { Role: role } : {}) });
      recordSubmission();
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'done') {
    return (
      <div role="status" className={cn('flex items-center gap-3 text-[15px] text-fl-paper', className)}>
        <span className="h-1.5 w-1.5 flex-none bg-fl-orange" aria-hidden />
        {successText}
      </div>
    );
  }

  const failed = status === 'failed' && (
    <p className="fl-error m-0" role="alert">
      Something went wrong. Please try again, or email hello@futurelabs.africa.
    </p>
  );

  if (variant === 'inline') {
    return (
      <form onSubmit={onSubmit} noValidate className={cn('flex flex-col gap-2', className)}>
        <div className="flex flex-wrap shadow-[0_0_0_1px_rgba(242,240,234,.24)] focus-within:shadow-[0_0_0_1px_#F58220]">
          <label htmlFor={`${id}-email`} className="sr-only">Email</label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            className="min-w-0 flex-[1_1_220px] bg-transparent px-[18px] py-[17px] text-[15px] text-fl-paper outline-none placeholder:text-fl-dim"
          />
          <button type="submit" className="fl-btn flex-auto sm:flex-none" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : submitLabel}
          </button>
        </div>
        {error && <p className="fl-error m-0" role="alert">{error}</p>}
        {failed}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn('flex flex-col gap-[18px]', className)}>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="fl-label">Email</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@organization.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          className="fl-input"
        />
        {error && <p className="fl-error m-0" role="alert">{error}</p>}
      </div>
      {roleOptions && (
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-role`} className="fl-label">{roleLabel}</label>
          <select id={`${id}-role`} value={role} onChange={(e) => setRole(e.target.value)} className="fl-select">
            <option value="">Select</option>
            {roleOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      )}
      <button type="submit" className="fl-btn mt-1 w-full py-4" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
      {failed}
    </form>
  );
}
