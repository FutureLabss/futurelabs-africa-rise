import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import VenturesPortfolio from '@/components/site/VenturesPortfolio';
import { Section, SplitHero, ProofLine, Stat } from '@/components/site/primitives';
import { ventures } from '@/data/ventures';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Ventures — Startups We Build & Back',
  description: 'FutureLabs Ventures builds, backs and partners with startups solving African problems. Meet the portfolio: FutureResume, Salely, Cleverclass, Opportunitylab and more.',
  path: '/startups',
});

const MODES = [
  ['Build', 'Startups created from problems identified through our ecosystem and research.'],
  ['Back', 'Promising founders and startups receiving strategic support, incubation or investment.'],
  ['Partner', 'Startups we connect to markets, institutions, talent and opportunities.'],
];

const count = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'][ventures.length] ?? String(ventures.length);

export default function VenturesPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="FutureLabs Ventures"
        title="Building startups around African problems."
        titleClass="max-w-[15ch]"
        lede="FutureLabs identifies meaningful problems, develops products and supports founders building scalable startups."
      >
        <ProofLine className="mt-6">
          <Stat value="45+">startups incubated · Verified internally · As of 2026</Stat>
        </ProofLine>
      </SplitHero>

      <Section tone="graphite" innerClassName="py-[72px]">
        <div className="grid gap-px md:grid-cols-3">
          {MODES.map(([title, text]) => (
            <div key={title} className="bg-fl-graphite px-[26px] pb-8 pt-7 shadow-[0_0_0_1px_rgba(242,240,234,.14)]">
              <h2 className="m-0 text-[24px] font-semibold tracking-[-0.028em]">{title}</h2>
              <p className="fl-card-text m-0 mt-2.5">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section innerClassName="py-20">
        <VenturesPortfolio />
        <div className="mt-7 flex flex-wrap items-center gap-3.5">
          <Link href="/contact" className="fl-btn px-6 py-4">Build with FutureLabs</Link>
          <span className="font-mono text-[11.5px] leading-[1.5] text-fl-label">
            {count} ventures currently building, backed or partnered.
          </span>
        </div>
      </Section>
    </SiteShell>
  );
}
