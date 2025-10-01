
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
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
              <p className="text-gray-700 mb-4">
                <strong>Address:</strong><br />
                Ikot Ekpene, Akwa Ibom State, Nigeria
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong><br />
                <a href="mailto:hello@futurelabs.africa" className="text-primary hover:underline">
                  hello@futurelabs.africa
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong><br />
                <span className="text-secondary">www.futurelabs.africa</span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <p className="text-gray-700 mb-4">
                Stay updated with our latest programs, events, and success stories by following us on social media.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">TW</a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">LI</a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form
              action="https://formsubmit.co/hello@futurelabs.africa"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New message from FutureLabs.africa" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <Input id="name" name="name" placeholder="Your name" className="border-gray-300" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <Input id="email" name="email" type="email" placeholder="Your email" className="border-gray-300" required />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <Input id="subject" name="subject" placeholder="Message subject" className="border-gray-300" required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <Textarea id="message" name="message" placeholder="Your message" className="border-gray-300" rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-6">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
