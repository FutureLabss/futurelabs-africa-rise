import React from 'react';
import { Metadata } from 'next';
import AiFellowshipClient from '@/components/AiFellowshipClient';

export const metadata: Metadata = {
  title: "AI Fellowship Application",
  description: "Apply for the FutureLabs AI Fellowship to master machine learning, deep learning, and generative AI skills.",
};

export default function AiFellowshipPage() {
  return <AiFellowshipClient />;
}
