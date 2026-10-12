// Products from FutureLabs Studio, shown on /studio.
// Release files live in public/downloads/. To ship a new version: copy the zip
// there, remove the old one, and update `version`, `size` and `download` below.

export type ProductLink = { label: string; href: string };

export type Product = {
  id: string;
  kind: string;
  /** Free to download and use (shown as a "Free" tag). */
  free: boolean;
  name: string;
  summary: string;
  features: string[];
  /** Short facts shown in mono type under the features. */
  facts: string[];
  /** Release zip for downloadable products. */
  download?: { href: string; version: string; size: string };
  /** Main action for hosted products, or a live preview for downloads. */
  primary?: ProductLink;
  secondary?: ProductLink;
  // `focus` is the part of the image kept when the card crops it (Tailwind object-position class).
  image: { src: string; alt: string; width: number; height: number; focus?: string };
  /** Collapsible steps under the actions. */
  steps?: { title: string; items: string[] };
};

export const PRODUCTS: Product[] = [
  {
    id: 'newstheme',
    kind: 'WordPress theme',
    free: true,
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
    facts: ['Version 1.1.1', '420 KB', 'WordPress 6.4+ · PHP 8.0+', 'GPL licence'],
    download: { href: '/downloads/newstheme-1.1.1.zip', version: '1.1.1', size: '420 KB' },
    primary: { label: 'Try it live', href: '/studio/preview/newstheme' },
    secondary: { label: 'See it on OpportunityLab', href: 'https://opportunitylab.net' },
    image: {
      src: '/images/studio/newstheme.jpg',
      alt: 'NewsTheme homepage with a featured story grid, trending posts and popular posts',
      width: 1200,
      height: 900,
    },
    steps: {
      title: 'How to install',
      items: [
        'In WordPress, go to Appearance → Themes → Add New Theme → Upload Theme and choose the zip.',
        'Optional: install the free One Click Demo Import plugin, then use Appearance → Import Demo Data to load the sample site. The demo content is hosted here, so there is nothing else to set up.',
      ],
    },
  },
  {
    id: 'futurelabs-ai-seo',
    kind: 'WordPress plugin',
    free: true,
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
    facts: ['Version 1.2.1', '620 KB', 'WordPress 6.4+ · PHP 8.0+', 'GPL licence'],
    download: { href: '/downloads/futurelabs-ai-seo-1.2.1.zip', version: '1.2.1', size: '620 KB' },
    image: {
      src: '/images/studio/futurelabs-ai-seo.jpg',
      alt: 'FutureLabs AI SEO dashboard showing known URLs, pages with content findings, orphan pages and a "Fix this first" list',
      width: 1440,
      height: 857,
      focus: 'object-left-top',
    },
    steps: {
      title: 'How to install',
      items: [
        'In WordPress, go to Plugins → Add New Plugin → Upload Plugin, choose the zip and activate it.',
        'The setup wizard checks for other SEO plugins and can import your existing titles and descriptions from Yoast, Rank Math or All in One SEO.',
        'AI suggestions are off until you turn them on and add your own API key. Nothing is published until an editor approves it.',
      ],
    },
  },
  {
    id: 'futurelabs-lms',
    kind: 'Learning management system',
    free: false,
    name: 'FutureLabs LMS',
    summary:
      'Run a coding academy from one place: enrollment, invoicing, curriculum, cohorts, schedules, attendance and payroll, across one hub or many. Built for African tech education.',
    features: [
      'Student enrollment',
      'Invoices and payments in naira',
      'Curriculum and lessons',
      'Cohorts and schedules',
      'Attendance',
      'Payroll and expenses',
      'Finance dashboard',
      'Multi-hub management',
    ],
    facts: ['Hosted web app', 'Live demo with sample data'],
    primary: { label: 'Try the demo', href: 'https://admin.futurelabs.ng/demo' },
    secondary: { label: 'Talk to us', href: '/contact' },
    image: {
      src: '/images/studio/futurelabs-lms.jpg',
      alt: 'FutureLabs LMS dashboard showing active students, programs, monthly revenue, recent lessons and a finance snapshot',
      width: 1440,
      height: 900,
      focus: 'object-left-top',
    },
  },
];
