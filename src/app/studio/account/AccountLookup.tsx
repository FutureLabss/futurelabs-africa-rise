"use client";

import React, { useId, useState } from 'react';
import { callEdge } from '@/lib/edge';
import LicenseDetails, { type PublicLicense } from '@/components/site/LicenseDetails';

// No accounts or passwords: the email used at checkout plus the license key
// is enough to see a license, download the add-on and manage the subscription.
export default function AccountLookup() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ license: PublicLicense; manage_link: string | null } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus('sending');
    try {
      setResult(await callEdge('license', { action: 'manage', email: email.trim(), key: key.trim() }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setStatus('idle');
    }
  };

  if (result) {
    return (
      <div className="flex flex-col gap-4">
        <LicenseDetails license={result.license} manageLink={result.manage_link} />
        <button type="button" onClick={() => setResult(null)} className="fl-link self-start text-[14px]">
          ← Look up another license
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="fl-card flex max-w-[520px] flex-col gap-[18px] p-[26px] lg:p-10">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="fl-label">Email you paid with</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="fl-input"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-key`} className="fl-label">License key</label>
        <input
          id={`${id}-key`}
          required
          placeholder="FL-XXXX-XXXX-XXXX-XXXX"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="fl-input font-mono uppercase"
          spellCheck={false}
          autoCapitalize="characters"
        />
      </div>
      {error && <p className="fl-error m-0" role="alert">{error}</p>}
      <button type="submit" className="fl-btn w-full py-4" disabled={status === 'sending'}>
        {status === 'sending' ? 'Looking up…' : 'Show my license'}
      </button>
      <p className="m-0 text-[12.5px] leading-[1.5] text-fl-muted">Your key is in the email we sent after you subscribed.</p>
    </form>
  );
}
