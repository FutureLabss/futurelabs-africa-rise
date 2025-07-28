import React from 'react';
import Navbar from '@/components/Navbar';
import Initiatives from '@/components/Initiatives';
import Footer from '@/components/Footer';

const InitiativesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <Initiatives />
      </main>
      <Footer />
    </div>
  );
};

export default InitiativesPage;