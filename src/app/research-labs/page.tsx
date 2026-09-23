import React from 'react';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import SubscribeForm from '@/components/site/SubscribeForm';
import { Section, SplitHero } from '@/components/site/primitives';

export const metadata: Metadata = {
  title: 'Intelligence',
  description:
    'FutureLabs Intelligence researches the forces shaping African technology and economic development: human capital, technology, enterprise, government, capital and markets.',
};

const AREAS = [
  ['Human Capital', 'Skills, education, workforce and talent.'],
  ['Technology', 'AI, software, infrastructure and emerging technologies.'],
  ['Enterprise', 'Startups, SMEs, productivity and innovation.'],
  ['Government', 'Policy, public investment, procurement and institutional capacity.'],
  ['Capital', 'Investment, grants, development finance and funding flows.'],
  ['Markets', 'Industries, demand and emerging economic opportunities.'],
];

export default function IntelligencePage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="FutureLabs Intelligence"
        title="See where Africa's next opportunities are emerging."
        titleClass="max-w-[15ch]"
        lede="FutureLabs Intelligence researches the forces shaping African technology and economic development."
      />

      <Section tone="graphite" innerClassName="py-20 lg:py-[88px]">
        <h2 className="fl-eyebrow mb-8">Research areas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(([title, text], i) => {
            const n = String(i + 1).padStart(2, '0');
            return (
              <div key={title} className="fl-card fl-card-hover flex min-h-[190px] flex-col gap-2.5 px-6 pb-[30px] pt-7">
                <span className="fl-ghost-num" aria-hidden>{n}</span>
                <span className="fl-num relative">{n}</span>
                <h3 className="relative text-[21px] font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="fl-card-text relative m-0">{text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section innerClassName="py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-[18px] bg-fl-ink px-7 pb-[42px] pt-10 shadow-[0_0_0_1px_rgba(242,240,234,.16)] sm:px-9">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-fl-orange px-2.5 py-[7px] font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-ink">
                In development
              </span>
              <span className="font-mono text-[11px] uppercase leading-none text-fl-label">Markets · Human Capital</span>
            </div>
            <h2 className="m-0 max-w-[18ch] text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.06] tracking-[-0.032em]">
              Akwa Ibom Technology &amp; Economic Opportunity Index
            </h2>
            <p className="m-0 max-w-[44ch] text-[15.5px] leading-[1.6] text-fl-muted">
              Our first published report: where technology skills, enterprise activity and economic opportunity are concentrated across
              the state.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-[18px] bg-fl-graphite px-7 pb-[38px] pt-9 shadow-[0_0_0_1px_rgba(242,240,234,.16)] sm:px-8">
            <h3 className="max-w-[24ch] text-[21px] font-semibold leading-[1.2] tracking-[-0.025em]">Be told when it publishes.</h3>
            <p className="fl-card-text m-0 max-w-[38ch]">One email when the report is out. Nothing else.</p>
            <SubscribeForm
              subject="Notify me: Akwa Ibom Technology & Economic Opportunity Index"
              submitLabel="Notify me"
              successText="Thanks — we'll email you once, when the report publishes."
            />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
