import React from 'react';
import { Metadata } from 'next';
import EventsClient from '@/components/EventsClient';

export const metadata: Metadata = {
  title: "Events",
  description: "Discover workshops, conferences, and meetups organized by FutureLabs. Register and connect with innovators across Africa.",
};

export default function EventsPage() {
  return <EventsClient />;
}
