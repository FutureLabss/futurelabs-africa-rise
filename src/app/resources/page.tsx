import React from 'react';
import { Metadata } from 'next';
import ResourcesClient from '@/components/ResourcesClient';

export const metadata: Metadata = {
  title: "Resources & Opportunities",
  description: "Explore developer resources, educational materials, and career opportunities provided by FutureLabs.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
