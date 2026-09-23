import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'FutureLabs Programme Details',
  description: 'Details, dates and eligibility for FutureLabs programmes in Africa.',
  path: '/program-details',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
