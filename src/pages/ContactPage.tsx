import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="bg-primary/5 py-12 mb-10 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center font-roboto text-foreground">Contact Us</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4 mb-8"></div>
            <p className="text-center text-lg text-foreground/80 max-w-3xl mx-auto">
              Get in touch with us. We'd love to hear from you and discuss how we can work together.
            </p>
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;