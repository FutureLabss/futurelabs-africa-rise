// Free products from FutureLabs Studio, shown on /studio.
// Release files live in public/downloads/. To ship a new version: copy the zip
// there, remove the old one, and update `version`, `size` and `download` below.

export type Product = {
  id: string;
  kind: string;
  name: string;
  summary: string;
  features: string[];
  version: string;
  size: string;
  requires: string;
  download: string;
  // `focus` is the part of the image kept when the card crops it (Tailwind object-position class).
  image: { src: string; alt: string; width: number; height: number; focus?: string };
  live?: { label: string; href: string };
  install: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'newstheme',
    kind: 'WordPress theme',
    name: 'NewsTheme',
    summary:
      'A fast news and magazine theme for publishers. Build the homepage, header and footer by dragging sections, and show opportunity deadlines on every post.',
    features: [
      'Drag-and-drop header and footer',
      'Homepage sections and blocks',
      'Deadline badges: "Closes in 3 days"',
      '"Closing soon" homepage list',
      'Dark mode',
      'One-click demo content',
      'Accessible and lightweight',
    ],
    version: '1.1.1',
    size: '420 KB',
    requires: 'WordPress 6.4+ · PHP 8.0+',
    download: '/downloads/newstheme-1.1.1.zip',
    image: {
      src: '/images/studio/newstheme.jpg',
      alt: 'NewsTheme homepage with a featured story grid, trending posts and popular posts',
      width: 1200,
      height: 900,
    },
    live: { label: 'See it live on OpportunityLab', href: 'https://opportunitylab.net' },
    install: [
      'In WordPress, go to Appearance → Themes → Add New Theme → Upload Theme and choose the zip.',
      'Optional: install the free One Click Demo Import plugin, then use Appearance → Import Demo Data to load the sample site. The demo content is hosted here, so there is nothing else to set up.',
    ],
  },
  {
    id: 'futurelabs-ai-seo',
    kind: 'WordPress plugin',
    name: 'FutureLabs AI SEO',
    summary:
      'An SEO plugin that starts with indexing: it finds what keeps your pages out of Google, tells you what to fix first, and helps you fix it inside WordPress.',
    features: [
      'Titles, descriptions and social cards',
      'XML sitemap with validation',
      'Redirects and 404 log',
      'Search Console indexing reports',
      'Internal link suggestions',
      'Thin and duplicate content checks',
      'Opportunity deadlines and expiry',
      'Schema and breadcrumbs',
      'Bulk changes with undo',
      'AI suggestions with Claude, OpenAI, Gemini or any OpenAI-compatible model',
    ],
    version: '1.2.1',
    size: '620 KB',
    requires: 'WordPress 6.4+ · PHP 8.0+',
    download: '/downloads/futurelabs-ai-seo-1.2.1.zip',
    image: {
      src: '/images/studio/futurelabs-ai-seo.jpg',
      alt: 'FutureLabs AI SEO dashboard showing known URLs, pages with content findings, orphan pages and a "Fix this first" list',
      width: 1440,
      height: 857,
      focus: 'object-left-top',
    },
    install: [
      'In WordPress, go to Plugins → Add New Plugin → Upload Plugin, choose the zip and activate it.',
      'The setup wizard checks for other SEO plugins and can import your existing titles and descriptions from Yoast, Rank Math or All in One SEO.',
      'AI suggestions are off until you turn them on and add your own API key. Nothing is published until an editor approves it.',
    ],
  },
];
