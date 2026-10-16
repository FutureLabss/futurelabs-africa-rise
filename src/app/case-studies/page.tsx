import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { postsIn, postPath } from '@/lib/blog';
import SiteShell from '@/components/site/SiteShell';
import { CtaBand, ImageCard, Section, SplitHero } from '@/components/site/primitives';

export const metadata: Metadata = pageMeta({
  title: 'Case Studies — FutureLabs',
  description: 'How FutureLabs works with governments, development partners and founders: programmes, results and what we learned.',
  path: '/case-studies',
});

/** Card label per case study; anything new falls back to "Case study". */
const FLAGS: Record<string, string> = {
  'pind-youth-employment-case-study': 'Employment',
  'idice-case-study': 'Institutions',
  'ihatch-case-study': 'Entrepreneurship',
  'ai-fellowship-case-study': 'Talent',
};

const cases = postsIn('case-studies');

export default function CaseStudiesPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="Case Studies"
        title="This is what it looks like in the real world."
        lede="Programmes we've run with governments, development partners and founders: what we did, what happened and what we learned."
      />

      <Section tone="graphite" innerClassName="py-20 lg:py-[88px]">
        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((p) => (
            <ImageCard
              key={p.id}
              href={postPath(p)}
              img={p.imageUrl}
              flag={FLAGS[p.id] ?? 'Case study'}
              title={p.title.replace(/^Case Study:\s*/, '')}
              text={p.excerpt}
              cta="Read the case study"
              imgHeight="h-[220px]"
            />
          ))}
        </div>
      </Section>

      <CtaBand title="Planning a programme?">
        <Link href="/government" className="fl-btn-dark px-6 py-4">Design your programme with us</Link>
        <Link
          href="/contact"
          className="inline-flex items-center border border-fl-night/40 px-6 py-4 text-[14px] font-medium leading-none text-fl-night transition-colors hover:border-fl-night"
        >
          Say hello
        </Link>
      </CtaBand>
    </SiteShell>
  );
}
