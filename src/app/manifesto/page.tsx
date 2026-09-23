import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { Section } from '@/components/site/primitives';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Manifesto',
  description: 'Africa does not need another conversation about potential. It needs systems that turn potential into production.',
};

const PRINCIPLES = [
  'Development is ultimately about productive capacity. Countries become prosperous when their people and institutions become better at producing valuable things.',
  'Technology is not the destination. It is a force multiplier for human and institutional capacity — and a multiplier of zero is still zero.',
  'Training is activity. Building productive people is impact. We will not confuse the two, and we will not report the first as the second.',
  'Skills only become economically valuable when they meet real demand. Capability without a market is a cost, not an asset.',
  'Institutions decide whether anything compounds. A program that ends when its funding ends has not built capacity.',
  'Evidence over claims. We publish verified numbers, name our sources internally, and remove what we cannot substantiate.',
];

export default function ManifestoPage() {
  return (
    <SiteShell>
      <Section innerClassName="max-w-[900px] pb-24 pt-20 lg:pt-[104px]">
        <div className="fl-eyebrow-accent">The FutureLabs Manifesto</div>
        <h1 className="m-0 mt-7 text-[clamp(36px,4.8vw,70px)] font-semibold leading-[.99] tracking-[-0.04em] [text-wrap:balance]">
          Africa does not need another conversation about potential.
        </h1>
        <p className="m-0 mt-7 text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-fl-orange sm:text-[24px]">
          It needs systems that turn potential into production.
        </p>
        <ol className="m-0 mt-14 list-none border-t border-fl-paper/20 p-0">
          {PRINCIPLES.map((text, i) => (
            <li
              key={i}
              className={cn(
                'grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 py-7 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6',
                i < PRINCIPLES.length - 1 && 'border-b border-fl-paper/10'
              )}
            >
              <span className="font-mono text-[11px] font-medium leading-[1.4] text-fl-orange">{String(i + 1).padStart(2, '0')}</span>
              <p className="m-0 text-[17px] leading-[1.55] sm:text-[19px]">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/partner" className="fl-btn">Build with us</Link>
          <Link href="/about" className="fl-btn-ghost">About FutureLabs</Link>
        </div>
      </Section>
    </SiteShell>
  );
}
