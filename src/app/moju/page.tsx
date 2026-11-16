import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, NumberCard, SectionHead, Chips, ProofLine, CtaBand } from '@/components/site/primitives';
import { MOJU, MOJU_FEATURES, MOJU_INSTALL, MOJU_STEPS, MOJU_WORKS_WITH } from '@/data/moju';

export const metadata: Metadata = pageMeta({
  title: 'Moju — Turn Your Phone Into a Live Camera',
  description:
    'Moju turns any Android phone into a live camera for OBS, vMix and YouTube. It finds your streaming PC by itself, with no cables, no IP addresses and no watermark. Free, in beta, from FutureLabs Studio.',
  path: '/moju',
  image: '/images/studio/moju.jpg',
});

const facts = [`Beta ${MOJU.version}`, MOJU.size, `Android ${MOJU.minAndroid}+`, 'Free, no account needed'];

export default function MojuPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="FutureLabs Studio · Moju beta"
        title="Your phone is a live camera."
        titleClass="max-w-[13ch]"
        lede="Moju sends smooth, live video from any Android phone to OBS, vMix or YouTube. It finds your streaming PC by itself: no cables, no IP addresses, no watermark."
      >
        <div className="mt-[26px] flex flex-wrap gap-3">
          <a href={MOJU.apk} className="fl-btn px-6 py-4" download="Moju.apk">
            Download for Android
          </a>
          <a href="#how" className="fl-btn-ghost px-6 py-4">
            How it works
          </a>
        </div>
        <ProofLine className="mt-6">
          {facts.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </ProofLine>
      </SplitHero>

      <Section innerClassName="pb-[72px] pt-0">
        {/* The image's edges are Moju's Night colour, so it sits seamlessly on a Night card at any width. */}
        <div className="fl-card overflow-hidden bg-[#0F1020]">
          <img
            src="/images/studio/moju.jpg"
            alt='The Moju logo, an eye with a marigold pupil, above "Your phone is a live camera." and a Beta tag'
            width={1440}
            height={900}
            className="mx-auto block h-auto w-full max-w-[860px]"
          />
        </div>
      </Section>

      <Section id="how" tone="graphite" innerClassName="py-[72px]">
        <SectionHead eyebrow="How it works" title="Open, point, go live." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {MOJU_STEPS.map((step, i) => (
            <NumberCard key={step.title} n={String(i + 1).padStart(2, '0')} title={step.title} text={step.text} minH="min-h-[200px]" />
          ))}
        </div>
        <Chips items={MOJU_WORKS_WITH} className="mt-8" />
      </Section>

      <Section innerClassName="py-[72px]">
        <SectionHead
          eyebrow="Why Moju"
          title="Built for the moments you can't redo."
          aside={
            <p className="fl-card-text m-0 max-w-[44ch]">
              Camera apps lose people to Wi-Fi lag, dropped streams, &quot;phone not found&quot; and watermarks. Moju is built
              around reliability and picture quality first.
            </p>
          }
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOJU_FEATURES.map((f, i) => (
            <NumberCard key={f.title} n={String(i + 1).padStart(2, '0')} tag={f.tag} title={f.title} text={f.text} minH="min-h-[210px]" />
          ))}
        </div>
      </Section>

      <Section id="download" tone="graphite" innerClassName="grid gap-12 py-[72px] lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <SectionHead eyebrow="Download" title="Get Moju on your phone." />
          <p className="fl-card-text mb-0 mt-6 max-w-[52ch] text-[15.5px]">
            On your phone, tap the button. On a computer, scan the code with your phone&apos;s camera.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={MOJU.apk} className="fl-btn px-6 py-4" download="Moju.apk">
              Download Moju for Android
            </a>
          </div>
          <ProofLine className="mt-5">
            {facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </ProofLine>
          <ol className="fl-card-text mb-0 mt-8 max-w-[56ch] list-decimal space-y-2 pl-5 text-[15px]">
            {MOJU_INSTALL.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="fl-card-text mb-0 mt-6 max-w-[56ch] text-[14px]">
            <strong className="text-fl-paper">Moju is in beta.</strong> It works, but we&apos;re still improving it, so test it before you
            rely on it for a live event. Android shows a warning because Moju isn&apos;t on the Play Store yet; it goes away once it is.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 lg:items-end">
          <div className="rounded-[18px] bg-white p-5">
            <img src="/images/moju/download-qr.png" alt="QR code that downloads Moju for Android" width={220} height={220} className="block h-[220px] w-[220px]" />
          </div>
          <span className="font-mono text-[11.5px] text-fl-label">Scan to download</span>
        </div>
      </Section>

      <Section innerClassName="py-[72px]">
        <SectionHead eyebrow="Coming soon" title="More than one angle." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <NumberCard
            n="01"
            tag="Create"
            title="Your pocket studio"
            text="Phones overhead and at the side, your laptop in front. Moju switches between them on your timing and records the finished cut."
          />
          <NumberCard
            n="02"
            tag="Host an event"
            title="Every angle, to everyone"
            text="Guests join as cameras with a link. One phone directs, and family abroad watch live."
          />
        </div>
        <p className="fl-card-text mb-0 mt-8 text-[13px]">NDI® is a registered trademark of Vizrt NDI AB.</p>
      </Section>

      <CtaBand title="Using Moju at your church, event or studio? Tell us what to improve.">
        <Link href="/contact" className="fl-btn-dark px-6 py-4">
          Talk to the Studio
        </Link>
        <Link href="/studio#moju" className="fl-btn-dark px-6 py-4">
          More from FutureLabs Studio
        </Link>
      </CtaBand>
    </SiteShell>
  );
}
