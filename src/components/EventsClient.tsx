"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import SiteShell from '@/components/site/SiteShell';
import SubscribeForm from '@/components/site/SubscribeForm';
import { Section, PhotoHero, Duotone, CtaBand } from '@/components/site/primitives';

type EventRow = Tables<'events'>;

const FORMATS = [
  ['Hackathons', 'Problem-led builds against real institutional and industry briefs.'],
  ['Demo days', 'Founders in front of investors, corporates and public buyers.'],
  ['Industry roundtables', 'Closed sessions on AI adoption, skills and technology policy.'],
  ['Workshops', 'Short, practical training for teams inside partner organizations.'],
];

// Shown when there are no past events in the database yet.
const CONVENINGS = [
  { img: '/images/site/hackathon.jpg', flag: 'Hackathon', title: 'AI Hackathon', text: 'Teams building applied AI against briefs from partner organizations.' },
  { img: '/images/site/fellowship.jpg', flag: 'Demo day', title: 'Fellowship Demo Day', text: 'Fellows presenting deployed work to employers and investors.' },
  { img: '/images/site/community.jpg', flag: 'Meetup', title: 'Builders Meetup', text: 'Engineers, founders and researchers in the FutureLabs network.' },
];

const FALLBACK_IMG = ['/images/site/community.jpg', '/images/site/team.jpg', '/images/site/fellowship.jpg'];

const LOCATION_LABEL: Record<string, string> = { 'in-person': 'In person', virtual: 'Online', hybrid: 'Hybrid' };

function EventCard({ event, index, count, past }: { event: EventRow; index: number; count?: number; past?: boolean }) {
  const start = new Date(event.start_time);
  return (
    <Link
      href={`/events/${event.slug}`}
      className="fl-card group flex flex-col text-fl-paper hover:text-fl-paper hover:shadow-[0_0_0_1px_rgba(245,130,32,.55)]"
    >
      <Duotone
        src={event.image_url || FALLBACK_IMG[index % FALLBACK_IMG.length]}
        alt=""
        flag={event.featured && !past ? 'Featured' : LOCATION_LABEL[event.location_type] ?? event.location_type}
        light
        className="h-[200px] flex-none"
      />
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <span className="font-mono text-[10.5px] uppercase leading-[1.4] text-fl-label">
          {format(start, 'MMM d, yyyy')} · {format(start, 'h:mm a')}
          {event.location_details ? ` · ${event.location_details}` : ''}
        </span>
        <h3 className="text-[21px] font-semibold leading-[1.14] tracking-[-0.025em]">{event.title}</h3>
        {!past && count ? <span className="font-mono text-[11px] text-fl-muted">{count} registered</span> : null}
        <span className="fl-link mt-auto pt-3 group-hover:text-fl-paper">{past ? 'View recap' : 'View event & register'} →</span>
      </div>
    </Link>
  );
}

export default function EventsClient() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [regCounts, setRegCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true })
      .then(({ data }) => {
        const evts = data || [];
        setEvents(evts);
        setLoading(false);
        if (evts.length > 0) {
          supabase.rpc('get_registration_counts', { event_ids: evts.map((e) => e.id) }).then(({ data: counts }) => {
            if (counts) {
              const map: Record<string, number> = {};
              (counts as { event_id: string; count: number }[]).forEach((r) => {
                map[r.event_id] = Number(r.count);
              });
              setRegCounts(map);
            }
          });
        }
      });
  }, []);

  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.start_time) >= now)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
  const past = events.filter((e) => new Date(e.start_time) < now).reverse();

  return (
    <SiteShell>
      <PhotoHero
        img="/images/site/community.jpg"
        eyebrow="Events"
        title="Where capability meets demand."
        lede="Hackathons, demo days and industry convenings that put talent, founders and institutions in the same room."
      />

      <Section innerClassName="py-[72px]">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="m-0 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.06] tracking-[-0.032em]">Upcoming events</h2>
          {upcoming.length > 0 && <span className="font-mono text-[11px] text-fl-label">{upcoming.length} scheduled</span>}
        </div>
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading events">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[340px] animate-pulse bg-fl-graphite shadow-[0_0_0_1px_rgba(242,240,234,.1)]" />
            ))}
          </div>
        ) : upcoming.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} count={regCounts[e.id]} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 bg-fl-graphite px-7 py-8 shadow-[0_0_0_1px_rgba(242,240,234,.14)]">
            <p className="m-0 text-[18px] font-semibold tracking-[-0.02em]">No public events scheduled right now.</p>
            <p className="fl-card-text m-0">Get the calendar below and we&apos;ll send dates to you before they go public.</p>
          </div>
        )}
      </Section>

      <Section tone="graphite" innerClassName="py-[72px]">
        <h2 className="fl-eyebrow mb-[30px]">Formats</h2>
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {FORMATS.map(([title, text], i) => (
            <div key={title} className="flex min-h-[200px] flex-col gap-3 bg-fl-graphite px-6 pb-[34px] pt-[30px] shadow-[0_0_0_1px_rgba(242,240,234,.14)]">
              <span className="fl-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[21px] font-semibold leading-[1.14] tracking-[-0.025em]">{title}</h3>
              <p className="m-0 text-[14px] leading-[1.6] text-fl-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section innerClassName="grid items-center gap-12 py-20 md:grid-cols-2">
        <div>
          <h2 className="m-0 max-w-[16ch] text-[clamp(28px,3.2vw,44px)] font-semibold leading-[1.04] tracking-[-0.032em]">
            The calendar goes out before it goes public.
          </h2>
          <p className="m-0 mt-5 max-w-[44ch] text-[16.5px] leading-[1.6] text-fl-soft">
            Dates, briefs and applications are sent to the FutureLabs network first.
          </p>
        </div>
        <div className="flex flex-col gap-[18px] bg-fl-graphite px-[30px] pb-[34px] pt-8 shadow-[0_0_0_1px_rgba(242,240,234,.16)]">
          <div className="fl-tag">Get the calendar</div>
          <SubscribeForm
            subject="Events calendar subscription"
            roleOptions={['Builder', 'Founder', 'Institution', 'Investor', 'Employer', 'Other']}
            successText="You're on the list. Dates and briefs will come to you first."
          />
        </div>
      </Section>

      <Section tone="graphite" innerClassName="py-20">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="m-0 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.06] tracking-[-0.032em]">Recent convenings</h2>
          <Link href="/network" className="fl-link text-[13px]">Join the network →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {!loading && past.length > 0
            ? past.slice(0, 6).map((e, i) => <EventCard key={e.id} event={e} index={i} past />)
            : CONVENINGS.map((c) => (
                <div key={c.title} className="fl-card flex flex-col">
                  <Duotone src={c.img} flag={c.flag} light className="h-[200px] flex-none" />
                  <div className="flex flex-col gap-2.5 p-6">
                    <h3 className="text-[21px] font-semibold leading-[1.14] tracking-[-0.025em]">{c.title}</h3>
                    <p className="m-0 text-[14px] leading-[1.6] text-fl-muted">{c.text}</p>
                  </div>
                </div>
              ))}
        </div>
      </Section>

      <CtaBand title="Want to host or co-convene with us?">
        <Link href="/contact" className="fl-btn-dark">Start a conversation</Link>
      </CtaBand>
    </SiteShell>
  );
}
