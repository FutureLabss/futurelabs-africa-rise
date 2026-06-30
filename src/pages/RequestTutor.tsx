import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CheckCircle2, Shield, Loader2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ─── Constants ─── */

const ORGANISATION_TYPES = [
  'Corporate',
  'Educational Institution',
  'Government',
  'NGO',
  'Other',
] as const;

const SECURITY_TOOLS = [
  'Firewall',
  'Antivirus/EDR',
  'VPN',
  'MFA',
  'Security Awareness Program',
  'Incident Response Plan',
  'None of the above',
  'Other',
] as const;

const MATURITY_LEVELS = ['Basic', 'Developing', 'Established', 'Advanced'] as const;

const EXPERTISE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Mixed'] as const;

const TRAINING_FORMATS = ['In-person', 'Online/Remote', 'Hybrid'] as const;

const TOPICS = [
  'Network Security',
  'Ethical Hacking',
  'Security Awareness',
  'Incident Response',
  'Compliance & Governance',
  'Cloud Security',
  'Other',
] as const;

const BUDGET_RANGES = [
  'Under ₦500,000',
  '₦500,000 – ₦1,000,000',
  '₦1,000,000 – ₦3,000,000',
  '₦3,000,000 – ₦5,000,000',
  'Above ₦5,000,000',
  'Prefer not to say',
] as const;

const REFERRAL_SOURCES = [
  'Referral',
  'Social Media',
  'Search Engine',
  'Event',
  'Other',
] as const;

/* ─── Schema ─── */

const formSchema = z
  .object({
    // Organisation legitimacy
    organisation_name: z
      .string()
      .trim()
      .min(1, 'Organisation name is required')
      .max(200),
    organisation_type: z.string().min(1, 'Please select an organisation type'),
    organisation_website: z.string().trim().max(500).optional().or(z.literal('')),
    organisation_size: z.preprocess(
      (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
      z
        .number({ invalid_type_error: 'Must be a number' })
        .int('Must be a whole number')
        .positive('Must be greater than 0')
        .optional(),
    ),
    organisation_description: z
      .string()
      .trim()
      .min(1, 'Please describe what your organisation does')
      .max(2000),

    // Cybersecurity posture
    has_it_team: z.enum(['yes', 'no'], {
      required_error: 'Please select Yes or No',
    }),
    it_team_size: z.preprocess(
      (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
      z
        .number({ invalid_type_error: 'Must be a number' })
        .int('Must be a whole number')
        .positive('Must be greater than 0')
        .optional(),
    ),
    it_team_expertise: z.string().optional().or(z.literal('')),
    security_tools: z.array(z.string()),
    security_tools_other: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal('')),
    past_incidents: z.enum(['yes', 'no'], {
      required_error: 'Please select Yes or No',
    }),
    past_incidents_desc: z.string().trim().max(2000).optional().or(z.literal('')),
    current_certifications: z
      .string()
      .trim()
      .max(500)
      .optional()
      .or(z.literal('')),
    security_maturity: z.string().min(1, 'Please rate your security maturity'),

    // Training need
    training_reason: z
      .string()
      .trim()
      .min(1, 'Please explain why you are seeking training')
      .max(2000),
    num_learners: z.preprocess(
      (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
      z
        .number({ invalid_type_error: 'Must be a number' })
        .int('Must be a whole number')
        .positive('Must be greater than 0')
        .optional(),
    ),
    skill_level: z.string().min(1, 'Please select a skill level'),
    training_topics: z.array(z.string()).min(1, 'Please select at least one topic'),
    training_topics_other: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal('')),
    training_format: z.string().min(1, 'Please select a training format'),
    training_location: z.string().trim().max(500).optional().or(z.literal('')),
    preferred_date: z.string().optional().or(z.literal('')),
    budget_range: z.string().optional().or(z.literal('')),

    // Contact / accountability
    contact_name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100),
    contact_role: z
      .string()
      .trim()
      .min(1, 'Role/title is required')
      .max(200),
    contact_email: z
      .string()
      .trim()
      .email('Please enter a valid email address')
      .max(255),
    contact_phone: z
      .string()
      .trim()
      .min(7, 'Phone number must be at least 7 digits')
      .max(20)
      .regex(/^[+\d\s\-()]+$/, 'Invalid phone number format'),
    referral_source: z.string().min(1, 'Please select how you heard about us'),
    additional_notes: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .or(z.literal('')),

    // Consent
    consent: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to be contacted' }),
    }),
  })
  .superRefine((data, ctx) => {
    // Conditional: IT team size & expertise required when has_it_team = yes
    if (data.has_it_team === 'yes') {
      if (
        data.it_team_size === undefined ||
        data.it_team_size === null ||
        (data.it_team_size as any) === ''
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Team size is required',
          path: ['it_team_size'],
        });
      }
      if (!data.it_team_expertise || data.it_team_expertise.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select the team expertise level',
          path: ['it_team_expertise'],
        });
      }
    }

    // Conditional: past incidents description required when past_incidents = yes
    if (
      data.past_incidents === 'yes' &&
      (!data.past_incidents_desc || data.past_incidents_desc.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please briefly describe the past incidents',
        path: ['past_incidents_desc'],
      });
    }

    // Conditional: training location required when format = In-person
    if (
      data.training_format === 'In-person' &&
      (!data.training_location || data.training_location.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify the location for in-person training',
        path: ['training_location'],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  organisation_name: '',
  organisation_type: '',
  organisation_website: '',
  organisation_size: undefined,
  organisation_description: '',
  has_it_team: 'no',
  it_team_size: undefined,
  it_team_expertise: '',
  security_tools: [],
  security_tools_other: '',
  past_incidents: 'no',
  past_incidents_desc: '',
  current_certifications: '',
  security_maturity: '',
  training_reason: '',
  num_learners: undefined,
  skill_level: '',
  training_topics: [],
  training_topics_other: '',
  training_format: '',
  training_location: '',
  preferred_date: '',
  budget_range: '',
  contact_name: '',
  contact_role: '',
  contact_email: '',
  contact_phone: '',
  referral_source: '',
  additional_notes: '',
  consent: false as unknown as true,
};

/* ─── Checkbox Group Helper ─── */

function CheckboxGroup({
  control,
  name,
  options,
  otherField,
}: {
  control: any;
  name: 'security_tools' | 'training_topics';
  options: readonly string[];
  otherField: string;
}) {
  const watched = control._formValues[name] || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {options.map((opt) => {
        const isNone = opt === 'None of the above';
        return (
          <FormField
            key={opt}
            control={control}
            name={name}
            render={({ field }) => {
              const checked = (field.value || []).includes(opt);
              return (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(val) => {
                        let next = [...(field.value || [])];
                        if (isNone) {
                          // "None" clears everything else
                          next = val ? [opt] : [];
                        } else {
                          if (val) {
                            next = next.filter(
                              (t: string) => t !== 'None of the above',
                            );
                            next.push(opt);
                          } else {
                            next = next.filter((t: string) => t !== opt);
                          }
                        }
                        field.onChange(next);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal leading-none pt-0.5 cursor-pointer">
                    {opt}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Page ─── */

const RequestTutor = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const hasItTeam = form.watch('has_it_team');
  const hasPastIncidents = form.watch('past_incidents');
  const trainingFormat = form.watch('training_format');
  const securityTools = form.watch('security_tools') || [];
  const trainingTopics = form.watch('training_topics') || [];
  const showSecurityOther = securityTools.includes('Other');
  const showTopicsOther = trainingTopics.includes('Other');

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        organisation_name: values.organisation_name,
        organisation_type: values.organisation_type,
        organisation_website: values.organisation_website || null,
        organisation_size: values.organisation_size ?? null,
        organisation_description: values.organisation_description,
        has_it_team: values.has_it_team === 'yes',
        it_team_size: values.it_team_size ?? null,
        it_team_expertise:
          values.has_it_team === 'yes' ? values.it_team_expertise : null,
        security_tools: values.security_tools.filter((t) => t !== 'Other'),
        security_tools_other: showSecurityOther
          ? values.security_tools_other || null
          : null,
        past_incidents: values.past_incidents === 'yes',
        past_incidents_desc:
          values.past_incidents === 'yes'
            ? values.past_incidents_desc || null
            : null,
        current_certifications: values.current_certifications || null,
        security_maturity: values.security_maturity,
        training_reason: values.training_reason,
        num_learners: values.num_learners ?? null,
        skill_level: values.skill_level,
        training_topics: values.training_topics.filter((t) => t !== 'Other'),
        training_topics_other: showTopicsOther
          ? values.training_topics_other || null
          : null,
        training_format: values.training_format,
        training_location:
          values.training_format === 'In-person'
            ? values.training_location || null
            : null,
        preferred_date: values.preferred_date || null,
        budget_range: values.budget_range || null,
        contact_name: values.contact_name,
        contact_role: values.contact_role,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone,
        referral_source: values.referral_source,
        additional_notes: values.additional_notes || null,
        consent: true,
      };

      const { data, error } = await supabase
        .from('tutor_requests')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: async (data) => {
      recordSubmission();

      try {
        await supabase.functions.invoke('notify-tutor-request', { body: data });
      } catch (notifyErr) {
        console.error('Failed to send email notification:', notifyErr);
      }

      toast.success('Request submitted successfully!');
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast.error(
        `Submission failed: ${error.message || 'Please try again later.'}`,
      );
      console.error('Tutor request submission error:', error);
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
        <main className="flex-grow flex items-center justify-center p-4 pt-24">
          <Card className="max-w-md w-full text-center p-8 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">Request Received!</CardTitle>
            <CardDescription className="text-base mb-8">
              Thank you for your interest in our cybersecurity training programs.
              Our team will review your application and reach out to discuss next
              steps within 1–2 business days.
            </CardDescription>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => navigate('/')}>
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSubmitted(false);
                  form.reset(defaultValues);
                }}
              >
                Submit Another Request
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
          title="Request a Cybersecurity Tutor"
          subtitle="Apply for a dedicated cybersecurity training program tailored to your organisation's needs, maturity level, and team size."
        />

        <div className="max-w-3xl mx-auto px-4 py-12">
          <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Application Form
              </CardTitle>
              <CardDescription>
                All fields marked with <span className="text-destructive">*</span>{' '}
                are required. Your responses help us match you with the right
                tutor and scope the appropriate program.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10"
                >
                  {/* ═══════ SECTION 1: ORGANISATION LEGITIMACY ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Organisation Details
                    </legend>

                    <FormField
                      control={form.control}
                      name="organisation_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Organisation Name <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Acme Corp"
                              {...field}
                              maxLength={200}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organisation_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Organisation Type <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ORGANISATION_TYPES.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organisation_website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website or Registration Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. www.acmecorp.com or RC123456"
                              {...field}
                              maxLength={500}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional, but helps us verify your organisation.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organisation_size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organisation Size (employees)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              placeholder="e.g. 150"
                              {...field}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organisation_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            What does your organisation do?{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe your organisation's industry, products, or services..."
                              className="min-h-[100px]"
                              {...field}
                              maxLength={2000}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* ═══════ SECTION 2: CYBERSECURITY POSTURE ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Current Cybersecurity Posture
                    </legend>

                    <FormField
                      control={form.control}
                      name="has_it_team"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Does your organisation have an in-house IT/security
                            team? <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex gap-6"
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="yes" id="team-yes" />
                                <Label htmlFor="team-yes">Yes</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="no" id="team-no" />
                                <Label htmlFor="team-no">No</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {hasItTeam === 'yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6 border-l-2 border-primary/20 pl-4">
                        <FormField
                          control={form.control}
                          name="it_team_size"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Team Size <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  placeholder="e.g. 5"
                                  {...field}
                                  value={field.value ?? ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="it_team_expertise"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Team Expertise Level{' '}
                                <span className="text-destructive">*</span>
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {EXPERTISE_LEVELS.map((l) => (
                                    <SelectItem key={l} value={l}>
                                      {l}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Security tools */}
                    <FormField
                      control={form.control}
                      name="security_tools"
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Existing security tools / practices in place
                          </FormLabel>
                          <FormDescription>
                            Select all that apply.
                          </FormDescription>
                          <CheckboxGroup
                            control={form.control}
                            name="security_tools"
                            options={SECURITY_TOOLS}
                            otherField="security_tools_other"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {showSecurityOther && (
                      <FormField
                        control={form.control}
                        name="security_tools_other"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Other tools / practices (please specify)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Describe..."
                                {...field}
                                maxLength={200}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Past incidents */}
                    <FormField
                      control={form.control}
                      name="past_incidents"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Has your organisation experienced any known security
                            incidents? <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex gap-6"
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="yes" id="inc-yes" />
                                <Label htmlFor="inc-yes">Yes</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="no" id="inc-no" />
                                <Label htmlFor="inc-no">No</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {hasPastIncidents === 'yes' && (
                      <FormField
                        control={form.control}
                        name="past_incidents_desc"
                        render={({ field }) => (
                          <FormItem className="ml-6 border-l-2 border-destructive/30 pl-4">
                            <FormLabel>
                              Brief description of past incidents{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What happened? How was it handled?"
                                className="min-h-[80px]"
                                {...field}
                                maxLength={2000}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="current_certifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Current cybersecurity certifications held by staff
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. CISSP, CEH, CompTIA Security+"
                              {...field}
                              maxLength={500}
                            />
                          </FormControl>
                          <FormDescription>Optional.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="security_maturity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Self-rated overall security maturity{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select maturity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {MATURITY_LEVELS.map((l) => (
                                <SelectItem key={l} value={l}>
                                  {l}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Basic = little to no formal security; Developing =
                            some controls; Established = documented processes;
                            Advanced = proactive, measured program.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* ═══════ SECTION 3: TRAINING NEED ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Training Requirements
                    </legend>

                    <FormField
                      control={form.control}
                      name="training_reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Why are you seeking this training?{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What specific challenges, compliance needs, or skill gaps are you looking to address?"
                              className="min-h-[100px]"
                              {...field}
                              maxLength={2000}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="num_learners"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Learners</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                placeholder="e.g. 20"
                                {...field}
                                value={field.value ?? ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="skill_level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Skill Level of Learners{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SKILL_LEVELS.map((l) => (
                                  <SelectItem key={l} value={l}>
                                    {l}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Topics */}
                    <FormField
                      control={form.control}
                      name="training_topics"
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Specific topics / focus areas needed{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormDescription>
                            Select all that apply.
                          </FormDescription>
                          <CheckboxGroup
                            control={form.control}
                            name="training_topics"
                            options={TOPICS}
                            otherField="training_topics_other"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {showTopicsOther && (
                      <FormField
                        control={form.control}
                        name="training_topics_other"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other topics (please specify)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Describe other topics..."
                                {...field}
                                maxLength={200}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Training format */}
                    <FormField
                      control={form.control}
                      name="training_format"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Preferred training format{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex flex-wrap gap-4"
                            >
                              {TRAINING_FORMATS.map((f) => (
                                <div
                                  key={f}
                                  className="flex items-center gap-2"
                                >
                                  <RadioGroupItem
                                    value={f}
                                    id={`format-${f}`}
                                  />
                                  <Label htmlFor={`format-${f}`}>{f}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {trainingFormat === 'In-person' && (
                      <FormField
                        control={form.control}
                        name="training_location"
                        render={({ field }) => (
                          <FormItem className="ml-6 border-l-2 border-primary/20 pl-4">
                            <FormLabel>
                              Training Location{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City, venue, or address"
                                {...field}
                                maxLength={500}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="preferred_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Start Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Budget Range</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {BUDGET_RANGES.map((r) => (
                                  <SelectItem key={r} value={r}>
                                    {r}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>

                  {/* ═══════ SECTION 4: CONTACT & ACCOUNTABILITY ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Contact Information
                    </legend>

                    <FormField
                      control={form.control}
                      name="contact_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Contact Person Full Name{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Jane Doe"
                              {...field}
                              maxLength={100}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contact_role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Role / Title in Organisation{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Head of IT, CISO, HR Director"
                              {...field}
                              maxLength={200}
                            />
                          </FormControl>
                          <FormDescription>
                            We ask this to ensure we're speaking with someone who
                            can authorise budget and time commitments.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contact_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Contact Email{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="jane@example.com"
                                {...field}
                                maxLength={255}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Contact Phone{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+234 800 000 0000"
                                {...field}
                                maxLength={20}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="referral_source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            How did you hear about this service?{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {REFERRAL_SOURCES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additional_notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anything else we should know?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any other context, scheduling constraints, or questions..."
                              className="min-h-[80px]"
                              {...field}
                              maxLength={2000}
                            />
                          </FormControl>
                          <FormDescription>Optional.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Consent */}
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
                              I agree to be contacted regarding this request{' '}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormDescription>
                              We'll use your contact details to follow up on this
                              application. Your data will not be shared with
                              third parties.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Submitting Application…
                      </>
                    ) : (
                      'Submit Application'
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
};

export default RequestTutor;
