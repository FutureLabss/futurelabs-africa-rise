import React from 'react';
import Link from 'next/link';
import { Duotone } from './primitives';
import { readTime, type BlogPost } from '@/lib/blog';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="fl-card group flex flex-col text-fl-paper hover:text-fl-paper hover:shadow-[0_0_0_1px_rgba(245,130,32,.55)]"
    >
      <Duotone src={post.imageUrl} flag={post.category} light className="h-[200px] flex-none" />
      <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-[26px]">
        <span className="font-mono text-[10.5px] leading-none text-fl-label">{post.date}</span>
        <h3 className="text-[21px] font-semibold leading-[1.14] tracking-[-0.026em]">{post.title}</h3>
        <p className="fl-card-text m-0 line-clamp-4">{post.excerpt}</p>
        <span className="fl-link mt-auto pt-3.5 group-hover:text-fl-paper">Read more →</span>
      </div>
    </Link>
  );
}

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="fl-card group grid text-fl-paper hover:text-fl-paper hover:shadow-[0_0_0_1px_rgba(245,130,32,.55)] md:grid-cols-2"
    >
      <Duotone src={post.imageUrl} flag={`Latest · ${post.category}`} light className="min-h-[260px] md:min-h-[340px]" />
      <div className="flex flex-col justify-center gap-4 px-6 py-9 md:px-10 md:py-11">
        <span className="font-mono text-[11px] leading-none text-fl-label">
          {post.date} · {readTime(post)}
        </span>
        <h2 className="max-w-[20ch] text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.06] tracking-[-0.032em] [text-wrap:balance]">
          {post.title}
        </h2>
        <p className="m-0 max-w-[50ch] text-[16px] leading-[1.6] text-fl-muted">{post.excerpt}</p>
        <span className="fl-link mt-2 text-[13.5px] group-hover:text-fl-paper">Read the story →</span>
      </div>
    </Link>
  );
}
