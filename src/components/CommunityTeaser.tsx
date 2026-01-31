import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import communityImage from '@/assets/african-school-outreach.jpg';

const CommunityTeaser = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <img 
                src={communityImage}
                alt="FutureLabs Community Event"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-xl p-5 border border-border max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Next Event</p>
                  <p className="text-muted-foreground text-xs">Tech Meetup Lagos</p>
                </div>
              </div>
              <Link to="/community" className="text-primary text-sm font-medium hover:underline">
                View all events →
              </Link>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary font-semibold mb-2">Community & Events</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Join Africa's Most Vibrant Tech Community
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Connect with thousands of developers, founders, and tech enthusiasts across Africa. 
              Attend workshops, hackathons, and networking events that accelerate your growth.
            </p>
            
            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">10,000+ Members</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">Monthly Events</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">Multiple Cities</span>
              </div>
            </div>

            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/community">
                Explore Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTeaser;
