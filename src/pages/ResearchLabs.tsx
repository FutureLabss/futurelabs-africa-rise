import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Brain, Database, Smartphone } from 'lucide-react';

const ResearchLabs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Lightbulb className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Research & Innovation Labs</h1>
                  <p className="text-foreground/60">Supporting cutting-edge research in emerging technologies</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Brain className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="font-semibold">AI Research</div>
                  <div className="text-sm text-gray-600">Machine Learning Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Database className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="font-semibold">Blockchain</div>
                  <div className="text-sm text-gray-600">Innovation Hub</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Smartphone className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="font-semibold">IoT Solutions</div>
                  <div className="text-sm text-gray-600">Smart Systems</div>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h3 className="text-2xl font-bold mb-4">About Our Research Labs</h3>
                <p className="text-foreground/70 mb-6">
                  Our Research & Innovation Labs focus on cutting-edge technologies that can address Africa-specific challenges. We support researchers, students, and innovators in exploring AI, blockchain, IoT, and other emerging technologies with real-world applications.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Research Areas</h3>
                <ul className="list-disc pl-6 text-foreground/70 mb-6">
                  <li>Artificial Intelligence and Machine Learning for African contexts</li>
                  <li>Blockchain solutions for financial inclusion</li>
                  <li>IoT applications for agriculture and healthcare</li>
                  <li>Data science for social good</li>
                  <li>Mobile technology for rural communities</li>
                  <li>Sustainable technology solutions</li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-4">Resources Available</h3>
                <p className="text-foreground/70 mb-6">
                  Our labs provide access to high-performance computing resources, datasets, development tools, and expert mentorship. Researchers benefit from collaboration opportunities with industry partners and academic institutions.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-accent hover:bg-accent/90 text-white px-8">
                  Join Research
                </Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  View Projects
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

export default ResearchLabs;