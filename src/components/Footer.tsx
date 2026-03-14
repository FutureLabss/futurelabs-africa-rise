import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { z } from 'zod';

const emailSchema = z.string().trim().email('Please enter a valid email address').max(255);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: 'Invalid email', description: result.error.errors[0].message, variant: 'destructive' });
      return;
    }
    if (!checkRateLimit()) return;

    setLoading(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/hello@futurelabs.africa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New Newsletter Subscription - FutureLabs.africa',
          _template: 'table',
          email: result.data,
          type: 'Newsletter Subscription',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      recordSubmission();
      toast({ title: 'Subscribed!', description: 'You have been added to our mailing list.' });
      setEmail('');
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Startups', href: '/startups' },
    { label: 'Community', href: '/community' },
    { label: 'Events', href: '/resources' },
  ];

  const programs = [
    { label: 'Tech Academy', href: '/programs' },
    { label: 'Startup Incubation', href: '/programs' },
    { label: 'Corporate Innovation', href: '/programs' },
    { label: 'Youth Development', href: '/youth-collaboration' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/futurelabsafrica', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/futurelabsafrica', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/futurelabsafrica', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/futurelabsafrica', label: 'Facebook' },
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Stay Connected</h3>
            <p className="text-white/70 mb-6">
              Get updates on programs, events, and opportunities across Africa's tech ecosystem.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 h-14 sm:h-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary text-base"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 px-6 h-14 sm:h-12" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Subscribe <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-10">
          <Link to="/" className="inline-block mb-4">
            <img src="/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png" alt="Future Labs Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-white/70 mb-6 text-sm leading-relaxed max-w-md">
            Building Africa's next generation of tech talent and innovative startups through world-class programs and community.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label={social.label}>
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-white/70 hover:text-white transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Programs</h4>
            <ul className="space-y-3">
              {programs.map((link) => (
                <li key={link.label}><Link to={link.href} className="text-white/70 hover:text-white transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-white/70 text-sm">hello@futurelabs.africa</span></li>
              <li className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-white/70 text-sm">+234 703 240 0529</span></li>
              <li className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-white/70 text-sm">Akwa Ibom, Nigeria</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© {currentYear} FutureLabs Africa. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
