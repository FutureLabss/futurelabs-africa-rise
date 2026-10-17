import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, NumberCard, ImageCard } from '@/components/site/primitives';

export const metadata: Metadata = pageMeta({
  title: 'Partner with FutureLabs',
  description: 'Partner with FutureLabs to develop people, build startups, deploy technology or strengthen institutions across Africa.',
  path: '/partner',
});

export default function PartnerPage() {
  return (
    <SiteShell>
      <Section innerClassName="grid items-end gap-10 pb-16 pt-20 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-24">
        <div>
          <div className="fl-eyebrow-accent">Partner with FutureLabs</div>
          <h1 className="m-0 mt-[26px] text-[clamp(44px,5.6vw,84px)] font-semibold leading-[.96] tracking-[-0.042em]">Build with us.</h1>
        </div>
        <p className="fl-lede m-0 max-w-[46ch]">
          We work with organizations that want to develop people, build startups, deploy technology or strengthen institutions.
        </p>
      </Section>

      <Section tone="graphite" innerClassName="py-20">
        <div className="grid gap-4 md:grid-cols-2">
          <ImageCard img="/images/site/team.jpg" flag="01 · Government" title="Government" text="Build technology-enabled economic and institutional programs." link={{ label: 'Government & development', href: '/government' }} />
          <ImageCard img="/images/site/community.jpg" flag="02 · Development" title="Development organizations" text="Design programs that translate investment into measurable productive capacity." link={{ label: 'Start a conversation', href: '/contact?type=development' }} />
          <NumberCard minH="min-h-[210px]" n="03" tag="Corporates" title="Corporates" text="Develop talent, adopt AI and solve strategic technology problems." link={{ label: 'Enterprise', href: '/enterprise' }} />
          <NumberCard minH="min-h-[210px]" n="04" tag="Universities" title="Universities & institutions" text="Build workforce, entrepreneurship and innovation capacity." link={{ label: 'Start a conversation', href: '/contact?type=university' }} />
          <ImageCard
            className="md:col-span-2"
            imgHeight="h-[240px] md:h-[300px] [&>img]:object-[center_12%]"
            img="/images/blog/fpu-career-services.jpg"
            flag="Case study · Universities & institutions"
            title="Equipping career services at Federal Polytechnic Ukana"
            text="Under the TETFund Career Services Center 2025 intervention, we trained the Polytechnic's career services staff in modern career counselling, then ran a digital skills session for students from every department. Government, academia and industry, working together."
            link={{ label: 'Read the case study', href: '/case-studies/federal-polytechnic-ukana-case-study' }}
          />
        </div>
        <div className="mt-11 flex justify-center">
          <Link href="/contact" className="fl-btn px-7">Start a conversation</Link>
        </div>
      </Section>
    </SiteShell>
  );
}
