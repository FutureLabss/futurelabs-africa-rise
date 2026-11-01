import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Section, SplitHero, SectionHead, CtaBand } from '@/components/site/primitives';
import { CONTACT, HUB, SOCIAL_LINKS } from '@/components/site/nav';

const PATH = '/coworking-space-ikot-ekpene';
const OPPORTUNITY_LAB = 'https://opportunitylab.net';
const BOOK_HREF = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Co-working at FutureLabs, Ikot Ekpene')}`;

export const metadata: Metadata = pageMeta({
  title: 'Coworking Space in Ikot Ekpene, Akwa Ibom | FutureLabs',
  description:
    'Work from the FutureLabs hub at No. 3 Chubb Road, Ikot Ekpene: a co-working space with uninterrupted power, Starlink internet and a community of founders, builders and learners. Plus free access to OpportunityLab.',
  path: PATH,
  image: '/images/site/community.jpg',
  absoluteTitle: true,
});

const FEATURES = [
  ['Uninterrupted power', 'The hub runs on a 12kVA inverter, so your work does not stop when the grid does.'],
  ['Starlink internet', 'Fast, reliable satellite internet for calls, uploads and remote work.'],
  ['A community of builders', 'Work alongside founders incubated at the hub, AI Fellows and FutureLabs Academy learners.'],
  ['Programmes and events', 'First to hear about incubation programmes, trainings, networking events and demo days at the hub.'],
];

const FOR = [
  ['Remote workers and freelancers', 'A reliable desk with power and internet, without the cost of running your own generator.'],
  ['Founders', 'A place to build, with incubation programmes such as iDICE and iHatch delivered in the same building.'],
  ['Students and job seekers', 'Somewhere to study, apply for opportunities and learn new skills.'],
  ['Teams and organisations', 'Space for workshops, trainings and meetings in Ikot Ekpene. Ask us what works for your group.'],
];

const OPPORTUNITIES = [
  { label: 'Scholarships', href: `${OPPORTUNITY_LAB}/category/scholarships/` },
  { label: 'Grants', href: `${OPPORTUNITY_LAB}/category/grants/` },
  { label: 'Fellowships', href: `${OPPORTUNITY_LAB}/category/fellowships/` },
  { label: 'Internships', href: `${OPPORTUNITY_LAB}/category/internship/` },
  { label: 'Tech opportunities', href: `${OPPORTUNITY_LAB}/category/tech/` },
  { label: 'Hackathons', href: `${OPPORTUNITY_LAB}/category/hackathons/` },
];

const FAQ = [
  {
    q: 'Where is the co-working space?',
    a: `At the FutureLabs hub, ${HUB.street}, ${HUB.locality}, ${HUB.region} State, Nigeria.`,
  },
  {
    q: 'How much does a desk cost?',
    a: `Email ${CONTACT.email} or call ${CONTACT.phone} for current day, week and month rates.`,
  },
  {
    q: 'What facilities does the space have?',
    a: 'Uninterrupted power from a 12kVA inverter and Starlink internet, in the same building as the FutureLabs incubation and training programmes.',
  },
  {
    q: 'What is OpportunityLab?',
    a: 'OpportunityLab.net is the FutureLabs opportunity site: a regularly updated list of scholarships, grants, fellowships, internships, tech opportunities and hackathons for African youth, with a free matching service.',
  },
  {
    q: 'Can I join programmes at the hub?',
    a: 'Yes. Founders can join incubation programmes delivered at the hub, and learners can train with FutureLabs Academy. Members hear about new programmes first.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}${PATH}#space`,
      name: 'FutureLabs Coworking Space',
      description: 'Co-working space in Ikot Ekpene, Akwa Ibom, with uninterrupted power and Starlink internet.',
      url: `${SITE_URL}${PATH}`,
      image: `${SITE_URL}/images/site/community.jpg`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: HUB.street,
        addressLocality: HUB.locality,
        addressRegion: HUB.region,
        addressCountry: 'NG',
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Uninterrupted power (12kVA inverter)', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Starlink internet', value: true },
      ],
      parentOrganization: { '@type': 'Organization', name: 'FutureLabs Africa', url: SITE_URL },
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
};

export default function CoworkingPage() {
  return (
    <SiteShell>
      <JsonLd schema={schema} />

      <SplitHero
        eyebrow={`Co-working · ${HUB.locality}, ${HUB.region}`}
        title="A co-working space in Ikot Ekpene that keeps working."
        titleClass="max-w-[16ch]"
        lede={
          <>
            Work from the FutureLabs hub at {HUB.street}, {HUB.locality}, with uninterrupted power, Starlink internet and a community of
            founders, builders and learners around you.
          </>
        }
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={BOOK_HREF} className="fl-btn">Ask about a desk</a>
          <a href={HUB.mapsHref} target="_blank" rel="noopener noreferrer" className="fl-btn-ghost">Get directions</a>
        </div>
      </SplitHero>

      <Section tone="graphite" innerClassName="fl-pad">
        <SectionHead eyebrow="What you get" title="Power, internet and people who build." />
        <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(([title, text]) => (
            <div key={title} className="bg-fl-graphite px-6 pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <h3 className="m-0 text-[19px] font-semibold tracking-[-0.022em]">{title}</h3>
              <p className="fl-card-text m-0 mt-2.5">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section innerClassName="fl-pad">
        <SectionHead eyebrow="Who it's for" title="Who works here." titleClass="fl-h2-sm" />
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {FOR.map(([title, text]) => (
            <div key={title} className="bg-fl-graphite px-6 pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <h3 className="m-0 text-[19px] font-semibold tracking-[-0.022em]">{title}</h3>
              <p className="fl-card-text m-0 mt-2.5">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">Opportunities</div>
          <h2 className="fl-h2-sm m-0 mt-5">Find your next scholarship, grant or fellowship on OpportunityLab.</h2>
          <p className="fl-body m-0 mt-6 max-w-[48ch]">
            OpportunityLab is our opportunity site: a regularly updated list of scholarships, grants, fellowships, internships, tech
            opportunities and hackathons for African youth, with a free service that matches you to opportunities that fit. Use it from
            your desk at the hub.
          </p>
          <a href={OPPORTUNITY_LAB} target="_blank" rel="noopener" className="fl-btn mt-8">Browse OpportunityLab</a>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-px self-center p-0">
          {OPPORTUNITIES.map((o) => (
            <li key={o.href}>
              <a
                href={o.href}
                target="_blank"
                rel="noopener"
                className="block bg-fl-ink px-6 py-6 text-[17px] font-semibold tracking-[-0.02em] text-fl-paper shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)] hover:text-fl-accent"
              >
                {o.label} →
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">Book a desk</div>
          <h2 className="fl-h2-sm m-0 mt-5">Ask for current rates and drop by.</h2>
          <p className="fl-body m-0 mt-6 max-w-[46ch]">
            Email or call us for day, week and month rates, or to arrange a visit. The space is part of the{' '}
            <Link href="/innovation-hub-akwa-ibom" className="text-fl-accent hover:text-fl-paper">FutureLabs innovation hub in Akwa Ibom</Link>.
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-fl-graphite px-7 pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
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
            <a href={BOOK_HREF} className="text-fl-label hover:text-fl-paper">{CONTACT.email}</a>
          </div>
          <a href={HUB.mapsHref} target="_blank" rel="noopener noreferrer" className="fl-link mt-2">Open in Google Maps →</a>
        </div>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <div className="fl-eyebrow">FAQ</div>
          <h2 className="fl-h2-sm m-0 mt-5">Questions about co-working.</h2>
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

      <CtaBand title="Work from Ikot Ekpene's innovation hub.">
        <a href={BOOK_HREF} className="fl-btn-dark">Ask about a desk</a>
        <a href={OPPORTUNITY_LAB} target="_blank" rel="noopener" className="fl-btn-dark">Browse OpportunityLab</a>
      </CtaBand>
    </SiteShell>
  );
}
