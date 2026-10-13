"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import { sitesLabel } from '@/data/products';

/** The license as returned by the `verify-payment` and `license` edge functions. */
export type PublicLicense = {
  key: string;
  product: string;
  product_name: string;
  tier: string;
  interval: 'month' | 'year';
  /** null = unlimited. */
  max_sites: number | null;
  sites: { site_url: string; activated_at: string }[];
  period_end: string;
  renews: boolean;
  valid: boolean;
  valid_until: string;
  status: 'active' | 'past_due' | 'cancelled' | 'expired' | 'revoked';
  download: { version: string; url: string } | null;
};

const STATUS: Record<PublicLicense['status'], string> = {
  active: 'Active',
  past_due: 'Payment failed: update your card',
  cancelled: 'Cancelled: works until the end of the paid period',
  expired: 'Expired',
  revoked: 'Revoked',
};

export default function LicenseDetails({ license, manageLink }: { license: PublicLicense; manageLink?: string | null }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(license.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the key is selectable */
    }
  };
  const date = (iso: string) => format(new Date(iso), 'd MMM yyyy');
  const tier = license.tier.charAt(0).toUpperCase() + license.tier.slice(1);

  return (
    <div className="fl-card flex flex-col gap-6 p-[26px] lg:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="m-0 text-[26px] font-semibold tracking-[-0.03em]">{license.product_name}</h2>
        <span className="fl-tag">
          {tier} · {sitesLabel(license.max_sites)} · {license.interval === 'year' ? 'Yearly' : 'Monthly'}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="fl-label">License key</span>
        <div className="flex flex-wrap items-center gap-3">
          <code className="select-all bg-fl-paper/[.07] px-4 py-3 font-mono text-[17px] tracking-[.08em] text-fl-paper">{license.key}</code>
          <button type="button" onClick={copy} className="fl-btn-ghost px-4 py-3">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="m-0 text-[13px] text-fl-muted">Paste this on the Pro add-on&apos;s settings page in WordPress. Keep it private.</p>
      </div>

      <dl className="m-0 grid gap-4 text-[14px] sm:grid-cols-3">
        <div>
          <dt className="fl-label">Status</dt>
          <dd className={`m-0 mt-1 ${license.valid && license.status === 'active' ? 'text-fl-paper' : 'text-fl-orange'}`}>{STATUS[license.status]}</dd>
        </div>
        <div>
          <dt className="fl-label">{license.renews ? 'Renews on' : 'Works until'}</dt>
          <dd className="m-0 mt-1 text-fl-paper">{date(license.renews ? license.period_end : license.valid_until)}</dd>
        </div>
        <div>
          <dt className="fl-label">Sites in use</dt>
          <dd className="m-0 mt-1 text-fl-paper">
            {license.max_sites === null ? license.sites.length : `${license.sites.length} of ${license.max_sites}`}
          </dd>
        </div>
      </dl>

      {license.sites.length > 0 && (
        <ul className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-[13px] text-fl-soft">
          {license.sites.map((s) => (
            <li key={s.site_url}>{s.site_url}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3">
        {license.valid && license.download ? (
          <a href={license.download.url} className="fl-btn">
            Download Pro add-on {license.download.version}
          </a>
        ) : license.valid ? (
          <p className="fl-card-text m-0">The Pro add-on download will appear here as soon as it&apos;s released. We&apos;ll email you too.</p>
        ) : null}
        {manageLink && (
          <a href={manageLink} target="_blank" rel="noopener" className="fl-btn-ghost">
            Change card or cancel
          </a>
        )}
      </div>
    </div>
  );
}
