
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const BlogPreview = () => {
  // Only show the first 3 blog posts
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest From Our Blog</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights, updates, and stories from the FutureLabs ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {previewPosts.map((post) => {
            const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
            return (
              <Card
                key={post.id}
                ref={ref}
                className={
                  "overflow-hidden rounded-xl transition-all duration-500 ease-out hover:shadow-lg hover:scale-105 " +
                  (inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")
                }
              >
              <div className="h-48 overflow-hidden">
                <img 
                  src={`${post.imageUrl}?w=400&h=300&fit=crop&auto=format&q=80`}
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <CardHeader className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-primary font-[600]">{post.category}</span>
                  <span className="text-xs text-gray-500 font-[600]">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-gray-600 text-sm line-clamp-3 font-[600]">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <a href={`/blog/${post.id}`} className="text-primary hover:underline text-sm font-[600] inline-flex items-center">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild className="bg-accent hover:bg-accent/90">
            <a href="/blog">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
