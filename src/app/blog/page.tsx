import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import BlogIndex from '@/components/site/BlogIndex';
import SubscribeForm from '@/components/site/SubscribeForm';
import { Section } from '@/components/site/primitives';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Blog — Insights, Updates & Stories',
  description: 'News from the FutureLabs ecosystem in Africa: founders, programmes, events and open roles.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <SiteShell>
      <BlogIndex />
      <Section innerClassName="grid items-center gap-12 py-20 md:grid-cols-2">
        <div>
          <h2 className="m-0 max-w-[18ch] text-[clamp(26px,3vw,40px)] font-semibold leading-[1.06] tracking-[-0.032em]">Stay connected.</h2>
          <p className="m-0 mt-4 max-w-[42ch] text-[16px] leading-[1.6] text-fl-soft">
            Updates on programmes, events and opportunities across Africa&apos;s tech ecosystem.
          </p>
        </div>
        <SubscribeForm variant="inline" subject="Newsletter subscription (blog)" successText="Subscribed. Thanks for staying connected." />
      </Section>
    </SiteShell>
  );
}
