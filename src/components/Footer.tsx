
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-white">FutureLabs.Africa</span>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering Africa's future through digital innovation and leadership development
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="h-4 w-4" />
                <span>hello@futurelabs.africa</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="h-4 w-4" />
                <span>+234 (0) 123 456 7890</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Programs</h4>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Skills Training</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Research</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Innovation Labs</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mentorship</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="text-gray-300 hover:text-white transition-colors">Impact Stories</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Alumni Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h5 className="font-semibold mb-2 text-white">Newsletter</h5>
              <p className="text-gray-400 text-sm mb-3">Stay updated with our latest programs</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-slate-700 border border-slate-600 rounded-l-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-primary"
                />
                <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-lg text-white text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © {currentYear} FutureLabs.Africa Rise. All rights reserved.
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