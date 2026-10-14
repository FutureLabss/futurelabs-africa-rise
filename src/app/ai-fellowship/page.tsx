import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero } from '@/components/site/primitives';
import AiFellowshipClient from '@/components/AiFellowshipClient';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs AI Fellowship — Apply',
  description: 'Apply for the FutureLabs AI Fellowship: a biweekly, peer-to-peer mentorship in Ikot Ekpene where builders teach each other what is changing in AI.',
  path: '/ai-fellowship',
});

const HOW = [
  ['Every two weeks', 'In person at the FutureLabs hub, No. 3 Chubb Road, Ikot Ekpene.'],
  ['Peer to peer', 'No lecturer at the front. Fellows take turns bringing a model, tool or technique, and the group works through it.'],
  ['Current and practical', 'Machine learning, deep learning and generative AI, and how to put them to work.'],
];

export default function AiFellowshipPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="AI Fellowship"
        title="Stay ahead of the AI curve, with other builders."
        titleClass="max-w-[15ch]"
        lede={
          <>
            A biweekly, peer-to-peer mentorship where fellows teach each other what&apos;s changing in AI.{' '}
            <Link href="/blog/ai-fellowship-case-study" className="fl-link">Read the case study</Link>.
          </>
        }
      />

      <Section tone="graphite" innerClassName="py-16 lg:py-20">
        <h2 className="fl-eyebrow mb-8">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {HOW.map(([title, text], i) => (
            <div key={title} className="fl-card flex flex-col gap-2.5 px-6 pb-[30px] pt-7">
              <span className="fl-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="m-0 text-[21px] font-semibold tracking-[-0.025em]">{title}</h3>
              <p className="fl-card-text m-0">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section innerClassName="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2 className="fl-h2-sm m-0">Apply for the next cohort</h2>
            <p className="fl-card-text m-0 mt-4 max-w-[40ch]">
              Tell us a little about you and what you want to explore. We&apos;ll contact you with details of the next cohort.
            </p>
          </div>
          <div className="bg-fl-graphite px-6 py-8 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.16)] sm:px-9 sm:py-10">
            <AiFellowshipClient />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
