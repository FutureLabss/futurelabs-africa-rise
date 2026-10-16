"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { callEdge } from '@/lib/edge';

// Email-gated download for the AI economy briefing. The `briefing-signup` edge
// function records consent, adds the contact to our mailing list, emails the
// link and returns a signed download URL that expires after 48 hours.
const schema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(254),
  consent: z.literal(true, { errorMap: () => ({ message: 'Tick the box so we can email you the briefing.' }) }),
});

const INCLUDES = [
  'a map of the AI value chain from chips and power to implementers',
  'a table of where the debt and guarantees actually sit, drawn from company filings',
  'the four-scenario crash and opportunity playbook',
  'a 12-indicator early-warning dashboard you can check monthly',
];

type Errors = { email?: string; consent?: string };

export default function BriefingDownload() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot: people never see or fill this
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const [failure, setFailure] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
  }, [status]);

  // Next's client-side navigation (e.g. the blog post's CTA) doesn't scroll to a hash on another page.
  useEffect(() => {
    if (window.location.hash === '#ai-economy-briefing') document.getElementById('ai-economy-briefing')?.scrollIntoView();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, consent });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Errors] ??= issue.message;
      setErrors(next);
      document.getElementById(`${id}-${next.email ? 'email' : 'consent'}`)?.focus();
      return;
    }
    setErrors({});
    setFailure('');
    setStatus('sending');
    try {
      const res = await callEdge<{ downloadUrl?: string }>('briefing-signup', {
        email: parsed.data.email,
        consent: true,
        website,
      });
      setDownloadUrl(res.downloadUrl ?? '');
      setStatus('done');
    } catch (err) {
      setFailure(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('failed');
    }
  };

  return (
    <section id="ai-economy-briefing" aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-[18px] bg-fl-ink px-7 pb-[42px] pt-10 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.16)] sm:px-9">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-fl-orange px-2.5 py-[7px] font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-night">
              Free briefing
            </span>
            <span className="font-mono text-[11px] uppercase leading-none text-fl-label">October 2026 · Technology · Capital</span>
          </div>
          <h2 id={`${id}-title`} className="m-0 max-w-[18ch] text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.06] tracking-[-0.032em]">
            The AI Economy: Structure, Fragility and Opportunity
          </h2>
          <p className="m-0 max-w-[44ch] text-[15.5px] leading-[1.6] text-fl-muted">
            Demand for AI is strong. The risk is in how the build-out is financed. Where would it break, how would the damage spread,
            and who comes out ahead? The full briefing includes:
          </p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-[14.5px] leading-[1.5] text-fl-body">
                <span aria-hidden className="h-1.5 w-1.5 flex-none -translate-y-0.5 bg-fl-orange" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/blog/ai-boom-short-of-cheap-money" className="fl-link mt-auto pt-3">
            Read the key findings →
          </Link>
        </div>

        <div className="flex flex-col justify-center gap-[18px] bg-fl-graphite px-7 pb-[38px] pt-9 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.16)] sm:px-8">
          {status === 'done' ? (
            <div className="flex flex-col gap-4">
              <h3 ref={successRef} tabIndex={-1} className="m-0 text-[21px] font-semibold leading-[1.2] tracking-[-0.025em] outline-none">
                Your briefing is ready.
              </h3>
              <p className="fl-card-text m-0 max-w-[38ch]">
                We&apos;ve also emailed the link to {email.trim()}. It works for 48 hours.
              </p>
              {downloadUrl && (
                <a href={downloadUrl} className="fl-btn w-full py-4" download>
                  Download the PDF
                </a>
              )}
            </div>
          ) : (
            <>
              <h3 className="m-0 max-w-[24ch] text-[21px] font-semibold leading-[1.2] tracking-[-0.025em]">Get the PDF by email.</h3>
              <p className="fl-card-text m-0 max-w-[38ch]">Enter your email and we&apos;ll send you the download link.</p>
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]" aria-describedby={`${id}-privacy`}>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${id}-email`} className="fl-label">Email</label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    placeholder="you@organization.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${id}-email-error` : undefined}
                    className="fl-input"
                  />
                  {errors.email && <p id={`${id}-email-error`} className="fl-error m-0" role="alert">{errors.email}</p>}
                </div>

                {/* Honeypot: hidden from people and assistive tech; bots that fill it are silently dropped. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor={`${id}-website`}>Website</label>
                  <input
                    id={`${id}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5] text-fl-soft">
                    <input
                      id={`${id}-consent`}
                      name="consent"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors((x) => ({ ...x, consent: undefined }));
                      }}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                      className="mt-1 h-4 w-4 flex-none accent-[#F58220]"
                    />
                    I agree to FutureLabs emailing me this briefing and occasional research updates. I can unsubscribe at any time.
                  </label>
                  {errors.consent && <p id={`${id}-consent-error`} className="fl-error m-0" role="alert">{errors.consent}</p>}
                </div>

                <button type="submit" className="fl-btn mt-1 w-full py-4" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send me the briefing'}
                </button>
                {status === 'failed' && (
                  <p className="fl-error m-0" role="alert">
                    {failure} If it keeps happening, email hello@futurelabs.africa.
                  </p>
                )}
                <p id={`${id}-privacy`} className="m-0 text-[12.5px] leading-[1.5] text-fl-muted">
                  We store your email and when you agreed, to send the briefing and research updates. See our{' '}
                  <Link href="/privacy" className="text-fl-accent underline underline-offset-4 hover:text-fl-paper">privacy policy</Link>.
                </p>
              </form>
            </>
          )}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {status === 'sending' ? 'Sending your request…' : status === 'done' ? 'Your briefing is ready. We have emailed you the link.' : ''}
          </div>
        </div>
      </div>
    </section>
  );
}
