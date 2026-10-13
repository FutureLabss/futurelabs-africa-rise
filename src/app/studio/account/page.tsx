import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import AccountLookup from './AccountLookup';

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Manage your Pro license — FutureLabs Studio',
    description: 'Download the Pro add-on, see your sites, change your card or cancel your FutureLabs Studio subscription.',
    path: '/studio/account',
  }),
  robots: { index: false, follow: true },
};

export default function StudioAccountPage() {
  return (
    <SiteShell>
      <section className="fl-section">
        <div className="fl-wrap flex flex-col gap-8 pb-20 pt-10">
          <div>
            <div className="fl-eyebrow-accent">FutureLabs Studio</div>
            <h1 className="fl-h2-sm mt-4">Manage your Pro license</h1>
            <p className="fl-card-text m-0 mt-3 max-w-[64ch]">
              Download the latest Pro add-on, see which sites use your license, and change your card or cancel. Not
              subscribed yet? <Link href="/studio#products" className="fl-link text-[14px]">See the plans</Link>.
            </p>
          </div>
          <AccountLookup />
        </div>
      </section>
    </SiteShell>
  );
}
