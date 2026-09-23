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
    <div className={cn('w-full overflow-hidden flex relative group', className)}>
      {/* Optional: fading edges for a smoother look */}
      <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-fl-graphite to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-fl-graphite to-transparent pointer-events-none" />

      {/* Container for scrolling elements */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="flex h-[120px] w-[200px] shrink-0 items-center justify-center rounded-[14px] border border-fl-paper/5 bg-[#fff] p-6 transition-colors hover:border-fl-paper/20 mr-12"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
