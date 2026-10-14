import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section } from '@/components/site/primitives';
import { CONTACT } from '@/components/site/nav';

// Keep this page in step with what the site actually collects. When a form,
// table or third-party service changes, update the matching section and the date.
const UPDATED = '12 October 2026';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How FutureLabs Africa collects, uses, shares and protects personal data on futurelabs.africa, and how to exercise your rights under the Nigeria Data Protection Act 2023.',
  path: '/privacy',
});

const COLLECTED: { activity: string; data: string; purpose: string }[] = [
  {
    activity: 'Contact form and "Get involved" requests',
    data: 'Name, email, phone (optional), organisation, and what you tell us about your goals, budget and timeline.',
    purpose: 'To reply to you and discuss working together.',
  },
  {
    activity: 'Newsletter and "notify me" sign-ups',
    data: 'Email address, and a role if you choose one.',
    purpose: 'To send you the updates you asked for.',
  },
  {
    activity: 'Event registration',
    data: 'Full name, email and phone number. Your IP address is used briefly to limit repeated sign-ups.',
    purpose: 'To manage your place, send event details and check you in.',
  },
  {
    activity: 'Tutor applications',
    data: 'Contact details, location, LinkedIn profile, qualifications, experience, employer, availability, rate expectations, a reference, and the CV and portfolio files you upload.',
    purpose: 'To assess your application and contact you about teaching with us.',
  },
  {
    activity: 'Programme registrations and submissions (such as VibeCode and the AI Fellowship)',
    data: 'Name, email, phone, location, skill level and goals, or the project details you submit.',
    purpose: 'To run the programme and review submissions.',
  },
  {
    activity: 'Free product downloads on the Studio page',
    data: 'Email (required), name and organisation or website (optional), the product and version, and whether you asked for product updates.',
    purpose: 'To understand who uses our products, contact you about your download, and send product updates only if you opted in.',
  },
  {
    activity: 'Research briefing downloads on the Research page',
    data: 'Email address, which briefing you asked for, and when you agreed to receive it. Your IP address is used briefly to limit repeated sign-ups.',
    purpose: 'To email you the download link and send research updates you agreed to. Every email has an unsubscribe link.',
  },
];

const PROCESSORS: { name: string; role: string }[] = [
  { name: 'Supabase', role: 'stores form submissions, event registrations, download records and uploaded files, and runs our server functions.' },
  { name: 'Netlify', role: 'hosts the website and keeps standard server logs, which include IP addresses.' },
  { name: 'Cloudflare', role: 'protects and speeds up the website, and processes IP addresses to do so.' },
  { name: 'Resend', role: 'sends our emails (licence keys, research briefings) and keeps the research mailing list.' },
  { name: 'FormSubmit (formsubmit.co)', role: 'delivers contact, newsletter, "get involved" and application details to our team inbox by email.' },
  {
    name: 'Gravatar (Automattic)',
    role: 'shows profile pictures on event pages. To find a picture, your browser sends Gravatar a scrambled (hashed) form of the email address of people registered for that event. The event page also shows registrants’ initials.',
  },
  {
    name: 'WordPress Playground (WordPress.org)',
    role: 'runs the live theme preview on our Studio pages, inside your browser, when you open it.',
  },
];

const RIGHTS = [
  'Find out whether we hold personal data about you and get a copy of it.',
  'Ask us to correct data that is wrong or incomplete.',
  'Ask us to delete your data, or to stop or limit how we use it.',
  'Object to us using your data, including for marketing.',
  'Receive your data in a common electronic format, or have it sent to another organisation.',
  'Withdraw your consent at any time, without affecting what we did before.',
  'Complain to the Nigeria Data Protection Commission (ndpc.gov.ng) if you think we have not handled your data properly.',
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="m-0 mt-14 scroll-mt-28 text-[24px] font-semibold leading-[1.15] tracking-[-0.03em] first:mt-0 lg:text-[28px]">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mt-4 max-w-[70ch] text-[16px] leading-[1.7] text-fl-soft">{children}</p>;
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="m-0 mt-4 max-w-[70ch] list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-fl-soft marker:text-fl-orange">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const SECTIONS = [
  ['who-we-are', 'Who we are'],
  ['what-we-collect', 'What we collect and why'],
  ['legal-basis', 'Our legal basis'],
  ['sharing', 'Who we share data with'],
  ['transfers', 'Data stored outside Nigeria'],
  ['retention', 'How long we keep data'],
  ['browser-storage', 'Cookies and browser storage'],
  ['your-rights', 'Your rights'],
  ['security', 'Security'],
  ['children', 'Children'],
  ['changes', 'Changes to this policy'],
  ['contact', 'Contact us'],
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      <Section innerClassName="pb-10 pt-20 lg:pt-24">
        <div className="fl-eyebrow-accent">Legal</div>
        <h1 className="fl-h1 mt-[26px] max-w-[14ch]">Privacy Policy</h1>
        <p className="fl-lede m-0 mt-[26px] max-w-[60ch]">
          How FutureLabs Africa collects, uses and protects personal data when you use futurelabs.africa, and what you can
          ask us to do with it.
        </p>
        <p className="m-0 mt-5 font-mono text-[12px] uppercase tracking-[.14em] text-fl-label">Last updated {UPDATED}</p>
      </Section>

      <Section innerClassName="grid gap-12 pb-24 pt-12 lg:grid-cols-[220px_1fr] lg:gap-16 lg:pt-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 m-0 list-none space-y-2.5 p-0 text-[13.5px]">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-fl-muted hover:text-fl-paper">{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article>
          <H2 id="who-we-are">Who we are</H2>
          <P>
            FutureLabs Africa (&ldquo;FutureLabs&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a technology and economic development
            institution based in {CONTACT.location}. We are responsible for the personal data collected through this website.
            You can reach us about privacy at{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-fl-orange hover:text-fl-paper">{CONTACT.email}</a>.
          </P>
          <P>
            This policy covers futurelabs.africa. Other FutureLabs websites and products, such as FutureLabs LMS, may have their
            own notices.
          </P>

          <H2 id="what-we-collect">What we collect and why</H2>
          <P>We only collect what you give us through a form, plus basic technical data needed to run the website.</P>
          <div className="mt-6 max-w-[880px] divide-y divide-fl-paper/[.12] border-y border-fl-paper/[.12]">
            {COLLECTED.map((row) => (
              <div key={row.activity} className="grid gap-2 py-5 md:grid-cols-[1fr_1.4fr] md:gap-8">
                <div className="text-[16px] font-medium text-fl-paper">{row.activity}</div>
                <div className="text-[15px] leading-[1.65] text-fl-soft">
                  <p className="m-0"><span className="text-fl-label">Data:</span> {row.data}</p>
                  <p className="m-0 mt-1.5"><span className="text-fl-label">Why:</span> {row.purpose}</p>
                </div>
              </div>
            ))}
          </div>
          <P>
            <strong className="font-medium text-fl-paper">Technical data.</strong> When you visit, our hosting and security
            providers process your IP address, browser type and the pages you request, so the site can load and stay protected.
            We do not use analytics, advertising or tracking tools on this website.
          </P>

          <H2 id="legal-basis">Our legal basis</H2>
          <P>Under the Nigeria Data Protection Act 2023, we rely on:</P>
          <List
            items={[
              <><strong className="font-medium text-fl-paper">Consent</strong>, for newsletters, product updates and anything else you opt into. You can withdraw it at any time.</>,
              <><strong className="font-medium text-fl-paper">Taking steps at your request</strong>, to handle a registration, application or enquiry you send us.</>,
              <><strong className="font-medium text-fl-paper">Legitimate interests</strong>, to understand who uses our free products, keep the website secure and prevent abuse, where this does not override your rights.</>,
              <><strong className="font-medium text-fl-paper">Legal obligations</strong>, where the law requires us to keep or share data.</>,
            ]}
          />

          <H2 id="sharing">Who we share data with</H2>
          <P>
            We do not sell personal data. We share it only with service providers that help us run this website, under their own
            security and data protection commitments:
          </P>
          <List
            items={PROCESSORS.map((p) => (
              <><strong className="font-medium text-fl-paper">{p.name}</strong> {p.role}</>
            ))}
          />
          <P>We will also disclose data if the law requires it.</P>

          <H2 id="transfers">Data stored outside Nigeria</H2>
          <P>
            Some of our service providers store or process data outside Nigeria, including in the European Union and the United
            States. We use providers that protect data to a standard the Nigeria Data Protection Act accepts, for example through
            contractual safeguards.
          </P>

          <H2 id="retention">How long we keep data</H2>
          <List
            items={[
              'Enquiries and contact messages: for as long as needed to answer you and follow up, then up to 2 years.',
              'Event registrations: up to 2 years after the event.',
              'Tutor applications and programme submissions: up to 2 years after the decision, unless you join us, when they become part of your working records.',
              'Download records: up to 3 years after your last download.',
              'Newsletter and product-update subscriptions: until you unsubscribe or ask us to remove you.',
            ]}
          />
          <P>We delete or anonymise data when it is no longer needed, or sooner if you ask and the law allows it.</P>

          <H2 id="browser-storage">Cookies and browser storage</H2>
          <P>
            This website does not set advertising or tracking cookies. It stores a few things in your own browser so the site
            works the way you expect:
          </P>
          <List
            items={[
              <><strong className="font-medium text-fl-paper">Theme preference</strong>: whether you chose light or dark mode.</>,
              <><strong className="font-medium text-fl-paper">Download details</strong>: after you download a free product, your email, name and organisation are kept in your browser so you don&apos;t have to fill in the form again. Clearing your browser&apos;s site data removes them.</>,
              <><strong className="font-medium text-fl-paper">Form drafts</strong>: some longer forms save your progress in your browser until you submit.</>,
              <><strong className="font-medium text-fl-paper">Dismissed pop-ups</strong>: so a message you closed doesn&apos;t appear again in the same visit.</>,
              <><strong className="font-medium text-fl-paper">Sign-in</strong>: only for FutureLabs staff using the admin area.</>,
            ]}
          />
          <P>
            The live theme preview runs on playground.wordpress.net, which may use its own browser storage while you use it.
          </P>

          <H2 id="your-rights">Your rights</H2>
          <P>You can ask us to:</P>
          <List items={RIGHTS} />
          <P>
            To make a request, email{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-fl-orange hover:text-fl-paper">{CONTACT.email}</a> from the address
            you used with us. We may ask you to confirm who you are, and we will respond within 30 days. You can unsubscribe from
            our emails at any time by replying to one of them or contacting us.
          </P>

          <H2 id="security">Security</H2>
          <P>
            We use encrypted connections (HTTPS), restrict access to personal data to the staff who need it, and keep uploaded
            files in private storage. No system is perfectly secure; if a breach affects your data, we will tell you and the
            Nigeria Data Protection Commission as the law requires.
          </P>

          <H2 id="children">Children</H2>
          <P>
            This website is not aimed at children under 18. If you believe a child has given us personal data, contact us and we
            will delete it.
          </P>

          <H2 id="changes">Changes to this policy</H2>
          <P>
            We will update this page when the way we handle data changes and change the date at the top. If a change affects you
            significantly, we will tell you by email where we can.
          </P>

          <H2 id="contact">Contact us</H2>
          <P>
            FutureLabs Africa, {CONTACT.location}
            <br />
            Email: <a href={`mailto:${CONTACT.email}`} className="text-fl-orange hover:text-fl-paper">{CONTACT.email}</a>
            <br />
            Phone: <a href={CONTACT.phoneHref} className="text-fl-orange hover:text-fl-paper">{CONTACT.phone}</a>
          </P>
          <P>
            Prefer a form? Use our <Link href="/contact" className="text-fl-orange hover:text-fl-paper">contact page</Link>.
          </P>
        </article>
      </Section>
    </SiteShell>
  );
}
