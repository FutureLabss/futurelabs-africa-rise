
import React from 'react';
import Navbar from '@/components/Navbar';
import Impact from '@/components/Impact';
import Footer from '@/components/Footer';

const ImpactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 mx-10">
        <div className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Our Impact</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-8"></div>
          </div>
        </div>
        <Impact />
      </main>
      <Footer />
    </div>
  );
};

export default ImpactPage;
