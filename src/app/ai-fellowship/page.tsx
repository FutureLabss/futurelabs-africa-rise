import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import AiFellowshipClient from '@/components/AiFellowshipClient';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs AI Fellowship — Apply',
  description: 'Apply for the FutureLabs AI Fellowship: applied AI training taken through to industry placement and real deployments.',
  path: '/ai-fellowship',
});

export default function AiFellowshipPage() {
  return <AiFellowshipClient />;
}
