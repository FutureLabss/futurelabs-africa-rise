import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Section, CtaBand } from '@/components/site/primitives';

// Not linked from the homepage or menus on purpose: it is reached from search (it is in the sitemap).
const PATH = '/best-emerging-innovation-hubs-nigeria';
const UPDATED = '2026-11-02';
const UPDATED_LABEL = '2 November 2026';

const IDICE_PARTNERS = 'https://idicestartupbridge.ng/partners/';
const IHATCH_C5 = 'https://www.nigeriastartupact.ng/ihatch-cohort-5-ondi-unveils-selected-innovation-hubs-across-36-states-and-fct/';

export const metadata: Metadata = pageMeta({
  title: 'Best Emerging Innovation Hubs in Nigeria (2026) | FutureLabs',
  description:
    'The emerging innovation hubs selected by both iDICE Startup Bridge and NITDA’s iHatch, the federal programmes that incubate and fund early-stage founders, plus every iHatch state hub.',
  path: PATH,
  type: 'article',
  absoluteTitle: true,
});

type TopHub = { rank: number; name: string; place: string; text: string; programmes: string; href?: string };

/** Selected by both programmes. FutureLabs first; the rest in no particular order. */
const TOP: TopHub[] = [
  {
    rank: 1,
    name: 'FutureLabs',
    place: 'Ikot Ekpene, Akwa Ibom',
    text: 'A technology and economic development institution whose hub incubates founders from problem validation to a product in market and a pitch for capital. It is the iDICE Startup Bridge Host Hub in Ikot Ekpene, incubated founders in iHatch in 2025, and runs FutureLabs Academy and an AI Fellowship from the same building. A founder it incubated won $4,000 in iDICE funding.',
    programmes: 'iDICE Host Hub · iHatch 2025',
    href: '/innovation-hub-akwa-ibom',
  },
  {
    rank: 2,
    name: 'Start Innovation Hub',
    place: 'Uyo, Akwa Ibom',
    text: 'One of the longest-running hubs in Akwa Ibom, founded by Hanson Johnson and incorporated in 2014, with co-working, offices and event space in Uyo alongside its incubation programmes.',
    programmes: 'iDICE hub partner · iHatch Cohort 5 (Akwa Ibom)',
    href: 'https://starthub.com.ng/',
  },
  {
    rank: 3,
    name: 'Softicu Tech Hub',
    place: 'Umuahia, Abia',
    text: 'A digital-skills training and innovation hub serving founders and learners in the South-East.',
    programmes: 'iDICE hub partner · iHatch Cohort 5 (Abia)',
    href: 'https://softicuhub.org/',
  },
  {
    rank: 4,
    name: 'Midtown Tech Hub',
    place: 'Benin City, Edo',
    text: 'An innovation centre in Benin City offering technology services and startup incubation.',
    programmes: 'iDICE hub partner · iHatch Cohort 5 (Edo)',
    href: 'https://midtowntechhub.com/',
  },
  {
    rank: 5,
    name: 'Lumilab Innovations Hub',
    place: 'Katsina, Katsina',
    text: 'A tech hub in Katsina with co-working space and regular community sessions for builders.',
    programmes: 'iDICE hub partner · iHatch Cohort 5 (Katsina)',
    href: 'https://lumilab.ng/',
  },
  {
    rank: 6,
    name: '21st Century Entrepreneurs Hub',
    place: 'Sokoto, Sokoto',
    text: 'A training and co-working hub founded in 2017, picked by the Sokoto State government as a training centre in 2024.',
    programmes: 'iDICE hub partner · iHatch Cohort 5 (Sokoto)',
  },
  {
    rank: 7,
    name: 'Enovate Lab',
    place: 'Kano, Kano',
    text: 'A Kano innovation lab founded in 2018 that trains young people and set up an innovation lab with Bayero University Kano.',
    programmes: 'iDICE hub partner · iHatch Cohort 5 (Kano)',
  },
];

const IDICE_MORE: { name: string; place: string; text: string; href?: string }[] = [
  { name: 'MALhub (Makers and Leaders Hub)', place: 'Ilorin, Kwara', text: 'Tech training, incubation and co-working since 2017, with Women in Tech programmes.', href: 'https://malhub.org/' },
  { name: 'nHub Nigeria', place: 'Jos, Plateau', text: 'Founded in 2015 as one of northern Nigeria’s first tech hubs; incubation and training.' },
  { name: 'SKYHub Nigeria', place: 'Makurdi, Benue', text: 'Digital-skills training and startup incubation since 2018.', href: 'https://skyhubnigeria.com/' },
  { name: 'Wennovation Hub', place: 'Lagos, Ibadan and Abuja', text: 'Incubation and acceleration since 2010, including programmes for women founders.', href: 'https://wennovationhub.org/' },
  { name: 'Blue Sapphire Hub', place: 'Kano, Kano', text: 'ICT and entrepreneurship training since 2014, founded by Maryam Lawan Gwadabe with a focus on women.', href: 'https://bluesapphirehub.com/' },
  { name: 'Co-Development Hub', place: 'Maiduguri, Borno', text: 'A social-innovation hub founded in 2018 that incubates startups and freelancers in the North-East.', href: 'https://codevhub.org/' },
  { name: 'CoLab', place: 'Kaduna, Kaduna', text: 'Kaduna’s first innovation hub and co-working space, opened in 2016.', href: 'https://colab.com.ng/' },
  { name: 'Grazac', place: 'Abeokuta, Ogun', text: 'An Abeokuta innovation hub whose Grazac Academy trains people for tech jobs.', href: 'https://grazac.com.ng/' },
  { name: '8thGear Hub', place: 'Lagos, Lagos', text: 'A venture studio and co-working space that runs entrepreneurship training.' },
  { name: 'FUOYE Innovation Hub', place: 'Oye-Ekiti, Ekiti', text: 'Federal University Oye-Ekiti’s hub for student startups and research commercialisation, opened in 2024.', href: 'https://innovation.fuoye.edu.ng/' },
  { name: 'Technoville', place: 'Bonny, Rivers', text: 'A tech training and software company running a digital literacy initiative for young people in Bonny.' },
  { name: 'NorthDemy', place: 'Dutse, Jigawa', text: 'An assigned hub for the iDICE Founders Lab in Jigawa.' },
];

/** Named on the iDICE partners page, but we could not verify their details. */
const IDICE_NAMES_ONLY = ['GuruHub', 'H-Tech Hub', 'Sparks Ventures Hub', 'Plus Hub', 'Lanetbase', 'Ahlam IT & Network Solution', 'GreyHobb', 'CIATECH'];

/** ONDI's published list of iHatch Cohort 5 hubs, one per state and the FCT. */
const IHATCH: { region: string; hubs: [string, string][] }[] = [
  { region: 'South East', hubs: [['Abia', 'Softicu Tech Hub'], ['Anambra', 'TEKHUB'], ['Ebonyi', 'Mobilegigo Ltd'], ['Enugu', 'Roar Nigeria Hub'], ['Imo', 'Uru Tech Hub / Libertas Alpha Technologies']] },
  { region: 'South South', hubs: [['Akwa Ibom', 'Start Innovation Hub'], ['Bayelsa', 'AGM Techpluse NG'], ['Cross River', 'Lookoos Co-Creative Hub'], ['Delta', 'Digitalabode'], ['Edo', 'Mid Town Tech Hub'], ['Rivers', 'Cole Tech Yard (Ctech)']] },
  { region: 'South West', hubs: [['Ekiti', 'Brainbench Technology Nig Ltd'], ['Lagos', 'Premier Hub Innovation Center'], ['Ogun', 'NEYI Techprenuership Hub'], ['Ondo', 'The Growth Hub'], ['Osun', 'Oroki Innovation Hub Limited'], ['Oyo', 'Ennovate Lab']] },
  { region: 'North Central', hubs: [['Benue', 'Hub 17 Nigeria'], ['FCT', 'Start Studio Innovation Hub (Center for Strategic Enterprise Development)'], ['Kogi', 'Mentor-Box Foundation'], ['Kwara', 'Founders Hub'], ['Nasarawa', 'Digital Nasarawa Innovation Hub'], ['Niger', 'Paritie Innovation Hub'], ['Plateau', 'Axia Hub']] },
  { region: 'North East', hubs: [['Adamawa', 'BCH Hub'], ['Bauchi', 'Startup Bauchi'], ['Borno', 'Innotech Ideation Hub'], ['Gombe', 'Dopal Technologies Ltd'], ['Taraba', 'Gradenet Digital Hub'], ['Yobe', 'Goni Nexus Enterprise Limited']] },
  { region: 'North West', hubs: [['Jigawa', 'Start Up Jigawa'], ['Kaduna', 'Stonetech Square'], ['Kano', 'Enovate Lab'], ['Katsina', 'Lumilab Innovations Hub'], ['Kebbi', 'Startup Kebbi'], ['Sokoto', '21st Century Entrepreneurs Hub'], ['Zamfara', 'Venturelab Innovation Hub']] },
];

const FAQ = [
  {
    q: 'What are the best emerging innovation hubs in Nigeria?',
    a: 'We start with the hubs that two federal programmes chose to deliver early-stage support: the iDICE Startup Bridge and NITDA’s iHatch. Seven hubs have been selected by both: FutureLabs (Ikot Ekpene), Start Innovation Hub (Uyo), Softicu Tech Hub (Umuahia), Midtown Tech Hub (Benin City), Lumilab Innovations Hub (Katsina), 21st Century Entrepreneurs Hub (Sokoto) and Enovate Lab (Kano).',
  },
  {
    q: 'Why do iDICE and iHatch selections matter?',
    a: 'Both programmes choose hubs that can incubate founders locally. iHatch, run by NITDA’s Office for Nigerian Digital Innovation with JICA, incubates idea-stage and MVP-stage startups. The iDICE Startup Bridge, implemented by the Bank of Industry, runs Founders Lab, where founders who hit milestones unlock grants of up to ₦10 million, and Growth Lab for startups ready to scale. A hub trusted by both can support a founder from the first idea through to funding and growth.',
  },
  {
    q: 'What is the iHatch hub for my state?',
    a: 'For iHatch Cohort 5, ONDI selected one hub in each of the 36 states and the FCT. The full list is on this page, by region.',
  },
  {
    q: 'How do I join one of these programmes?',
    a: 'Both open calls for founders through their official portals: iHatch through ONDI and the iDICE Startup Bridge through its own site. Your state’s hub is usually the first point of contact. Check the official pages for current deadlines.',
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
      itemListElement: TOP.map((h) => ({
        '@type': 'ListItem',
        position: h.rank,
        name: h.name,
        ...(h.href ? { url: h.href.startsWith('http') ? h.href : `${SITE_URL}${h.href}` } : {}),
      })),
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

      <Section innerClassName="pb-14 pt-20 lg:pb-16 lg:pt-24">
        <div className="fl-eyebrow-accent">Guide · Updated {UPDATED_LABEL}</div>
        <h1 className="fl-h1 mt-[26px] max-w-[20ch]">The best emerging innovation hubs in Nigeria.</h1>
        <p className="fl-lede m-0 mt-7 max-w-[62ch]">
          Nigeria’s best-known hubs are in Lagos and Abuja. The ones growing fastest are spread across the states, and two federal
          programmes have done the hard work of finding them. This guide starts with the hubs chosen by both.
        </p>
        <p className="m-0 mt-5 max-w-[62ch] font-mono text-[11.5px] leading-[1.6] text-fl-label">
          Written by FutureLabs, which is on this list. Selections come from the programmes’ own published lists; hub details come from
          each hub’s website or reputable press. Hubs change, so check before you visit.
        </p>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-2">
        <div>
          <div className="fl-eyebrow">How we chose</div>
          <h2 className="fl-h2-sm m-0 mt-5">Two federal programmes, one test: who do they trust to incubate founders?</h2>
        </div>
        <div className="flex flex-col gap-5">
          <p className="fl-body m-0">
            <strong className="font-semibold text-fl-paper">iDICE Startup Bridge.</strong> A Federal Government programme implemented by
            the Bank of Industry and financed by the AfDB, AFD and IsDB. Its Founders Lab incubates idea-stage founders from all 36 states
            and the FCT through partner hubs, and founders who hit milestones unlock grants of up to ₦10 million. Its Growth Lab
            accelerates startups ready to scale. We used the{' '}
            <a href={IDICE_PARTNERS} target="_blank" rel="noopener noreferrer" className="text-fl-accent hover:text-fl-paper">official hub partner list</a>.
          </p>
          <p className="fl-body m-0">
            <strong className="font-semibold text-fl-paper">iHatch.</strong> NITDA’s startup incubation programme, run by its Office for
            Nigerian Digital Innovation (ONDI) with JICA, for idea-stage and MVP-stage founders. For Cohort 5, ONDI selected one hub per state
            and the FCT. We used{' '}
            <a href={IHATCH_C5} target="_blank" rel="noopener noreferrer" className="text-fl-accent hover:text-fl-paper">ONDI’s published list</a>.
          </p>
          <p className="fl-body m-0">
            <strong className="font-semibold text-fl-paper">Why both matters.</strong> Going through both programmes puts a hub in pole
            position to help early-stage startups scale. iHatch takes founders from an idea to a working product; iDICE takes them on to
            milestone grants and acceleration. A hub that delivers both can support the same founder all the way, and has been checked
            twice by programmes that only fund hubs able to deliver.
          </p>
        </div>
      </Section>

      <Section innerClassName="fl-pad">
        <div className="fl-eyebrow">Selected by both</div>
        <h2 className="fl-h2-sm m-0 mt-5 max-w-[26ch]">Seven hubs chosen by iDICE and iHatch.</h2>
        <div className="mt-10 flex flex-col gap-px">
          {TOP.map((h) => (
            <article
              key={h.rank}
              id={`hub-${h.rank}`}
              className="grid scroll-mt-28 gap-6 bg-fl-graphite px-6 pb-8 pt-7 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)] sm:px-9 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]"
            >
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] font-medium text-fl-accent">{String(h.rank).padStart(2, '0')}</span>
                  <h3 className="m-0 text-[26px] font-semibold leading-[1.1] tracking-[-0.03em]">
                    <HubLink href={h.href}>{h.name}</HubLink>
                  </h3>
                </div>
                <div className="mt-2.5 font-mono text-[11.5px] uppercase tracking-[.12em] text-fl-label">{h.place}</div>
                <p className="fl-body m-0 mt-4">{h.text}</p>
                {h.rank === 1 && (
                  <Link href="/innovation-hub-akwa-ibom" className="fl-btn mt-6">Visit the FutureLabs hub</Link>
                )}
              </div>
              <div className="border-t border-fl-paper/[.14] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
                <div className="fl-label">Selected by</div>
                <p className="m-0 mt-2 text-[15.5px] font-medium leading-[1.5]">{h.programmes}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad">
        <div className="fl-eyebrow">iDICE hub partners</div>
        <h2 className="fl-h2-sm m-0 mt-5 max-w-[28ch]">More emerging hubs delivering the iDICE Startup Bridge.</h2>
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {IDICE_MORE.map((h) => (
            <div key={h.name} className="bg-fl-graphite px-6 pb-7 pt-6 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.02em]">
                <HubLink href={h.href}>{h.name}</HubLink>
              </h3>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-fl-label">{h.place}</div>
              <p className="fl-card-text m-0 mt-3">{h.text}</p>
            </div>
          ))}
        </div>
        <p className="fl-body m-0 mt-8 max-w-[70ch]">
          The iDICE partner list also names {IDICE_NAMES_ONLY.join(', ')}, among others. We could not verify their details, so check with the
          programme before you reach out.
        </p>
      </Section>

      <Section innerClassName="fl-pad">
        <div className="fl-eyebrow">iHatch Cohort 5</div>
        <h2 className="fl-h2-sm m-0 mt-5 max-w-[26ch]">The iHatch hub for every state.</h2>
        <p className="fl-body m-0 mt-5 max-w-[62ch]">
          ONDI selected one hub in each state and the FCT to run iHatch Cohort 5. Founders in that state start there.
        </p>
        <div className="mt-10 grid gap-px md:grid-cols-2 lg:grid-cols-3">
          {IHATCH.map((r) => (
            <div key={r.region} className="bg-fl-graphite px-6 pb-6 pt-6 shadow-[0_0_0_1px_rgb(var(--fl-paper)/.14)]">
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.02em]">{r.region}</h3>
              <dl className="m-0 mt-4 flex flex-col gap-2.5">
                {r.hubs.map(([state, hub]) => (
                  <div key={state} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 text-[14.5px] leading-[1.45]">
                    <dt className="font-mono text-[11px] uppercase leading-[1.9] tracking-[.1em] text-fl-label">{state}</dt>
                    <dd className="m-0 text-fl-body">{hub}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="m-0 mt-6 max-w-[70ch] font-mono text-[11.5px] leading-[1.6] text-fl-label">
          “Ennovate Lab” (Oyo) and “Enovate Lab” (Kano) are different organisations. In Akwa Ibom, see also our{' '}
          <Link href="/best-innovation-hubs-akwa-ibom" className="text-fl-accent hover:text-fl-paper">guide to the best innovation hubs in Akwa Ibom</Link>.
        </p>
      </Section>

      <Section tone="graphite" innerClassName="fl-pad grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <div className="fl-eyebrow">FAQ</div>
          <h2 className="fl-h2-sm m-0 mt-5">Emerging innovation hubs in Nigeria: common questions.</h2>
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

      <CtaBand title="Building a startup? Start at a hub that can take you all the way.">
        <Link href="/innovation-hub-akwa-ibom" className="fl-btn-dark">See the FutureLabs hub</Link>
        <Link href="/contact" className="fl-btn-dark">Get in touch</Link>
      </CtaBand>
    </SiteShell>
  );
}
