import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png" 
                alt="Future Labs Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Building Africa's next generation of tech talent and startups through education, 
              incubation, and community.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://twitter.com/futurelabsafrica" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="https://linkedin.com/company/futurelabsafrica" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://instagram.com/futurelabsafrica" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://facebook.com/futurelabsafrica" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/programs" className="text-white/70 hover:text-white transition-colors text-sm">Programs</Link></li>
              <li><Link to="/startups" className="text-white/70 hover:text-white transition-colors text-sm">Startups</Link></li>
              <li><Link to="/community" className="text-white/70 hover:text-white transition-colors text-sm">Community</Link></li>
              <li><Link to="/resources" className="text-white/70 hover:text-white transition-colors text-sm">Resources</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-white transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Programs</h4>
            <ul className="space-y-3">
              <li><a href="https://www.futurelabs.ng" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Tech Academy</a></li>
              <li><Link to="/programs" className="text-white/70 hover:text-white transition-colors text-sm">Startup Accelerator</Link></li>
              <li><Link to="/programs" className="text-white/70 hover:text-white transition-colors text-sm">Leadership Program</Link></li>
              <li><a href="https://studio.futurelabs.ng" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Future Studios</a></li>
              <li><Link to="/community" className="text-white/70 hover:text-white transition-colors text-sm">Events & Meetups</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">Ikot Ekpene, Akwa Ibom State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a href="mailto:hello@futurelabs.africa" className="text-white/70 hover:text-white transition-colors text-sm">
                  hello@futurelabs.africa
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+2347032400529" className="text-white/70 hover:text-white transition-colors text-sm">
                  +234 703 240 0529
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} FutureLabs Africa. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="text-white/50 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-white/50 hover:text-white transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
