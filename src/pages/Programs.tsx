import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeading from '@/components/layout/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Rocket, Users, Target, Clock, ArrowRight, CheckCircle, Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Programs = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: "Tech Academy",
      audience: "Early-career developers, career switchers, students",
      description: "Comprehensive training programs in software development, data science, and emerging technologies. Build real-world skills with hands-on projects and industry mentorship.",
      duration: "6-12 months",
      format: "Hybrid (Online + In-Person)",
      highlights: ["Hands-on Projects", "Industry Mentorship", "Job Placement Support", "Portfolio Building"],
      cta: "Apply Now",
      link: "https://www.futurelabs.ng",
      external: true,
    },
    {
      icon: Rocket,
      title: "Startup Accelerator",
      audience: "Idea-stage to early-traction startups",
      description: "Intensive program for early-stage African startups to validate their ideas, build MVPs, and access funding. Get mentorship from successful founders and investors.",
      duration: "3-6 months",
      format: "Cohort-based, Hybrid",
      highlights: ["Funding Access", "Expert Mentorship", "Demo Day Pitching", "Investor Introductions"],
      cta: "Join Waitlist",
      link: "/contact",
      external: false,
    },
    {
      icon: Users,
      title: "Leadership & Innovation Program",
      audience: "Mid to senior-level professionals",
      description: "Building the next generation of African tech leaders through comprehensive leadership training, innovation workshops, and strategic thinking sessions.",
      duration: "4 months",
      format: "Executive-style, Weekend Sessions",
      highlights: ["Executive Coaching", "Strategic Thinking", "Problem-Solving", "Rapid Prototyping"],
      cta: "Learn More",
      link: "/contact",
      external: false,
    },
    {
      icon: Target,
      title: "Future Studios",
      audience: "Businesses, Organizations, Startups",
      description: "Creative technology studio where innovation meets design. Partner with our expert team to build cutting-edge digital solutions for your organization.",
      duration: "Project-based",
      format: "Custom Engagements",
      highlights: ["Product Design", "Development", "Technology Consulting", "Innovation Sprints"],
      cta: "Get Started",
      link: "https://studio.futurelabs.ng",
      external: true,
    },
  ];

  const timeline = [
    { step: 1, title: "Applications Open", description: "Submit your application online" },
    { step: 2, title: "Screening", description: "Review and assessment process" },
    { step: 3, title: "Onboarding", description: "Welcome session and program kickoff" },
    { step: 4, title: "Program", description: "Intensive learning and building phase" },
    { step: 5, title: "Demo Day", description: "Showcase your work to the community" },
  ];

  const faqs = [
    {
      question: "Who can apply for FutureLabs programs?",
      answer: "Our programs are open to anyone passionate about technology and innovation. Specific eligibility varies by program - Tech Academy welcomes beginners, while the Accelerator is for startup teams with an idea or early product."
    },
    {
      question: "Are the programs free?",
      answer: "Some programs are fully funded through our partners and sponsors. Others have tuition fees with flexible payment options and scholarships available for exceptional candidates who demonstrate financial need."
    },
    {
      question: "Where are the programs located?",
      answer: "We're based in Akwa Ibom State, Nigeria, with hybrid options available for most programs. Some sessions are in-person at our hub, while others are conducted online to accommodate participants across Africa."
    },
    {
      question: "What's the time commitment?",
      answer: "Commitment varies by program. The Tech Academy requires 20-30 hours/week, the Accelerator is more intensive at 30-40 hours/week, and the Leadership Program is designed for working professionals with weekend sessions."
    },
    {
      question: "What happens after the program?",
      answer: "Graduates join our alumni network with ongoing access to job opportunities, mentorship, and community events. Many alumni stay connected as mentors, speakers, and contributors to the ecosystem."
    },
    {
      question: "How do I apply?",
      answer: "Click the 'Apply' button for your program of interest. You'll complete an online application, and our team will review and reach out for next steps. Applications for most programs are reviewed on a rolling basis."
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Programs
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              From talent development to startup acceleration, we run programs designed 
              to build Africa's next generation of tech leaders and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <SectionContainer>
        <SectionHeading 
          title="Find Your Path" 
          subtitle="Whether you're starting your tech journey, building a startup, or leading innovation, we have a program for you."
        />
        
        <div className="space-y-8">
          {programs.map((program, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3">
                  {/* Left: Info */}
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <program.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{program.title}</h3>
                        <p className="text-sm text-primary font-medium">{program.audience}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{program.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{program.format}</span>
                      </div>
                    </div>
                    
                    {program.external ? (
                      <Button asChild size="lg">
                        <a href={program.link} target="_blank" rel="noopener noreferrer">
                          {program.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button asChild size="lg">
                        <Link to={program.link}>
                          {program.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                  
                  {/* Right: Highlights */}
                  <div className="bg-muted/30 p-8 border-l border-border">
                    <h4 className="font-semibold mb-4">What You Get</h4>
                    <ul className="space-y-3">
                      {program.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Timeline */}
      <SectionContainer className="bg-muted/30">
        <SectionHeading 
          title="Application Process" 
          subtitle="From application to graduation, here's what to expect"
        />
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg z-10">
                  {item.step}
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer>
        <SectionHeading 
          title="Frequently Asked Questions" 
        />
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-primary text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of ambitious Africans building the future of technology on the continent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <a href="https://www.futurelabs.ng" target="_blank" rel="noopener noreferrer">
                Apply to Tech Academy
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Programs;
