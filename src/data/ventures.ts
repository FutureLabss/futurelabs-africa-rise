export type VentureMode = 'Build' | 'Back' | 'Partner';

export interface Venture {
  name: string;
  sector: string;
  mode: VentureMode;
  description: string;
  href: string;
}

export const ventures: Venture[] = [
  { name: 'FutureLabs Academy', sector: 'Education', mode: 'Build', href: 'https://www.futurelabs.ng', description: "Technical education and talent accelerator developing Africa's next generation of engineers." },
  { name: 'FutureLabs Studio', sector: 'Digital Agency', mode: 'Build', href: 'https://studio.futurelabs.ng/', description: 'Digital products, brand systems and data models built for organizations and ventures.' },
  { name: 'FutureResume', sector: 'Career Tech', mode: 'Build', href: 'https://futureresume-tbyt.onrender.com/', description: 'AI-powered resume and portfolio tools helping talent show skills and land opportunities.' },
  { name: 'Opportunitylab.net', sector: 'Opportunities', mode: 'Back', href: 'https://www.opportunitylab.net', description: 'A curated hub for scholarships, fellowships, grants and career programmes for African youth.' },
  { name: 'Cleverclass', sector: 'EdTech', mode: 'Back', href: 'https://cleverclass.vercel.app/', description: 'A classroom platform powering learning communities with seamless tools.' },
  { name: 'Salely', sector: 'Social Commerce', mode: 'Back', href: 'https://salely.app', description: 'One storefront link for African vendors — customers browse and order over WhatsApp.' },
  { name: 'GuessIt', sector: 'Gaming', mode: 'Partner', href: 'https://guessit.games/', description: 'Multiplayer party game with 3D interactions, daily brain teasers and social play.' },
  { name: 'Automate NG', sector: 'Automation', mode: 'Partner', href: 'https://automate-ng.netlify.app/', description: 'Replacing repetitive manual processes in Nigerian businesses with automation workflows.' },
];
