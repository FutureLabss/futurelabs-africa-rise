import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Section, SplitHero, SectionHead, ProofLine, Stat, CtaBand, SmartLink } from '@/components/site/primitives';
import { CONTACT, HUB, SOCIAL_LINKS } from '@/components/site/nav';

const PATH = '/innovation-hub-akwa-ibom';

export const metadata: Metadata = pageMeta({
  title: 'Innovation Hub in Akwa Ibom | FutureLabs, Ikot Ekpene',
  description:
    'FutureLabs runs an innovation hub at No. 3 Chubb Road, Ikot Ekpene, Akwa Ibom: startup incubation (iDICE, iHatch), digital skills training and an AI fellowship, with uninterrupted power and Starlink internet.',
  path: PATH,
  image: '/images/site/team.jpg',
  absoluteTitle: true,
});

const PROGRAMMES = [
  {
    n: '01',
    tag: 'Startups',
    title: 'Startup incubation',
    text: 'We are the iDICE Startup Bridge Host Hub in Ikot Ekpene and incubated founders in the 2025 iHatch cohort run by ONDI and NITDA with JICA. Founders get a place to work, people to test ideas with, and support from problem validation to a product in market and a pitch for capital.',
    link: { label: 'How we delivered iDICE', href: '/case-studies/idice-case-study' },
  },
  {
    n: '02',
    tag: 'Talent',
    title: 'Digital skills training',
    text: 'FutureLabs Academy trains young people for digital work at the hub. Through Project Genesis with PIND, we were asked to train 80 young people in Akwa Ibom and enrolled 107.',
    link: { label: 'Read the Project Genesis case study', href: '/case-studies/pind-youth-employment-case-study' },
  },
  {
    n: '03',
    tag: 'AI',
    title: 'AI Fellowship',
    text: 'A biweekly, in-person mentorship at the hub where fellows take turns bringing real problems and build AI solutions together, through to placement and deployment.',
    link: { label: 'About the fellowship', href: '/ai-fellowship' },
  },
  {
    n: '04',
    tag: 'Community',
    title: 'Founder and builder community',
    text: 'Networking events, demo days and meetups that put founders in the same room as investors, industry leaders and each other, like the iDICE Founders Lab networking event we hosted on 30 July 2026.',
    link: { label: 'See upcoming events', href: '/events' },
  },
];

const AUDIENCES = [
  ['Founders', 'Idea-stage and MVP-stage founders in Akwa Ibom who want incubation, mentorship and a path to funding.'],
  ['Young people', 'Anyone ready to learn software, AI and digital skills and move into work.'],
  ['Governments and development partners', 'Organisations that need a capable delivery partner to run incubation and skills programmes on the ground in Akwa Ibom.'],
  ['Companies', 'Businesses looking for trained talent, AI adoption support or startups to partner with.'],
];

const FAQ = [
  {
    q: 'Where is the FutureLabs innovation hub?',
    a: `At ${HUB.street}, ${HUB.locality}, ${HUB.region} State, Nigeria. Call ${CONTACT.phone} or email ${CONTACT.email} before you visit.`,
  },
  {
    q: 'What happens at the hub?',
    a: 'Startup incubation (including the iDICE Startup Bridge and iHatch), digital skills training through FutureLabs Academy, the biweekly AI Fellowship, and founder and builder community events.',
  },
  {
    q: 'How do founders join?',
    a: 'Most founders come in through an incubation programme. National programmes such as iDICE and iHatch select founders and we incubate them at the hub. iHatch, for example, offers free incubation to selected founders. Get in touch to hear what is open now.',
  },
  {
    q: 'What facilities does the hub have?',
    a: 'Uninterrupted power from a 12kVA inverter, Starlink internet and the FutureLabs learning platform for training materials, assignments and attendance.',
  },
  {
    q: 'What other innovation hubs are there in Akwa Ibom?',
    a: 'Uyo has the most hubs, including Start Innovation Hub and RootHub, and KodeHauz is based in Eket. Our guide to the best innovation hubs in Akwa Ibom, linked above, compares them.',
  },
  {
    q: 'Can my organisation run a programme with FutureLabs in Akwa Ibom?',
    a: 'Yes. We design and deliver technology-enabled incubation, skills and innovation programmes with governments, development organisations, universities and companies.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}${PATH}#hub`,
      name: 'FutureLabs Innovation Hub',
      description:
        'Innovation hub in Ikot Ekpene, Akwa Ibom, for startup incubation, digital skills training, an AI fellowship and founder community events.',
      url: `${SITE_URL}${PATH}`,
      image: `${SITE_URL}/images/site/team.jpg`,
      logo: `${SITE_URL}/favicon.png`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: HUB.street,
        addressLocality: HUB.locality,
        addressRegion: HUB.region,
        addressCountry: 'NG',
      },
      areaServed: { '@type': 'State', name: 'Akwa Ibom' },
      parentOrganization: { '@type': 'Organization', name: 'FutureLabs Africa', url: SITE_URL },
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
};

export default function InnovationHubPage() {
  return (
    <SiteShell>
      <JsonLd schema={schema} />

      <SplitHero
        eyebrow={`Innovation hub · ${HUB.locality}, ${HUB.region}`}
        title="An innovation hub in Akwa Ibom that turns talent into companies."
        titleClass="max-w-[17ch]"
        lede={
          <>
            FutureLabs runs its innovation hub at {HUB.street}, {HUB.locality}, Akwa Ibom State. Founders build startups here, young
            people train for digital work, and national programmes like iDICE and iHatch reach Akwa Ibom through us.
          </>
        }
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/contact" className="fl-btn">Visit the hub</Link>
          <a href={HUB.mapsHref} target="_blank" rel="noopener noreferrer" className="fl-btn-ghost">Get directions</a>
        </div>
        <ProofLine className="mt-7">
          <Stat value="45+">startups incubated</Stat>
          <Stat value="1,250+">youths trained</Stat>
          <Stat value="35+">partners</Stat>
          <span>Verified internally · As of 2026</span>
        </ProofLine>
      </SplitHero>

      <Section tone="graphite" innerClassName="fl-pad">
        <SectionHead eyebrow="What happens at the hub" title="Incubation, training and community under one roof." />
        <div className="mt-12 grid gap-px md:grid-cols-2">
          {PROGRAMMES.map((p) => (
            <article key={p.n} className="flex flex-col bg-fl-graphite px-[26px] pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <div className="flex items-center justify-between">
                <span className="fl-num">{p.n}</span>
                <span className="fl-tag">{p.tag}</span>
              </div>
              <h3 className="fl-card-title m-0 mt-5">{p.title}</h3>
              <p className="fl-card-text m-0 mt-3 flex-1">{p.text}</p>
              <SmartLink href={p.link.href} className="fl-link mt-6">{p.link.label} →</SmartLink>
            </article>
          ))}
        </div>
      </Section>

      <Section innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">Results from the hub</div>
          <h2 className="fl-h2-sm m-0 mt-5">Funding and jobs that reach founders outside Lagos and Abuja.</h2>
        </div>
        <ul className="m-0 flex list-none flex-col p-0">
          {[
            <>
              <strong className="font-semibold text-fl-paper">$4,000 for Bucx Technologies.</strong> Emmanuel Jackson came to the hub
              with an idea about payments and won iDICE Startup Bridge funding.{' '}
              <Link href="/blog/futurelabs-incubatee-closes-4k-idice" className="text-fl-accent hover:text-fl-paper">Read his story</Link>
            </>,
            <>
              <strong className="font-semibold text-fl-paper">107 young people enrolled</strong> in Project Genesis against a brief of
              80, with graduates already in jobs, internships and businesses of their own.
            </>,
            <>
              <strong className="font-semibold text-fl-paper">One of 37 hubs nationally</strong> chosen to incubate founders in the 2025
              iHatch cohort.{' '}
              <Link href="/case-studies/ihatch-case-study" className="text-fl-accent hover:text-fl-paper">Read the case study</Link>
            </>,
          ].map((item, i) => (
            <li key={i} className="border-t border-fl-paper/[.14] py-5 text-[16px] leading-[1.6] text-fl-soft last:border-b">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">The space</div>
          <h2 className="fl-h2-sm m-0 mt-5">Built so the work doesn&apos;t stop when NEPA does.</h2>
          <p className="fl-body m-0 mt-6 max-w-[46ch]">
            The hub runs on uninterrupted power from a 12kVA inverter and has Starlink internet, backed by the FutureLabs learning
            platform for materials, assignments and attendance.
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-fl-ink px-7 pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
          <div className="fl-label">Address</div>
          <address className="text-[20px] font-medium not-italic leading-[1.4] tracking-[-0.02em]">
            {HUB.street}
            <br />
            {HUB.locality}, {HUB.region} State
            <br />
            Nigeria
          </address>
          <div className="font-mono text-[12.5px] leading-[1.7] text-fl-label">
            <a href={CONTACT.phoneHref} className="text-fl-label hover:text-fl-paper">{CONTACT.phone}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`} className="text-fl-label hover:text-fl-paper">{CONTACT.email}</a>
          </div>
          <a href={HUB.mapsHref} target="_blank" rel="noopener noreferrer" className="fl-link mt-2">Open in Google Maps →</a>
        </div>
      </Section>

      <Section innerClassName="fl-pad">
        <SectionHead eyebrow="Who it's for" title="Who works with the hub." titleClass="fl-h2-sm" />
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(([title, text]) => (
            <div key={title} className="bg-fl-graphite px-6 pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <h3 className="m-0 text-[19px] font-semibold tracking-[-0.022em]">{title}</h3>
              <p className="fl-card-text m-0 mt-2.5">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <div className="fl-eyebrow">FAQ</div>
          <h2 className="fl-h2-sm m-0 mt-5">Questions about the hub.</h2>
          <p className="fl-card-text m-0 mt-6 max-w-[36ch]">
            Comparing your options?{' '}
            <Link href="/best-innovation-hubs-akwa-ibom" className="text-fl-accent hover:text-fl-paper">
              See our guide to the best innovation hubs in Akwa Ibom
            </Link>
            .
          </p>
        </div>
        <dl className="m-0">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="border-t border-fl-paper/[.14] py-6 last:border-b">
              <dt className="text-[18px] font-semibold tracking-[-0.02em]">{q}</dt>
              <dd className="fl-card-text m-0 mt-2.5 text-[15.5px]">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand title="Build in Akwa Ibom with FutureLabs.">
        <Link href="/contact" className="fl-btn-dark">Visit the hub</Link>
        <Link href="/partner" className="fl-btn-dark">Run a programme with us</Link>
      </CtaBand>
    </SiteShell>
  );
}
