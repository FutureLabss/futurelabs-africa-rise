import React from 'react';
import Navbar from '@/components/Navbar';
import Programs from '@/components/Programs';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const ProgramsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageHero
          title="Our Programs"
          subtitle="Future Labs runs accelerator and capacity-building programs to nurture Africa's next generation of tech leaders."
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