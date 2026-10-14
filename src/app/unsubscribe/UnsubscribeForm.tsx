"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { callEdge } from '@/lib/edge';

// A button rather than unsubscribing on page load, so link scanners in mail
// clients can't unsubscribe people by opening the link.
export default function UnsubscribeForm() {
  const token = useSearchParams().get('token') ?? '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await callEdge('briefing-unsubscribe', { token });
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('failed');
    }
  };

  if (!token) {
    return <p className="fl-card-text m-0 max-w-[60ch]">This link is missing its unsubscribe code. Use the link in one of our emails, or reply to any of them and we&apos;ll remove you.</p>;
  }

  if (status === 'done') {
    return (
      <p role="status" className="m-0 flex items-center gap-3 text-[15px] text-fl-paper">
        <span className="h-1.5 w-1.5 flex-none bg-fl-orange" aria-hidden />
        You&apos;re unsubscribed. We won&apos;t send you research emails again.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-[60ch] flex-col items-start gap-4">
      <p className="fl-card-text m-0">Stop receiving research briefings and updates from FutureLabs at this address.</p>
      <button type="submit" className="fl-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Unsubscribing…' : 'Unsubscribe'}
      </button>
      {status === 'failed' && <p className="fl-error m-0" role="alert">{error}</p>}
    </form>
  );
}
