"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  Rocket, 
  Globe, 
  Github, 
  Plus, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Info,
  Code2
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { useFormPersistence } from '@/hooks/use-form-persistence';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import hackathonHero from '@/assets/ai-hackathon-img.jpg';

// Form Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  demo_url: z.string().url("Please enter a valid URL").or(z.literal("")),
  github_url: z.string().url("Please enter a valid URL").or(z.literal("")),
  tech_stack: z.array(z.string()).min(1, "Please add at least one technology"),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
  { id: 'basics', title: 'Basics', icon: Info },
  { id: 'technicals', title: 'Technicals', icon: Code2 },
  { id: 'review', title: 'Review', icon: CheckCircle2 },
];

const AIFellowship = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [newTech, setNewTech] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tagline: '',
      description: '',
      demo_url: '',
      github_url: '',
      tech_stack: [],
    },
  });

  const { clearPersistence } = useFormPersistence(form, 'hackathon-submission-draft');

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data, error } = await supabase
        .from('hackathon_submissions' as any)
        .insert([values])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Project submitted successfully!');
      setSubmitted(true);
      clearPersistence();
    },
    onError: (error: any) => {
      toast.error(`Submission failed: ${error.message || 'Unknown error'}`);
      console.error('Submission error:', error);
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  const nextStep = async () => {
    const fields = step === 0 
      ? ['title', 'tagline', 'description'] 
      : ['demo_url', 'github_url', 'tech_stack'];
    
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const addTech = () => {
    if (newTech.trim()) {
      const current = form.getValues('tech_stack');
      if (!current.includes(newTech.trim())) {
        form.setValue('tech_stack', [...current, newTech.trim()], { shouldValidate: true });
      }
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    const current = form.getValues('tech_stack');
    form.setValue('tech_stack', current.filter((t) => t !== tech), { shouldValidate: true });
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4 pt-24">
          <Card className="max-w-md w-full text-center p-8 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">Submission Received!</CardTitle>
            <CardDescription className="text-base mb-8">
              Your project "{form.getValues('title')}" has been successfully submitted to the FutureLabs Hackathon.
            </CardDescription>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => router.push('/')}>
                Back to Home
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                Submit Another Project
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Banner Section */}
        <div className="container mx-auto px-4 mb-8">
          <div className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] md:aspect-[3/1] border border-border shadow-lg">
            <img 
              src={hackathonHero.src} 
              alt="AI Hackathon Banner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20 border-none px-3">Active Event</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">AI Hackathon Submission</h1>
            <p className="text-muted-foreground text-lg">
              Showcase your innovation to the FutureLabs community. Complete all steps to submit your project.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = step === i;
              const isCompleted = step > i;
              
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200",
                    isActive ? "bg-primary border-primary text-primary-foreground" : 
                    isCompleted ? "bg-primary border-primary text-primary-foreground" : 
                    "bg-background border-muted text-muted-foreground"
                  )}>
                    {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={cn(
                    "text-xs font-medium mt-2",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{STEPS[step].title} Details</CardTitle>
                  <CardDescription>
                    {step === 0 && "Start with the basic information about your project."}
                    {step === 1 && "Tell us about the technology and resources behind your build."}
                    {step === 2 && "Review your information before final submission."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* STEP 0: BASICS */}
                  {step === 0 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter project name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tagline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tagline</FormLabel>
                            <FormControl>
                              <Input placeholder="A short, catchy description" {...field} />
                            </FormControl>
                            <FormDescription>Summarize your project in one sentence.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <RichTextEditor 
                                content={field.value} 
                                onChange={field.onChange} 
                              />
                            </FormControl>
                            <FormDescription>Explain the problem, solution, and impact of your project.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* STEP 1: TECHNICALS */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="demo_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Demo URL</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-9" placeholder="https://demo.example.com" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="github_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GitHub Repository</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-9" placeholder="https://github.com/..." {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="tech_stack"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tech Stack</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {field.value.map((tech) => (
                                <Badge key={tech} variant="secondary" className="pl-3 pr-2 py-1 gap-1">
                                  {tech}
                                  <button 
                                    type="button" 
                                    onClick={() => removeTech(tech)}
                                    className="hover:text-destructive transition-colors"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input 
                                value={newTech} 
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                placeholder="Add a technology (e.g. React, Supabase)" 
                              />
                              <Button type="button" variant="outline" onClick={addTech}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormDescription>List the languages, frameworks, and APIs used.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* STEP 2: REVIEW */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <h3 className="font-bold text-lg mb-1">{form.getValues('title')}</h3>
                          <p className="text-primary text-sm italic mb-4">{form.getValues('tagline')}</p>
                          <div 
                            className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground line-clamp-3 mb-4"
                            dangerouslySetInnerHTML={{ __html: form.getValues('description') }}
                          />
                          <div className="flex flex-wrap gap-2">
                            {form.getValues('tech_stack').map(tech => (
                              <Badge key={tech} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {form.getValues('demo_url') && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Globe className="h-4 w-4" />
                              <span className="truncate">{form.getValues('demo_url')}</span>
                            </div>
                          )}
                          {form.getValues('github_url') && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Github className="h-4 w-4" />
                              <span className="truncate">{form.getValues('github_url')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border/50 pt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 0 || mutation.isPending}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  {step === STEPS.length - 1 ? (
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 min-w-[120px]"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Submitting..." : "Submit Project"}
                      <Rocket className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="min-w-[100px]"
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIFellowship;
