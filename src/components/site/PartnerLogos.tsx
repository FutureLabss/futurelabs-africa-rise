import React from 'react';
import { cn } from '@/lib/utils';

const PARTNER_LOGOS = [
  { src: '/partners/iDICEstartup.svg', alt: 'iDICE' },
  { src: '/partners/nitda-1.webp', alt: 'NITDA' },
  { src: '/partners/ondi.png', alt: 'ONDI' },
  { src: '/partners/pind.png', alt: 'PIND' },
  { src: '/partners/ritman.png', alt: 'Ritman University' },
  { src: '/partners/AKS.jpg', alt: 'AKSG' },
  { src: '/partners/leapAfrica.jpeg', alt: 'LEAP Africa' },
  { src: '/partners/AStw.png', alt: 'AStw' },
  { src: '/partners/afrilabs.png', alt: 'AfriLabs' },
  { src: '/partners/digitspot.jpg', alt: 'DigitSpot' },
  { src: '/partners/hotelsNG.png', alt: 'Hotels.ng' },
  { src: '/partners/ibom.png', alt: 'Ibom' },
  { src: '/partners/undp.png', alt: 'UNDP' },
];

export function PartnerLogos({ className }: { className?: string }) {
  // Duplicate the array to create a seamless scrolling loop
  const logos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className={cn('w-full overflow-hidden flex relative group motion-reduce:overflow-x-auto', className)}>
      {/* Fading edges, in the section's background colour */}
      <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-fl-ink to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-fl-ink to-transparent pointer-events-none" />

      {/* Container for scrolling elements */}
      {/* Pause on hover only where there is a real pointer: on touch screens a tap leaves :hover stuck and froze the strip.
          Reduced motion: no animation; the row scrolls sideways instead. */}
      <div className="flex w-max animate-marquee motion-reduce:animate-none [@media(hover:hover)]:hover:[animation-play-state:paused]">
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="flex h-[120px] w-[200px] shrink-0 items-center justify-center rounded-[14px] border border-fl-paper/5 bg-[#fff] p-6 transition-colors hover:border-fl-paper/20 mr-12"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              // Not lazy: in a moving strip, lazy logos slide into view before they've loaded.
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Static logo grid for a named set of partners (in the order given). Used where a
 * marquee would be too busy, such as the institutional partners on /government.
 */
export function PartnerLogoGrid({ names, className }: { names: string[]; className?: string }) {
  const logos = names.map((n) => PARTNER_LOGOS.find((l) => l.alt === n)).filter((l): l is (typeof PARTNER_LOGOS)[number] => !!l);
  return (
    <ul
      className={cn(
        // Two per row on phones (an odd last logo spans the row), four on tablets, all in one row on desktop.
        'm-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4 lg:grid-cols-7 [&>li:last-child:nth-child(odd)]:col-span-2 sm:[&>li:last-child:nth-child(odd)]:col-span-1',
        className,
      )}
    >
      {logos.map((logo) => (
        <li key={logo.alt} className="flex h-[84px] items-center justify-center rounded-[10px] border border-fl-paper/10 bg-[#fff] px-4 py-3">
          <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
        </li>
      ))}
    </ul>
  );
}
