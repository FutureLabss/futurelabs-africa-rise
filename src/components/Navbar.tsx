import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Startups', href: '/startups' },
  { label: 'Community', href: '/community' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-secondary/95 backdrop-blur-md shadow-lg py-3" 
          : "bg-secondary py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png" 
            alt="Future Labs Logo" 
            className={cn(
              "w-auto transition-all duration-300",
              scrolled ? "h-7" : "h-8"
            )}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-primary bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
          >
            <Link to="/programs">Explore Programs</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-x-0 top-[60px] bg-secondary border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg font-medium transition-colors",
                isActive(link.href)
                  ? "text-primary bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button 
              asChild 
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
            >
              <Link to="/programs" onClick={() => setIsOpen(false)}>
                Explore Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
