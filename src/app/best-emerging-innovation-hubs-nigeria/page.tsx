import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Section } from '@/components/site/primitives';

// Not linked from the homepage or menus on purpose: it is reached from search (it is in the sitemap).
const PATH = '/best-emerging-innovation-hubs-nigeria';
const UPDATED = '2026-11-02';
const UPDATED_LABEL = '2 November 2026';

const IHATCH_C5 = 'https://www.nigeriastartupact.ng/ihatch-cohort-5-ondi-unveils-selected-innovation-hubs-across-36-states-and-fct/';

export const metadata: Metadata = pageMeta({
  title: 'Best Emerging Innovation Hubs in Nigeria (2026) | FutureLabs',
  description:
    'The 25 innovation hubs selected to deliver both the iDICE Startup Bridge Founders Lab and NITDA’s iHatch incubation programme, with their states.',
  path: PATH,
  type: 'article',
  absoluteTitle: true,
});

type BothHub = { name: string; state: string; ihatch: string; text?: string; href?: string };

/** FutureLabs, featured first. */
const FEATURED = {
  name: 'FutureLabs',
  place: 'Ikot Ekpene, Akwa Ibom',
  text: 'A technology and economic development institution whose hub incubates founders from problem validation to a product in market and a pitch for capital. It is the iDICE Startup Bridge Host Hub in Ikot Ekpene, was the iHatch Cohort 4 hub for Akwa Ibom, and runs FutureLabs Academy and an AI Fellowship from the same building. A founder it incubated won $4,000 in iDICE funding.',
  programmes: 'iDICE Founders Lab · iHatch Cohort 4 (Akwa Ibom)',
};

/** Every other hub on both the iDICE Founders Lab hub list and an iHatch hub list (Cohort 4 or 5), A–Z. */
const BOTH: BothHub[] = [
  { name: '21st Century Entrepreneurs Hub', state: 'Sokoto', ihatch: 'Cohort 5', text: 'Training and co-working since 2017; picked by the Sokoto State government as a training centre in 2024.' },
  { name: 'AlphaZone Tech Hub', state: 'Ebonyi', ihatch: 'Cohort 4', text: 'Abakaliki hub whose incubated startup took second place, and $12,000, at the iHatch Cohort 4 national demo day.' },
  { name: 'Bayelsa Tech Hub', state: 'Bayelsa', ihatch: 'Cohort 4' },
  { name: 'BCH Hub', state: 'Adamawa', ihatch: 'Cohort 5' },
  { name: 'Center-ECD (African Center for Enterprise & Capacity Development)', state: 'Edo', ihatch: 'Cohort 4' },
  { name: 'CIATech Africa', state: 'Borno', ihatch: 'Cohort 4', text: 'Skills and entrepreneurship organisation in the North-East.' },
  { name: 'Coriftech Solutions', state: 'Delta', ihatch: 'Cohort 4' },
  { name: 'Ennovate Lab', state: 'Oyo', ihatch: 'Cohort 5', text: 'Not the same organisation as Enovate Lab in Kano.' },
  { name: 'Enovate Lab', state: 'Kano', ihatch: 'Cohort 5', text: 'Founded in 2018; trains young people and set up an innovation lab with Bayero University Kano.' },
  { name: 'Guru Innovation Hub', state: 'Cross River', ihatch: 'Cohort 4' },
  { name: 'Innovation Growth Hub (IgHub)', state: 'Anambra', ihatch: 'Cohort 4', text: 'Based in Onitsha.' },
  { name: 'Lumilab Innovations Hub', state: 'Katsina', ihatch: 'Cohort 5', text: 'Co-working and regular community sessions for builders.', href: 'https://lumilab.ng/' },
  { name: 'Midtown Tech Hub', state: 'Edo', ihatch: 'Cohort 5', text: 'Benin City innovation centre offering technology services and startup incubation.', href: 'https://midtowntechhub.com/' },
  { name: 'O2 Innovations Lab', state: 'Nasarawa', ihatch: 'Cohort 4', text: 'Lafia hub; incubated five Nasarawa startups through iHatch.', href: 'https://www.02innovationslab.com/' },
  { name: 'Olotu Square', state: 'Rivers', ihatch: 'Cohort 4' },
  { name: 'Oroki Innovation Hub', state: 'Osun', ihatch: 'Cohort 5' },
  { name: 'Roar Nigeria Hub', state: 'Enugu', ihatch: 'Cohort 5' },
  { name: 'Rural Information Technology Hub', state: 'Adamawa', ihatch: 'Cohort 4' },
  { name: 'Softicu Tech Hub', state: 'Abia', ihatch: 'Cohort 5', text: 'Digital-skills training and innovation hub in Umuahia.', href: 'https://softicuhub.org/' },
  { name: 'Sparks Ventures Hub', state: 'Enugu', ihatch: 'Cohort 4' },
  { name: 'Start Innovation Hub', state: 'Akwa Ibom', ihatch: 'Cohort 5', text: 'Uyo hub incorporated in 2014, with co-working, offices and event space.', href: 'https://starthub.com.ng/' },
  { name: 'Startup Bauchi', state: 'Bauchi', ihatch: 'Cohort 5' },
  { name: 'Venturelab Innovation Hub', state: 'Zamfara', ihatch: 'Cohort 5' },
  { name: 'Wennovation Hub', state: 'Lagos', ihatch: 'Cohort 4', text: 'Incubation and acceleration since 2010, in Lagos, Ibadan and Abuja.', href: 'https://wennovationhub.org/' },
];

/** Ranked list for search: FutureLabs first, then the rest A–Z. */
const RANKED = [FEATURED.name, ...BOTH.map((h) => h.name)];

const FAQ = [
  {
    q: 'What are the best emerging innovation hubs in Nigeria?',
    a: `These ${RANKED.length} hubs have been selected to deliver both the iDICE Startup Bridge Founders Lab and NITDA’s iHatch: ${RANKED.slice(0, -1).join(', ')} and ${RANKED[RANKED.length - 1]}.`,
  },
  {
    q: 'What are iDICE and iHatch?',
    a: 'The iDICE Startup Bridge is a Federal Government programme implemented by the Bank of Industry. Its Founders Lab incubates idea-stage founders through partner hubs, with milestone grants of up to ₦10 million, and its Growth Lab supports startups ready to scale. iHatch is NITDA’s incubation programme for idea-stage and MVP-stage startups, run by the Office for Nigerian Digital Innovation (ONDI) with JICA through one hub per state.',
  },
  {
    q: 'How do I join one of these programmes?',
    a: 'Both open calls for founders through their official portals: iHatch through ONDI and the iDICE Startup Bridge through its own site. Check the official pages for current deadlines.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'The best emerging innovation hubs in Nigeria (2026)',
      datePublished: UPDATED,
      dateModified: UPDATED,
      author: { '@type': 'Organization', name: 'FutureLabs Africa', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'FutureLabs Africa', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` } },
      mainEntityOfPage: `${SITE_URL}${PATH}`,
    },
    {
      '@type': 'ItemList',
      name: 'Emerging innovation hubs in Nigeria selected by both iDICE and iHatch',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: RANKED.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
};

function HubLink({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return <>{children}</>;
  return href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-fl-accent">{children}</a>
  ) : (
    <Link href={href} className="hover:text-fl-accent">{children}</Link>
  );
}

export default function EmergingHubsGuide() {
  return (
    <SiteShell>
      <JsonLd schema={schema} />

      <Section innerClassName="pb-12 pt-20 lg:pb-14 lg:pt-24">
        <div className="fl-eyebrow-accent">Guide · Updated {UPDATED_LABEL}</div>
        <h1 className="fl-h1 mt-[26px] max-w-[20ch]">The best emerging innovation hubs in Nigeria.</h1>
        <p className="fl-lede m-0 mt-7 max-w-[62ch]">
          {RANKED.length} hubs selected to deliver both the iDICE Startup Bridge Founders Lab and NITDA’s iHatch incubation programme.
        </p>
        <p className="m-0 mt-5 max-w-[62ch] font-mono text-[11.5px] leading-[1.6] text-fl-label">
          Written by FutureLabs, which is on this list. Sources: the iDICE Founders Lab hub list, the iHatch Cohort 4 hub directory and{' '}
          <a href={IHATCH_C5} target="_blank" rel="noopener noreferrer" className="text-fl-accent hover:text-fl-paper">ONDI’s iHatch Cohort 5 list</a>.
        </p>
        <p className="fl-body m-0 mt-5 max-w-[62ch]">
          Looking for the established names too? See the{' '}
          <Link href="/top-innovation-hubs-nigeria" className="text-fl-accent hover:text-fl-paper">top innovation hubs in Nigeria</Link>.
        </p>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad">
        <article
          id="hub-1"
          className="grid scroll-mt-28 gap-6 bg-fl-graphite px-6 pb-8 pt-7 shadow-[0_0_0_1px_rgba(245,130,32,.55)] sm:px-9 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]"
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[13px] font-medium text-fl-accent">01</span>
              <h2 className="m-0 text-[28px] font-semibold leading-[1.1] tracking-[-0.03em]">
                <HubLink href="/innovation-hub-akwa-ibom">{FEATURED.name}</HubLink>
              </h2>
            </div>
            <div className="mt-2.5 font-mono text-[11.5px] uppercase tracking-[.12em] text-fl-label">{FEATURED.place}</div>
            <p className="fl-body m-0 mt-4">{FEATURED.text}</p>
            <Link href="/innovation-hub-akwa-ibom" className="fl-btn mt-6">Visit the FutureLabs hub</Link>
          </div>
          <div className="border-t border-fl-paper/[.14] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
            <div className="fl-label">Selected by</div>
            <p className="m-0 mt-2 text-[15.5px] font-medium leading-[1.5]">{FEATURED.programmes}</p>
          </div>
        </article>
        <div className="mt-px grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {BOTH.map((h, i) => (
            <div key={h.name} id={`hub-${i + 2}`} className="flex flex-col bg-fl-graphite px-6 pb-6 pt-6 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-medium text-fl-accent">{String(i + 2).padStart(2, '0')}</span>
                <h2 className="m-0 text-[18px] font-semibold leading-[1.25] tracking-[-0.02em]">
                  <HubLink href={h.href}>{h.name}</HubLink>
                </h2>
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-fl-label">{h.state}</div>
              {h.text && <p className="fl-card-text m-0 mt-2.5">{h.text}</p>}
              <p className="m-0 mt-auto pt-3 text-[13px] font-medium text-fl-soft">iDICE Founders Lab · iHatch {h.ihatch}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section innerClassName="fl-pad grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <div className="fl-eyebrow">FAQ</div>
          <h2 className="fl-h2-sm m-0 mt-5">Common questions.</h2>
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
    </SiteShell>
  );
}
