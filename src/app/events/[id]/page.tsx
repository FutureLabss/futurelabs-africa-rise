import { Metadata } from 'next';
import EventDetailClient from '@/components/EventDetailClient';
import { supabase } from '@/integrations/supabase/client';
import { pageMeta } from '@/lib/seo';

type Params = { params: { id: string } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Plain-text summary of the event's rich-text description for meta tags. */
function summary(html: string | null) {
  const text = (html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const fallback = pageMeta({
    title: 'FutureLabs Event',
    description: 'Event details and registration for FutureLabs events in Nigeria and online.',
    path: `/events/${params.id}`,
  });
  try {
    const query = supabase
      .from('events')
      .select('title, slug, description, image_url, start_time')
      .abortSignal(AbortSignal.timeout(3000));
    const { data } = await (UUID.test(params.id) ? query.eq('id', params.id) : query.eq('slug', params.id)).maybeSingle();
    if (!data) return fallback;
    const date = new Date(data.start_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return pageMeta({
      title: `${data.title} — FutureLabs Event`,
      description: summary(data.description) || `${data.title}, a FutureLabs event on ${date}. Register now.`,
      path: `/events/${data.slug}`,
      ...(data.image_url ? { image: data.image_url } : {}),
    });
  } catch {
    return fallback;
  }
}

export default function EventPage() {
  return <EventDetailClient />;
}
