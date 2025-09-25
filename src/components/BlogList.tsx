
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { blogPosts } from '@/data/blogPosts';

const BlogList = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-105">
              <div className="h-60 overflow-hidden">
                <img 
                  src={`${post.imageUrl}?w=500&h=400&fit=crop&auto=format&q=80`}
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-primary font-medium">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold">{post.title}</h3>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link to={`/blog/${post.id}`} className="text-primary hover:underline font-medium inline-flex items-center">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
