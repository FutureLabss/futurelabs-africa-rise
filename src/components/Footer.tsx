
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-white pt-16 pb-8 px-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block">
              <img 
                src="/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png" 
                alt="Future Labs Logo" 
                style={{ height: '40px' }}
                className="w-auto mb-4"
              />
            </Link>
            <p className="text-gray-300 mb-6">
              Start your tech career with FutureLabs
            </p>
            <div className="space-y-2">
              {/* <p className="text-gray-300 text-sm">📍 Lagos, Nigeria</p> */}
              <p className="text-gray-300 text-sm">📧 hello@futurelabs.africa</p>
              <p className="text-gray-300 text-sm">📞 07032400529</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Tech Academy</Link></li>
              <li><Link to="/initiatives" className="text-gray-300 hover:text-white transition-colors">Startup Studios</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Coworking Space</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Remote Membership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Corporate Training</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/impact" className="text-gray-300 hover:text-white transition-colors">Success Stories</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Alumni Network</a></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press & Media</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © {currentYear} FutureLabs Africa. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;