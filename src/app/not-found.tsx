import Link from 'next/link';
import SiteShell from '@/components/site/SiteShell';

export default function NotFound() {
  return (
    <SiteShell>
      <section className="fl-section">
        <div className="fl-wrap flex min-h-[60vh] flex-col justify-center py-24">
          <div className="fl-eyebrow-accent">404 · Page not found</div>
          <h1 className="fl-h1 m-0 mt-[26px] max-w-[16ch]">This page doesn&apos;t exist, or has moved.</h1>
          <p className="fl-lede m-0 mt-6 max-w-[46ch]">
            Some pages were folded into the new site. Start from the homepage or tell us what you were looking for.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="fl-btn">Go to the homepage</Link>
            <Link href="/contact" className="fl-btn-ghost">Contact us</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
