import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, Duotone, ManifestoBand, SmartLink } from '@/components/site/primitives';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMeta({
  title: 'About FutureLabs',
  description: "FutureLabs believes Africa's greatest asset is its people. We build the talent, startups, technologies, intelligence and institutional capabilities that turn African potential into productive capacity.",
  path: '/about',
});

const THESIS = [
  ['People', 'need skills'],
  ['Founders', 'need markets'],
  ['Companies', 'need capital'],
  ['Institutions', 'need execution capacity'],
  ['Governments', 'need the intention and systems required to create the conditions for productivity to compound'],
];

const PILLARS = [
  {
    n: '01',
    label: 'People',
    img: '/images/site/fellowship.jpg',
    title: 'Developing productive people',
    text: "Developing Africa's next generation of builders, founders, engineers and technology professionals.",
    link: { label: 'Explore the Academy', href: '/academy' },
  },
  {
    n: '02',
    label: 'Startups',
    img: '/images/site/fl-bg.jpg',
    title: 'Turning problems into startups',
    text: 'Building and backing ventures solving meaningful African problems.',
    link: { label: 'Meet the ventures', href: '/startups' },
  },
  {
    n: '03',
    label: 'Technology',
    img: '/images/site/community.jpg',
    title: 'Systems that raise productivity',
    text: 'Creating AI systems, software and digital infrastructure that improve productivity.',
    link: { label: 'Build with us', href: '/studio' },
  },
  {
    n: '04',
    label: 'Institutions',
    img: '/images/site/team.jpg',
    title: 'Capacity to execute',
    text: 'Helping organizations and governments build the capacity to execute.',
    link: { label: 'Work with FutureLabs', href: '/government' },
  },
  {
    n: '05',
    label: 'Intelligence',
    title: 'Seeing where opportunity moves',
    text: 'Producing research and data that help decision-makers see emerging opportunities.',
    link: { label: 'Explore the research', href: '/research-labs' },
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="fl-section">
        <div className="fl-wrap pt-20 lg:pt-24">
          <div className="fl-eyebrow-accent">About FutureLabs</div>
          <h1 className="fl-display m-0 mt-[26px] max-w-[15ch] [font-size:clamp(40px,5.4vw,82px)] [line-height:.96]">
            We believe Africa&apos;s greatest asset is its people.
          </h1>
          <div className="mt-12 grid gap-x-12 pb-16 md:grid-cols-2 lg:pb-20">
            <div>
              <p className="fl-body m-0 mb-[18px] leading-[1.65]">
                But potential does not automatically become prosperity. Prosperity emerges when people develop productive
                capabilities, businesses can grow, technology is deployed, capital reaches productive opportunities and institutions
                can execute.
              </p>
              <p className="fl-body m-0 mb-[18px] leading-[1.65]">
                FutureLabs exists at this intersection. We build the talent, startups, technologies, intelligence and institutional
                capabilities required to convert African potential into productive economic capacity.
              </p>
            </div>
            <div>
              <p className="fl-body m-0 mb-[18px] leading-[1.65]">
                We believe technology is not the destination. It is a force multiplier for human and institutional capacity.
              </p>
              <p className="fl-body m-0 mb-[22px] leading-[1.65]">
                Our work is therefore not simply about teaching technology or incubating startups.
              </p>
              <p className="m-0 max-w-[22ch] text-[22px] font-semibold leading-[1.25] tracking-[-0.025em] text-fl-paper sm:text-[25px]">
                It is about building the capacity for Africa to produce more.
              </p>
            </div>
          </div>
        </div>
        <Duotone src="/images/site/team.jpg" alt="The FutureLabs team at work" light priority className="h-[260px] sm:h-[380px]" />
      </section>

      <Section tone="graphite" innerClassName="fl-pad grid items-start gap-14 md:grid-cols-2">
        <div>
          <div className="fl-eyebrow">Our Thesis</div>
          <h2 className="mt-[22px] max-w-[16ch] text-[clamp(30px,3.6vw,52px)] font-semibold leading-[1.04] tracking-[-0.035em]">
            Development is ultimately about productive capacity.
          </h2>
          <p className="m-0 mt-6 max-w-[44ch] text-[16.5px] leading-[1.62] text-fl-soft">
            Countries become more prosperous when their people and institutions become better at producing valuable goods, services,
            technologies and solutions. Technology can dramatically increase that capacity. But technology alone is insufficient.
          </p>
        </div>
        <div>
          <dl className="m-0 flex flex-col border-t border-fl-paper/20">
            {THESIS.map(([who, need], i) => (
              <div
                key={who}
                className={cn('flex items-baseline gap-5 py-[18px]', i < THESIS.length - 1 && 'border-b border-fl-paper/10')}
              >
                <dt className="w-[92px] flex-none font-mono text-[11px] font-medium uppercase leading-none text-fl-orange">{who}</dt>
                <dd className="m-0 text-[17px] font-medium tracking-[-0.02em] sm:text-[19px]">{need}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 mt-[26px] text-[16.5px] leading-[1.62] text-fl-soft">
            FutureLabs works across these layers. We build what people can do, what companies can become and what institutions can
            deliver.
          </p>
        </div>
      </Section>

      <Section id="what-we-build" innerClassName="py-20 lg:py-24">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="fl-eyebrow">What We Build</div>
            <h2 className="mt-5 max-w-[17ch] text-[clamp(30px,3.6vw,52px)] font-semibold leading-[1.03] tracking-[-0.035em]">
              Infrastructure for Africa&apos;s technological future.
            </h2>
          </div>
          <p className="m-0 max-w-[38ch] text-[16px] leading-[1.6] text-fl-label">
            Our work produces more than programs. We build capabilities, startups, technologies, knowledge and networks that continue
            creating value after individual projects end.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {PILLARS.map((p, i) => {
            const imageRight = i % 2 === 1;
            return (
              <article key={p.n} className="fl-card grid hover:shadow-[0_0_0_1px_rgba(245,130,32,.55)] md:grid-cols-2">
                {p.img && (
                  <Duotone
                    src={p.img}
                    flag={`${p.n} · ${p.label}`}
                    className={cn('min-h-[220px] md:min-h-[280px]', imageRight && 'md:order-2')}
                  />
                )}
                <div
                  className={cn(
                    'relative flex flex-col justify-center gap-3.5 overflow-hidden px-6 py-9 sm:px-[38px] sm:pb-[42px] sm:pt-10',
                    !p.img && 'md:col-span-2'
                  )}
                >
                  <span className="fl-ghost-num -bottom-[18px] right-3.5 [font-size:96px]" aria-hidden>{p.n}</span>
                  {!p.img && (
                    <div className="relative font-mono text-[11px] font-medium uppercase leading-none tracking-[.16em] text-fl-orange">
                      {p.n} · {p.label}
                    </div>
                  )}
                  <h3 className="relative max-w-[20ch] text-[clamp(24px,2.5vw,32px)] font-semibold leading-[1.08] tracking-[-0.032em]">
                    {p.title}
                  </h3>
                  <p className="relative m-0 max-w-[46ch] text-[15.5px] leading-[1.62] text-fl-muted">{p.text}</p>
                  <SmartLink href={p.link.href} className="fl-link relative mt-1.5 text-[13px]">
                    {p.link.label} →
                  </SmartLink>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <ManifestoBand />
    </SiteShell>
  );
}
