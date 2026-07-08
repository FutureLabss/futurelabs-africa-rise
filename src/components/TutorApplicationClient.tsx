"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CheckCircle2, Shield, Loader2, Upload } from 'lucide-react';

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
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ─── Constants ─── */

const CERTIFICATIONS = [
  'CISSP',
  'CEH',
  'CompTIA Security+',
  'OSCP',
  'CISM',
  'CCNA Security',
  'Other',
] as const;

const SPECIALIZATIONS = [
  'Network Security',
  'Ethical Hacking / Pentesting',
  'Incident Response',
  'Cloud Security',
  'Security Awareness',
  'Compliance / Governance / Risk',
  'Malware Analysis',
  'Cryptography',
  'Other',
] as const;

const TEACHING_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All levels'] as const;

const FORMAT_OPTIONS = ['In-person', 'Online', 'Hybrid'] as const;

const ALLOWED_RESUME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_PORTFOLIO_TYPES = [...ALLOWED_RESUME_TYPES, 'image/png', 'image/jpeg'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/* ─── Schema ─── */

const formSchema = z.object({
  full_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  phone: z.string().trim().min(7, 'Phone number must be at least 7 digits').max(20).regex(/^[+\d\s\-()]+$/, 'Invalid phone number format'),
  location: z.string().trim().min(1, 'Location is required').max(200),
  linkedin_url: z.string().trim().max(500).optional().or(z.literal('')),

  degree_field: z.string().trim().min(1, 'Degree and field of study are required').max(300),
  certifications: z.array(z.string()).min(1, 'Please select at least one certification'),
  certifications_other: z.string().trim().max(200).optional().or(z.literal('')),
  cyber_years: z.preprocess(
    (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
    z.number({ invalid_type_error: 'Must be a number' }).int('Must be a whole number').positive('Must be greater than 0'),
  ),
  teaching_years: z.preprocess(
    (v) => (v === '' || v === undefined || v === null ? undefined : Number(v)),
    z.number({ invalid_type_error: 'Must be a number' }).int('Must be a whole number').min(0, 'Cannot be negative'),
  ),

  specializations: z.array(z.string()).min(1, 'Please select at least one area'),
  specializations_other: z.string().trim().max(200).optional().or(z.literal('')),
  teaching_levels: z.array(z.string()).min(1, 'Please select at least one level'),

  current_job_title: z.string().trim().min(1, 'Current job title is required').max(200),
  current_employer: z.string().trim().min(1, 'Current employer is required').max(200),
  reference_name: z.string().trim().min(2, 'Reference name is required').max(100),
  reference_contact: z.string().trim().min(1, 'Reference contact is required').max(255),
  notable_work: z.string().trim().max(2000).optional().or(z.literal('')),

  availability: z.string().trim().min(1, 'Please describe your availability').max(500),
  preferred_format: z.string().min(1, 'Please select a preferred format'),
  rate_expectations: z.string().trim().max(500).optional().or(z.literal('')),

  teaching_motivation: z.string().trim().min(1, 'Please share why you want to teach').max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted' }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  full_name: '',
  email: '',
  phone: '',
  location: '',
  linkedin_url: '',
  degree_field: '',
  certifications: [],
  certifications_other: '',
  cyber_years: undefined as unknown as number,
  teaching_years: undefined as unknown as number,
  specializations: [],
  specializations_other: '',
  teaching_levels: [],
  current_job_title: '',
  current_employer: '',
  reference_name: '',
  reference_contact: '',
  notable_work: '',
  availability: '',
  preferred_format: '',
  rate_expectations: '',
  teaching_motivation: '',
  consent: false as unknown as true,
};

/* ─── Checkbox Group Helper ─── */

function CheckboxGroup({
  control,
  name,
  options,
  otherField,
  noneLabel,
}: {
  control: any;
  name: 'certifications' | 'specializations' | 'teaching_levels';
  options: readonly string[];
  otherField: string;
  noneLabel?: string;
}) {
  const watched = control._formValues[name] || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {options.map((opt) => {
        const isNone = noneLabel ? opt === noneLabel : false;
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
                          next = val ? [opt] : [];
                        } else {
                          if (val) {
                            next = next.filter((t: string) => t !== (noneLabel ?? ''));
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

export default function TutorApplicationClient() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const { checkRateLimit, recordSubmission } = useRateLimit(30000);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const certifications = form.watch('certifications') || [];
  const specializations = form.watch('specializations') || [];
  const showCertsOther = certifications.includes('Other');
  const showSpecsOther = specializations.includes('Other');

  const validateFile = (file: File | null, allowedTypes: string[], label: string): string | null => {
    if (!file) return null;
    if (!allowedTypes.includes(file.type)) {
      return `${label} must be PDF${label === 'Portfolio' ? ', PNG, or JPG' : ' or DOC/DOCX'}.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${label} must be under 5 MB.`;
    }
    return null;
  };

  const getFileExt = (file: File): string => {
    const name = file.name.split('.');
    return name[name.length - 1]?.toLowerCase() || 'bin';
  };

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!resumeFile) {
        throw new Error('Resume/CV is required.');
      }
      const resumeErr = validateFile(resumeFile, ALLOWED_RESUME_TYPES, 'Resume');
      if (resumeErr) throw new Error(resumeErr);
      if (portfolioFile) {
        const portfolioErr = validateFile(portfolioFile, ALLOWED_PORTFOLIO_TYPES, 'Portfolio');
        if (portfolioErr) throw new Error(portfolioErr);
      }

      const submissionId = crypto.randomUUID();

      setUploadProgress(0);

      const resumeExt = getFileExt(resumeFile);
      const resumePath = `tutor-applications/${submissionId}/resume.${resumeExt}`;

      const { error: resumeUploadErr } = await supabase.storage
        .from('tutor-applications')
        .upload(resumePath, resumeFile);
      if (resumeUploadErr) throw new Error(`Resume upload failed: ${resumeUploadErr.message}`);
      setUploadProgress(50);

      let portfolioPath: string | null = null;
      if (portfolioFile) {
        const portfolioExt = getFileExt(portfolioFile);
        portfolioPath = `tutor-applications/${submissionId}/portfolio.${portfolioExt}`;
        const { error: portfolioUploadErr } = await supabase.storage
          .from('tutor-applications')
          .upload(portfolioPath, portfolioFile);
        if (portfolioUploadErr) throw new Error(`Portfolio upload failed: ${portfolioUploadErr.message}`);
      }
      setUploadProgress(75);

      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        location: values.location,
        linkedin_url: values.linkedin_url || null,
        degree_field: values.degree_field,
        certifications: values.certifications.filter((c) => c !== 'Other'),
        certifications_other: showCertsOther ? values.certifications_other || null : null,
        cyber_years: values.cyber_years,
        teaching_years: values.teaching_years,
        specializations: values.specializations.filter((s) => s !== 'Other'),
        specializations_other: showSpecsOther ? values.specializations_other || null : null,
        teaching_levels: values.teaching_levels,
        current_job_title: values.current_job_title,
        current_employer: values.current_employer,
        resume_url: resumePath,
        portfolio_url: portfolioPath,
        reference_name: values.reference_name,
        reference_contact: values.reference_contact,
        notable_work: values.notable_work || null,
        availability: values.availability,
        preferred_format: values.preferred_format,
        rate_expectations: values.rate_expectations || null,
        teaching_motivation: values.teaching_motivation,
        consent: true,
      };

      const { data, error } = await supabase
        .from('tutor_applications')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      setUploadProgress(100);
      return data;
    },
    onSuccess: async (data) => {
      recordSubmission();

      try {
        await supabase.functions.invoke('notify-tutor-application', { body: data });
      } catch (notifyErr) {
        console.error('Failed to send email notification:', notifyErr);
      }

      toast.success('Application submitted successfully!');
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast.error(`Submission failed: ${error.message || 'Please try again later.'}`);
      console.error('Tutor application submission error:', error);
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!checkRateLimit()) return;
    setResumeError(null);
    setPortfolioError(null);

    const rErr = validateFile(resumeFile, ALLOWED_RESUME_TYPES, 'Resume');
    if (rErr) { setResumeError(rErr); return; }
    if (!resumeFile) { setResumeError('Resume/CV is required.'); return; }

    if (portfolioFile) {
      const pErr = validateFile(portfolioFile, ALLOWED_PORTFOLIO_TYPES, 'Portfolio');
      if (pErr) { setPortfolioError(pErr); return; }
    }

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
            <CardTitle className="text-2xl mb-2">Application Submitted!</CardTitle>
            <CardDescription className="text-base mb-8">
              Thank you for applying to teach at FutureLabs Africa. Our team will
              review your application and reach out within 1–2 business days.
            </CardDescription>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => router.push('/')}>
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSubmitted(false);
                  setResumeFile(null);
                  setPortfolioFile(null);
                  setResumeError(null);
                  setPortfolioError(null);
                  setUploadProgress(null);
                  form.reset(defaultValues);
                }}
              >
                Submit Another Application
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
          title="Apply to Teach"
          subtitle="Share your cybersecurity expertise with the next generation of professionals at FutureLabs Africa."
        />

        <div className="max-w-3xl mx-auto px-4 py-12">
          <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Tutor Application
              </CardTitle>
              <CardDescription>
                All fields marked with <span className="text-destructive">*</span>{' '}
                are required. Your information helps us match you with the right
                teaching opportunities.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {uploadProgress !== null && uploadProgress < 100 && (
                <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading files…
                    </span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10"
                >
                  {/* ═══════ SECTION 1: IDENTITY & CONTACT ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Identity & Contact
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} maxLength={100} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" {...field} maxLength={255} />
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
                            <FormLabel>Phone <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 234 567 890" {...field} maxLength={20} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location / City <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Nairobi, Kenya" {...field} maxLength={200} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="linkedin_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn / profile URL</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://linkedin.com/in/janedoe" {...field} maxLength={500} />
                          </FormControl>
                          <FormDescription>Optional.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* ═══════ SECTION 2: QUALIFICATIONS ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Qualifications & Credentials
                    </legend>

                    <FormField
                      control={form.control}
                      name="degree_field"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Highest degree & field of study <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. B.Sc. Computer Science" {...field} maxLength={300} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
                        Cybersecurity certifications held <span className="text-destructive">*</span>
                      </FormLabel>
                      <CheckboxGroup
                        control={form.control}
                        name="certifications"
                        options={CERTIFICATIONS}
                        otherField="certifications_other"
                      />
                      <FormMessage>
                        {form.formState.errors.certifications?.message || form.formState.errors.certifications_other?.message}
                      </FormMessage>
                    </div>

                    {showCertsOther && (
                      <FormField
                        control={form.control}
                        name="certifications_other"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other certifications</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. GSEC, AWS Security Specialty" {...field} maxLength={200} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cyber_years"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years in cybersecurity <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                placeholder="5"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teaching_years"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years teaching / training <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                placeholder="2"
                                {...field}
                                value={field.value ?? ''}
                                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>

                  {/* ═══════ SECTION 3: EXPERTISE ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Expertise
                    </legend>

                    <div>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
                        Areas of specialization <span className="text-destructive">*</span>
                      </FormLabel>
                      <CheckboxGroup
                        control={form.control}
                        name="specializations"
                        options={SPECIALIZATIONS}
                        otherField="specializations_other"
                      />
                      <FormMessage>
                        {form.formState.errors.specializations?.message || form.formState.errors.specializations_other?.message}
                      </FormMessage>
                    </div>

                    {showSpecsOther && (
                      <FormField
                        control={form.control}
                        name="specializations_other"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other specialization</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. IoT Security" {...field} maxLength={200} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
                        Skill levels comfortable teaching <span className="text-destructive">*</span>
                      </FormLabel>
                      <CheckboxGroup
                        control={form.control}
                        name="teaching_levels"
                        options={TEACHING_LEVELS}
                        otherField=""
                      />
                      <FormMessage>
                        {form.formState.errors.teaching_levels?.message}
                      </FormMessage>
                    </div>
                  </fieldset>

                  {/* ═══════ SECTION 4: CREDIBILITY ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Proof of Credibility
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="current_job_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current / most recent job title <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Security Engineer" {...field} maxLength={200} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="current_employer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current employer <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} maxLength={200} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Resume upload */}
                    <FormItem>
                      <FormLabel>
                        Resume / CV <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="relative"
                          onClick={() => document.getElementById('resume-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {resumeFile ? 'Change file' : 'Choose file'}
                        </Button>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setResumeFile(file);
                            setResumeError(null);
                          }}
                        />
                        {resumeFile && (
                          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {resumeFile.name}
                          </span>
                        )}
                      </div>
                      <FormDescription>
                        PDF, DOC, or DOCX. Max 5 MB.
                      </FormDescription>
                      {resumeError && (
                        <p className="text-sm font-medium text-destructive mt-1">{resumeError}</p>
                      )}
                    </FormItem>

                    {/* Portfolio upload */}
                    <FormItem>
                      <FormLabel>Portfolio / work samples</FormLabel>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="relative"
                          onClick={() => document.getElementById('portfolio-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {portfolioFile ? 'Change file' : 'Choose file'}
                        </Button>
                        <input
                          id="portfolio-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setPortfolioFile(file);
                            setPortfolioError(null);
                          }}
                        />
                        {portfolioFile && (
                          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {portfolioFile.name}
                          </span>
                        )}
                      </div>
                      <FormDescription>
                        Optional. PDF, DOC, DOCX, PNG, or JPG. Max 5 MB.
                      </FormDescription>
                      {portfolioError && (
                        <p className="text-sm font-medium text-destructive mt-1">{portfolioError}</p>
                      )}
                    </FormItem>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="reference_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reference name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. John Smith" {...field} maxLength={100} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="reference_contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reference contact (email or phone) <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} maxLength={255} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notable_work"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notable projects / CTF wins / publications</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe any notable cybersecurity projects, CTF competition wins, or publications…"
                              className="min-h-[100px]"
                              {...field}
                              maxLength={2000}
                            />
                          </FormControl>
                          <FormDescription>Optional.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* ═══════ SECTION 5: LOGISTICS ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Logistics
                    </legend>

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. Weekday evenings, weekends, or specific date ranges…"
                              className="min-h-[80px]"
                              {...field}
                              maxLength={500}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferred_format"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Preferred format <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex flex-wrap gap-4"
                            >
                              {FORMAT_OPTIONS.map((opt) => (
                                <FormItem key={opt} className="flex items-center gap-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={opt} id={`format-${opt}`} />
                                  </FormControl>
                                  <FormLabel htmlFor={`format-${opt}`} className="font-normal cursor-pointer">
                                    {opt}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rate_expectations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate / compensation expectations</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Negotiable, $X per session, pro bono" {...field} maxLength={500} />
                          </FormControl>
                          <FormDescription>Optional.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* ═══════ SECTION 6: CLOSING ═══════ */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full">
                      Closing
                    </legend>

                    <FormField
                      control={form.control}
                      name="teaching_motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Why do you want to teach at FutureLabs Africa?{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share what motivates you to give back to the cybersecurity community…"
                              className="min-h-[120px]"
                              {...field}
                              maxLength={2000}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              I consent to be contacted regarding this application{' '}
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

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        {uploadProgress !== null && uploadProgress < 100
                          ? 'Uploading files…'
                          : 'Submitting Application…'}
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
}
