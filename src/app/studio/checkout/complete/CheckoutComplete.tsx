"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { callEdge } from '@/lib/edge';
import LicenseDetails, { type PublicLicense } from '@/components/site/LicenseDetails';

// Paystack sends buyers here with ?reference=… (and ?trxref=…) after checkout.
export default function CheckoutComplete() {
  const params = useSearchParams();
  const reference = params.get('reference') || params.get('trxref');
  const [state, setState] = useState<
    { kind: 'loading' } | { kind: 'error'; message: string } | { kind: 'done'; license: PublicLicense; email: string; emailed: boolean }
  >({ kind: 'loading' });

  useEffect(() => {
    if (!reference) {
      setState({ kind: 'error', message: 'This page needs a payment reference. Check your email for your license key.' });
      return;
    }
    let cancelled = false;
    (async () => {
      // The license may take a moment to appear if Paystack is slow to confirm.
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          const res = await callEdge<{ license?: PublicLicense; email?: string; emailed?: boolean; error?: string }>('verify-payment', { reference });
          if (res.license && res.email) {
            if (!cancelled) setState({ kind: 'done', license: res.license, email: res.email, emailed: !!res.emailed });
            return;
          }
        } catch (err) {
          if (!cancelled) setState({ kind: 'error', message: err instanceof Error ? err.message : 'Could not check this payment.' });
          return;
        }
        await new Promise((r) => setTimeout(r, 2500));
      }
      if (!cancelled) {
        setState({ kind: 'error', message: 'Your payment went through, but your license is still being created. Refresh this page in a minute.' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (state.kind === 'loading') {
    return (
      <div className="flex items-center gap-3 text-fl-soft">
        <Loader2 className="h-5 w-5 animate-spin" /> Confirming your payment…
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="flex flex-col gap-4">
        <p className="fl-error m-0" role="alert">{state.message}</p>
        <p className="fl-card-text m-0">
          Need help? <Link href="/contact" className="fl-link text-[14px]">Contact us</Link> with the email you paid with.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="fl-card-text m-0 max-w-[64ch]">
        Thanks! {state.emailed ? (
          <>We&apos;ve also emailed your key to <span className="text-fl-paper">{state.email}</span>.</>
        ) : (
          <>Copy your key and keep it somewhere safe. With it and <span className="text-fl-paper">{state.email}</span> you can
          always find your license again on the account page.</>
        )}{' '}
        Install the Pro add-on alongside the free version, then paste your key on its settings page.
      </p>
      <LicenseDetails license={state.license} />
      <p className="fl-card-text m-0">
        Manage your subscription any time on <Link href="/studio/account" className="fl-link text-[14px]">your account page</Link>.
      </p>
    </div>
  );
}
