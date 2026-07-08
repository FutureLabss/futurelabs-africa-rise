import React from 'react';
import { Metadata } from 'next';
import CommunityClient from '@/components/CommunityClient';

export const metadata: Metadata = {
  title: "Our Community",
  description: "Connect with a vibrant network of developers, designers, founders, and tech enthusiasts shaping Africa's digital future.",
};

export default function CommunityPage() {
  return <CommunityClient />;
}
