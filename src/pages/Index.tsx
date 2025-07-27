
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Initiatives from '@/components/Initiatives';
import Programs from '@/components/Programs';
import Impact from '@/components/Impact';
import BlogPreview from '@/components/BlogPreview';
import GetInvolved from '@/components/GetInvolved';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className="mx-10">
        <Hero />
        <AboutUs />
        <Initiatives />
        <Programs />
        <Impact />
        <BlogPreview />
        <GetInvolved />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
