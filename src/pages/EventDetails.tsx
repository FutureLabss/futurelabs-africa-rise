import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventDetails = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Conference
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-6 text-foreground">
                African Tech Innovation Summit 2025
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="h-4 w-4" />
                  <span>March 15, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Clock className="h-4 w-4" />
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <MapPin className="h-4 w-4" />
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Users className="h-4 w-4" />
                  <span>500+ attendees</span>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-foreground/70 mb-6">
                  Join industry leaders, investors, and innovators for a day of networking and learning about the future of African tech.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">About This Event</h3>
                <p className="text-foreground/70 mb-6">
                  The African Tech Innovation Summit brings together the continent's brightest minds to discuss the latest trends, challenges, and opportunities in technology. This premier event features keynote speakers, panel discussions, workshops, and networking opportunities.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                <ul className="list-disc pl-6 text-foreground/70 mb-6">
                  <li>Latest trends in African tech ecosystem</li>
                  <li>Investment opportunities and funding strategies</li>
                  <li>Building scalable tech solutions</li>
                  <li>Networking with industry leaders</li>
                </ul>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                  Register Now
                </Button>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Share Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;