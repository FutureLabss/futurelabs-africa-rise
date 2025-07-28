import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "African Tech Innovation Summit 2025",
      date: "March 15, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Lagos, Nigeria",
      attendees: "500+",
      description: "Join industry leaders, investors, and innovators for a day of networking and learning about the future of African tech.",
      type: "Conference",
      featured: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mx-10">
        <div className="bg-primary/5 py-12 mb-10 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center font-roboto text-foreground">Events</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4 mb-8"></div>
            <p className="text-center text-lg text-foreground/80 max-w-3xl mx-auto">
              Join our community events, workshops, and conferences to network, learn, and grow together.
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 font-roboto text-foreground">Upcoming Events</h2>
            
            <div className="grid gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${event.featured ? 'bg-gradient-to-r from-primary/5 to-secondary/5' : 'bg-white'}`}>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            event.type === 'Conference' ? 'bg-primary/10 text-primary' :
                            event.type === 'Hackathon' ? 'bg-secondary/10 text-secondary' :
                            event.type === 'Workshop' ? 'bg-accent/10 text-accent' :
                            'bg-foreground/10 text-foreground'
                          }`}>
                            {event.type}
                          </span>
                          {event.featured && (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent text-white">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 font-roboto text-foreground">
                          {event.title}
                        </h3>
                        
                        <p className="text-foreground/70 mb-4 leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center gap-3 lg:w-48">
                        <Button 
                          className="bg-primary hover:bg-primary/90 text-white"
                          onClick={() => window.location.href = '/register'}
                        >
                          Register Now
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-secondary text-secondary hover:bg-secondary/10"
                          onClick={() => window.location.href = '/event-details'}
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 text-lg">
                View All Events
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;