import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, NumberCard, ImageCard } from '@/components/site/primitives';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Studio — AI Systems & Digital Products',
  description: 'FutureLabs Studio builds AI applications, web platforms, internal tools, automation and data systems for organizations, institutions and ventures.',
  path: '/studio',
});

const CAPABILITIES = [
  ['AI applications', 'Models and agents built into real workflows, not demos.'],
  ['Web platforms', 'Public and internal platforms built to run in production.'],
  ['Internal tools', 'Operational software for teams that currently work in spreadsheets.'],
  ['Automation', 'Manual process removed where it costs the most time.'],
  ['Data systems', 'Pipelines and reporting that make decisions measurable.'],
  ['Digital products', 'New products taken from concept to launch.'],
];

export default function StudioPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="FutureLabs Studio"
        title="Technology built for real problems."
        titleClass="max-w-[14ch]"
        lede="FutureLabs Studio builds AI systems, software and digital products for organizations, institutions and emerging ventures."
      >
        <Link href="/contact" className="fl-btn mt-[26px] px-6 py-4">Build with us</Link>
      </SplitHero>

      <Section tone="graphite" innerClassName="py-[72px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map(([title, text], i) => (
            <NumberCard key={title} className="lg:col-span-2" minH="min-h-[190px]" n={String(i + 1).padStart(2, '0')} title={title} text={text} />
          ))}
          <ImageCard
            className="md:col-span-2 lg:col-span-6"
            imgHeight="h-[170px]"
            img="/images/site/team.jpg"
            flag="07 · Design"
            title="Product design and development"
            text="Research, design and engineering in one team, from first brief to live release."
            link={{ label: 'Build with us', href: '/contact' }}
          />
        </div>
      </Section>
    </SiteShell>
  );
}
