import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValuePillars from '@/components/ValuePillars';
import ProgramsHighlight from '@/components/ProgramsHighlight';
import ImpactStrip from '@/components/ImpactStrip';
import CommunityTeaser from '@/components/CommunityTeaser';
import BlogPreview from '@/components/BlogPreview';
import Partners from '@/components/partner';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ValuePillars />
        <ProgramsHighlight />
        <ImpactStrip />
        <CommunityTeaser />
        <div className="container mx-auto px-4">
          <BlogPreview />
        </div>
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
