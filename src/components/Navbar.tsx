import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Startups', path: '/startups' },
    { name: 'Community', path: '/community' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-50">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png" 
            alt="Future Labs Logo" 
            style={{ height: '30px' }}
            className="w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(link.path) 
                  ? "text-white bg-white/10" 
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Account
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 z-40 pt-20 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-secondary/98 backdrop-blur-lg" />
        <div className="relative flex flex-col items-center space-y-2 py-8 px-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={cn(
                "w-full text-center py-3 text-lg font-medium rounded-lg transition-colors",
                isActive(link.path)
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="w-full pt-4 space-y-3">
            {user ? (
              <>
                {isAdmin && (
                  <Button asChild variant="outline" className="w-full border-white/20 text-white">
                    <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/10"
                  onClick={() => { signOut(); setIsOpen(false); }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" className="w-full text-white hover:bg-white/10">
                <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
              </Button>
            )}
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
