import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Register for a FutureLabs Programme',
  description: 'Register for FutureLabs programmes and events in Nigeria and online.',
  path: '/register',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
