import React from 'react';
import { Metadata } from 'next';
import AiHackathonClient from '@/components/AiHackathonClient';

export const metadata: Metadata = {
  title: "AI Hackathon Submission",
  description: "Submit your artificial intelligence projects and innovations to the FutureLabs AI Hackathon.",
};

export default function AiHackathonPage() {
  return <AiHackathonClient />;
}
