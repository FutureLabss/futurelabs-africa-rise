import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, Duotone } from '@/components/site/primitives';

export const metadata: Metadata = {
  title: 'Network',
  description:
    'FutureLabs connects builders, founders, engineers, researchers, institutions, investors, government and industry around opportunities that can create measurable economic value.',
};

const MEMBERS = ['Builders', 'Founders', 'Researchers', 'Employers', 'Investors', 'Institutions', 'Government', 'Development organizations'];

export default function NetworkPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="The Network"
        title="A network built around productive opportunity."
        titleClass="max-w-[15ch]"
        lede="FutureLabs connects builders, founders, engineers, researchers, institutions, investors, government and industry around opportunities that can create measurable economic value."
      >
        <Link href="/contact?type=network" className="fl-btn mt-[26px] px-6 py-4">Join the FutureLabs Network</Link>
      </SplitHero>

      <section className="fl-section">
        <Duotone src="/images/site/community.jpg" alt="Members of the FutureLabs community" className="h-[220px] sm:h-[300px]" />
      </section>

      <Section tone="graphite" innerClassName="py-20">
        <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4">
          {MEMBERS.map((m, i) => {
            const n = String(i + 1).padStart(2, '0');
            return (
              <li key={m} className="fl-card fl-card-hover flex min-h-[150px] flex-col justify-between px-[22px] pb-7 pt-[26px] sm:min-h-[172px]">
                <span className="fl-ghost-num -bottom-2.5 [font-size:52px]" aria-hidden>{n}</span>
                <span className="fl-num relative">{n}</span>
                <span className="relative text-[18px] font-semibold tracking-[-0.022em] sm:text-[20px]">{m}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/events" className="fl-link text-[13.5px]">See upcoming events →</Link>
          <Link href="/community" className="fl-link text-[13.5px]">Join the builder community →</Link>
        </div>
      </Section>
    </SiteShell>
  );
}
