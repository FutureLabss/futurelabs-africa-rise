
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Programs from '@/components/Programs';
import ImpactStories from '@/components/ImpactStories';
import Partners from '@/components/partner';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <main>
        <AboutUs />
        <Programs />
        <ImpactStories />
        <Partners />
        <GetInvolvedSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
