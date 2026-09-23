"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Slides section content up as it scrolls into view. Card grids stagger their
 * children. Only elements that start below the fold are animated, so nothing
 * above the fold flickers, and the attribute is added client-side so content
 * is never hidden when JavaScript is unavailable.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );

    const timer = window.setTimeout(() => {
      const fold = window.innerHeight;
      document.querySelectorAll('main section').forEach((section) => {
        const inner = section.firstElementChild;
        if (!inner) return;
        const targets: Element[] = [];
        Array.from(inner.children).forEach((el) => {
          const cs = getComputedStyle(el);
          const isGroup = (cs.display === 'grid' || cs.display === 'flex') && el.children.length > 2;
          if (isGroup) targets.push(...Array.from(el.children));
          else targets.push(el);
        });
        targets.forEach((el, i) => {
          if (el.hasAttribute('data-reveal')) return;
          if (el.getBoundingClientRect().top < fold) return;
          (el as HTMLElement).style.transitionDelay = `${Math.min(i, 7) * 65}ms`;
          el.setAttribute('data-reveal', '');
          observer.observe(el);
        });
      });
    }, 30);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      // Anything still waiting to reveal should simply show on the next page.
      document.querySelectorAll('[data-reveal=""]').forEach((el) => el.setAttribute('data-reveal', 'in'));
    };
  }, [pathname]);

  return null;
}
