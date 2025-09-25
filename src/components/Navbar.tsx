
import React, { useState } from 'react';
import { Menu, X, BookOpen, Book, Award, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(11,25,48,0.7)] backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png" 
              alt="Future Labs Logo" 
              style={{ height: '30px' }}
              className="w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white/90 hover:text-white transition-colors font-medium">
            Home
          </Link>
          <Link to="/programs" className="text-white/90 hover:text-white transition-colors font-medium">
            Programs
          </Link>
          <Link to="/initiatives" className="text-white/90 hover:text-white transition-colors font-medium">
            Initiatives
          </Link>
          <Link to="/about" className="text-white/90 hover:text-white transition-colors font-medium">
            About
          </Link>
          <Link to="/contact" className="text-white/90 hover:text-white transition-colors font-medium">
            Contact
          </Link>
          <Link to="/blog" className="text-white/90 hover:text-white transition-colors font-medium">
            Blog
          </Link>
          <Link to="/startups" className="text-white/90 hover:text-white transition-colors font-medium">
            Startups
          </Link>
          <Button asChild variant="default" className="font-medium bg-primary hover:bg-primary/90 text-white">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 pt-16 px-4 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-[rgba(11,25,48,0.97)]" />
        <div className="relative flex flex-col items-center space-y-6 py-8">
          <Link 
            to="/" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/programs" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Programs
          </Link>
          <Link 
            to="/initiatives" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Initiatives
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/blog" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/startups" 
            className="text-lg font-medium text-white hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Startups
          </Link>
          <Button asChild variant="default" className="font-medium mt-4 bg-primary hover:bg-primary/90 text-white">
            <Link to="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
