import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import CheckoutComplete from './CheckoutComplete';

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Thanks for subscribing — FutureLabs Studio',
    description: 'Your FutureLabs Studio Pro license.',
    path: '/studio/checkout/complete',
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutCompletePage() {
  return (
    <SiteShell>
      <section className="fl-section">
        <div className="fl-wrap flex flex-col gap-8 pb-20 pt-10">
          <div>
            <div className="fl-eyebrow-accent">FutureLabs Studio</div>
            <h1 className="fl-h2-sm mt-4">Your Pro license</h1>
          </div>
          <Suspense fallback={null}>
            <CheckoutComplete />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
