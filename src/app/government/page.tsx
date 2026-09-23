import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, NumberCard, ImageCard, PartnerNames } from '@/components/site/primitives';

export const metadata: Metadata = pageMeta({
  title: 'Government & Development Partnerships',
  description: 'FutureLabs partners with governments and development organizations to turn technology, talent and public investment into measurable economic and institutional outcomes.',
  path: '/government',
});

export default function GovernmentPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="Government & Development"
        title="Technology is only useful when it improves the capacity to deliver."
        titleClass="max-w-[17ch]"
        lede="FutureLabs partners with governments and development organizations to turn technology, talent and public investment into measurable economic and institutional outcomes."
      >
        <Link href="/contact" className="fl-btn mt-[26px] px-6 py-4">Discuss a partnership</Link>
      </SplitHero>

      <Section tone="graphite" innerClassName="py-20 lg:py-24">
        <h2 className="m-0 mb-12 text-[clamp(28px,3.2vw,44px)] font-semibold leading-[1.06] tracking-[-0.032em]">
          What we help institutions do
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <NumberCard className="lg:col-span-2" minH="min-h-[240px]" n="01" title="Build talent" text="Design and execute workforce and digital-skills programs aligned with economic demand." />
          <NumberCard className="lg:col-span-2" minH="min-h-[240px]" n="02" title="Build entrepreneurs" text="Develop startup and entrepreneurship ecosystems around real economic opportunities." />
          <NumberCard className="md:col-span-2 lg:col-span-2" minH="min-h-[240px]" n="03" title="Deploy technology" text="Design and implement digital and AI-enabled systems." />
          <ImageCard className="lg:col-span-3" img="/images/site/team.jpg" flag="04 · Institutions" title="Strengthen institutions" text="Improve institutional capacity through technology, data and human capital." />
          <ImageCard className="lg:col-span-3" img="/images/site/community.jpg" flag="05 · Intelligence" title="Understand opportunity" text="Research industries, skills, jobs, capital and emerging technology." link={{ label: 'FutureLabs Intelligence', href: '/research-labs' }} />
        </div>
        <div className="mt-14 border-t border-fl-paper/[.14] pt-7">
          <h3 className="fl-eyebrow mb-4 text-fl-label">Current institutional partners</h3>
          <PartnerNames size="text-[20px]" className="gap-x-10 gap-y-3" />
        </div>
      </Section>
    </SiteShell>
  );
}
