
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl">
            <span className="text-primary">Future</span>
            <span className="text-accent">Labs</span>
            <span className="text-gray-700 text-sm">.Africa</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a>
          <a href="#what-we-do" className="text-gray-700 hover:text-primary transition-colors">What We Do</a>
          <a href="#impact" className="text-gray-700 hover:text-primary transition-colors">Impact</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
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
          <a 
            href="#about" 
            className="text-lg font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a 
            href="#what-we-do" 
            className="text-lg font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            What We Do
          </a>
          <a 
            href="#impact" 
            className="text-lg font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Impact
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
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
