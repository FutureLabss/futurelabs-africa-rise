"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useRateLimit } from '@/hooks/use-rate-limit';

// Applications share the `hackathon_submissions` table with VibeCode and use
// the same JSON shape in `description`, so they appear in the admin list.
// `tech_stack` carries the 'AI Fellowship' tag that tells them apart.
export const FELLOWSHIP_TAG = 'AI Fellowship';

const EXPERIENCE = [
  'New to AI tools',
  'I use AI tools at work or school',
  'I build with AI regularly',
];

const INTERESTS = [
  'Generative AI',
  'AI agents & automation',
  'Machine learning',
  'AI for business',
  'AI-powered development',
];

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  phone: z.string().trim().min(7, 'Enter a phone number we can reach you on.').max(20),
  location: z.string().trim().min(2, 'Enter your town or city.').max(80),
  experience: z.string().min(1, 'Choose the option closest to you.'),
  interests: z.array(z.string()).min(1, 'Pick at least one topic.'),
  topic: z.string().trim().max(600, 'Keep this under 600 characters.'),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: '', email: '', phone: '', location: '', experience: '', interests: [], topic: '' };

export default function AiFellowshipClient() {
  const id = useId();
  const [form, setForm] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const doneRef = useRef<HTMLHeadingElement>(null);
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const toggleInterest = (item: string) =>
    set('interests', form.interests.includes(item) ? form.interests.filter((i) => i !== item) : [...form.interests, item]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Values] ??= issue.message;
      setErrors(next);
      const first = (Object.keys(EMPTY) as (keyof Values)[]).find((k) => next[k]);
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    if (!checkRateLimit()) return;
    setErrors({});
    setStatus('sending');
    const v = parsed.data;
    // No .select(): visitors may add rows but not read them back.
    const { error } = await supabase.from('hackathon_submissions').insert({
      title: v.name,
      tagline: `${FELLOWSHIP_TAG} | ${v.experience}`,
      description: JSON.stringify({
        programme: FELLOWSHIP_TAG,
        email: v.email,
        phone: v.phone,
        location: v.location,
        skill_level: v.experience,
        learning_objectives: v.interests,
        topic: v.topic,
      }),
      tech_stack: [FELLOWSHIP_TAG, ...v.interests],
    });
    if (error) {
      console.error('Fellowship application failed:', error);
      setStatus('failed');
      return;
    }
    recordSubmission();
    setStatus('done');
  };

  const field = (key: keyof Values) => ({
    id: `${id}-${key}`,
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `${id}-${key}-error` : undefined,
  });
  const error = (key: keyof Values) =>
    errors[key] && (
      <p id={`${id}-${key}-error`} className="fl-error m-0" role="alert">
        {errors[key]}
      </p>
    );

  if (status === 'done') {
    return (
      <div className="flex flex-col gap-4" role="status">
        <h2 ref={doneRef} tabIndex={-1} className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.03em] outline-none">
          Application received.
        </h2>
        <p className="fl-card-text m-0 max-w-[52ch]">
          Thanks, {form.name.trim().split(' ')[0]}. We&apos;ll be in touch at {form.email.trim()} with details of the next cohort.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/case-studies/ai-fellowship-case-study" className="fl-btn-ghost px-6 py-4">Read the fellowship case study</Link>
          <Link href="/" className="fl-btn-ghost px-6 py-4">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[22px]">
      <div className="grid gap-[22px] sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className="fl-label">Full name</label>
          <input {...field('name')} type="text" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className="fl-input" />
          {error('name')}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="fl-label">Email</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="fl-input" placeholder="you@example.com" />
          {error('email')}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-phone`} className="fl-label">Phone</label>
          <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className="fl-input" placeholder="+234" />
          {error('phone')}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-location`} className="fl-label">Town or city</label>
          <input {...field('location')} type="text" autoComplete="address-level2" value={form.location} onChange={(e) => set('location', e.target.value)} className="fl-input" placeholder="Ikot Ekpene" />
          {error('location')}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-experience`} className="fl-label">Your experience with AI</label>
        <select {...field('experience')} value={form.experience} onChange={(e) => set('experience', e.target.value)} className="fl-select">
          <option value="">Select</option>
          {EXPERIENCE.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {error('experience')}
      </div>

      <fieldset
        className="m-0 flex flex-col gap-3 border-0 p-0"
        aria-describedby={errors.interests ? `${id}-interests-error` : undefined}
      >
        <legend id={`${id}-interests`} tabIndex={-1} className="fl-label mb-3 outline-none">Topics you want to explore</legend>
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS.map((item) => {
            const on = form.interests.includes(item);
            return (
              <label
                key={item}
                className={cn(
                  'flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-[14px] shadow-[0_0_0_1px_rgb(var(--fl-paper)/.24)] transition-colors focus-within:shadow-[0_0_0_2px_#F58220]',
                  on ? 'bg-fl-orange/15 text-fl-paper shadow-[0_0_0_1px_#F58220]' : 'text-fl-soft hover:text-fl-paper',
                )}
              >
                <input type="checkbox" checked={on} onChange={() => toggleInterest(item)} className="h-4 w-4 flex-none accent-[#F58220]" />
                {item}
              </label>
            );
          })}
        </div>
        {error('interests')}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-topic`} className="fl-label">What would you like to learn or share at a session? (optional)</label>
        <textarea {...field('topic')} value={form.topic} onChange={(e) => set('topic', e.target.value)} className="fl-textarea" maxLength={600} />
        {error('topic')}
      </div>

      <button type="submit" className="fl-btn w-full py-4 sm:w-auto sm:self-start sm:px-10" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Apply for the fellowship'}
      </button>
      {status === 'failed' && (
        <p className="fl-error m-0" role="alert">
          Something went wrong. Please try again, or email hello@futurelabs.africa.
        </p>
      )}
      <p className="m-0 text-[12.5px] leading-[1.5] text-fl-muted">
        We use these details to review your application and contact you about the fellowship. See our{' '}
        <Link href="/privacy" className="text-fl-accent underline underline-offset-4 hover:text-fl-paper">privacy policy</Link>.
      </p>
      <div className="sr-only" role="status" aria-live="polite">
        {status === 'sending' ? 'Sending your application…' : ''}
      </div>
    </form>
  );
}
