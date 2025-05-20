
import React, { useState } from 'react';
import { Menu, X, BookOpen, Book, Award, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-2xl">
            <span className="text-primary">Future</span>
            <span className="text-accent">Labs</span>
            <span className="text-gray-700 text-sm">.Africa</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
            <BookOpen size={16} />
            <span>About</span>
          </Link>
          <Link to="/what-we-do" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
            <Book size={16} />
            <span>What We Do</span>
          </Link>
          <Link to="/impact" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
            <Award size={16} />
            <span>Impact</span>
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
            <Newspaper size={16} />
            <span>Blog</span>
          </Link>
          <Button className="bg-accent hover:bg-accent/90 text-white">Join Our Community</Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-white z-40 pt-16 px-4 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center space-y-6 py-8">
          <Link 
            to="/about" 
            className="text-lg font-medium text-gray-700 hover:text-primary flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <BookOpen size={18} />
            <span>About</span>
          </Link>
          <Link 
            to="/what-we-do" 
            className="text-lg font-medium text-gray-700 hover:text-primary flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <Book size={18} />
            <span>What We Do</span>
          </Link>
          <Link 
            to="/impact" 
            className="text-lg font-medium text-gray-700 hover:text-primary flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <Award size={18} />
            <span>Impact</span>
          </Link>
          <Link 
            to="/blog" 
            className="text-lg font-medium text-gray-700 hover:text-primary flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <Newspaper size={18} />
            <span>Blog</span>
          </Link>
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-white"
            onClick={() => setIsOpen(false)}
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
