
import React from 'react';
import Navbar from '@/components/Navbar';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageHero
          title="About Future Labs"
          subtitle="We inspire, empower, and incubate high-impact tech ideas and startups across Africa."
        />
        <div className="mx-10">
          <AboutUs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
