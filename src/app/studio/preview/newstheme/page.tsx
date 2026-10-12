import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMeta, SITE_URL } from '@/lib/seo';
import SiteShell from '@/components/site/SiteShell';
import { PRODUCTS } from '@/data/products';
import DownloadGate from '@/components/site/DownloadGate';

// WordPress Playground runs a full WordPress in the visitor's browser (WebAssembly),
// so a static host can offer a live preview. The blueprint loads the NewsTheme demo
// site from public/playground/. Both files need CORS headers (netlify.toml).
const BLUEPRINT = `${SITE_URL}/playground/newstheme.json`;
const PLAYGROUND = `https://playground.wordpress.net/?mode=seamless&blueprint-url=${encodeURIComponent(BLUEPRINT)}`;

export const metadata: Metadata = {
  ...pageMeta({
    title: 'NewsTheme live preview — FutureLabs Studio',
    description: 'Try the free NewsTheme WordPress theme live in your browser, with demo content and the admin area.',
    path: '/studio/preview/newstheme',
  }),
  // The page is mostly an embed; the product itself is described on /studio.
  robots: { index: false, follow: true },
};

export default function NewsThemePreviewPage() {
  const theme = PRODUCTS.find((p) => p.id === 'newstheme');
  return (
    <SiteShell>
      <section className="fl-section">
        <div className="fl-wrap flex flex-wrap items-end justify-between gap-6 pb-6 pt-10">
          <div>
            <div className="fl-eyebrow-accent">Live preview</div>
            <h1 className="fl-h2-sm mt-4">NewsTheme</h1>
            <p className="fl-card-text m-0 mt-3 max-w-[64ch]">
              This is a real WordPress site running in your browser, so the first load takes a little while. Click around,
              open the admin at <span className="font-mono text-fl-soft">/wp-admin</span> and change anything: nothing is saved
              and nobody else sees it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {theme?.download && <DownloadGate product={{ id: theme.id, name: theme.name, ...theme.download }} />}
            <a href={PLAYGROUND} target="_blank" rel="noopener noreferrer" className="fl-btn-ghost">
              Open full screen
            </a>
            <Link href="/studio#newstheme" className="fl-btn-ghost">
              Back to Studio
            </Link>
          </div>
        </div>
        <div className="fl-wrap pb-16">
          <iframe
            src={PLAYGROUND}
            title="NewsTheme running in WordPress Playground"
            className="block h-[78vh] min-h-[560px] w-full border-0 bg-white shadow-[0_0_0_1px_rgba(242,240,234,.16)]"
            allow="clipboard-write"
          />
          <p className="fl-card-text mb-0 mt-3 text-[13px]">
            Powered by WordPress Playground. If the preview doesn&apos;t load, use “Open full screen” or try another browser.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
