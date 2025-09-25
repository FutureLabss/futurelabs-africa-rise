import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageHero
          title="Contact Us"
          subtitle="Get in touch with us. We'd love to hear from you and discuss how we can work together."
        />
        <div className="mx-10">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;