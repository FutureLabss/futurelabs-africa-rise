
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
import Partners from '@/components/partner';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <main className="mx-10">
        <AboutUs />
        <Programs />
        <Impact />
        <Initiatives />
        <BlogPreview />
      </main>
      <Partners />
      <GetInvolved />
      <Footer />
    </div>
  );
};

export default Index;
