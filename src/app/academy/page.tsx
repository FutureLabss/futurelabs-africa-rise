import React from 'react';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { Section, PhotoHero, NumberCard, ImageCard, ProofLine, Stat, CtaBand } from '@/components/site/primitives';

export const metadata: Metadata = {
  title: 'Academy',
  description:
    'FutureLabs Academy is our learning and workforce-development arm, focused on AI, software, digital skills and the capabilities required by an evolving economy.',
};

const STEPS = [
  ['Learn', 'Structured training in software, AI and digital skills, taught against real technologies.'],
  ['Build', 'Real projects shipped in cross-functional teams, reviewed like production work.'],
  ['Place', 'Graduates connected to employers, ventures and international roles through our network.'],
];

const DISCIPLINES = ['AI', 'Software engineering', 'Frontend', 'Backend', 'Product design', 'Data', 'Digital skills', 'Entrepreneurship', 'Leadership'];

export default function AcademyPage() {
  return (
    <SiteShell>
      <PhotoHero
        img="/images/site/fl-bg.jpg"
        eyebrow="FutureLabs Academy"
        title="Developing the people who will build Africa's future."
        lede="FutureLabs Academy is our learning and workforce-development arm, focused on AI, software, digital skills and the capabilities required by an evolving economy."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a href="https://futurelabs.ng" target="_blank" rel="noopener noreferrer" className="fl-btn px-6 py-4">Start learning</a>
          <a href="https://futurelabs.ng/alumni" target="_blank" rel="noopener noreferrer" className="fl-btn-ghost border-fl-paper/35 px-6 py-4">
            Meet the alumni
          </a>
        </div>
        <ProofLine className="mt-10 gap-x-7 text-fl-muted">
          <Stat value="1,250+">youths trained</Stat>
          <span>9-month bootcamp</span>
          <span>futurelabs.ng</span>
        </ProofLine>
      </PhotoHero>

      <Section tone="graphite" innerClassName="py-20 lg:py-[88px]">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="fl-eyebrow">Programmes</div>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(28px,3.4vw,48px)] font-semibold leading-[1.04] tracking-[-0.034em]">
              From first line of code to a paid technical role.
            </h2>
          </div>
          <p className="m-0 max-w-[36ch] text-[16px] leading-[1.6] text-fl-label">
            Every programme ends in output — a shipped project, a portfolio, or a job.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <NumberCard className="lg:col-span-2" minH="min-h-[250px]" n="01" tag="Bootcamp" title="Software Training Programs" text="Nine months from zero to production: new technologies, real projects, cross-functional teams." href="https://futurelabs.ng/academy" cta="View the bootcamp" />
          <NumberCard className="lg:col-span-2" minH="min-h-[250px]" n="02" tag="Self-paced" title="Recorded Courses" text="Pre-recorded tracks for people already working who need the next level." href="https://futurelabs.ng" cta="Browse courses" />
          <NumberCard className="md:col-span-2 lg:col-span-2" minH="min-h-[250px]" n="03" tag="Applied" title="Project Genesis" text="Learn the skills the jobs of today actually ask for, built around live briefs." href="https://futurelabs.ng/projectgenesis" cta="Explore Genesis" />
          <ImageCard className="lg:col-span-3" img="/images/site/fellowship.jpg" flag="04 · Placement" title="Talent Pool Access" text="Our strongest graduates placed into international roles where they keep learning." href="https://futurelabs.ng/talentpool" cta="Access the talent pool" />
          <ImageCard className="lg:col-span-3" img="/images/site/community.jpg" flag="05 · AI Academy" title="Applied AI training" text="A dedicated track for engineers moving into AI systems and deployment." href="https://ai.futurelabs.ng" cta="Go to AI Academy" />
        </div>
      </Section>

      <Section innerClassName="py-20 lg:py-[88px]">
        <h2 className="fl-eyebrow mb-[34px]">How it works</h2>
        <ol className="m-0 flex list-none flex-wrap gap-8 p-0">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="flex-[1_1_220px] border-t-2 border-fl-orange pt-[18px]">
              <div className="fl-num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-3 text-[21px] font-semibold tracking-[-0.025em]">{title}</h3>
              <p className="fl-card-text m-0 mt-2 max-w-[34ch]">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-2.5 border-t border-fl-paper/[.14] pt-8">
          {DISCIPLINES.map((d) => (
            <span key={d} className="bg-fl-paper/[.07] px-3.5 py-2.5 font-mono text-[12px] leading-none text-fl-soft">{d}</span>
          ))}
        </div>
      </Section>

      <CtaBand title="The Academy runs on its own site.">
        <a href="https://futurelabs.ng" target="_blank" rel="noopener noreferrer" className="fl-btn-dark">Visit futurelabs.ng →</a>
      </CtaBand>
    </SiteShell>
  );
}
