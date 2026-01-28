import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Have questions about our programs? Want to partner with us? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <SectionContainer>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <p className="text-sm text-muted-foreground">
                      Ikot Ekpene, Akwa Ibom State, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <a href="mailto:hello@futurelabs.africa" className="text-sm text-primary hover:underline">
                      hello@futurelabs.africa
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <a href="tel:+2347032400529" className="text-sm text-primary hover:underline">
                      +234 703 240 0529
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Office Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9am - 5pm WAT
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Links */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://twitter.com/futurelabsafrica" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                  <a 
                    href="https://linkedin.com/company/futurelabsafrica" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="https://instagram.com/futurelabsafrica" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://facebook.com/futurelabsafrica" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Facebook size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Book a Visit */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Want to Visit?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in visiting our hub? Book a tour or schedule a meeting with our team.
                </p>
                <Button variant="outline" className="w-full">
                  Schedule a Visit
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form
                  action="https://formsubmit.co/hello@futurelabs.africa"
                  method="POST"
                  className="space-y-6"
                >
                  <input type="hidden" name="_subject" value="New Contact Form Submission - FutureLabs.africa" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" name="organization" placeholder="Your company or organization" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" name="subject" placeholder="What's this about?" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tell us what you have in mind..." 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>

      {/* Map Section (placeholder) */}
      <section className="h-64 md:h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-lg font-medium">Ikot Ekpene, Akwa Ibom State</p>
            <p className="text-muted-foreground">Nigeria</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
