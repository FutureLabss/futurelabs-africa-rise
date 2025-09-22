import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Target, Lightbulb } from 'lucide-react';

const GetInvolvedSection = () => {
  const ways = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Join Our Community",
      description: "Connect with like-minded innovators"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Start Learning",
      description: "Enroll in our training programs"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Share Your Ideas",
      description: "Collaborate on breakthrough solutions"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">Get Involved</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Ready to be part of Africa's technological transformation? Join thousands of innovators shaping the continent's future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ways.map((way, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                <div className="text-white">
                  {way.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{way.title}</h3>
              <p className="text-white/80">{way.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Connected</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new programs, opportunities, and success stories from our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-6">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 flex-1 w-full focus:outline-none focus:border-white/50"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Learn More
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;