import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import UnsubscribeForm from './UnsubscribeForm';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <SiteShell>
      <section className="fl-section">
        <div className="fl-wrap flex flex-col gap-6 pb-24 pt-14">
          <div className="fl-eyebrow-accent">FutureLabs Intelligence</div>
          <h1 className="fl-h2-sm m-0">Unsubscribe from research emails</h1>
          <Suspense>
            <UnsubscribeForm />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
