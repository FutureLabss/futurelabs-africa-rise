"use client";

import React, { useId, useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

// Free downloads ask for an email first. Details are saved to the
// `product_downloads` table (insert-only for visitors, readable by admins).
// A returning visitor's details are kept in their own browser so the next
// download starts straight away.
const STORAGE_KEY = 'fl-download-details';

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(254),
  name: z.string().trim().max(120, 'Keep your name under 120 characters.'),
  organisation: z.string().trim().max(160, 'Keep this under 160 characters.'),
  marketing_opt_in: z.boolean(),
});

type Details = z.infer<typeof schema>;

type Props = {
  product: { id: string; name: string; version: string; href: string; size: string };
  className?: string;
  variant?: 'primary' | 'ghost';
  children?: React.ReactNode;
};

function readSaved(): Details | null {
  try {
    const parsed = schema.safeParse(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function startDownload(href: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = href.split('/').pop() || '';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function record(details: Details, product: Props['product']) {
  // No .select(): visitors may add rows but not read them back.
  const { error } = await supabase.from('product_downloads').insert({
    email: details.email,
    name: details.name || null,
    organisation: details.organisation || null,
    marketing_opt_in: details.marketing_opt_in,
    product: product.id,
    version: product.version,
  });
  if (error) throw error;
}

export default function DownloadGate({ product, className, variant = 'primary', children = 'Download free' }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Details>({ email: '', name: '', organisation: '', marketing_opt_in: false });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const { checkRateLimit, recordSubmission } = useRateLimit(5000);

  const onClick = async () => {
    const saved = readSaved();
    if (saved) {
      // Already shared details in this browser: record and download without the form.
      startDownload(product.href);
      record(saved, product).catch((e) => console.error('Download not recorded:', e));
      return;
    }
    setStatus('idle');
    setOpen(true);
  };

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
    setStatus('sending');
    try {
      await record(parsed.data, product);
    } catch (err) {
      // Never block a free download because saving failed; log it for us instead.
      console.error('Download not recorded:', err);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data));
    } catch {
      /* private mode: they'll see the form next time */
    }
    recordSubmission();
    setStatus('done');
    startDownload(product.href);
  };

  const set = <K extends keyof Details>(key: K, value: Details[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={cn(variant === 'ghost' ? 'fl-btn-ghost' : 'fl-btn', className)}
        aria-label={`Download ${product.name} ${product.version} (zip, ${product.size})`}
      >
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[460px] gap-6 rounded-none border-0 bg-fl-graphite p-7 text-fl-paper shadow-[0_0_0_1px_rgba(242,240,234,.16)] sm:rounded-none [&>button]:text-fl-soft">
          {status === 'done' ? (
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-[24px] font-semibold tracking-[-0.03em]">Your download has started</DialogTitle>
              <DialogDescription className="fl-card-text m-0">
                Thanks for trying {product.name}. If the download didn&apos;t start,{' '}
                <a href={product.href} download className="text-fl-orange underline underline-offset-2">
                  use this link
                </a>
                .
              </DialogDescription>
              <button type="button" onClick={() => setOpen(false)} className="fl-btn-ghost mt-2 w-full py-4">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-[24px] font-semibold tracking-[-0.03em]">Download {product.name}</DialogTitle>
                <DialogDescription className="fl-card-text m-0">
                  It&apos;s free. Tell us who you are and the download starts straight away.
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
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-org`} className="fl-label">Organisation or website (optional)</label>
                <input
                  id={`${id}-org`}
                  autoComplete="organization"
                  value={form.organisation}
                  onChange={(e) => set('organisation', e.target.value)}
                  aria-invalid={!!errors.organisation}
                  className="fl-input"
                />
                {errors.organisation && <p className="fl-error m-0" role="alert">{errors.organisation}</p>}
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5] text-fl-soft">
                <input
                  type="checkbox"
                  checked={form.marketing_opt_in}
                  onChange={(e) => set('marketing_opt_in', e.target.checked)}
                  className="mt-1 h-4 w-4 flex-none accent-[#F58220]"
                />
                Email me about updates and new FutureLabs products.
              </label>
              <button type="submit" className="fl-btn mt-1 w-full py-4" disabled={status === 'sending'}>
                {status === 'sending' ? 'Starting download…' : `Download ${product.size} zip`}
              </button>
              <p className="m-0 text-[12.5px] leading-[1.5] text-fl-muted">
                FutureLabs stores these details to understand who uses our products and to contact you about this
                download. We only send updates if you tick the box above. See our{' '}
                <a href="/privacy" target="_blank" rel="noopener" className="text-fl-soft underline underline-offset-2 hover:text-fl-paper">Privacy Policy</a>.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
