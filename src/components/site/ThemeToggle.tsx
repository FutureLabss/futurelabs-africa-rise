"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Light/dark switch. Renders an empty box until mounted so the icon never mismatches the stored theme. */
export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === 'dark';
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className={cn(
        'flex h-11 w-11 flex-none items-center justify-center text-fl-body transition-colors hover:text-fl-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fl-orange',
        className
      )}
    >
      {mounted && (dark ? <Sun aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} /> : <Moon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />)}
    </button>
  );
}
