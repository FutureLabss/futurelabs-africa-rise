import React from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/futurelabs-background.jpg';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-primary/40"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Africa's Emergent Deep Tech Innovation Lab
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] font-roboto text-white mb-6">
            Building Africa's Next Generation of{' '}
            <span className="text-primary">Tech Talent</span> & Startups
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed">
            We equip African youth with the skills, mindset, and tools to solve real-world problems 
            through technology. From talent development to startup incubation, we're shaping 
            Africa's digital future.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Link to="/contact">
                Partner with Us
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm mb-4">Trusted by leading organizations</p>
            <div className="flex flex-wrap items-center gap-6 opacity-60">
              <img src="/partners/nitda-1.webp" alt="NITDA" className="h-8 object-contain brightness-0 invert" />
              <img src="/partners/afrilabs.png" alt="Afrilabs" className="h-8 object-contain brightness-0 invert" />
              <img src="/partners/undp.png" alt="UNDP" className="h-8 object-contain brightness-0 invert" />
              <img src="/partners/pind.png" alt="PIND" className="h-6 object-contain brightness-0 invert" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
