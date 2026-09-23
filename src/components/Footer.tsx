import React from 'react';
import Link from 'next/link';
import {
  CONTACT,
  FOOTER_ARMS,
  FOOTER_NAV,
  FOOTER_PROGRAMMES,
  LOGO_SRC,
  SOCIAL_LINKS,
  type NavItem,
} from '@/components/site/nav';

function Column({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-[11px]">
      <div className="mb-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-label">{title}</div>
      {items.map((item) => (
        <Link key={item.href + item.label} href={item.href} className="text-[14px] text-fl-soft hover:text-fl-paper">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-fl-paper/[.14] bg-fl-ink">
      <div className="fl-wrap grid gap-12 pb-10 pt-[72px] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))]">
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={LOGO_SRC} alt="FutureLabs" className="block h-[60px] w-auto" />
          <p className="m-0 mt-[22px] max-w-[28ch] text-[19px] font-medium leading-[1.4] tracking-[-0.022em]">
            Building Africa&apos;s productive capacity through technology, human capital and entrepreneurship.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="mt-5 inline-block font-mono text-[12.5px] text-fl-orange hover:text-fl-paper">
            {CONTACT.email}
          </a>
        </div>
        <Column title="Navigate" items={FOOTER_NAV} />
        <Column title="Arms" items={FOOTER_ARMS} />
        <Column title="Programmes" items={FOOTER_PROGRAMMES} />
        <div className="flex flex-col gap-[11px]">
          <div className="mb-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[.16em] text-fl-label">Social</div>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[14px] text-fl-soft hover:text-fl-paper">
              {s.label}
            </a>
          ))}
          <div className="mt-1.5 font-mono text-[12px] leading-[1.6] text-fl-dim">
            <a href={CONTACT.phoneHref} className="text-fl-dim hover:text-fl-paper">{CONTACT.phone}</a>
            <br />
            {CONTACT.location}
          </div>
        </div>
      </div>
      <div className="fl-wrap">
        <div className="flex flex-wrap justify-between gap-6 border-t border-fl-paper/10 pb-11 pt-6 font-mono text-[11px] leading-[1.5] text-fl-faint">
          <span>© {year} FutureLabs Africa</span>
          <span>Technology &amp; Economic Development Institution</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
