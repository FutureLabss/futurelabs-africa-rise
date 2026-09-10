import React from 'react';
import { Metadata } from 'next';
import VibeCodeClient from '@/components/VibeCodeClient';

export const metadata: Metadata = {
  title: "VibeCode",
  description: "Register for VibeCode — FutureLabs Africa's coding competition. Prove your skills and compete with the best developers across the continent.",
};

export default function VibeCodePage() {
  return <VibeCodeClient />;
}
