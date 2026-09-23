"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ventures, type VentureMode } from '@/data/ventures';

const FILTERS: ('All' | VentureMode)[] = ['All', 'Build', 'Back', 'Partner'];

export default function VenturesPortfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const list = ventures
    .map((v, i) => ({ ...v, n: String(i + 1).padStart(2, '0') }))
    .filter((v) => filter === 'All' || v.mode === filter);

  return (
    <>
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-6">
        <h2 className="m-0 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.06] tracking-[-0.032em]">Portfolio</h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'border px-3.5 py-3 font-mono text-[11.5px] uppercase leading-none transition-colors sm:px-3 sm:py-2',
                filter === f ? 'border-fl-orange text-fl-orange' : 'border-fl-paper/20 text-fl-muted hover:border-fl-paper/40 hover:text-fl-paper'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((v) => (
          <a
            key={v.name}
            href={v.href}
            target="_blank"
            rel="noopener noreferrer"
            className="fl-card group flex min-h-[240px] flex-col gap-3 bg-fl-graphite px-6 pb-[30px] pt-7 text-fl-paper hover:bg-[#171715] hover:text-fl-paper hover:shadow-[0_0_0_1px_rgba(245,130,32,.55)]"
          >
            <span className="fl-ghost-num" aria-hidden>{v.n}</span>
            <div className="relative flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] font-medium uppercase leading-[1.3] tracking-[.14em] text-fl-orange">{v.sector}</span>
              <span className="font-mono text-[10px] uppercase leading-none text-fl-label">{v.mode}</span>
            </div>
            <h3 className="relative mt-1 text-[23px] font-semibold leading-[1.1] tracking-[-0.028em]">{v.name}</h3>
            <p className="fl-card-text relative m-0">{v.description}</p>
            <span className="fl-link relative mt-auto pt-3 group-hover:text-fl-paper">
              Visit <span className="sr-only">{v.name} (opens in a new tab)</span>→
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
