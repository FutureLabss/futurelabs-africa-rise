import React from 'react';
import Navbar from '@/components/Navbar';
import Programs from '@/components/Programs';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Explore FutureLabs capacity-building programs, talent accelerators, and incubators building Africa's next generation of tech leaders.",
};


const ProgramsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero
          title="Our Programs"
          subtitle="Future Labs runs accelerator and capacity-building programs to nurture Africa's next generation of tech leaders."
          backgroundImageUrl="/images/futurelabs-hero.jpeg"
        />
        <div className="mx-10">
          <Programs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramsPage;