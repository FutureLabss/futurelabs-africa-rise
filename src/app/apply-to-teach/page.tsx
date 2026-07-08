import React from 'react';
import { Metadata } from 'next';
import TutorApplicationClient from '@/components/TutorApplicationClient';

export const metadata: Metadata = {
  title: "Apply to Teach",
  description: "Join FutureLabs as a tutor or mentor. Help train the next wave of cybersecurity professionals and tech talents.",
};

export default function ApplyToTeachPage() {
  return <TutorApplicationClient />;
}
