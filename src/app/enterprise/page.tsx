import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, NumberCard, ImageCard } from '@/components/site/primitives';

export const metadata: Metadata = {
  title: 'Enterprise',
  description:
    'FutureLabs helps organizations adopt technology, develop talent and build the capabilities required to compete in an AI-driven economy.',
};

const SERVICES = [
  ['AI transformation', 'Where AI creates measurable productivity gain, and how to deploy it.'],
  ['Workforce development', 'Building internal technical capability instead of renting it indefinitely.'],
  ['Digital transformation', 'Systems, data and process change that survives the pilot.'],
  ['Product development', 'New digital products taken from problem definition to market.'],
  ['Software implementation', 'Delivery inside real operating constraints, not reference architectures.'],
  ['Innovation programs', 'Corporate innovation tied to commercial outcomes and internal ownership.'],
];

export default function EnterprisePage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="Enterprise"
        title="AI and technology that make organizations more productive."
        lede="FutureLabs helps organizations adopt technology, develop talent and build the capabilities required to compete in an AI-driven economy."
      >
        <Link href="/contact" className="fl-btn mt-[26px] px-6 py-4">Work with FutureLabs</Link>
      </SplitHero>

      <Section tone="graphite" innerClassName="py-20 lg:py-[88px]">
        <h2 className="fl-eyebrow mb-[30px]">Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map(([title, text], i) => (
            <NumberCard key={title} className="lg:col-span-2" minH="min-h-[210px]" n={String(i + 1).padStart(2, '0')} title={title} text={text} />
          ))}
          <ImageCard
            className="md:col-span-2 lg:col-span-6"
            imgHeight="h-[170px]"
            img="/images/site/fellowship.jpg"
            flag="07 · Talent"
            title="Talent development"
            text="Direct access to engineers and technologists developed through FutureLabs Academy."
            link={{ label: 'Explore the Academy', href: '/academy' }}
          />
        </div>
      </Section>
    </SiteShell>
  );
}
