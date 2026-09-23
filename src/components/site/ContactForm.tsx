"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { sendForm } from '@/lib/formsubmit';
import { useRateLimit } from '@/hooks/use-rate-limit';

export const ORG_TYPES = [
  'Government',
  'Development organization',
  'Corporate / enterprise',
  'University / institution',
  'Startup / founder',
  'Individual / network member',
  'Other',
];

const TYPE_PARAM: Record<string, string> = {
  government: 'Government',
  development: 'Development organization',
  enterprise: 'Corporate / enterprise',
  university: 'University / institution',
  startup: 'Startup / founder',
  network: 'Individual / network member',
};

const BUDGETS = ['Not yet defined', 'Under $10,000', '$10,000 – $50,000', '$50,000 – $250,000', 'Over $250,000'];
const TIMELINES = ['As soon as possible', 'Within 3 months', '3 – 6 months', '6 – 12 months', 'Exploring for now'];

const schema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.').max(100),
  organization: z.string().trim().max(150),
  email: z.string().trim().email('Enter a valid email address.').max(255),
  orgType: z.string(),
  goal: z.string().trim().min(1, 'Tell us what you are trying to achieve.').max(2000),
  support: z.string().trim().max(2000),
  budget: z.string(),
  timeline: z.string(),
});

type Values = z.infer<typeof schema>;
const EMPTY: Values = { name: '', organization: '', email: '', orgType: '', goal: '', support: '', budget: '', timeline: '' };

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="fl-label">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="fl-error m-0" role="alert">{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  useEffect(() => {
    const t = params.get('type');
    if (t && TYPE_PARAM[t]) setValues((v) => ({ ...v, orgType: TYPE_PARAM[t] }));
  }, [params]);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Values;
        if (!next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }
    if (!checkRateLimit()) return;
    setErrors({});
    setStatus('sending');
    const d = parsed.data;
    try {
      await sendForm(`Contact: ${d.orgType || 'Enquiry'} — ${d.organization || d.name}`, {
        'Full Name': d.name,
        Organization: d.organization || '—',
        Email: d.email,
        'Organization Type': d.orgType || '—',
        'Trying to achieve': d.goal,
        'Support sought': d.support || '—',
        'Budget range': d.budget || '—',
        Timeline: d.timeline || '—',
      });
      recordSubmission();
      setStatus('done');
      setValues(EMPTY);
    } catch {
      setStatus('failed');
    }
  };

  const describedBy = (k: keyof Values) => (errors[k] ? `cf-${k}-error` : undefined);

  if (status === 'done') {
    return (
      <div role="status" className="flex flex-col gap-4 border border-fl-paper/[.16] bg-fl-graphite px-8 py-10">
        <span className="fl-eyebrow-accent">Message received</span>
        <p className="m-0 text-[22px] font-semibold leading-[1.2] tracking-[-0.025em]">Thank you. We&apos;ll reply within a few working days.</p>
        <button type="button" onClick={() => setStatus('idle')} className="fl-link self-start text-[13px]">Send another message →</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 border border-fl-paper/[.16] bg-fl-graphite px-6 pb-9 pt-[34px] sm:px-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label="Name" error={errors.name}>
          <input id="cf-name" className="fl-input" autoComplete="name" placeholder="Your name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} />
        </Field>
        <Field id="cf-organization" label="Organization">
          <input id="cf-organization" className="fl-input" autoComplete="organization" placeholder="Organization name" value={values.organization} onChange={set('organization')} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-email" label="Email" error={errors.email}>
          <input id="cf-email" type="email" className="fl-input" autoComplete="email" placeholder="you@organization.com" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} />
        </Field>
        <Field id="cf-orgType" label="Organization type">
          <select id="cf-orgType" className="fl-select" value={values.orgType} onChange={set('orgType')}>
            <option value="">Select</option>
            {ORG_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <Field id="cf-goal" label="What are you trying to achieve?" error={errors.goal}>
        <textarea id="cf-goal" className="fl-textarea" rows={3} placeholder="The outcome you are working toward" value={values.goal} onChange={set('goal')} aria-invalid={!!errors.goal} aria-describedby={describedBy('goal')} />
      </Field>
      <Field id="cf-support" label="What support are you looking for?">
        <textarea id="cf-support" className="fl-textarea" rows={3} placeholder="Talent, ventures, technology, institutional capacity, research" value={values.support} onChange={set('support')} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-budget" label="Budget range">
          <select id="cf-budget" className="fl-select" value={values.budget} onChange={set('budget')}>
            <option value="">Select</option>
            {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="cf-timeline" label="Timeline">
          <select id="cf-timeline" className="fl-select" value={values.timeline} onChange={set('timeline')}>
            <option value="">Select</option>
            {TIMELINES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <button type="submit" className="fl-btn mt-1.5 w-full py-4" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Start the conversation'}
      </button>
      {status === 'failed' && (
        <p className="fl-error m-0" role="alert">
          Something went wrong sending your message. Please try again, or email hello@futurelabs.africa directly.
        </p>
      )}
    </form>
  );
}
