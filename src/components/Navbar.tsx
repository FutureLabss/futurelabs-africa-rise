"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_GROUPS, LOGO_SRC } from '@/components/site/nav';

const Navbar = () => {
  const pathname = usePathname();
  const [menu, setMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    setMenu(null);
    setDrawer(false);
  }, [pathname]);

  // Escape and outside click close the mega-menu.
  useEffect(() => {
    if (!menu && !drawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [menu, drawer]);

  // Lock page scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  const active = NAV_GROUPS.find((g) => g.id === menu);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-fl-paper/[.14]"
    >
      {/* Blur lives on a background layer: backdrop-filter on the header itself would trap the fixed mobile drawer inside it. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-fl-ink/90 backdrop-blur-[10px]" />
      <div className="fl-wrap flex h-16 items-center justify-between gap-10 lg:h-[88px]">
        <Link href="/" className="flex-none" aria-label="FutureLabs home">
          <img src={LOGO_SRC} alt="FutureLabs" className="block h-10 w-auto lg:h-[60px]" />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden gap-[34px] text-[13.5px] font-medium tracking-[-0.01em] text-fl-body lg:flex">
          {NAV_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-expanded={menu === g.id}
              aria-controls="fl-mega"
              onClick={() => setMenu((m) => (m === g.id ? null : g.id))}
              className={cn(
                'flex items-center gap-[5px] transition-colors hover:text-white',
                menu === g.id && 'text-white'
              )}
            >
              {g.label}
              <span
                aria-hidden
                className={cn('inline-block text-[9px] opacity-50 transition-transform', menu === g.id && 'rotate-180')}
              >
                ▾
              </span>
            </button>
          ))}
        </nav>

        <Link
          href="/partner"
          className="hidden bg-fl-orange px-[18px] py-[11px] text-[12px] font-medium leading-none text-fl-ink transition-colors hover:bg-fl-flame hover:text-fl-ink lg:inline-block"
        >
          Partner with FutureLabs
        </Link>

        <button
          type="button"
          className="-mr-3 flex h-12 w-12 items-center justify-center text-[20px] text-fl-paper lg:hidden"
          aria-label={drawer ? 'Close menu' : 'Open menu'}
          aria-expanded={drawer}
          aria-controls="fl-drawer"
          onClick={() => setDrawer((d) => !d)}
        >
          <span aria-hidden className={cn(drawer && 'text-fl-orange')}>{drawer ? '✕' : '≡'}</span>
        </button>
      </div>

      {active && (
        <div id="fl-mega" className="hidden border-t border-fl-paper/[.14] bg-fl-graphite lg:block">
          <div className="fl-wrap grid grid-cols-[200px_minmax(0,1fr)] gap-8 pb-[30px] pt-[26px]">
            <div className="font-mono text-[10px] font-medium uppercase leading-[1.4] tracking-[.16em] text-fl-label">
              {active.label}
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-6 p-0">
              {active.items.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenu(null)}
                    className="group block text-fl-paper hover:text-fl-paper"
                  >
                    <span className="block text-[15px] font-semibold tracking-[-0.015em] transition-colors group-hover:text-fl-orange">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-[1.45] text-fl-label">{item.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {drawer && (
        <div
          id="fl-drawer"
          className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col overflow-y-auto bg-fl-graphite px-5 pb-7 pt-[22px] sm:px-8 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_GROUPS.map((g, gi) => (
              <div key={g.id} className={cn(gi > 0 && 'pt-[22px]')}>
                <div className="pb-3 font-mono text-[9.5px] font-medium uppercase leading-none tracking-[.16em] text-fl-label">
                  {g.label}
                </div>
                <ul className="m-0 list-none p-0">
                  {g.items.map((item, i) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setDrawer(false)}
                        className={cn(
                          'block py-[13px] text-[22px] font-semibold tracking-[-0.025em] text-fl-paper hover:text-fl-orange',
                          i < g.items.length - 1 && 'border-b border-fl-paper/10'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <Link href="/partner" onClick={() => setDrawer(false)} className="fl-btn mt-8 w-full">
            Partner with FutureLabs
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
