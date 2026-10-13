"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import DownloadGate from '@/components/site/DownloadGate';
import BuyDialog from '@/components/site/BuyDialog';
import { sitesLabel, type BillingInterval, type Currency, type Product } from '@/data/products';

const STORAGE_KEY = 'fl-pricing';
// Paystack charges USD only once it's enabled on the account; until then USD
// buyers pay the naira price, and we say so under the prices.
const USD_ENABLED = process.env.NEXT_PUBLIC_PAYSTACK_USD === 'true';

export const formatPrice = (amount: number, currency: Currency) =>
  `${currency === 'USD' ? '$' : '₦'}${amount.toLocaleString('en-US')}`;

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: [T, React.ReactNode][];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex border border-fl-paper/20">
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={cn(
            'px-3.5 py-2 font-mono text-[11px] uppercase tracking-[.12em] transition-colors',
            value === v ? 'bg-fl-paper text-fl-ink' : 'text-fl-soft hover:text-fl-paper'
          )}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export default function PricingTable({ product }: { product: Product }) {
  const pricing = product.pricing!;
  const [interval, setBilling] = useState<BillingInterval>('year');
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved?.interval === 'month' || saved?.interval === 'year') setBilling(saved.interval);
      if (saved?.currency === 'USD' || saved?.currency === 'NGN') return setCurrency(saved.currency);
    } catch {
      /* storage blocked: fall through to the locale guess */
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Africa/Lagos' || navigator.language === 'en-NG') setCurrency('NGN');
  }, []);

  const remember = (next: { interval?: BillingInterval; currency?: Currency }) => {
    if (next.interval) setBilling(next.interval);
    if (next.currency) setCurrency(next.currency);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ interval, currency, ...next }));
    } catch {
      /* private mode */
    }
  };

  const per = interval === 'year' ? 'year' : 'month';

  return (
    <div id={`${product.id}-pricing`} className="scroll-mt-28 border-t border-fl-paper/10 px-[26px] py-[30px] lg:order-3 lg:col-span-2 lg:px-10 lg:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="fl-tag m-0">Pricing</p>
          <h4 className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">Free, or Pro from {formatPrice(pricing.tiers[0].prices.month[currency], currency)} a month</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          <Toggle
            label="Billing period"
            value={interval}
            onChange={(v) => remember({ interval: v })}
            options={[
              ['month', 'Monthly'],
              ['year', <>Yearly <span className={interval === 'year' ? 'text-fl-orange' : 'text-fl-accent'}>· 2 months free</span></>],
            ]}
          />
          <Toggle label="Currency" value={currency} onChange={(v) => remember({ currency: v })} options={[['USD', 'USD'], ['NGN', 'NGN']]} />
        </div>
      </div>

      <div className="mt-6 grid gap-px bg-fl-paper/10 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col gap-4 bg-fl-ink p-6">
          <div>
            <p className="fl-tag m-0">Free</p>
            <p className="mt-3 text-[32px] font-semibold leading-none tracking-[-0.03em]">{formatPrice(0, currency)}</p>
            <p className="mt-2 text-[13px] text-fl-muted">Forever, on any number of sites</p>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[14px] text-fl-soft">
            <li>Every feature listed above</li>
            <li>GPL licence</li>
            <li>Community support</li>
          </ul>
          {product.download && (
            <DownloadGate product={{ id: product.id, name: product.name, ...product.download }} variant="ghost" className="mt-auto w-full" />
          )}
        </div>

        {pricing.tiers.map((tier) => {
          const amount = tier.prices[interval][currency];
          const label = `${formatPrice(amount, currency)} a ${per}`;
          return (
            <div key={tier.id} className="flex flex-col gap-4 bg-fl-ink p-6">
              <div>
                <p className="fl-tag m-0">
                  {tier.name} · {sitesLabel(tier.sites)}
                </p>
                <p className="mt-3 text-[32px] font-semibold leading-none tracking-[-0.03em]">
                  {formatPrice(amount, currency)}
                  <span className="text-[14px] font-normal tracking-normal text-fl-muted"> /{interval === 'year' ? 'yr' : 'mo'}</span>
                </p>
                <p className="mt-2 text-[13px] text-fl-muted">
                  {interval === 'year'
                    ? `Billed yearly · ${formatPrice(tier.prices.month[currency] * 12, currency)} if paid monthly`
                    : 'Billed monthly · cancel any time'}
                </p>
              </div>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[14px] text-fl-soft">
                {pricing.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
                <li>{tier.sites === null ? 'Use on unlimited sites' : `Use on ${sitesLabel(tier.sites)}`}</li>
              </ul>
              <BuyDialog
                product={{ id: product.id, name: product.name }}
                tier={tier}
                interval={interval}
                currency={currency}
                priceLabel={label}
                available={pricing.available}
                className="mt-auto w-full"
              />
            </div>
          );
        })}
      </div>

      <p className="mb-0 mt-4 text-[12.5px] leading-[1.6] text-fl-muted">
        Prices exclude any local taxes. Subscriptions renew automatically until you cancel; if you stop, Pro keeps working but
        updates and support end.
        {pricing.available && currency === 'USD' && !USD_ENABLED && ' Card payments are processed in naira at the matching NGN price.'}
        {' '}Already subscribed? <a href="/studio/account" className="text-fl-soft underline underline-offset-2 hover:text-fl-paper">Manage your license</a>.
      </p>
    </div>
  );
}
