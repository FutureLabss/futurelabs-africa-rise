"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check if the URL has a hash-based path from the old HashRouter (e.g. /#/about)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const cleanPath = hash.substring(2); // Extract path after '#/'
      router.replace('/' + cleanPath);
    }
  }, [router]);

  return null;
}
