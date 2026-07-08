"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, User, Tag } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import ReactMarkdown from "react-markdown";

function cleanMarkdown(content: string): string {
  if (!content) return "";
  const lines = content.split("\n");
  
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const match = line.match(/^(\s*)/);
    if (match) {
      minIndent = Math.min(minIndent, match[1].length);
    }
  }

  if (minIndent !== Infinity && minIndent > 0) {
    return lines
      .map(line => (line.length >= minIndent ? line.slice(minIndent) : line.trimStart()))
      .join("\n");
  }

  return content;
}

function BlogPostContent({ content }: { content: string }) {
  const cleanedContent = React.useMemo(() => cleanMarkdown(content), [content]);

  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => {
          const isInternal = props.href?.startsWith("/");
          return (
            <a
              className="text-primary hover:underline font-semibold"
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              {...props}
            />
          );
        },
      }}
    >
      {cleanedContent}
    </ReactMarkdown>
  );
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20 px-4">
          <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-foreground/80">The blog post you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jobSchema = post.jobDetails ? {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": post.jobDetails.title,
    "description": post.jobDetails.description,
    "datePosted": post.jobDetails.datePosted,
    "validThrough": post.jobDetails.validThrough,
    "employmentType": post.jobDetails.employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "FutureLabs Africa",
      "sameAs": "https://futurelabs.africa",
      "logo": "https://futurelabs.africa/favicon.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": post.jobDetails.locality,
        "addressRegion": post.jobDetails.region,
        "addressCountry": post.jobDetails.country
      }
    }
  } : null;

  return (
    <div className="flex flex-col min-h-screen">
      {jobSchema && <JsonLd schema={jobSchema} />}
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-foreground/70">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{post.category}</span>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-primary/5 p-6 rounded-lg mb-8 border-l-4 border-primary">
              <p className="text-lg font-medium text-foreground/90 italic">
                {post.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground/80">
              <BlogPostContent content={post.content} />
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Get Involved with FutureLabs</h3>
              <p className="text-foreground/80 mb-6">
                Join our community of innovators and help us build the future of technology in Africa.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/programs" 
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Explore Programs
                </a>
                <a 
                  href="/contact" 
                  className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;