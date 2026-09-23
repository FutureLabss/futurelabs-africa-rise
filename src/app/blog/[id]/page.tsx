import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/site/SiteShell';
import ArticleBody from '@/components/site/ArticleBody';
import { BlogCard } from '@/components/site/BlogCard';
import { Section, CtaBand, Duotone, SmartLink } from '@/components/site/primitives';
import JsonLd from '@/components/JsonLd';
import { posts, getPost, readTime, postCta } from '@/lib/blog';

type Params = { params: { id: string } };

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.id);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', images: [post.imageUrl] },
  };
}

const SHARE = [
  { label: 'X', href: (url: string, t: string) => `https://x.com/intent/tweet?url=${url}&text=${t}` },
  { label: 'LinkedIn', href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
  { label: 'Facebook', href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}` },
];

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.id);
  if (!post) notFound();

  const cta = postCta(post);
  const more = posts.filter((p) => p.id !== post.id).slice(0, 3);
  const url = encodeURIComponent(`https://futurelabs.africa/blog/${post.id}`);
  const title = encodeURIComponent(post.title);

  const jobSchema = post.jobDetails
    ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: post.jobDetails.title,
        description: post.jobDetails.description,
        datePosted: post.jobDetails.datePosted,
        validThrough: post.jobDetails.validThrough,
        employmentType: post.jobDetails.employmentType,
        hiringOrganization: {
          '@type': 'Organization',
          name: 'FutureLabs Africa',
          sameAs: 'https://futurelabs.africa',
          logo: 'https://futurelabs.africa/favicon.png',
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: post.jobDetails.locality,
            addressRegion: post.jobDetails.region,
            addressCountry: post.jobDetails.country,
          },
        },
      }
    : null;

  return (
    <SiteShell>
      {jobSchema && <JsonLd schema={jobSchema} />}

      <section className="fl-section">
        <div className="mx-auto max-w-[1100px] px-5 pb-14 pt-12 sm:px-8 lg:px-12 lg:pt-16">
          <Link href="/blog" className="text-[12.5px] font-medium leading-none text-fl-muted hover:text-fl-orange">← All posts</Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="bg-fl-orange px-2.5 py-[7px] font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-ink">
              {post.category}
            </span>
            <span className="font-mono text-[11px] leading-none text-fl-label">
              {post.date} · {readTime(post)}
            </span>
          </div>
          <h1 className="m-0 mt-6 max-w-[20ch] text-[clamp(32px,4.4vw,62px)] font-semibold leading-none tracking-[-0.038em] [text-wrap:balance]">
            {post.title}
          </h1>
          <p className="m-0 mt-[26px] max-w-[58ch] text-[17px] leading-[1.55] text-fl-soft sm:text-[19px]">{post.excerpt}</p>
          <div className="mt-7 font-mono text-[11.5px] leading-none text-fl-label">
            By <span className="text-fl-paper">{post.author}</span>
          </div>
        </div>
        <div className="fl-wrap">
          <Duotone src={post.imageUrl} alt="" light priority className="h-[clamp(240px,38vw,520px)]" />
        </div>
        <div className="mx-auto grid max-w-[1100px] items-start gap-12 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 lg:px-12 lg:pt-16">
          <article className="flex max-w-[680px] flex-col gap-[22px]">
            <ArticleBody content={post.content} />
            <div className="mt-[22px] flex flex-wrap gap-3">
              <SmartLink href={cta.href} className="fl-btn px-6 py-4">{cta.label} →</SmartLink>
              <Link href="/blog" className="fl-btn-ghost px-6 py-4">Back to blog</Link>
            </div>
          </article>
          <aside className="flex flex-col gap-[18px] bg-fl-graphite px-[22px] py-6 shadow-[0_0_0_1px_rgba(242,240,234,.14)] lg:sticky lg:top-[120px]">
            <div>
              <div className="fl-label">Category</div>
              <div className="mt-2 text-[15px] font-semibold">{post.category}</div>
            </div>
            <div>
              <div className="fl-label">Published</div>
              <div className="mt-2 text-[15px] font-semibold">{post.date}</div>
            </div>
            <div>
              <div className="fl-label">Author</div>
              <div className="mt-2 text-[15px] font-semibold">{post.author}</div>
            </div>
            <div className="border-t border-fl-paper/[.12] pt-4">
              <div className="fl-label">Share</div>
              <div className="mt-3 flex gap-3.5 font-mono text-[12px]">
                {SHARE.map((s) => (
                  <a key={s.label} href={s.href(url, title)} target="_blank" rel="noopener noreferrer" className="text-fl-orange hover:text-fl-paper">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Section tone="graphite" innerClassName="py-20">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="m-0 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.06] tracking-[-0.032em]">More from the blog</h2>
          <Link href="/blog" className="fl-link text-[13px]">View all posts →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </Section>

      <CtaBand title="Get involved with FutureLabs.">
        <Link href="/academy" className="fl-btn-dark">Explore programmes</Link>
        <Link href="/contact" className="inline-flex items-center justify-center border border-fl-ink px-[26px] py-[17px] text-[14px] font-medium leading-none text-fl-ink hover:bg-fl-ink/10 hover:text-fl-ink">
          Get in touch
        </Link>
      </CtaBand>
    </SiteShell>
  );
}
