import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import HeroNetwork from '@/components/site/HeroNetwork';
import { BlogCard } from '@/components/site/BlogCard';
import {
  Section,
  NumberCard,
  ImageCard,
  CtaBand,
  SectionHead,
  ProofLine,
  Stat,
} from '@/components/site/primitives';
import { PartnerLogos } from '@/components/site/PartnerLogos';
import JsonLd from '@/components/JsonLd';
import { posts } from '@/lib/blog';
import { SOCIAL_LINKS } from '@/components/site/nav';

export const metadata: Metadata = pageMeta({
  title: "FutureLabs Africa — Building Africa's productive capacity",
  description: 'FutureLabs is a technology and economic development institution in Nigeria building the talent, startups, technologies and institutional capabilities Africa needs to turn human potential into productive economic power.',
  path: '/',
  absoluteTitle: true,
});

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FutureLabs Africa',
  url: 'https://futurelabs.africa',
  logo: 'https://futurelabs.africa/favicon.png',
  email: 'hello@futurelabs.africa',
  telephone: '+234 703 240 0529',
  description:
    'A technology and economic development institution building the talent, startups, technologies and institutional capabilities Africa needs to turn human potential into productive economic power.',
  sameAs: SOCIAL_LINKS.map((s) => s.href),
};

const ENGINES: {
  n: string;
  tag: string;
  title: string;
  text: string;
  programmes: string[];
  link: { label: string; href: string };
  span: string;
}[] = [
  {
    n: '01',
    tag: 'Talent',
    title: 'Developing productive people.',
    text: 'We develop African talent with the technical, entrepreneurial and problem-solving capabilities a changing economy needs.',
    programmes: ['FutureLabs Academy', 'AI Fellowship', 'Digital skills programmes'],
    link: { label: 'Explore FutureLabs Academy', href: '/academy' },
    span: 'lg:col-span-2',
  },
  {
    n: '02',
    tag: 'Ventures',
    title: 'Turning problems into startups.',
    text: 'We help founders turn African problems into scalable products through incubation, venture building and capital readiness.',
    programmes: ['Startup incubation', 'iHatch', 'FutureLabs Ventures'],
    link: { label: 'Explore our ventures', href: '/startups' },
    span: 'lg:col-span-2',
  },
  {
    n: '03',
    tag: 'Industry',
    title: 'Connecting capability to demand.',
    text: 'Skills only become valuable when they meet real demand. We connect talent, startups and technology to companies and markets.',
    programmes: ['Corporate innovation', 'AI transformation', 'FutureLabs Studio', 'Talent placement'],
    link: { label: 'For enterprise', href: '/enterprise' },
    span: 'md:col-span-2 lg:col-span-2',
  },
  {
    n: '04',
    tag: 'Institutions',
    title: 'Helping institutions build the capacity to deliver.',
    text: 'We help governments, universities and development organisations design and incubate technology-enabled programmes that produce measurable outcomes.',
    programmes: ['iDICE', 'Government innovation programmes', 'University partnerships'],
    link: { label: 'Work with FutureLabs', href: '/government' },
    span: 'lg:col-span-3',
  },
  {
    n: '05',
    tag: 'Intelligence',
    title: 'Understanding where opportunity is moving.',
    text: "We research the forces shaping Africa's technological and economic future: skills, jobs, industries, capital and policy.",
    programmes: ['FutureLabs Intelligence', 'AI economy briefing'],
    link: { label: 'Explore FutureLabs Intelligence', href: '/research-labs' },
    span: 'lg:col-span-3',
  },
];

const CASES = [
  {
    img: '/images/blog/ihatch-national-demo-day.jpg',
    flag: 'Entrepreneurship',
    title: 'iHatch',
    text: 'Incubation for early-stage founders, from problem validation to a product in market.',
    chips: ['Incubation', 'Product'],
    link: { label: 'Read the case study', href: '/blog/ihatch-case-study' },
  },
  {
    img: '/images/site/fellowship.jpg',
    flag: 'Institutions',
    title: 'iDICE',
    text: 'Delivery partner on a national programme building digital and creative enterprise capacity.',
    chips: ['Government', 'Ecosystem'],
    link: { label: 'Read the case study', href: '/blog/idice-case-study' },
  },
  {
    img: '/images/site/community.jpg',
    flag: 'Talent',
    title: 'AI Fellowship',
    text: 'Biweekly peer-to-peer mentorship that keeps our builders ahead of what is changing in AI.',
    chips: ['AI', 'Mentorship'],
    link: { label: 'Read the case study', href: '/blog/ai-fellowship-case-study' },
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <JsonLd schema={orgSchema} />

      {/* Hero */}
      <section className="fl-section overflow-hidden">
        <div className="fl-wrap grid items-center gap-12 pb-16 pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.85fr)] lg:gap-16 lg:pb-[88px] lg:pt-[104px]">
          <div>
            <div className="font-mono text-[10.5px] font-medium uppercase leading-[1.5] tracking-[.12em] text-fl-accent sm:text-[11px] sm:leading-none sm:tracking-[.18em]">
              Technology × Human Capital × Economic Development
            </div>
            <h1 className="fl-display m-0 mt-[18px] max-w-[14ch] sm:mt-[30px]">Building Africa&apos;s productive capacity.</h1>
            <p className="m-0 mt-8 max-w-[52ch] text-[15px] leading-[1.55] text-fl-soft sm:text-[18.5px]" style={{ textWrap: 'pretty' }}>
              FutureLabs is a technology and economic development institution building the talent, startups, technologies and
              institutional capabilities Africa needs to turn human potential into productive economic power.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/partner" className="fl-btn">Partner with FutureLabs</Link>
              <Link href="/about#what-we-build" className="fl-btn-ghost">Explore our work</Link>
            </div>
            <ProofLine className="mt-11 border-t border-fl-paper/[.14] pt-4 sm:border-0 sm:pt-0">
              <Stat value="45+">startups incubated</Stat>
              <Stat value="1,250+">youths trained</Stat>
              <span>Verified internally · As of 2026</span>
            </ProofLine>
          </div>
          <div className="hidden px-[14%] sm:block lg:px-0">
            <HeroNetwork />
          </div>
          {/* Mobile: the diagram collapses to a vertical chain. */}
          <ol className="m-0 flex list-none flex-col items-center p-0 sm:hidden" aria-label="Our five engines">
            {['Talent', 'Ventures', 'Industry', 'Institutions', 'Intelligence'].map((label, i) => (
              <li key={label} className="flex flex-col items-center">
                {i > 0 && <span aria-hidden className="block h-[18px] w-px bg-fl-orange/40" />}
                <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[.14em] text-fl-accent">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The challenge */}
      <Section innerClassName="fl-pad grid items-start gap-12 md:grid-cols-2">
        <div>
          <div className="fl-eyebrow">The Challenge</div>
          <h2 className="fl-h2 mt-6 max-w-[19ch]">Africa has enormous potential. Potential alone does not create prosperity.</h2>
          <p className="fl-body m-0 mt-8 max-w-[52ch]">
            Africa has extraordinary young people, ambitious entrepreneurs and rapidly advancing technology. What is often missing is the
            infrastructure that connects them and turns them into measurable economic outcomes.
          </p>
          <p className="m-0 mt-[30px] max-w-[24ch] text-[22px] font-medium leading-[1.25] tracking-[-0.025em] text-fl-accent sm:text-[26px]">
            FutureLabs exists to build that infrastructure.
          </p>
        </div>
        <div className="md:pt-[52px]">
          <div className="fl-eyebrow mb-4">We measure productive capacity, not activity</div>
          <div className="max-w-[40ch] text-[17px] leading-[1.5] sm:text-[19px]">
            <div className="border-b border-fl-paper/[.12] py-2.5">Training people is <span className="text-fl-label">activity</span>.</div>
            <div className="border-b border-fl-paper/[.12] py-2.5">Building productive people is <span className="text-fl-accent">impact</span>.</div>
            <div className="border-b border-fl-paper/[.12] py-2.5">Supporting startups is <span className="text-fl-label">activity</span>.</div>
            <div className="py-2.5">Helping startups grow, create jobs and generate revenue is <span className="text-fl-accent">impact</span>.</div>
          </div>
          <Link
            href="/about"
            className="mt-6 inline-block border-b border-fl-paper/40 pb-1 text-[13.5px] font-medium leading-none text-fl-paper hover:border-fl-orange hover:text-fl-paper"
          >
            Our approach →
          </Link>
        </div>
      </Section>

      {/* Proof: what changed after working with FutureLabs. #impact is linked from the footer and /impact. */}
      <Section id="impact" tone="graphite" innerClassName="fl-pad">
        <SectionHead
          eyebrow="Our Work"
          title="Where the model meets reality."
          aside={
            <p className="m-0 max-w-[40ch] text-[16px] leading-[1.55] text-fl-label">
              The strongest evidence of our work is what people, startups and institutions are able to do after working with FutureLabs.
            </p>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <ImageCard key={c.title} {...c} imgHeight="h-[190px]" />
          ))}
        </div>
      </Section>

      {/* Our model: the five engines from the hero diagram */}
      <Section innerClassName="fl-pad">
        <SectionHead
          eyebrow="Our Model"
          title="Five engines, one goal: productive capacity."
          aside={
            <p className="m-0 max-w-[38ch] text-[16px] leading-[1.55] text-fl-label">
              Programmes are the mechanism. Economic outcomes are the goal.
            </p>
          }
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {ENGINES.map((e) => (
            <NumberCard
              key={e.n}
              surface="graphite"
              className={e.span}
              minH="min-h-[300px] lg:min-h-[340px]"
              n={e.n}
              tag={e.tag}
              title={e.title}
              titleClass="text-[23px] font-semibold leading-[1.12] tracking-[-0.028em]"
              text={e.text}
              chips={e.programmes}
              link={e.link}
            />
          ))}
        </div>
      </Section>

      {/* Intelligence teaser */}
      <Section tone="graphite" innerClassName="fl-pad grid items-start gap-14 md:grid-cols-2">
        <div>
          <div className="fl-eyebrow">Intelligence</div>
          <h2 className="mt-6 text-[clamp(30px,3.4vw,46px)] font-semibold leading-[1.04] tracking-[-0.032em]">
            See where Africa&apos;s next opportunities are emerging.
          </h2>
          <p className="m-0 mt-[22px] max-w-[46ch] text-[16.5px] leading-[1.62] text-fl-soft">
            FutureLabs Intelligence researches the forces shaping African technology and economic development.
          </p>
          <Link href="/research-labs" className="fl-link mt-6 inline-block text-[13.5px]">Explore the research →</Link>
        </div>
        <div className="flex flex-col gap-4 bg-fl-ink px-[30px] pb-[34px] pt-8 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.16)]">
          <span className="self-start bg-fl-orange px-2.5 py-[7px] font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-night">
            Free briefing
          </span>
          <h3 className="max-w-[20ch] text-[24px] font-semibold leading-[1.12] tracking-[-0.028em]">
            The AI Economy: Structure, Fragility and Opportunity
          </h3>
          <p className="fl-card-text m-0 max-w-[40ch]">
            The AI boom isn&apos;t short of demand. It&apos;s short of cheap money. Where would it break, how would the damage spread, and
            who comes out ahead?
          </p>
          <Link href="/research-labs#ai-economy-briefing" className="fl-btn mt-1 w-full py-4">Get the free briefing</Link>
          <Link href="/blog/ai-boom-short-of-cheap-money" className="fl-link pt-1">Read the key findings →</Link>
        </div>
      </Section>

      {/* Partners */}
      <Section innerClassName="py-16 overflow-hidden">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="fl-eyebrow m-0">35+ partners</h2>
          <div className="h-[1px] w-12 bg-fl-paper/20"></div>
        </div>
        <PartnerLogos />
      </Section>

      {/* Blog */}
      <Section tone="graphite" innerClassName="py-20 lg:py-24">
        <SectionHead
          eyebrow="Blog"
          title="Latest from our blog."
          titleClass="max-w-[18ch] text-[clamp(30px,3.6vw,52px)] font-semibold leading-[1.03] tracking-[-0.035em]"
          aside={<Link href="/blog" className="fl-link text-[13.5px]">View all posts →</Link>}
          className="mb-11"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Case studies are already linked from the cards above. */}
          {posts.filter((p) => p.category !== 'Case study').slice(0, 3).map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </Section>

      {/* Closing: manifesto line + partnership call */}
      <CtaBand title="Africa does not need another conversation about potential." split>
        <p className="m-0 max-w-[34ch] text-[20px] font-medium leading-[1.45]">It needs systems that turn potential into production.</p>
        <p className="m-0 mt-3 max-w-[40ch] text-[16px] leading-[1.55]">
          We work with organisations that want to develop people, build startups, deploy technology or strengthen institutions.
        </p>
        <div className="mt-[26px] flex flex-wrap gap-3">
          <Link href="/partner" className="fl-btn-dark px-6 py-4">Partner with FutureLabs</Link>
          <Link
            href="/manifesto"
            className="inline-flex items-center border border-fl-night/40 px-6 py-4 text-[14px] font-medium leading-none text-fl-night transition-colors hover:border-fl-night"
          >
            Read the Manifesto
          </Link>
        </div>
      </CtaBand>
    </SiteShell>
  );
}
