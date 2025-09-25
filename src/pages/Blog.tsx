
import React from 'react';
import Navbar from '@/components/Navbar';
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageHero
          title="Blog"
          subtitle="Stay updated with the latest news, insights, and stories from FutureLabs."
        />
        <div className="mx-10">
          <BlogList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
