import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import HeroNetwork from '@/components/site/HeroNetwork';
import SubscribeForm from '@/components/site/SubscribeForm';
import { BlogCard } from '@/components/site/BlogCard';
import {
  Section,
  NumberCard,
  ImageCard,
  ManifestoBand,
  PartnerNames,
  SectionHead,
  ProofLine,
  Stat,
} from '@/components/site/primitives';
import TutorCtaModal from '@/components/TutorCtaModal';
import JsonLd from '@/components/JsonLd';
import { posts } from '@/lib/blog';
import { SOCIAL_LINKS } from '@/components/site/nav';

export const metadata: Metadata = {
  title: { absolute: "FutureLabs Africa — Building Africa's productive capacity" },
  description:
    'FutureLabs is a technology and economic development institution building the talent, startups, technologies and institutional capabilities Africa needs to turn human potential into productive economic power.',
};

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

const third = 'lg:col-span-2';
const thirdLast = 'md:col-span-2 lg:col-span-2';
const half = 'lg:col-span-3';

const MECHANISMS = [
  { n: '01', tag: 'Talent', items: ['FutureLabs Academy', 'Digital skills programs', 'AI workforce development'] },
  { n: '02', tag: 'Entrepreneurship', items: ['Startup incubation', 'iDICE', 'iHatch', 'FutureLabs Ventures'] },
  { n: '03', tag: 'Institutions', items: ['Government innovation programs', 'University partnerships', 'Corporate innovation'] },
  { n: '04', tag: 'Technology', items: ['AI systems', 'Digital platforms', 'Software development'] },
];

const IMPACT = [
  { value: '2,000', title: 'People developed', text: 'Talent trained and moved into economic activity.' },
  { value: '40', title: 'Startups supported', text: 'Startups incubated, built or backed.' },
  { value: '7', title: 'Institutional partners', text: 'Government, development and university partners.' },
];

const CASES = [
  {
    img: '/images/site/hackathon.jpg',
    flag: 'Entrepreneurship',
    title: 'iHatch',
    text: 'Incubation for early-stage founders, from problem validation to a product in market.',
    chips: ['Incubation', 'Product'],
    link: { label: 'Explore our ventures', href: '/startups' },
  },
  {
    img: '/images/site/fellowship.jpg',
    flag: 'Institutions',
    title: 'iDICE',
    text: 'Delivery partner on a national programme building digital and creative enterprise capacity.',
    chips: ['Government', 'Ecosystem'],
    link: { label: 'Government & development', href: '/government' },
  },
  {
    img: '/images/site/community.jpg',
    flag: 'Talent',
    title: 'AI Fellowship',
    text: 'Applied AI training taken through to industry placement and real deployments.',
    chips: ['AI', 'Placement'],
    link: { label: 'About the fellowship', href: '/ai-fellowship' },
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
            <div className="font-mono text-[9px] font-medium uppercase leading-[1.5] tracking-[.14em] text-fl-orange sm:text-[11px] sm:leading-none sm:tracking-[.18em]">
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
              <Stat value="40">startups supported</Stat>
              <Stat value="2,000">talents developed</Stat>
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
                <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[.14em] text-fl-orange">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The challenge */}
      <Section innerClassName="fl-pad">
        <div className="fl-eyebrow">The Challenge</div>
        <h2 className="fl-h2 mt-6 max-w-[19ch]">Africa has enormous potential. Potential alone does not create prosperity.</h2>
        <div className="mt-11 grid max-w-[1050px] gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="fl-body m-0">
            Economic development happens when people develop productive capabilities, businesses can grow, technology is deployed,
            capital reaches productive opportunities and institutions can execute.
          </p>
          <p className="fl-body m-0">
            Africa has extraordinary young people, ambitious entrepreneurs and rapidly advancing technology. What is often missing is
            the infrastructure that connects these assets to one another and turns them into measurable economic outcomes.
          </p>
        </div>
        <p className="m-0 mt-[34px] max-w-[24ch] text-[22px] font-medium leading-[1.25] tracking-[-0.025em] text-fl-orange sm:text-[26px]">
          FutureLabs exists to build that infrastructure.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block border-b border-fl-paper/40 pb-1 text-[13.5px] font-medium leading-none text-fl-paper hover:border-fl-orange hover:text-fl-paper"
        >
          Our approach →
        </Link>
      </Section>

      {/* Our model */}
      <Section tone="graphite" innerClassName="fl-pad">
        <SectionHead
          eyebrow="Our Model"
          title="From potential to productive capacity."
          aside={
            <p className="m-0 max-w-[38ch] text-[16px] leading-[1.55] text-fl-label">
              We work across the systems that determine whether talent and technology become economic value.
            </p>
          }
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <NumberCard
            className={third}
            minH="min-h-[330px] lg:min-h-[390px]"
            n="01"
            tag="Talent"
            title="Developing productive people."
            titleClass="text-[23px] font-semibold leading-[1.12] tracking-[-0.028em]"
            text="We identify and develop exceptional African talent with the technical, entrepreneurial and problem-solving capabilities required by a changing economy."
            chips={['AI', 'Software', 'Digital skills', 'Entrepreneurship', 'Leadership']}
            link={{ label: 'Explore FutureLabs Academy', href: '/academy' }}
          />
          <NumberCard
            className={third}
            minH="min-h-[330px] lg:min-h-[390px]"
            n="02"
            tag="Ventures"
            title="Turning problems into startups."
            titleClass="text-[23px] font-semibold leading-[1.12] tracking-[-0.028em]"
            text="We help founders transform African problems into scalable products and startups through incubation, venture building, product development, market access and capital readiness."
            chips={['Incubation', 'Venture building', 'Product', 'Market access', 'Capital']}
            link={{ label: 'Explore our ventures', href: '/startups' }}
          />
          <NumberCard
            className={thirdLast}
            minH="min-h-[330px] lg:min-h-[390px]"
            n="03"
            tag="Industry"
            title="Connecting capability to economic demand."
            titleClass="text-[23px] font-semibold leading-[1.12] tracking-[-0.028em]"
            text="Skills only become economically valuable when they meet real demand. We connect talent, startups and technology to companies, markets and opportunities."
            chips={['Corporate innovation', 'AI transformation', 'Talent placement']}
            link={{ label: 'For enterprise', href: '/enterprise' }}
          />
          <ImageCard
            className={half}
            img="/images/site/team.jpg"
            flag="04 · Institutions"
            title="Helping institutions build the capacity to deliver."
            text="We work with governments, universities, development organizations and other institutions to design and execute technology-enabled programs that produce measurable outcomes."
            chips={['Government innovation', 'Digital transformation', 'Workforce programs', 'Institutional capacity']}
            link={{ label: 'Work with FutureLabs', href: '/government' }}
          />
          <ImageCard
            className={half}
            img="/images/site/community.jpg"
            flag="05 · Intelligence"
            title="Understanding where opportunity is moving."
            text="We research the forces shaping Africa's technological and economic future: skills, jobs, industries, capital, technology, entrepreneurship and policy."
            link={{ label: 'Explore FutureLabs Intelligence', href: '/research-labs' }}
          />
        </div>
      </Section>

      {/* What we build */}
      <Section innerClassName="fl-pad">
        <div className="fl-eyebrow">What We Build</div>
        <h2 className="fl-h2 mt-6">Infrastructure for Africa&apos;s technological future.</h2>
        <p className="fl-body m-0 mt-[26px] max-w-[62ch]">
          We build capabilities, startups, technologies and networks that keep creating value after a project ends.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <NumberCard surface="graphite" className={third} n="01" title="People" text="Africa’s next generation of builders, founders, engineers and technology professionals." href="/academy" />
          <NumberCard surface="graphite" className={third} n="02" title="Startups" text="Ventures built and backed around meaningful African problems." href="/startups" />
          <NumberCard surface="graphite" className={thirdLast} n="03" title="Technology" text="AI systems, software and digital infrastructure that raise productivity." href="/studio" />
          <ImageCard surface="graphite" className={half} img="/images/site/fellowship.jpg" flag="04 · Institutions" title="Capacity to execute" text="Helping organizations and governments build the ability to deliver." href="/government" />
          <ImageCard surface="graphite" className={half} img="/images/site/fl-bg.jpg" flag="05 · Intelligence" title="Research and data" text="Helping decision-makers see where opportunity is emerging." href="/research-labs" />
        </div>
      </Section>

      {/* Programs are the mechanism */}
      <Section tone="graphite" innerClassName="fl-pad">
        <h2 className="fl-h2 m-0 max-w-[22ch] [font-size:clamp(30px,3.6vw,52px)]">Programs are the mechanism. Economic outcomes are the goal.</h2>
        <p className="fl-body m-0 mt-6 max-w-[60ch]">
          We work with governments, development organizations, corporations, universities and founders to turn resources into
          productive capacity.
        </p>
        <div className="mt-[52px] grid gap-4 md:grid-cols-2">
          {MECHANISMS.map((m) => (
            <div key={m.n} className="fl-card fl-card-hover px-[26px] pb-[30px] pt-7">
              <span className="fl-ghost-num" aria-hidden>{m.n}</span>
              <div className="relative flex items-baseline justify-between border-b border-fl-paper/20 pb-3.5">
                <span className="fl-num">{m.n}</span>
                <span className="fl-tag">{m.tag}</span>
              </div>
              <ul className="relative m-0 list-none p-0">
                {m.items.map((item, i) => (
                  <li
                    key={item}
                    className={`py-3.5 text-[16px] font-medium tracking-[-0.015em] ${i < m.items.length - 1 ? 'border-b border-fl-paper/10' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Measuring what matters */}
      <Section id="impact" innerClassName="fl-pad">
        <div className="fl-eyebrow">Measuring What Matters</div>
        <h2 className="fl-h2 mt-6">We measure productive capacity, not activity.</h2>
        <div className="mt-11 grid items-start gap-12 md:grid-cols-2">
          <div className="max-w-[40ch] text-[17px] leading-[1.5] sm:text-[19px]">
            <div className="border-b border-fl-paper/[.12] py-2.5">Training people is <span className="text-fl-label">activity</span>.</div>
            <div className="border-b border-fl-paper/[.12] py-2.5">Building productive people is <span className="text-fl-orange">impact</span>.</div>
            <div className="border-b border-fl-paper/[.12] py-2.5">Supporting startups is <span className="text-fl-label">activity</span>.</div>
            <div className="py-2.5">Helping startups grow, create jobs and generate revenue is <span className="text-fl-orange">impact</span>.</div>
          </div>
          <p className="fl-body m-0 max-w-[40ch]">
            Our goal is to measure what becomes possible because FutureLabs exists. We publish verified figures only — every number
            below has an internal source.
          </p>
        </div>
        <div className="mt-[52px] grid gap-px sm:grid-cols-3">
          {IMPACT.map((s) => (
            <div key={s.title} className="bg-fl-ink px-[26px] pb-9 pt-[34px] shadow-[0_0_0_1px_rgba(242,240,234,.14)]">
              <div className="text-[clamp(48px,5vw,68px)] font-semibold leading-[.9] tracking-[-0.045em]">{s.value}</div>
              <div className="mt-3.5 text-[15px] font-semibold">{s.title}</div>
              <p className="m-0 mt-1.5 text-[13.5px] leading-[1.55] text-fl-label">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 font-mono text-[11px] leading-[1.5] text-fl-dim">Verified internally · As of 2026</div>
      </Section>

      {/* Where the model meets reality */}
      <Section tone="graphite" innerClassName="fl-pad">
        <h2 className="fl-h2 m-0">Where the model meets reality.</h2>
        <p className="fl-body m-0 mt-5 max-w-[46ch]">
          The strongest evidence of our work is what people, startups and institutions are able to do after working with FutureLabs.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <ImageCard key={c.title} {...c} imgHeight="h-[190px]" />
          ))}
        </div>
      </Section>

      {/* Intelligence teaser */}
      <Section innerClassName="fl-pad grid items-start gap-14 md:grid-cols-2">
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
        <div className="flex flex-col gap-4 bg-fl-graphite px-[30px] pb-[34px] pt-8 shadow-[0_0_0_1px_rgba(242,240,234,.16)]">
          <span className="self-start bg-fl-orange px-2.5 py-[7px] font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-ink">
            In development
          </span>
          <h3 className="max-w-[20ch] text-[24px] font-semibold leading-[1.12] tracking-[-0.028em]">
            Akwa Ibom Technology &amp; Economic Opportunity Index
          </h3>
          <p className="fl-card-text m-0 max-w-[40ch]">Our first report. Subscribe and we will tell you when it publishes.</p>
          <SubscribeForm
            subject="Notify me: Akwa Ibom Technology & Economic Opportunity Index"
            submitLabel="Notify me"
            successText="Thanks — we'll email you when the report publishes."
            className="mt-1"
          />
        </div>
      </Section>

      {/* Partners */}
      <Section tone="graphite" innerClassName="py-16">
        <h2 className="fl-eyebrow mb-6">Partners</h2>
        <PartnerNames />
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
          {posts.slice(0, 3).map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </Section>

      <ManifestoBand />

      {/* Build with us */}
      <Section innerClassName="fl-pad flex flex-col items-center gap-[26px] text-center">
        <h2 className="m-0 max-w-[18ch] text-[clamp(32px,4.4vw,62px)] font-semibold leading-[1.02] tracking-[-0.038em]">Build with us.</h2>
        <p className="m-0 max-w-[54ch] text-[17px] leading-[1.55] text-fl-soft sm:text-[18px]">
          We work with organizations that want to develop people, build startups, deploy technology or strengthen institutions.
        </p>
        <Link href="/partner" className="fl-btn px-7">Partner with FutureLabs</Link>
      </Section>

      <TutorCtaModal />
    </SiteShell>
  );
}
