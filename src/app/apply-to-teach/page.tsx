import React from 'react';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import TutorApplicationClient from '@/components/TutorApplicationClient';

export const metadata: Metadata = pageMeta({
  title: 'Teach at FutureLabs — Tutor Application',
  description: 'Apply to teach cybersecurity and tech at FutureLabs. Join the tutor network training the next generation of African tech talent.',
  path: '/apply-to-teach',
});

export default function ApplyToTeachPage() {
  return <TutorApplicationClient />;
}
