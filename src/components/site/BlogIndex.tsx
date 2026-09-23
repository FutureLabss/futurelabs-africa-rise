"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BlogCard, FeaturedPost } from './BlogCard';
import { posts, categories } from '@/lib/blog';

export default function BlogIndex() {
  const [cat, setCat] = useState('All');
  const list = posts.filter((p) => cat === 'All' || p.category === cat);
  const [featured, ...rest] = list;

  return (
    <>
      <section className="fl-section">
        <div className="fl-wrap flex flex-wrap items-end justify-between gap-10 pb-16 pt-20 lg:pt-24">
          <div>
            <div className="fl-eyebrow-accent">Blog</div>
            <h1 className="m-0 mt-[26px] max-w-[14ch] text-[clamp(40px,5vw,76px)] font-semibold leading-[.98] tracking-[-0.04em] [text-wrap:balance]">
              Insights, updates and stories.
            </h1>
            <p className="fl-lede m-0 mt-6 max-w-[48ch] leading-[1.55]">
              News from the FutureLabs ecosystem — founders, programmes and open roles.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === cat}
                onClick={() => setCat(c)}
                className={cn(
                  'border px-3.5 py-2.5 font-mono text-[11.5px] uppercase leading-none transition-colors',
                  c === cat ? 'border-fl-orange text-fl-orange' : 'border-fl-paper/20 text-fl-muted hover:border-fl-paper/40 hover:text-fl-paper'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="fl-section bg-fl-graphite">
        <div className="fl-wrap flex flex-col gap-4 pb-[88px] pt-[72px]">
          {featured && <FeaturedPost post={featured} />}
          {rest.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
