
import React, { useState } from 'react';
import { Menu, X, BookOpen, Book, Award, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-white">FutureLabs.Africa</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-accent transition-colors font-medium">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-accent transition-colors font-medium">
            About
          </Link>
          <Link to="/programs" className="text-white hover:text-accent transition-colors font-medium">
            Programs
          </Link>
          <Link to="/impact" className="text-white hover:text-accent transition-colors font-medium">
            Impact
          </Link>
          <Link to="/contact" className="text-white hover:text-accent transition-colors font-medium">
            Contact
          </Link>
          <Button asChild variant="default" className="font-medium">
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
          "md:hidden fixed inset-0 bg-white z-40 pt-16 px-4 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center space-y-6 py-8">
          <Link 
            to="/" 
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/programs" 
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Programs
          </Link>
          <Link 
            to="/impact" 
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Impact
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-medium text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Button asChild variant="default" className="font-medium mt-4">
            <Link to="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
