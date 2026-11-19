import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { Section, SplitHero, SectionHead, Chips, ProofLine, SmartLink } from '@/components/site/primitives';
import { PRODUCTS, pricingPath } from '@/data/products';
import PricingTable from '@/components/site/PricingTable';

// One pricing page per product with Pro plans; /studio links here instead of showing the table itself.
type Params = { params: { product: string } };

const pricedProducts = () => PRODUCTS.filter((p) => p.pricing);
const findProduct = (id: string) => pricedProducts().find((p) => p.id === id);

export function generateStaticParams() {
  return pricedProducts().map((p) => ({ product: p.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Params) {
  const product = findProduct(params.product);
  if (!product) return {};
  const from = product.pricing!.tiers[0].prices.month;
  return pageMeta({
    title: `${product.name} Pricing — Free and Pro Plans`,
    description: `${product.name} is free to download. Pro plans start at $${from.USD} (₦${from.NGN.toLocaleString('en-US')}) a month, billed monthly or yearly, for 1 site, 5 sites or unlimited sites.`,
    path: pricingPath(product.id),
    image: product.image.src,
  });
}

const FAQ = [
  [
    'How do I get my licence key?',
    'Right after payment it appears on screen and in an email. Paste it on the Pro add-on’s settings page in WordPress to switch Pro on.',
  ],
  [
    'Can I move my licence to another site?',
    'Yes. Deactivate it on the old site, then activate it on the new one. Your plan sets how many sites can use the key at the same time.',
  ],
  [
    'How do I pay?',
    'By card, through Paystack. The subscription renews from the same card every month or year until you cancel.',
  ],
  [
    'Where do I manage or cancel my subscription?',
    <>
      On <Link href="/studio/account" className="fl-link text-[15px]">your account page</Link>: enter your licence key to see your sites,
      download the latest Pro add-on, update your card or cancel.
    </>,
  ],
] as const;

export default function ProductPricingPage({ params }: Params) {
  const product = findProduct(params.product);
  if (!product) notFound();

  return (
    <SiteShell>
      <SplitHero
        eyebrow={`FutureLabs Studio · ${product.kind}`}
        title={`${product.name} pricing`}
        titleClass="max-w-[14ch]"
        lede={
          <>
            {product.summary} Free to download and use on any number of sites, with Pro plans billed monthly or yearly.
          </>
        }
      >
        <div className="mt-[26px] flex flex-wrap gap-3">
          <a href={`#${product.id}-pricing`} className="fl-btn px-6 py-4">
            Choose a plan
          </a>
          {product.primary && (
            <SmartLink href={product.primary.href} className="fl-btn-ghost px-6 py-4">
              {product.primary.label}
            </SmartLink>
          )}
        </div>
        <ProofLine className="mt-6">
          {product.facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </ProofLine>
      </SplitHero>

      <Section innerClassName="pb-[72px] pt-0">
        <div className="fl-card px-[26px] py-[30px] lg:px-10 lg:py-10">
          <PricingTable product={product} />
        </div>
      </Section>

      <Section tone="graphite" innerClassName="py-[72px]">
        <SectionHead
          eyebrow="Free version"
          title="Free includes all of this."
          aside={
            <p className="fl-card-text m-0 max-w-[44ch]">
              The free version has no time limit and no locked features. Pro is a separate add-on you install alongside it.
            </p>
          }
        />
        <Chips items={product.features} className="mt-8" />
      </Section>

      <Section innerClassName="py-[72px]">
        {/* Buying questions only apply once Pro is on sale; until then the plans offer the waitlist. */}
        {product.pricing!.available && (
          <>
            <SectionHead eyebrow="Questions" title="Before you buy." />
            <div className="mb-8 mt-10 grid gap-4 md:grid-cols-2">
              {FAQ.map(([q, a]) => (
                <div key={q} className="fl-card px-[26px] py-[26px]">
                  <h3 className="m-0 text-[19px] font-semibold tracking-[-0.02em]">{q}</h3>
                  <p className="fl-card-text mb-0 mt-3 text-[15px]">{a}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="fl-card-text m-0">
          <Link href={`/studio#${product.id}`} className="fl-link text-[14px]">
            ← Back to all Studio products
          </Link>
        </p>
      </Section>
    </SiteShell>
  );
}
