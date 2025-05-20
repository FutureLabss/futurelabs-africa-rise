
import React from 'react';
import Navbar from '@/components/Navbar';
import WhatWeDoComponent from '@/components/WhatWeDo';
import Footer from '@/components/Footer';

const WhatWeDo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="bg-primary/5 py-12 mb-10 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">What We Do</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4 mb-8"></div>
          </div>
        </div>
        <WhatWeDoComponent />
      </main>
      <Footer />
    </div>
  );
};

export default WhatWeDo;
