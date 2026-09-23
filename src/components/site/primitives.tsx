import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PARTNERS } from './nav';

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Renders a Next link for internal routes and a plain anchor for external ones. */
export function SmartLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  if (isExternal(href)) {
    const newTab = href.startsWith('http');
    return (
      <a href={href} className={className} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function Section({
  tone = 'ink',
  className,
  innerClassName,
  id,
  children,
}: {
  tone?: 'ink' | 'graphite' | 'orange';
  className?: string;
  innerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === 'orange' ? 'bg-fl-orange text-fl-ink' : 'fl-section',
        tone === 'graphite' && 'bg-fl-graphite',
        id && 'scroll-mt-28',
        className
      )}
    >
      <div className={cn('fl-wrap', innerClassName)}>{children}</div>
    </section>
  );
}

export function Duotone({
  src,
  alt = '',
  flag,
  className,
  light,
  priority,
}: {
  src: string;
  alt?: string;
  flag?: string;
  className?: string;
  light?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={cn('fl-duotone', light && 'fl-duotone-light', className)}>
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      {flag && <span className="fl-flag">{flag}</span>}
    </div>
  );
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('relative flex flex-wrap gap-1.5', className)}>
      {items.map((c) => (
        <span key={c} className="fl-chip">{c}</span>
      ))}
    </div>
  );
}

type CardLink = { label: string; href: string };

function CardFrame({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <SmartLink href={href} className={cn(className, 'group text-fl-paper hover:text-fl-paper')}>
        {children}
      </SmartLink>
    );
  }
  return <div className={className}>{children}</div>;
}

/** Numbered text card with ghost numeral and orange hover edge. */
export function NumberCard({
  n,
  tag,
  title,
  text,
  chips,
  link,
  href,
  cta,
  surface = 'ink',
  className,
  minH = 'min-h-[230px]',
  titleClass = 'fl-card-title',
}: {
  n: string;
  tag?: string;
  title: string;
  text?: string;
  chips?: string[];
  link?: CardLink;
  href?: string;
  cta?: string;
  surface?: 'ink' | 'graphite';
  className?: string;
  minH?: string;
  titleClass?: string;
}) {
  return (
    <CardFrame
      href={href}
      className={cn(
        'fl-card fl-card-hover flex flex-col gap-3 px-[26px] pb-8 pt-[30px]',
        surface === 'graphite' && 'bg-fl-graphite',
        minH,
        className
      )}
    >
      <span className="fl-ghost-num" aria-hidden>{n}</span>
      <div className="relative flex items-baseline justify-between gap-3">
        <span className="fl-num">{n}</span>
        {tag && <span className="fl-tag">{tag}</span>}
      </div>
      <h3 className={cn('relative mt-1.5', titleClass)}>{title}</h3>
      {text && <p className="fl-card-text relative m-0">{text}</p>}
      {chips && <Chips items={chips} className="mt-0.5" />}
      {link && (
        <SmartLink href={link.href} className="fl-link relative mt-auto pt-3">
          {link.label} →
        </SmartLink>
      )}
      {cta && <span className="fl-link relative mt-auto pt-3 group-hover:text-fl-paper">{cta} →</span>}
    </CardFrame>
  );
}

/** Wide card with a duotone photo strip on top. */
export function ImageCard({
  img,
  flag,
  title,
  text,
  chips,
  link,
  href,
  cta,
  surface = 'ink',
  imgHeight = 'h-[150px]',
  className,
}: {
  img: string;
  flag: string;
  title: string;
  text?: string;
  chips?: string[];
  link?: CardLink;
  href?: string;
  cta?: string;
  surface?: 'ink' | 'graphite';
  imgHeight?: string;
  className?: string;
}) {
  return (
    <CardFrame
      href={href}
      className={cn(
        'fl-card flex flex-col hover:shadow-[0_0_0_1px_rgba(245,130,32,.55)]',
        surface === 'graphite' && 'bg-fl-graphite',
        className
      )}
    >
      <Duotone src={img} flag={flag} className={cn('flex-none', imgHeight)} />
      <div className="flex flex-1 flex-col gap-3 px-[26px] pb-[30px] pt-[26px]">
        <h3 className="max-w-[24ch] text-[24px] font-semibold leading-[1.1] tracking-[-0.03em]">{title}</h3>
        {text && <p className="fl-card-text m-0 max-w-[52ch]">{text}</p>}
        {chips && <Chips items={chips} className="mt-0.5" />}
        {link && (
          <SmartLink href={link.href} className="fl-link mt-auto pt-3">
            {link.label} →
          </SmartLink>
        )}
        {cta && <span className="fl-link mt-auto pt-3 group-hover:text-fl-paper">{cta} →</span>}
      </div>
    </CardFrame>
  );
}

/** Two-column hero used on inner pages: headline left, lede + action right. */
export function SplitHero({
  eyebrow,
  title,
  lede,
  children,
  titleClass = 'max-w-[16ch]',
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  children?: React.ReactNode;
  titleClass?: string;
}) {
  return (
    <Section innerClassName="grid items-end gap-10 pb-16 pt-20 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-24">
      <div>
        <div className="fl-eyebrow-accent">{eyebrow}</div>
        <h1 className={cn('fl-h1 mt-[26px]', titleClass)}>{title}</h1>
      </div>
      <div>
        <p className="fl-lede m-0 max-w-[46ch]">{lede}</p>
        {children}
      </div>
    </Section>
  );
}

/** Photo-backed hero (Academy, Events). */
export function PhotoHero({
  img,
  eyebrow,
  title,
  lede,
  children,
}: {
  img: string;
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="fl-section relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <div className="fl-duotone h-full w-full [&>img]:[filter:grayscale(1)_contrast(1.12)_brightness(.42)]">
          <img src={img} alt="" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,12,10,.94),rgba(12,12,10,.5))]" />
      </div>
      <div className="fl-wrap relative pb-20 pt-24 lg:pb-[100px] lg:pt-[110px]">
        <div className="fl-eyebrow-accent">{eyebrow}</div>
        <h1 className="fl-h1 mt-[26px] max-w-[15ch]">{title}</h1>
        <p className="m-0 mt-[26px] max-w-[52ch] text-[17px] leading-[1.55] text-fl-body lg:text-[18px]">{lede}</p>
        {children}
      </div>
    </section>
  );
}

/** Orange band closing a page. */
export function CtaBand({
  title,
  children,
  split,
}: {
  title: string;
  children: React.ReactNode;
  split?: boolean;
}) {
  if (split) {
    return (
      <Section tone="orange" innerClassName="grid items-end gap-12 py-20 md:grid-cols-2 lg:py-24">
        <h2 className="fl-h2 m-0 max-w-[16ch] [font-size:clamp(30px,4vw,56px)]">{title}</h2>
        <div>{children}</div>
      </Section>
    );
  }
  return (
    <Section tone="orange" innerClassName="flex flex-wrap items-center justify-between gap-8 py-16 lg:py-[72px]">
      <h2 className="fl-h2-sm m-0 max-w-[20ch]">{title}</h2>
      <div className="flex flex-wrap gap-3">{children}</div>
    </Section>
  );
}

export function ManifestoBand() {
  return (
    <CtaBand title="Africa does not need another conversation about potential." split>
      <p className="m-0 max-w-[34ch] text-[20px] font-medium leading-[1.45]">It needs systems that turn potential into production.</p>
      <Link href="/manifesto" className="fl-btn-dark mt-[26px] px-6 py-4">
        Read the FutureLabs Manifesto
      </Link>
    </CtaBand>
  );
}

export function PartnerNames({ className, size = 'text-[21px]' }: { className?: string; size?: string }) {
  return (
    <ul className={cn('m-0 flex list-none flex-wrap items-baseline gap-x-11 gap-y-3.5 p-0', className)}>
      {PARTNERS.map((p) => (
        <li key={p} className={cn(size, 'font-medium tracking-[-0.02em] text-fl-soft')}>{p}</li>
      ))}
    </ul>
  );
}

export function SectionHead({
  eyebrow,
  title,
  aside,
  titleClass = 'fl-h2',
  className,
}: {
  eyebrow?: string;
  title: string;
  aside?: React.ReactNode;
  titleClass?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-8', className)}>
      <div>
        {eyebrow && <div className="fl-eyebrow">{eyebrow}</div>}
        <h2 className={cn(titleClass, eyebrow && 'mt-5 lg:mt-6')}>{title}</h2>
      </div>
      {aside}
    </div>
  );
}

export function ProofLine({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-x-[30px] gap-y-2 font-mono text-[11.5px] leading-[1.6] text-fl-label', className)}>
      {children}
    </div>
  );
}

export function Stat({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <span>
      <span className="font-medium text-fl-paper">{value}</span> {children}
    </span>
  );
}
