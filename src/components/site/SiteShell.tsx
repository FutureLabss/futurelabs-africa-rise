import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from './ScrollReveal';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-fl-ink text-fl-paper">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollReveal />
    </div>
  );
}
