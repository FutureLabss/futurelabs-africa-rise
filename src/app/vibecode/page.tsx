import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import VibeCodeClient from '@/components/VibeCodeClient';

export const metadata: Metadata = pageMeta({
  title: 'VibeCode by FutureLabs — Register',
  description: "Register for VibeCode, FutureLabs Africa's beginner-friendly coding programme. No experience needed — build something real in 4 weeks.",
  path: '/vibecode',
});

export default function VibeCodePage() {
  return <VibeCodeClient />;
}
