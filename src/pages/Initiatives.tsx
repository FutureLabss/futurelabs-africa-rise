import React from 'react';
import Navbar from '@/components/Navbar';
import Initiatives from '@/components/Initiatives';
import Footer from '@/components/Footer';

const InitiativesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="bg-primary/5 py-12 mb-10 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center font-roboto text-foreground">Our Initiatives</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4 mb-8"></div>
            <p className="text-center text-lg text-foreground/80 max-w-3xl mx-auto">
              Our diverse initiatives foster collaboration, research, and entrepreneurship for youth and professionals.
            </p>
          </div>
        </div>
        <Initiatives />
      </main>
      <Footer />
    </div>
  );
};

export default InitiativesPage;