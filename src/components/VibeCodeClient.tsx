"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Code2, Loader2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { supabase } from '@/integrations/supabase/client';

const SKILL_LEVELS = [
  'Complete Beginner',
  'Basic Coding / Tech Experience',
  'Intermediate / Advanced Developer',
] as const;

const LEARNING_OBJECTIVES = [
  'AI-Powered Development',
  'Building Real Websites',
  'Mobile App Development',
  'Cloud Deployment & Hosting',
] as const;

const formSchema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20),
  location: z.string().trim().min(2, 'Please enter your city').max(200),
  skill_level: z.string().min(1, 'Please select your current skill level'),
  learning_objectives: z.array(z.string()).min(1, 'Please select at least one objective'),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must agree to the program terms' }) }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  full_name: '',
  email: '',
  phone: '',
  location: '',
  skill_level: '',
  learning_objectives: [],
  consent: false as unknown as true,
};

export default function VibeCodeClient() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const learningObjectives = form.watch('learning_objectives') || [];
  const isFormValid = Object.keys(form.formState.errors).length === 0 && form.watch('consent');

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        title: values.full_name,
        tagline: `${values.skill_level} | ${values.learning_objectives.join(', ')}`,
        description: JSON.stringify({ email: values.email, phone: values.phone, location: values.location, skill_level: values.skill_level, learning_objectives: values.learning_objectives }),
        github_url: null,
        demo_url: null,
        tech_stack: [...values.learning_objectives],
      };

      const { data, error } = await supabase
        .from('hackathon_submissions')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      recordSubmission();
      try {
        await supabase.functions.invoke('notify-tutor-application', {
          body: { full_name: form.getValues('full_name'), email: form.getValues('email'), type: 'VibeCode Registration' },
        });
      } catch { /* ignore */ }
      toast.success("You're registered! 🎉");
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.message || 'Please try again.'}`);
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!checkRateLimit()) return;
    mutation.mutate(values);
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4 pt-20">
          <Card className="max-w-md w-full text-center p-8 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">You're In! 🎉</CardTitle>
            <CardDescription className="text-base mb-8">
              Welcome to VibeCode! Whether you&apos;re picking up a
              keyboard for the first time or continuing your learning
              journey, you belong here. We&apos;ll be in touch within
              1–2 business days to help you get started with the
              4-week training program.
            </CardDescription>
            <div className="space-y-3">
              <Button onClick={() => router.push('/')}>Back to Home</Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSubmitted(false);
                  form.reset(defaultValues);
                }}
              >
                Register Someone Else
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

      <main className="flex-grow pt-20">
        <PageHero
          title="FutureLabs VibeCoding Registration"
          subtitle="No experience needed. Just bring your curiosity and we&apos;ll help you build something amazing in 4 weeks."
          backgroundImageUrl="/images/vibecode.png"
        />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">VibeCode Registration</CardTitle>
              <CardDescription className="text-base">
                4-week training program. All skill levels welcome.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10"
                >
                  {/* ═══════ SECTION 1: APPLICANT INFORMATION ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      1. Applicant Information
                    </legend>

                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Chisom" {...field} maxLength={100} />
                          </FormControl>
                          <FormDescription>Just your first and last name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} maxLength={255} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone / WhatsApp <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 234 567 890" {...field} maxLength={20} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location / City <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Lagos" {...field} maxLength={200} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* ═══════ SECTION 2: TECHNICAL BACKGROUND & GOALS ═══════ */}
                  <fieldset className="space-y-6">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      2. Technical Background & Goals
                    </legend>

                    <FormField
                      control={form.control}
                      name="skill_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Skill Level <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select your current level" />
                              </SelectTrigger>
                              <SelectContent>
                                {SKILL_LEVELS.map((level) => (
                                  <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>Pick whichever describes you best right now.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
                        Primary Learning Objective <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {LEARNING_OBJECTIVES.map((obj) => {
                          return (
                            <FormItem key={obj} className="flex items-start gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={learningObjectives.includes(obj)}
                                  onCheckedChange={(val) => {
                                    let next: string[];
                                    if (val) {
                                      next = [...learningObjectives, obj];
                                    } else {
                                      next = learningObjectives.filter((o) => o !== obj);
                                    }
                                    form.setValue('learning_objectives', next);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal leading-none pt-0.5 cursor-pointer">
                                {obj}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </div>
                      {form.formState.errors.learning_objectives && (
                        <p className="text-sm text-destructive mt-1">{form.formState.errors.learning_objectives.message}</p>
                      )}
                    </div>
                  </fieldset>

                  {/* ═══════ SECTION 3: CONSENT & NEXT STEPS ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      3. Consent & Next Steps
                    </legend>

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border border-border p-4">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={(val) =>
                                field.onChange(val ? true : false)
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium cursor-pointer">
                              I agree to the program terms and commit to completing the 4-week training. <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormDescription>
                              You must check this box to register.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                    disabled={mutation.isPending || !isFormValid}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Registering…
                      </>
                    ) : (
                      'Register for VibeCode 🚀'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
