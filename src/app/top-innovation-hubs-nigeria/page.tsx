import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Section } from '@/components/site/primitives';

// Not linked from the homepage or menus on purpose: it is reached from search (it is in the sitemap)
// and from the other hub guides.
const PATH = '/top-innovation-hubs-nigeria';
const UPDATED = '2026-11-03';
const UPDATED_LABEL = '3 November 2026';

const IHATCH_C5 = 'https://www.nigeriastartupact.ng/ihatch-cohort-5-ondi-unveils-selected-innovation-hubs-across-36-states-and-fct/';
const IDICE = 'https://idicestartupbridge.ng/';

export const metadata: Metadata = pageMeta({
  title: 'Top Innovation Hubs in Nigeria (2026)',
  description:
    'The top innovation and tech hubs in Nigeria, city by city: CcHUB, Wennovation, Impact Hub Lagos, nHub, CoLab, RAD5 and more, plus emerging hubs to watch.',
  path: PATH,
  type: 'article',
});

type Hub = { name: string; city: string; text: string; offers: string; href?: string };

/** Established hubs, grouped by city. Facts are from each hub's own website or official page. */
const HUBS: Hub[] = [
  {
    name: 'Co-Creation Hub (CcHUB)',
    city: 'Yaba, Lagos',
    text: 'Established in 2010 and now a pan-African innovation organisation, CcHUB runs programmes in creative economy, health, education, green tech and startup funding, including the Nigeria GATEWAY Program and the Global Cleantech Innovation Programme in Nigeria. It says it has backed over 90 early-stage ventures.',
    offers: 'Programmes · startup funding · design lab',
    href: 'https://cchub.africa',
  },
  {
    name: 'Wennovation Hub',
    city: 'Victoria Island, Lagos',
    text: 'One of Nigeria’s oldest hubs, offering incubation, acceleration, investment readiness, mentorship and co-working. It has run the NSIA Prize for Innovation and reports 450+ startup teams supported and $15m+ raised by its startups.',
    offers: 'Incubation · acceleration · co-working',
    href: 'https://wennovationhub.org',
  },
  {
    name: 'Impact Hub Lagos',
    city: 'Ikoyi, Lagos',
    text: 'Part of the global Impact Hub network, with co-working, private offices and event space. It runs programmes such as SHEPitch for women founders and reports $10.5M+ in funding mobilised and 2,600+ startups and ventures reached.',
    offers: 'Co-working · programmes · events',
    href: 'https://lagos.impacthub.net',
  },
  {
    name: 'The Ventures Park',
    city: 'Maitama, Abuja',
    text: 'An enterprise-support organisation in Abuja offering private offices, dedicated and hot desks, event space and virtual offices, with capacity-building programmes for entrepreneurs.',
    offers: 'Co-working · offices · training',
    href: 'https://theventurespark.com',
  },
  {
    name: 'Ilorin Innovation Hub',
    city: 'Ilorin, Kwara',
    text: 'A Kwara State Government initiative delivered with IHS Towers, with incubation, acceleration, technical training in AI, cloud, cybersecurity and data, and shared and private workspace. Its first demo day deployed ₦119 million in non-dilutive funding to 19 startups.',
    offers: 'Incubation · training · co-working',
    href: 'https://iih.ng',
  },
  {
    name: 'Startup Kano',
    city: 'Kano',
    text: 'An open lab and incubation space for entrepreneurship and agribusiness, which incubates and accelerates startups and runs the Women Founders Group and the PitchStar pitch programme. Co-working starts at ₦1,500 a day.',
    offers: 'Incubation · co-working · women founders',
    href: 'https://startupkano.com',
  },
  {
    name: 'CoLab',
    city: 'Kaduna',
    text: 'Founded in 2016 to build a technology ecosystem in northern Nigeria, starting from Kaduna. It runs code schools in software engineering, data science, design and cloud, supports startups, and has co-working at Barnawa and Kaduna Technology City.',
    offers: 'Tech school · co-working · startup support',
  },
  {
    name: 'nHub Nigeria',
    city: 'Jos, Plateau',
    text: 'Founded in 2015, nHub describes itself as the first technology hub in northern Nigeria. It trains software developers through fellowships and supports startups from idea to scale, and is known for the HackJos hackathon.',
    offers: 'Developer training · incubation',
  },
  {
    name: 'Roar Nigeria Hub',
    city: 'Nsukka, Enugu',
    text: 'Launched in 2017 at the University of Nigeria, Nsukka, as a university-embedded technology hub. It supports tech startups, researchers and SMEs, runs the Roar Hub Tech Academy and is an iHatch Cohort 5 hub.',
    offers: 'University incubation · tech academy',
  },
  {
    name: 'RAD5 Tech Hub',
    city: 'Aba, Abia',
    text: 'Founded in 2015, RAD5 trains talent in engineering, data, design and marketing, runs a Startup School for founders and the TeenHack coding programme for young people, and offers co-working. It graduated its 2,500th student in 2024.',
    offers: 'Training · startup school · co-working',
    href: 'https://rad5.com.ng',
  },
  {
    name: 'Edo Innovates',
    city: 'Benin City, Edo',
    text: 'An innovation centre that trains young people in ICT skills and connects them to jobs, with startup incubation, co-working, training halls and ICT labs. Its annual tech conference draws over 5,000 attendees.',
    offers: 'Skills · incubation · co-working',
  },
];

/** Emerging hubs to watch: FutureLabs first, then a few from the emerging guide. */
const EMERGING = [
  { name: 'FutureLabs', place: 'Ikot Ekpene, Akwa Ibom', href: '/innovation-hub-akwa-ibom' },
  { name: 'Start Innovation Hub', place: 'Uyo, Akwa Ibom', href: 'https://starthub.com.ng/' },
  { name: 'AlphaZone Tech Hub', place: 'Abakaliki, Ebonyi' },
  { name: 'O2 Innovations Lab', place: 'Lafia, Nasarawa', href: 'https://www.02innovationslab.com/' },
  { name: 'Midtown Tech Hub', place: 'Benin City, Edo', href: 'https://midtowntechhub.com/' },
  { name: 'Lumilab Innovations Hub', place: 'Katsina', href: 'https://lumilab.ng/' },
];

const FAQ = [
  {
    q: 'What is the best tech hub in Nigeria?',
    a: 'It depends on what you need. CcHUB and Wennovation Hub in Lagos are the longest-running and run the largest programmes; Impact Hub Lagos and The Ventures Park in Abuja are strong for workspace and community; and hubs such as nHub (Jos), CoLab (Kaduna), RAD5 (Aba) and the Ilorin Innovation Hub are the leading options outside Lagos.',
  },
  {
    q: 'Which city in Nigeria has the most tech hubs?',
    a: 'Lagos, with the largest concentration of hubs, investors and startups, followed by Abuja. Strong hubs also operate in Kano, Kaduna, Jos, Enugu, Aba, Benin City, Ilorin and Uyo.',
  },
  {
    q: 'What is an innovation hub?',
    a: 'A place, and usually a community, that helps people turn ideas into businesses: incubation and acceleration programmes, mentorship, training, links to investors and often co-working space. Tech hubs are innovation hubs focused on technology startups and digital skills.',
  },
  {
    q: 'Are there innovation hubs in Uyo and Akwa Ibom?',
    a: 'Yes. FutureLabs in Ikot Ekpene and Start Innovation Hub in Uyo are both part of national programmes; see our guide to the best innovation hubs in Akwa Ibom.',
  },
  {
    q: 'How do I join iHatch or the iDICE Startup Bridge?',
    a: 'Both recruit founders through their official portals: iHatch through NITDA’s Office for Nigerian Digital Innovation (ONDI), and the iDICE Startup Bridge through idicestartupbridge.ng. Both are closed at the time of writing; the iDICE Startup Bridge has a waitlist.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'The top innovation hubs in Nigeria (2026)',
      datePublished: UPDATED,
      dateModified: UPDATED,
      author: { '@type': 'Organization', name: 'FutureLabs Africa', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'FutureLabs Africa', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` } },
      mainEntityOfPage: `${SITE_URL}${PATH}`,
    },
    {
      '@type': 'ItemList',
      name: 'Top innovation hubs in Nigeria',
      itemListElement: HUBS.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: h.name })),
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

export default function TopHubsGuide() {
  return (
    <SiteShell>
      <JsonLd schema={schema} />

      <Section innerClassName="pb-12 pt-20 lg:pb-14 lg:pt-24">
        <div className="fl-eyebrow-accent">Guide · Updated {UPDATED_LABEL}</div>
        <h1 className="fl-h1 mt-[26px] max-w-[20ch]">The top innovation hubs in Nigeria.</h1>
        <p className="fl-lede m-0 mt-7 max-w-[62ch]">
          The established tech and innovation hubs founders, students and investors turn to, from Lagos and Abuja to Kano, Jos, Aba and Ilorin,
          followed by the emerging hubs worth watching.
        </p>
        <p className="m-0 mt-5 max-w-[62ch] font-mono text-[11.5px] leading-[1.6] text-fl-label">
          Written by FutureLabs, an innovation hub in Akwa Ibom. Facts about each hub are taken from its own website or official page.
        </p>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad">
        <div className="fl-eyebrow">Established hubs</div>
        <h2 className="fl-h2-sm m-0 mt-5">{HUBS.length} hubs that shaped Nigeria’s startup scene.</h2>
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {HUBS.map((h, i) => (
            <article key={h.name} id={`hub-${i + 1}`} className="flex scroll-mt-28 flex-col bg-fl-graphite px-6 pb-6 pt-6 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-medium text-fl-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="m-0 text-[18px] font-semibold leading-[1.25] tracking-[-0.02em]">
                  <HubLink href={h.href}>{h.name}</HubLink>
                </h3>
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-fl-label">{h.city}</div>
              <p className="fl-card-text m-0 mt-2.5">{h.text}</p>
              <p className="m-0 mt-auto pt-3 text-[13px] font-medium text-fl-soft">{h.offers}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section innerClassName="fl-pad">
        <div className="fl-eyebrow">Emerging hubs to watch</div>
        <h2 className="fl-h2-sm m-0 mt-5 max-w-[30ch]">The next wave is outside Lagos.</h2>
        <p className="fl-body m-0 mt-6 max-w-[62ch]">
          A newer generation of hubs now delivers the Federal Government’s two main startup programmes, NITDA’s iHatch and the iDICE Startup
          Bridge, in states that had few or none a decade ago. Among them:
        </p>
        <ul className="m-0 mt-8 grid list-none gap-px p-0 sm:grid-cols-2 lg:grid-cols-3">
          {EMERGING.map((h, i) => (
            <li
              key={h.name}
              className={`px-6 py-5 ${i === 0 ? 'bg-fl-graphite shadow-[0_0_0_1px_rgba(245,130,32,.55)]' : 'shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]'}`}
            >
              <div className="text-[17px] font-semibold tracking-[-0.02em]">
                <HubLink href={h.href}>{h.name}</HubLink>
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-fl-label">{h.place}</div>
            </li>
          ))}
        </ul>
        <p className="fl-body m-0 mt-8 max-w-[62ch]">
          See all 25 in our guide to the{' '}
          <Link href="/best-emerging-innovation-hubs-nigeria" className="text-fl-accent hover:text-fl-paper">
            best emerging innovation hubs in Nigeria
          </Link>
          , the hubs selected for both iDICE and iHatch, and our guide to the{' '}
          <Link href="/best-innovation-hubs-akwa-ibom" className="text-fl-accent hover:text-fl-paper">
            best innovation hubs in Akwa Ibom
          </Link>
          .
        </p>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">Programme</div>
          <h2 className="fl-h2-sm m-0 mt-5">iHatch</h2>
          <p className="fl-body m-0 mt-5">
            NITDA’s joint incubation and acceleration programme with JICA, offering training, mentorship, seed funding and ecosystem support
            through one host hub per state. Cohort 5 picked 37 hubs, one for each state and the FCT; hub applications closed in March 2026
            and the list was published in April, as{' '}
            <a href={IHATCH_C5} target="_blank" rel="noopener noreferrer" className="text-fl-accent hover:text-fl-paper">reported by Nigeria Startup News</a>.
          </p>
        </div>
        <div>
          <div className="fl-eyebrow">Programme</div>
          <h2 className="fl-h2-sm m-0 mt-5">iDICE Startup Bridge</h2>
          <p className="fl-body m-0 mt-5">
            A Federal Government initiative implemented by the Bank of Industry, with two 12-week tracks: the Founders Lab, with up to
            ₦10 million in non-equity funding for early founders, and the Growth Lab for startups ready to scale. Both are closed at the
            time of writing, with a waitlist on the{' '}
            <a href={IDICE} target="_blank" rel="noopener noreferrer" className="text-fl-accent hover:text-fl-paper">official site</a>.
          </p>
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
