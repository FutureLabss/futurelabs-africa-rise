
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-bold text-2xl mb-4">
              <span className="text-primary-light">Future</span>
              <span className="text-accent-light">Labs</span>
              <span className="text-gray-400 text-sm">.Africa</span>
            </div>
            <p className="text-gray-400 mb-6">
              Accelerating Africa's Future, One Talent at a Time
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">What We Do</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">The Academy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Startup Incubation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Innovation Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impact & Research</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Train With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mentor With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Invest in Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400">
              Ikot Ekpene, Akwa Ibom State,<br /> Nigeria
            </address>
            <p className="mt-2">
              <a href="mailto:hello@futurelabs.africa" className="text-accent-light hover:text-white transition-colors">
                hello@futurelabs.africa
              </a>
            </p>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} FutureLabs.Africa. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
