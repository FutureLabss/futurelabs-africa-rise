import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

  const pastEvents = [
    {
      id: 101,
      title: "AI for Social Good Workshop",
      date: "July 10, 2024",
      location: "Abuja, Nigeria",
      type: "Workshop",
      summary: "Hands-on training on building AI solutions for public health and agriculture.",
    },
    {
      id: 102,
      title: "Deep Tech Founders Meetup",
      date: "November 22, 2024",
      location: "Nairobi, Kenya",
      type: "Meetup",
      summary: "Founders across Africa shared lessons on scaling research-driven startups.",
    },
    {
      id: 103,
      title: "Future of Work Bootcamp",
      date: "May 3, 2024",
      location: "Uyo, Nigeria",
      type: "Bootcamp",
      summary: "Upskilling program focused on cloud, data, and product careers.",
    },
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
                        <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                          <Link to="/register">Register Now</Link>
                        </Button>
                        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10" asChild>
                          <Link to="/event-details">Learn More</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 font-roboto text-foreground">Past Events</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {pastEvents.map((event) => (
                <Card key={event.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-sm text-foreground/60">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                        <p className="text-foreground/70 mt-2">{event.summary}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/70 whitespace-nowrap">{event.type}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;