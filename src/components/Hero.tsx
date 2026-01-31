import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/futurelabs-background.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Africa's Leading Deep Tech Innovation Lab
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Building Africa's Next Generation of{' '}
            <span className="text-primary">Tech Talent</span> and{' '}
            <span className="text-primary">Startups</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            We inspire, empower, and incubate high-impact tech ideas across Africa through 
            world-class programs, mentorship, and community support.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-14 text-base"
            >
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold px-8 h-14 text-base"
            >
              <Link to="/contact">
                Partner With Us
              </Link>
            </Button>
          </div>
          
          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">5000+</p>
              <p className="text-white/70 text-sm mt-1">Youths Trained</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">150+</p>
              <p className="text-white/70 text-sm mt-1">Startups Supported</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">50+</p>
              <p className="text-white/70 text-sm mt-1">Partner Organizations</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
