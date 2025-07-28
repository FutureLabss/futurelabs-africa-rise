import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Trophy, Network } from 'lucide-react';

const YouthCollaboration = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Youth Collaboration Programs</h1>
                  <p className="text-foreground/60">Fostering collaboration among young African tech talents</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">Monthly Events</div>
                  <div className="text-sm text-gray-600">Hackathons & Workshops</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Network className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">Peer Learning</div>
                  <div className="text-sm text-gray-600">Collaborative Groups</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Trophy className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">500+ Alumni</div>
                  <div className="text-sm text-gray-600">Success Stories</div>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h3 className="text-2xl font-bold mb-4">About This Initiative</h3>
                <p className="text-foreground/70 mb-6">
                  Our Youth Collaboration Programs create opportunities for young African tech talents to connect, learn, and build together. Through regular hackathons, workshops, and peer-to-peer learning networks, we foster a collaborative environment that drives innovation.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Program Features</h3>
                <ul className="list-disc pl-6 text-foreground/70 mb-6">
                  <li>Monthly hackathons with real-world challenges</li>
                  <li>Peer learning groups for skill development</li>
                  <li>Collaborative project opportunities</li>
                  <li>Networking events with industry leaders</li>
                  <li>Mentorship from experienced developers</li>
                  <li>Access to tech resources and tools</li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-4">Impact</h3>
                <p className="text-foreground/70 mb-6">
                  Over 500 young people have participated in our collaboration programs, with 70% going on to secure tech roles or start their own ventures. Our alumni network continues to support each other across the continent.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-8">
                  Join Program
                </Button>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Learn More
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

export default YouthCollaboration;