import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, NumberCard, SectionHead } from '@/components/site/primitives';

export const metadata: Metadata = pageMeta({
  title: 'Instant Lead Responder — FutureLabs Studio',
  description:
    'Every website enquiry gets a personal reply with your booking link within seconds, your team gets an alert, and anyone who has not booked gets one polite follow-up. Try the live demo.',
  path: '/studio/lead-responder',
});

const STEPS = [
  ['Instant reply', 'The enquirer gets a reply in your name within seconds, quoting what they wrote, with a button to book a time.'],
  ['Team alert', 'You get the full enquiry by email. Press reply and you are talking to the enquirer directly.'],
  ['One follow-up', 'If they have not opened the booking link after a day, they get one short, polite reminder. Then it stops.'],
];

export default function LeadResponderPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="Studio · Automation"
        title="Answer every enquiry in seconds."
        titleClass="max-w-[15ch]"
        lede="Most people who fill in a contact form also contact two competitors. The first business to reply usually wins the client. The Instant Lead Responder replies for you, day or night, and sends people straight to your calendar."
      >
        <div className="mt-[26px] flex flex-wrap gap-3">
          <a href="#demo" className="fl-btn px-6 py-4">Try the demo</a>
          <Link href="/contact" className="fl-btn-ghost px-6 py-4">Set it up for my business</Link>
        </div>
      </SplitHero>

      <Section tone="graphite" innerClassName="py-[72px]">
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map(([title, text], i) => (
            <NumberCard key={title} minH="min-h-[190px]" n={String(i + 1).padStart(2, '0')} title={title} text={text} />
          ))}
        </div>
      </Section>

      <Section id="demo" innerClassName="py-[72px]">
        <SectionHead
          eyebrow="Live demo"
          title="Send yourself an enquiry."
          aside={
            <p className="fl-card-text m-0 max-w-[44ch]">
              Use your real email address. The reply you receive is exactly what your own visitors would get, sent from your
              business name. It works with any website: one line of code, no plugin, no change to your hosting.
            </p>
          }
        />
        <div className="mt-8">
          <div id="fl-lead-form" data-client="futurelabs-demo" data-accent="#F58220" data-button="Send test enquiry" />
        </div>
      </Section>

      <Script src="/lead-form.js" strategy="afterInteractive" />
    </SiteShell>
  );
}
