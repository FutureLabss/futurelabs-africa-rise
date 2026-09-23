import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import EventsClient from '@/components/EventsClient';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Events — Hackathons, Demo Days & Meetups',
  description: 'Upcoming FutureLabs events in Nigeria and online: hackathons, demo days, industry roundtables and workshops. Register and join the network.',
  path: '/events',
});

export default function EventsPage() {
  return <EventsClient />;
}
