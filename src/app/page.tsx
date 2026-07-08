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
import TutorCtaModal from '@/components/TutorCtaModal';
import JsonLd from '@/components/JsonLd';
import IntentSelector from '@/components/IntentSelector';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Accelerating Africa's Future",
  description: "FutureLabs is a digital innovation hub on a mission to equip African youth with the skills, mindset, and tools to solve real-world problems, build transformative startups, and thrive in the global digital economy.",
};


const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FutureLabs Africa",
  "url": "https://futurelabs.africa",
  "logo": "https://futurelabs.africa/favicon.png",
  "description": "FutureLabs is a digital innovation hub on a mission to equip African youth with the skills, mindset, and tools to solve real-world problems, build transformative startups, and thrive in the global digital economy.",
  "sameAs": [
    "https://twitter.com/futurelabsafrica",
    "https://linkedin.com/company/futurelabsafrica",
    "https://instagram.com/futurelabsafrica",
    "https://facebook.com/futurelabsafrica"
  ]
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={orgSchema} />
      <Navbar />
      <main>
        <Hero />
        <IntentSelector />
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
      <TutorCtaModal />
    </div>
  );
};

export default Index;
