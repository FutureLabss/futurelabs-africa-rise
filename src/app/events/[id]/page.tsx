import { cache } from 'react';
import { Metadata } from 'next';
import EventDetailClient from '@/components/EventDetailClient';
import JsonLd from '@/components/JsonLd';
import { supabase } from '@/integrations/supabase/client';
import { pageMeta, SITE_URL } from '@/lib/seo';
import { HUB } from '@/components/site/nav';
import type { Tables } from '@/integrations/supabase/types';

type Params = { params: { id: string } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Plain-text summary of the event's rich-text description for meta tags. */
function summary(html: string | null) {
  const text = (html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
}

/** One fetch per request, shared by the metadata and the page. Null if missing or Supabase is unreachable. */
const getEvent = cache(async (id: string): Promise<Tables<'events'> | null> => {
  try {
    const query = supabase.from('events').select('*').abortSignal(AbortSignal.timeout(3000));
    const { data } = await (UUID.test(id) ? query.eq('id', id) : query.eq('slug', id)).maybeSingle();
    return data;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getEvent(params.id);
  if (!data) {
    return pageMeta({
      title: 'FutureLabs Event',
      description: 'Event details and registration for FutureLabs events in Nigeria and online.',
      path: `/events/${params.id}`,
    });
  }
  const date = new Date(data.start_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' });
  return pageMeta({
    title: `${data.title} — FutureLabs Event`,
    description: summary(data.description) || `${data.title}, a FutureLabs event on ${date}. Register now.`,
    path: `/events/${data.slug}`,
    ...(data.image_url ? { image: data.image_url } : {}),
  });
}

/** schema.org Event, so search can show the date and place. */
function eventSchema(e: Tables<'events'>) {
  const place = {
    '@type': 'Place',
    name: e.location_details || `FutureLabs, ${HUB.locality}`,
    address: { '@type': 'PostalAddress', addressLocality: HUB.locality, addressRegion: HUB.region, addressCountry: 'NG', ...(e.location_details ? { streetAddress: e.location_details } : {}) },
  };
  const virtual = { '@type': 'VirtualLocation', url: `${SITE_URL}/events/${e.slug}` };
  const mode = { 'in-person': 'Offline', virtual: 'Online', hybrid: 'Mixed' }[e.location_type] ?? 'Offline';
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    startDate: e.start_time,
    ...(e.end_time ? { endDate: e.end_time } : {}),
    description: summary(e.description) || e.title,
    url: `${SITE_URL}/events/${e.slug}`,
    ...(e.image_url ? { image: [e.image_url.startsWith('http') ? e.image_url : `${SITE_URL}${e.image_url}`] } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: `https://schema.org/${mode}EventAttendanceMode`,
    location: e.location_type === 'virtual' ? virtual : e.location_type === 'hybrid' ? [place, virtual] : place,
    organizer: { '@type': 'Organization', name: 'FutureLabs Africa', url: SITE_URL },
  };
}

export default async function EventPage({ params }: Params) {
  const event = await getEvent(params.id);
  return (
    <>
      {event && <JsonLd schema={eventSchema(event)} />}
      <EventDetailClient initialEvent={event} />
    </>
  );
}
