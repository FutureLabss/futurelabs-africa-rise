import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Instagram, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email').max(255),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message is too long'),
});

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!checkRateLimit()) return;

    setLoading(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/hello@futurelabs.africa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Contact: ${result.data.subject}`,
          _template: 'table',
          'Full Name': result.data.name,
          Email: result.data.email,
          Subject: result.data.subject,
          Message: result.data.message,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      recordSubmission();
      toast({ title: 'Message Sent!', description: 'Thank you for reaching out. We will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Have questions or want to learn more about FutureLabs? Get in touch with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="bg-gray-50 rounded-lg p-8 shadow-md mb-8">
              <h3 className="text-2xl font-bold mb-6">Visit Us</h3>
              <p className="text-gray-700 mb-4"><strong>Address:</strong><br />Ikot Ekpene, Akwa Ibom State, Nigeria</p>
              <p className="text-gray-700 mb-4"><strong>Email:</strong><br /><a href="mailto:hello@futurelabs.africa" className="text-primary hover:underline">hello@futurelabs.africa</a></p>
              <p className="text-gray-700"><strong>Website:</strong><br /><span className="text-secondary">www.futurelabs.africa</span></p>
            </div>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <p className="text-gray-700 mb-4">Stay updated with our latest programs, events, and success stories by following us on social media.</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/futurelabsafrica" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"><Facebook size={20} /></a>
                <a href="https://twitter.com/futurelabsafrica" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"><Twitter size={20} /></a>
                <a href="https://www.instagram.com/futurelabsafrica" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"><Instagram size={20} /></a>
                <a href="https://www.linkedin.com/company/futurelabsafrica" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <Input id="name" placeholder="Your name" className="border-gray-300" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <Input id="email" type="email" placeholder="Your email" className="border-gray-300" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <Input id="subject" placeholder="Message subject" className="border-gray-300" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <Textarea id="message" placeholder="Your message" className="border-gray-300" rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-6" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
