import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CommunityClient from '@/components/CommunityClient';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Community',
  description: "Join the FutureLabs community of developers, founders and tech enthusiasts shaping Africa's digital future.",
  path: '/community',
});

export default function CommunityPage() {
  return <CommunityClient />;
}
