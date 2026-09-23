import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import ResourcesClient from '@/components/ResourcesClient';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Resources & Opportunities',
  description: 'Resources, opportunities and upcoming events from FutureLabs for African builders, founders and learners.',
  path: '/resources',
});

export default function ResourcesPage() {
  return <ResourcesClient />;
}
