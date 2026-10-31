import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Section, CtaBand } from '@/components/site/primitives';
import { HUB } from '@/components/site/nav';

// Not linked from the homepage or menus on purpose: it is reached from search (it is in the sitemap).
const PATH = '/best-innovation-hubs-akwa-ibom';
const UPDATED = '2026-10-31';
const UPDATED_LABEL = '31 October 2026';

export const metadata: Metadata = pageMeta({
  title: 'Best Innovation Hubs in Akwa Ibom (2026 Guide) | FutureLabs',
  description:
    'A guide to the best innovation and tech hubs in Akwa Ibom: FutureLabs in Ikot Ekpene, Start Innovation Hub and RootHub in Uyo, KodeHauz in Eket, and where else to plug into the ecosystem.',
  path: PATH,
  type: 'article',
  absoluteTitle: true,
});

type Hub = {
  rank: number;
  name: string;
  place: string;
  bestFor: string;
  body: React.ReactNode;
  facts: string[];
  link?: { label: string; href: string };
};

const HUBS: Hub[] = [
  {
    rank: 1,
    name: 'FutureLabs',
    place: `${HUB.street}, ${HUB.locality}`,
    bestFor: 'Founders who want incubation through to funding, and young people training for digital work',
    body: (
      <>
        FutureLabs is a technology and economic development institution, and its hub in Ikot Ekpene is where national incubation
        programmes reach founders in Akwa Ibom. It is the iDICE Startup Bridge Host Hub for the area and was one of 37 hubs across
        Nigeria chosen to incubate founders in the 2025 iHatch cohort run by ONDI and NITDA with JICA. The same building hosts
        FutureLabs Academy&apos;s digital skills training and a biweekly, in-person AI Fellowship. Results so far include $4,000 in
        iDICE funding for Bucx Technologies, a payments startup incubated at the hub, and 107 young people enrolled in Project
        Genesis with PIND against a brief of 80.
      </>
    ),
    facts: [
      '45+ startups incubated, 1,250+ youths trained, 35+ partners',
      'Uninterrupted power (12kVA inverter) and Starlink internet',
      'Programmes: iDICE, iHatch, FutureLabs Academy, AI Fellowship',
    ],
    link: { label: 'Visit the FutureLabs hub', href: '/innovation-hub-akwa-ibom' },
  },
  {
    rank: 2,
    name: 'Start Innovation Hub',
    place: 'Plot 6, Unit C, Ewet Housing Estate, Uyo',
    bestFor: 'Flexible co-working, private offices and event space in Uyo',
    body: (
      <>
        One of the longest-running hubs in the state. Start Innovation Hub was founded by Hanson Johnson to create opportunities for
        talent in Uyo and was incorporated in May 2014. The Ibom Innovation Network credits it with training over 1,000 software
        developers. Today it runs open workspace, executive offices, two 20-seat boardrooms and a 100-seat conference hall, plus
        programmes such as Starthub Women and kids&apos; bootcamps.
      </>
    ),
    facts: ['Founded 2014', 'Open workspace from ₦4,000 a day (October 2026 price list)', 'Co-working, offices, boardrooms, conference hall'],
    link: { label: 'starthub.com.ng', href: 'https://starthub.com.ng/workspace/' },
  },
  {
    rank: 3,
    name: 'RootHub',
    place: 'Uyo',
    bestFor: 'Connecting with one of the pioneers of the Uyo tech scene',
    body: (
      <>
        Founded in 2014 by twin brothers Tony and Francis Onuk, RootHub is one of the first tech hubs in Uyo and helped start the
        city&apos;s tech community at a time when entrepreneurs struggled even to find office space.
      </>
    ),
    facts: ['Founded 2014', 'One of the first hubs in Uyo', 'Confirm the current address before you visit'],
  },
  {
    rank: 4,
    name: 'KodeHauz',
    place: 'Eket',
    bestFor: 'Free, self-paced tech training through KodeCamp',
    body: (
      <>
        KodeHauz Solutions Planet is a tech company and hub in Eket founded by Aniebiet Udoh. It is best known for KodeCamp, a free
        virtual programme launched in 2021 that takes learners from beginner to advanced level in a range of tech tracks and has
        been reported to reach over 13,000 participants across several countries.
      </>
    ),
    facts: ['Based in Eket', 'KodeCamp: free, virtual, launched 2021', 'Good option outside Uyo'],
  },
];

const OTHERS = ['LAskill', 'The Bunker', 'Africinnovate', 'Fhenix', 'DevXRlabs', 'BB Edutech Innovation Hub', 'Build-a-Tech Incubator & Workspace'];

const FAQ = [
  {
    q: 'What is the best innovation hub in Akwa Ibom?',
    a: 'It depends on what you need. For incubation that takes founders from an idea to funding, and for in-person digital skills and AI training, FutureLabs in Ikot Ekpene is our pick: it delivers national programmes such as iDICE and iHatch. For flexible co-working and offices in Uyo, Start Innovation Hub is the most established option.',
  },
  {
    q: 'Where are the tech hubs in Uyo?',
    a: 'Uyo has the highest concentration of hubs in the state, including Start Innovation Hub at Ewet Housing Estate and RootHub, alongside smaller spaces such as LAskill and The Bunker.',
  },
  {
    q: 'Are there innovation hubs in Akwa Ibom outside Uyo?',
    a: `Yes. FutureLabs runs its hub at ${HUB.street}, ${HUB.locality}, and KodeHauz is based in Eket.`,
  },
  {
    q: 'Can I get free startup incubation in Akwa Ibom?',
    a: 'Yes, through national programmes delivered by local hubs. iHatch, run by ONDI and NITDA with JICA, offers free incubation to selected idea-stage and MVP-stage founders, and FutureLabs incubated founders in its 2025 cohort. Contact FutureLabs to hear which programmes are open now.',
  },
  {
    q: 'How do I connect with the wider Akwa Ibom tech community?',
    a: 'Join the Ibom Innovation Network, a community of tech practitioners and innovators in the state, and attend Akwa Ibom Tech Week, held each year in Uyo.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'The best innovation hubs in Akwa Ibom (2026 guide)',
      datePublished: UPDATED,
      dateModified: UPDATED,
      author: { '@type': 'Organization', name: 'FutureLabs Africa', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'FutureLabs Africa', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` } },
      mainEntityOfPage: `${SITE_URL}${PATH}`,
    },
    {
      '@type': 'ItemList',
      name: 'Best innovation hubs in Akwa Ibom',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: HUBS.map((h) => ({
        '@type': 'ListItem',
        position: h.rank,
        name: h.name,
        ...(h.link && { url: h.link.href.startsWith('http') ? h.link.href : `${SITE_URL}${h.link.href}` }),
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
};

export default function BestHubsGuide() {
  return (
    <SiteShell>
      <JsonLd schema={schema} />

      <Section innerClassName="pb-14 pt-20 lg:pb-16 lg:pt-24">
        <div className="fl-eyebrow-accent">Guide · Updated {UPDATED_LABEL}</div>
        <h1 className="fl-h1 mt-[26px] max-w-[18ch]">The best innovation hubs in Akwa Ibom.</h1>
        <p className="fl-lede m-0 mt-7 max-w-[60ch]">
          Akwa Ibom&apos;s tech ecosystem has grown from a couple of hubs in 2014 to a network spread across Uyo, Ikot Ekpene and Eket.
          Here are the hubs worth knowing, what each is best for, and how to choose between them.
        </p>
        <p className="m-0 mt-5 max-w-[60ch] font-mono text-[11.5px] leading-[1.6] text-fl-label">
          Written by FutureLabs, which is on this list. Details on other hubs come from their own websites and the Ibom Innovation
          Network; hubs change, so confirm before you visit.
        </p>
        <nav aria-label="Hubs in this guide" className="mt-9">
          <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
            {HUBS.map((h) => (
              <li key={h.rank}>
                <a href={`#hub-${h.rank}`} className="fl-chip hover:text-fl-paper">
                  {h.rank}. {h.name}
                </a>
              </li>
            ))}
            <li>
              <a href="#more" className="fl-chip hover:text-fl-paper">More hubs</a>
            </li>
          </ol>
        </nav>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad">
        <div className="flex flex-col gap-px">
          {HUBS.map((h) => (
            <article
              key={h.rank}
              id={`hub-${h.rank}`}
              className="grid scroll-mt-28 gap-8 bg-fl-graphite px-6 pb-9 pt-8 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)] sm:px-9 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
            >
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] font-medium text-fl-accent">{String(h.rank).padStart(2, '0')}</span>
                  <h2 className="m-0 text-[30px] font-semibold leading-[1.1] tracking-[-0.03em]">{h.name}</h2>
                </div>
                <div className="mt-3 font-mono text-[11.5px] uppercase tracking-[.12em] text-fl-label">{h.place}</div>
                <p className="fl-body m-0 mt-5">{h.body}</p>
                {h.link && (
                  <a
                    href={h.link.href}
                    {...(h.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={h.rank === 1 ? 'fl-btn mt-7' : 'fl-link mt-6 inline-block'}
                  >
                    {h.link.label}{h.rank === 1 ? '' : ' →'}
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-4 border-t border-fl-paper/[.14] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
                <div>
                  <div className="fl-label">Best for</div>
                  <p className="m-0 mt-2 text-[16px] font-medium leading-[1.45] tracking-[-0.01em]">{h.bestFor}</p>
                </div>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {h.facts.map((f) => (
                    <li key={f} className="fl-card-text">— {f}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div id="more" className="mt-14 scroll-mt-28">
          <h2 className="fl-h2-sm m-0">More hubs and spaces in Akwa Ibom.</h2>
          <p className="fl-body m-0 mt-5 max-w-[62ch]">
            The Ibom Innovation Network also lists these hubs and co-working spaces, most of them in Uyo. They are smaller or newer, so
            check what each offers today before you commit.
          </p>
          <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
            {OTHERS.map((o) => (
              <li key={o} className="fl-chip">{o}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">How to choose</div>
          <h2 className="fl-h2-sm m-0 mt-5">Start with what you are trying to do.</h2>
        </div>
        <dl className="m-0">
          {[
            ['You have a startup idea or an early product', 'Look for a hub that delivers incubation programmes, not just desks. Programmes like iDICE and iHatch come with mentorship, structure and a route to funding.'],
            ['You want to learn tech skills', 'In-person training at a hub with reliable power and internet beats studying alone at home. Free virtual options such as KodeCamp work if you can study independently.'],
            ['You need a desk or an office', 'Compare day, week and month rates, power backup and internet, and how far the hub is from where you live: transport cost adds up.'],
            ['You run a programme or represent an organisation', 'Choose a delivery partner with a track record of running programmes and reporting results, and a space your participants can actually reach.'],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-fl-paper/[.14] py-6 last:border-b">
              <dt className="text-[18px] font-semibold tracking-[-0.02em]">{t}</dt>
              <dd className="fl-card-text m-0 mt-2.5 text-[15.5px]">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">The wider ecosystem</div>
          <h2 className="fl-h2-sm m-0 mt-5">Where Akwa Ibom&apos;s tech community meets.</h2>
        </div>
        <div className="flex flex-col gap-5">
          <p className="fl-body m-0">
            <strong className="font-semibold text-fl-paper">Ibom Innovation Network</strong> is a community of innovators and tech
            practitioners in the state, focused on entrepreneurship, capacity building and policy advocacy.
          </p>
          <p className="fl-body m-0">
            <strong className="font-semibold text-fl-paper">Akwa Ibom Tech Week</strong> is the state&apos;s main annual tech event,
            held in Uyo, and the best single place to meet founders, hubs and investors.
          </p>
          <p className="fl-body m-0">
            <strong className="font-semibold text-fl-paper">University of Uyo innovation hub.</strong> UNDP, with federal and state
            partners, has announced a University Innovation Hub (UNIPOD) at the University of Uyo.
          </p>
        </div>
      </Section>

      <Section innerClassName="fl-pad grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <div className="fl-eyebrow">FAQ</div>
          <h2 className="fl-h2-sm m-0 mt-5">Innovation hubs in Akwa Ibom: common questions.</h2>
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

      <CtaBand title="Building in Akwa Ibom? Start at FutureLabs.">
        <Link href="/innovation-hub-akwa-ibom" className="fl-btn-dark">See the hub</Link>
        <Link href="/contact" className="fl-btn-dark">Get in touch</Link>
      </CtaBand>
    </SiteShell>
  );
}
