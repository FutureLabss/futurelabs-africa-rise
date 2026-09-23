import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import ContactForm from '@/components/site/ContactForm';
import { Section } from '@/components/site/primitives';
import { CONTACT, SOCIAL_LINKS } from '@/components/site/nav';

export const metadata: Metadata = pageMeta({
  title: 'Contact FutureLabs',
  description: 'Contact FutureLabs Africa: tell us the problem, opportunity or capability you want to develop. hello@futurelabs.africa · +234 703 240 0529 · Akwa Ibom, Nigeria.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <SiteShell>
      <Section innerClassName="grid items-start gap-14 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <div className="fl-eyebrow-accent">Contact</div>
          <h1 className="m-0 mt-[26px] max-w-[14ch] text-[clamp(36px,4.4vw,66px)] font-semibold leading-[.99] tracking-[-0.04em] [text-wrap:balance]">
            What are you trying to build?
          </h1>
          <p className="fl-lede m-0 mt-[26px] max-w-[42ch]">Tell us the problem, opportunity or capability you want to develop.</p>
          <div className="mt-10 flex flex-col gap-2.5 border-t border-fl-paper/[.16] pt-[22px]">
            <div className="font-mono text-[11px] uppercase leading-none tracking-[.14em] text-fl-label">Direct</div>
            <a href={`mailto:${CONTACT.email}`} className="text-[19px] font-medium tracking-[-0.02em] text-fl-orange hover:text-fl-paper">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="text-[16px] text-fl-soft hover:text-fl-paper">{CONTACT.phone}</a>
            <div className="text-[16px] text-fl-soft">{CONTACT.location}</div>
            <div className="mt-3.5 flex flex-wrap gap-[18px] font-mono text-[12px]">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-fl-orange hover:text-fl-paper">
                  {s.label.replace(' / Twitter', '')}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="min-h-[640px] border border-fl-paper/[.16] bg-fl-graphite" />}>
          <ContactForm />
        </Suspense>
      </Section>
    </SiteShell>
  );
}
