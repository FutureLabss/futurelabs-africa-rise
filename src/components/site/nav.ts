export type NavItem = { label: string; href: string; desc?: string };
export type NavGroup = { id: string; label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'work',
    label: 'Work',
    items: [
      { label: 'What We Build', href: '/about#what-we-build', desc: 'Capabilities, startups, technology, institutions, intelligence' },
      { label: 'Government & Development', href: '/government', desc: 'Technology-enabled economic and institutional programs' },
      { label: 'Enterprise', href: '/enterprise', desc: 'AI adoption, workforce and product capability' },
      { label: 'Events', href: '/events', desc: 'Hackathons, demo days and industry convenings' },
      { label: 'Impact', href: '/#impact', desc: 'How we measure productive capacity' },
      { label: 'AI Fellowship', href: '/ai-fellowship', desc: 'Applied AI training through to placement' },
    ],
  },
  {
    id: 'arms',
    label: 'Arms',
    items: [
      { label: 'FutureLabs Academy', href: '/academy', desc: 'Learning and workforce development' },
      { label: 'FutureLabs Ventures', href: '/startups', desc: 'Building and backing startups' },
      { label: 'FutureLabs Studio', href: '/studio', desc: 'AI systems and digital products' },
      { label: 'FutureLabs Intelligence', href: '/research-labs', desc: 'Research on technology and economy' },
    ],
  },
  {
    id: 'institution',
    label: 'Institution',
    items: [
      { label: 'About', href: '/about', desc: 'Our thesis and why we exist' },
      { label: 'Manifesto', href: '/manifesto', desc: 'Potential into production' },
      { label: 'Network', href: '/network', desc: 'Builders, founders, institutions, capital' },
      { label: 'Community', href: '/community', desc: 'Meetups and the FutureLabs builder community' },
      { label: 'Blog', href: '/blog', desc: 'Insights, updates and stories' },
      { label: 'Contact', href: '/contact', desc: 'Start a conversation' },
    ],
  },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'What We Build', href: '/about#what-we-build' },
  { label: 'Ventures', href: '/startups' },
  { label: 'Research', href: '/research-labs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Events', href: '/events' },
  { label: 'Network', href: '/network' },
  { label: 'Partner With Us', href: '/partner' },
];

export const FOOTER_ARMS: NavItem[] = [
  { label: 'FutureLabs Academy', href: '/academy' },
  { label: 'FutureLabs Ventures', href: '/startups' },
  { label: 'FutureLabs Studio', href: '/studio' },
  { label: 'FutureLabs Intelligence', href: '/research-labs' },
];

export const FOOTER_PROGRAMMES: NavItem[] = [
  { label: 'AI Fellowship', href: '/ai-fellowship' },
  { label: 'VibeCode', href: '/vibecode' },
  { label: 'Teach with us', href: '/apply-to-teach' },
  { label: 'Community', href: '/community' },
  { label: 'Resources', href: '/resources' },
];

export const SOCIAL_LINKS: NavItem[] = [
  { label: 'X / Twitter', href: 'https://x.com/FutureLabsNG' },
  { label: 'LinkedIn', href: 'https://linkedin.com/school/future-labs-ng/' },
  { label: 'Instagram', href: 'https://instagram.com/futurelabshq/' },
  { label: 'Facebook', href: 'https://www.facebook.com/FutureLabsNews' },
];

export const CONTACT = {
  email: 'hello@futurelabs.africa',
  phone: '+234 703 240 0529',
  phoneHref: 'tel:+2347032400529',
  location: 'Akwa Ibom, Nigeria',
};

export const PARTNERS = ['iDICE', 'NITDA', 'ONDI', 'PIND', 'Ritman University', 'AKSG', 'LEAP Africa'];

export const LOGO_SRC = '/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png';
