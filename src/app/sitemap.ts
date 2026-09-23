import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog';
import { supabase } from '@/integrations/supabase/client';
import { SITE_URL } from '@/lib/seo';

// Rebuilt at most once an hour so new events appear without a redeploy.
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];
const page = (path: string, changeFrequency: Entry['changeFrequency'], priority: number): Entry => ({
  url: `${SITE_URL}${path}`,
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    page('/', 'weekly', 1),
    ...['/about', '/academy', '/startups', '/studio', '/research-labs', '/government', '/enterprise', '/partner', '/contact'].map((p) =>
      page(p, 'monthly', 0.8)
    ),
    page('/events', 'weekly', 0.8),
    page('/blog', 'weekly', 0.8),
    ...['/manifesto', '/network', '/ai-fellowship', '/vibecode', '/apply-to-teach', '/community', '/resources', '/register', '/youth-collaboration', '/program-details'].map((p) =>
      page(p, 'monthly', 0.6)
    ),
    ...posts.map((p) => {
      const date = new Date(p.date);
      return { ...page(`/blog/${p.id}`, 'yearly', 0.6), ...(isNaN(+date) ? {} : { lastModified: date }) };
    }),
  ];

  // Event pages come from Supabase; the sitemap still builds if it is unreachable.
  try {
    const { data } = await supabase.from('events').select('slug, updated_at').abortSignal(AbortSignal.timeout(5000));
    for (const e of data ?? []) {
      entries.push({ ...page(`/events/${e.slug}`, 'weekly', 0.6), lastModified: new Date(e.updated_at) });
    }
  } catch {
    /* keep static entries */
  }

  return entries;
}
