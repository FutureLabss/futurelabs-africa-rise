import aiSeoRelease from '../../public/downloads/futurelabs-ai-seo.json';

// Products from FutureLabs Studio, shown on /studio.
// Release files live in public/downloads/. To ship a new version: copy the zip
// there, remove the old one, and update `version`, `size` and `download` below.

export type ProductLink = { label: string; href: string };

export type BillingInterval = 'month' | 'year';
export type Currency = 'USD' | 'NGN';

/** A Pro tier. Prices are whole units (dollars / naira) and must match the
 *  `product_prices` table, which is what checkout actually charges. */
export type PriceTier = {
  id: 'personal' | 'business' | 'agency';
  name: string;
  /** null = unlimited sites. */
  sites: number | null;
  prices: Record<BillingInterval, Record<Currency, number>>;
};

export const sitesLabel = (sites: number | null) =>
  sites === null ? 'Unlimited sites' : `${sites} site${sites > 1 ? 's' : ''}`;

export type Pricing = {
  /** false: tiers show "Join the waitlist" instead of checkout (no Pro build yet). */
  available: boolean;
  /** What every Pro tier adds on top of the free version. */
  features: string[];
  tiers: PriceTier[];
};

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
  /** Paid Pro tiers, sold as monthly or yearly subscriptions. */
  pricing?: Pricing;
};

const tier = (id: PriceTier['id'], sites: number | null, month: [number, number], year: [number, number]): PriceTier => ({
  id,
  name: { personal: 'Personal', business: 'Business', agency: 'Agency' }[id],
  sites,
  prices: { month: { USD: month[0], NGN: month[1] }, year: { USD: year[0], NGN: year[1] } },
});

// About half the price of comparable products (AIOSEO, Yoast Premium, Rank Math PRO;
// Newspaper, JNews, GeneratePress Premium). Naira at roughly ₦1,375 to $1, rounded.
const SUPPORT = ['Updates while subscribed', 'Priority email support'];

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
    facts: ['Version 1.1.2', '420 KB', 'WordPress 6.4+ · PHP 8.0+', 'GPL licence'],
    download: { href: '/downloads/newstheme-1.1.2.zip', version: '1.1.2', size: '420 KB' },
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
    pricing: {
      available: false,
      features: ['Everything in Free', 'NewsTheme Pro add-on', ...SUPPORT],
      tiers: [
        tier('personal', 1, [3, 4_000], [29, 40_000]),
        tier('business', 5, [6, 8_000], [59, 81_000]),
        tier('agency', null, [10, 14_000], [99, 135_000]),
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
    // Version, size and download come from the release manifest that the plugin's
    // release script publishes (bin/publish-site.sh); WordPress sites read it for updates.
    facts: [`Version ${aiSeoRelease.version}`, aiSeoRelease.size, 'WordPress 6.4+ · PHP 8.0+', 'GPL licence'],
    download: {
      href: new URL(aiSeoRelease.download_url).pathname,
      version: aiSeoRelease.version,
      size: aiSeoRelease.size,
    },
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
    pricing: {
      available: true,
      features: [
        'Everything in Free',
        'Weekly or monthly email reports',
        'Query ideas and pages losing traffic',
        'Pages competing for the same search',
        'Core Web Vitals checks',
        ...SUPPORT,
      ],
      tiers: [
        tier('personal', 1, [5, 7_000], [49, 67_500]),
        tier('business', 5, [13, 18_000], [129, 177_500]),
        tier('agency', null, [30, 41_000], [299, 410_000]),
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
