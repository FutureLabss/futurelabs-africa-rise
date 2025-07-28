import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Clock, Users, Target } from 'lucide-react';

const ProgramDetails = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Program Details</h1>
                  <p className="text-foreground/60">Learn more about our programs</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Duration</div>
                  <div className="text-sm text-gray-600">6-12 months</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">Cohort Size</div>
                  <div className="text-sm text-gray-600">20-30 participants</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="font-semibold">Success Rate</div>
                  <div className="text-sm text-gray-600">85% job placement</div>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h3 className="text-2xl font-bold mb-4">Program Overview</h3>
                <p className="text-foreground/70 mb-6">
                  Our comprehensive programs are designed to equip participants with cutting-edge skills and knowledge needed to thrive in the African tech ecosystem. We combine theoretical learning with hands-on projects and real-world experience.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                <ul className="list-disc pl-6 text-foreground/70 mb-6">
                  <li>Expert-led training sessions</li>
                  <li>Hands-on project work</li>
                  <li>Industry mentorship</li>
                  <li>Career placement support</li>
                  <li>Certificate of completion</li>
                  <li>Access to alumni network</li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-4">Prerequisites</h3>
                <p className="text-foreground/70 mb-6">
                  Basic computer literacy and a passion for technology. No prior programming experience required for beginner programs.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                  Apply Now
                </Button>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Download Brochure
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

export default ProgramDetails;