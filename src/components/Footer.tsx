
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block">
              <div className="font-bold text-2xl mb-4">
                <span className="text-primary-light">Future</span>
                <span className="text-white">Labs</span>
                <span className="text-gray-300 text-sm">.Africa</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Accelerating Africa's Future, One Talent at a Time
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">What We Do</h4>
            <ul className="space-y-2">
              <li><Link to="/what-we-do" className="text-gray-300 hover:text-white transition-colors">The Academy</Link></li>
              <li><Link to="/what-we-do" className="text-gray-300 hover:text-white transition-colors">Startup Incubation</Link></li>
              <li><Link to="/what-we-do" className="text-gray-300 hover:text-white transition-colors">Innovation Center</Link></li>
              <li><Link to="/impact" className="text-gray-300 hover:text-white transition-colors">Impact & Research</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Train With Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mentor With Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Invest in Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/impact" className="text-gray-300 hover:text-white transition-colors">Our Impact</Link></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            &copy; {currentYear} FutureLabs.Africa. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
