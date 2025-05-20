
import React from 'react';
import Navbar from '@/components/Navbar';
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 mx-10">
        <div className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Blog</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-8"></div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, insights, and stories from FutureLabs.
            </p>
          </div>
        </div>
        <BlogList />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
