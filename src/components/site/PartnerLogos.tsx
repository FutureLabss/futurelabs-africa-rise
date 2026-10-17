import React from 'react';
import { cn } from '@/lib/utils';

const PARTNER_LOGOS = [
  { src: '/partners/iDICEstartup.svg', alt: 'iDICE' },
  { src: '/partners/nitda-1.webp', alt: 'NITDA' },
  { src: '/partners/ondi.png', alt: 'ONDI' },
  { src: '/partners/pind.png', alt: 'PIND' },
  { src: '/partners/fed-poly-ukana.png', alt: 'Federal Polytechnic Ukana' },
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

/**
 * Partner logos as white tiles in centred rows, so an odd count still lines up.
 * Pass `names` to show a subset in that order (e.g. institutional partners on
 * /government); otherwise every logo is shown.
 */
export function PartnerLogoGrid({ names, perRow = 7, className }: { names?: string[]; perRow?: 4 | 7; className?: string }) {
  const logos = names
    ? names.map((n) => PARTNER_LOGOS.find((l) => l.alt === n)).filter((l): l is (typeof PARTNER_LOGOS)[number] => !!l)
    : PARTNER_LOGOS;
  return (
    // Three per row on phones, four on tablets, `perRow` on desktop; gap-3 = 12px between tiles.
    <ul className={cn('m-0 flex list-none flex-wrap justify-center gap-3 p-0', className)}>
      {logos.map((logo) => (
        <li
          key={logo.alt}
          className={`flex h-[68px] basis-[calc((100%-24px)/3)] items-center justify-center rounded-[10px] border border-fl-paper/10 bg-[#fff] px-3 py-2.5 sm:h-[84px] sm:basis-[calc((100%-36px)/4)] sm:px-4 sm:py-3 ${perRow === 7 ? 'lg:basis-[calc((100%-72px)/7)]' : 'lg:h-[96px]'}`}
        >
          <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
        </li>
      ))}
    </ul>
  );
}
