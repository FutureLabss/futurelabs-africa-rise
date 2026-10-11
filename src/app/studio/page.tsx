import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, NumberCard, ImageCard, SectionHead, Chips, ProofLine, SmartLink } from '@/components/site/primitives';
import { PRODUCTS, type Product } from '@/data/products';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Studio — AI Systems, Digital Products and Free WordPress Tools',
  description:
    'FutureLabs Studio builds AI applications, web platforms, internal tools, automation and data systems, and publishes free tools: the NewsTheme WordPress theme and the FutureLabs AI SEO plugin.',
  path: '/studio',
});

const CAPABILITIES = [
  ['AI applications', 'Models and agents built into real workflows, not demos.'],
  ['Web platforms', 'Public and internal platforms built to run in production.'],
  ['Internal tools', 'Operational software for teams that currently work in spreadsheets.'],
  ['Automation', 'Manual process removed where it costs the most time.'],
  ['Data systems', 'Pipelines and reporting that make decisions measurable.'],
  ['Digital products', 'New products taken from concept to launch.'],
];

function ProductBlock({ product, index }: { product: Product; index: number }) {
  const n = String(index + 1).padStart(2, '0');
  const fileName = product.download.split('/').pop();
  return (
    <article id={product.id} className="fl-card grid scroll-mt-28 lg:grid-cols-2" aria-labelledby={`${product.id}-name`}>
      <div className={index % 2 ? 'lg:order-2' : undefined}>
        <img
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          loading="lazy"
          decoding="async"
          className={`block h-full max-h-[460px] w-full object-cover ${product.image.focus ?? 'object-top'}`}
        />
      </div>
      <div className="flex flex-col gap-4 px-[26px] pb-[30px] pt-[30px] lg:px-10 lg:py-10">
        <div className="flex items-baseline justify-between gap-3">
          <span className="fl-num">{n}</span>
          <span className="fl-tag">Free · {product.kind}</span>
        </div>
        <h3 id={`${product.id}-name`} className="text-[30px] font-semibold leading-[1.08] tracking-[-0.03em]">
          {product.name}
        </h3>
        <p className="fl-card-text m-0 max-w-[52ch] text-[15.5px]">{product.summary}</p>
        <Chips items={product.features} />
        <ProofLine className="mt-1">
          <span>Version {product.version}</span>
          <span>{product.size}</span>
          <span>{product.requires}</span>
          <span>GPL licence</span>
        </ProofLine>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={product.download}
            download={fileName}
            className="fl-btn"
            aria-label={`Download ${product.name} ${product.version} (zip, ${product.size})`}
          >
            Download free
          </a>
          {product.live && (
            <SmartLink href={product.live.href} className="fl-btn-ghost">
              {product.live.label}
            </SmartLink>
          )}
        </div>
        <details className="group mt-1 text-[14px] leading-[1.6] text-fl-muted">
          <summary className="fl-link cursor-pointer list-none py-1 [&::-webkit-details-marker]:hidden">
            How to install <span className="inline-block transition-transform group-open:rotate-90">→</span>
          </summary>
          <ol className="mb-0 mt-3 list-decimal space-y-2 pl-5">
            {product.install.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      </div>
    </article>
  );
}

export default function StudioPage() {
  return (
    <SiteShell>
      <SplitHero
        eyebrow="FutureLabs Studio"
        title="Technology built for real problems."
        titleClass="max-w-[14ch]"
        lede="FutureLabs Studio builds AI systems, software and digital products for organizations, institutions and emerging ventures. Some of what we build for ourselves we give away: our WordPress theme and SEO plugin are free to download."
      >
        <div className="mt-[26px] flex flex-wrap gap-3">
          <Link href="/contact" className="fl-btn px-6 py-4">Build with us</Link>
          <a href="#products" className="fl-btn-ghost px-6 py-4">Get our free tools</a>
        </div>
      </SplitHero>

      <Section id="products" innerClassName="pb-[72px] pt-4">
        <SectionHead
          eyebrow="Free tools"
          title="Built for publishers who move fast."
          aside={
            <p className="fl-card-text m-0 max-w-[44ch]">
              We built these to run OpportunityLab, a site that publishes scholarships, grants and fellowships for African
              youth every day. Both are free, open source under the GPL, and work on any WordPress site.
            </p>
          }
        />
        <div className="mt-10 grid gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductBlock key={product.id} product={product} index={i} />
          ))}
        </div>
        <p className="fl-card-text mb-0 mt-6 max-w-[70ch]">
          Use them together: NewsTheme reads the deadlines you set in FutureLabs AI SEO and shows them on every post, and
          the plugin marks opportunities closed once the deadline passes, so readers don&apos;t apply to something that has ended. Need it customised for your organisation?{' '}
          <Link href="/contact" className="fl-link text-[14px]">Talk to the Studio →</Link>
        </p>
      </Section>

      <Section tone="graphite" innerClassName="py-[72px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map(([title, text], i) => (
            <NumberCard key={title} className="lg:col-span-2" minH="min-h-[190px]" n={String(i + 1).padStart(2, '0')} title={title} text={text} />
          ))}
          <ImageCard
            className="md:col-span-2 lg:col-span-6"
            imgHeight="h-[170px]"
            img="/images/site/team.jpg"
            flag="07 · Design"
            title="Product design and development"
            text="Research, design and engineering in one team, from first brief to live release."
            link={{ label: 'Build with us', href: '/contact' }}
          />
        </div>
      </Section>
    </SiteShell>
  );
}
