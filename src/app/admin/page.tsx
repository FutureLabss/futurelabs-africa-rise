"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarPlus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Calendar, 
  Rocket, 
  Globe, 
  Github,
  Search,
  User,
  GraduationCap,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Tables } from '@/integrations/supabase/types';

const AdminDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('tab') || 'events';
  const [events, setEvents] = useState<Tables<'events'>[]>([]);
  const [submissions, setSubmissions] = useState<Tables<'hackathon_submissions'>[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [tutorApplications, setTutorApplications] = useState<Tables<'tutor_applications'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const [eventsRes, submissionsRes, registrationsRes, tutorRes] = await Promise.all([
      supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: false }),
      supabase
        .from('hackathon_submissions')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('registrations')
        .select('*, events(title)')
        .order('created_at', { ascending: false }),
      supabase
        .from('tutor_applications')
        .select('*')
        .order('created_at', { ascending: false }),
    ]);

    if (eventsRes.error) {
      toast({ title: 'Error loading events', description: eventsRes.error.message, variant: 'destructive' });
    } else {
      setEvents(eventsRes.data || []);
    }

    if (submissionsRes.error) {
      console.error('Error loading submissions:', submissionsRes.error);
    } else {
      setSubmissions(submissionsRes.data || []);
    }

    if (registrationsRes.error) {
      console.error('Error loading registrations:', registrationsRes.error);
    } else {
      setRegistrations(registrationsRes.data || []);
    }

    if (tutorRes.error) {
      console.error('Error loading tutor applications:', tutorRes.error);
    } else {
      setTutorApplications(tutorRes.data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeleteEvent = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Event deleted' });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
    setDeleting(null);
  };

  const handleDeleteSubmission = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from('hackathon_submissions').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Submission deleted' });
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
    setDeleting(null);
  };

  const handleDeleteRegistration = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Registration deleted' });
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    }
    setDeleting(null);
  };

  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  const getSignedUrl = async (path: string): Promise<string | null> => {
    if (signedUrls[path]) return signedUrls[path];
    const { data, error } = await supabase.storage
      .from('tutor-applications')
      .createSignedUrl(path, 86400);
    if (error) {
      console.error('Failed to create signed URL:', error);
      return null;
    }
    setSignedUrls((prev) => ({ ...prev, [path]: data.signedUrl }));
    return data.signedUrl;
  };

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingStatus(id);
    const { error } = await supabase
      .from('tutor_applications')
      .update({ status: status as any })
      .eq('id', id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Status updated' });
      setTutorApplications((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: status as any } : r)),
      );
    }
    setUpdatingStatus(null);
  };

  const handleDeleteTutorApplication = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from('tutor_applications').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Application deleted' });
      setTutorApplications((prev) => prev.filter((r) => r.id !== id));
    }
    setDeleting(null);
  };

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    reviewing: 'bg-amber-100 text-amber-700 border-amber-200',
    accepted: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  const DetailRow = ({ label, value }: { label: string; value?: string | number | null }) =>
    value ? (
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-foreground break-words">{value}</span>
      </div>
    ) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage events and registrations.</p>
        </div>
      </div>

      <Tabs 
        value={currentTab} 
        onValueChange={(val) => router.push(`/admin?tab=${val}`)} 
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="registrations" className="gap-2">
            <User className="h-4 w-4" />
            Submissions
          </TabsTrigger>
          <TabsTrigger value="submissions" className="gap-2">
            <Rocket className="h-4 w-4" />
            Hackathon
          </TabsTrigger>
          <TabsTrigger value="tutor-applications" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Tutor Applications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{events.length} event{events.length !== 1 ? 's' : ''} total</h2>
            <Button asChild>
              <Link href="/admin/events/new">
                <CalendarPlus className="h-4 w-4 mr-2" />
                New Event
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">No events yet. Create your first one!</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => {
                      const isPast = new Date(event.start_time) < new Date();
                      return (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium max-w-[250px] truncate">
                            {event.title}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(event.start_time), 'MMM d, yyyy · h:mm a')}
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {event.location_details || '—'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={isPast ? 'secondary' : 'default'}>
                              {isPast ? 'Past' : event.featured ? 'Featured' : 'Upcoming'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/events/${event.id}/edit`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete "{event.title}"?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. All registrations for this event will also be removed.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    {deleting === event.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registrations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{registrations.length} registration{registrations.length !== 1 ? 's' : ''} total</h2>
          </div>

          <Card>
            <CardContent className="p-0">
              {registrations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <User className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">No registrations yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-semibold">{reg.full_name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone || '—'}</TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {reg.events?.title || '—'}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete registration?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will remove {reg.full_name} from the event "{reg.events?.title || '—'}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteRegistration(reg.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {deleting === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{submissions.length} submission{submissions.length !== 1 ? 's' : ''} total</h2>
          </div>

          <Card>
            <CardContent className="p-0">
              {submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Rocket className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">No submissions yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Tagline</TableHead>
                      <TableHead>Tech Stack</TableHead>
                      <TableHead>Links</TableHead>
                      <TableHead>Submitted At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-semibold">{sub.title}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground">
                          {sub.tagline}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {sub.tech_stack?.slice(0, 3).map((tech: string) => (
                              <Badge key={tech} variant="outline" className="text-[10px] px-1.5 py-0">
                                {tech}
                              </Badge>
                            ))}
                            {sub.tech_stack?.length > 3 && (
                              <span className="text-[10px] text-muted-foreground">+{sub.tech_stack.length - 3}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {sub.demo_url && (
                              <a href={sub.demo_url} target="_blank" rel="noreferrer" title="Demo">
                                <Globe className="h-4 w-4 text-primary hover:text-primary/80" />
                              </a>
                            )}
                            {sub.github_url && (
                              <a href={sub.github_url} target="_blank" rel="noreferrer" title="GitHub">
                                <Github className="h-4 w-4 text-primary hover:text-primary/80" />
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                          {sub.created_at ? format(new Date(sub.created_at), 'MMM d, yyyy') : '—'}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete submission?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will delete the project "{sub.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSubmission(sub.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {deleting === sub.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutor-applications" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {tutorApplications.length} application{tutorApplications.length !== 1 ? 's' : ''} total
            </h2>
          </div>

          <Card>
            <CardContent className="p-0">
              {tutorApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">No tutor applications yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10" />
                        <TableHead>Applicant</TableHead>
                        <TableHead>Credentials</TableHead>
                        <TableHead>Expertise</TableHead>
                        <TableHead>Teaching</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tutorApplications.map((app) => {
                        const isExpanded = expandedRow === app.id;
                        return (
                          <React.Fragment key={app.id}>
                            <TableRow className="cursor-pointer hover:bg-muted/50">
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    setExpandedRow(isExpanded ? null : app.id)
                                  }
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium max-w-[160px] truncate">
                                  {app.full_name}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {app.current_job_title}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm font-medium">
                                  {app.cyber_years} yr{app.cyber_years !== 1 ? 's' : ''}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {app.certifications?.slice(0, 2).map((cert) => (
                                    <Badge key={cert} variant="outline" className="text-[10px] px-1.5 py-0">
                                      {cert}
                                    </Badge>
                                  ))}
                                  {app.certifications?.length > 2 && (
                                    <span className="text-[10px] text-muted-foreground">+{app.certifications.length - 2}</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {app.specializations?.slice(0, 2).map((spec) => (
                                    <Badge key={spec} variant="outline" className="text-[10px] px-1.5 py-0">
                                      {spec}
                                    </Badge>
                                  ))}
                                  {app.specializations?.length > 2 && (
                                    <span className="text-[10px] text-muted-foreground">+{app.specializations.length - 2}</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{app.teaching_years} yr{app.teaching_years !== 1 ? 's' : ''}</div>
                                <div className="text-xs text-muted-foreground">
                                  {app.teaching_levels?.join(', ')}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={app.status}
                                  onValueChange={(val) =>
                                    handleStatusChange(app.id, val)
                                  }
                                  disabled={updatingStatus === app.id}
                                >
                                  <SelectTrigger className="h-8 w-[130px] text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">
                                      <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                                        New
                                      </span>
                                    </SelectItem>
                                    <SelectItem value="reviewing">
                                      <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                                        Reviewing
                                      </span>
                                    </SelectItem>
                                    <SelectItem value="accepted">
                                      <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                                        Accepted
                                      </span>
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                      <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                                        Rejected
                                      </span>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right whitespace-nowrap">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete application from{' '}
                                        {app.full_name}?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently remove this tutor
                                        application. Consider marking it as
                                        "Rejected" instead.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteTutorApplication(app.id)
                                        }
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        {deleting === app.id ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          'Delete'
                                        )}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>

                            {/* Expandable detail row */}
                            {isExpanded && (
                              <TableRow>
                                <TableCell colSpan={7} className="p-0">
                                  <div className="bg-muted/20 border-t border-border px-6 py-5 animate-in slide-in-from-top-1 duration-150">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      {/* Column 1: Contact & Qualifications */}
                                      <div className="space-y-3">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                          Contact
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                          <DetailRow label="Email" value={app.email} />
                                          <DetailRow label="Phone" value={app.phone} />
                                          <DetailRow label="Location" value={app.location} />
                                          {app.linkedin_url && (
                                            <a
                                              href={app.linkedin_url}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="text-xs text-primary hover:underline inline-block"
                                            >
                                              LinkedIn Profile
                                            </a>
                                          )}
                                        </div>

                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">
                                          Qualifications
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                          <DetailRow label="Degree / Field" value={app.degree_field} />
                                          <DetailRow label="Cybersecurity experience" value={`${app.cyber_years} years`} />
                                          <DetailRow label="Teaching experience" value={`${app.teaching_years} years`} />
                                          {app.certifications?.length > 0 && (
                                            <DetailRow label="Certifications" value={app.certifications.join(', ')} />
                                          )}
                                          {app.certifications_other && (
                                            <DetailRow label="Other certs" value={app.certifications_other} />
                                          )}
                                        </div>
                                      </div>

                                      {/* Column 2: Expertise & Credibility */}
                                      <div className="space-y-3">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                          Expertise
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                          {app.specializations?.length > 0 && (
                                            <DetailRow label="Specializations" value={app.specializations.join(', ')} />
                                          )}
                                          {app.specializations_other && (
                                            <DetailRow label="Other specializations" value={app.specializations_other} />
                                          )}
                                          {app.teaching_levels?.length > 0 && (
                                            <DetailRow label="Teaching levels" value={app.teaching_levels.join(', ')} />
                                          )}
                                        </div>

                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">
                                          Credibility
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                          <DetailRow label="Current job" value={app.current_job_title} />
                                          <DetailRow label="Employer" value={app.current_employer} />
                                          <DetailRow label="Reference" value={app.reference_name} />
                                          <DetailRow label="Reference contact" value={app.reference_contact} />
                                          {app.notable_work && (
                                            <DetailRow label="Notable work" value={app.notable_work} />
                                          )}
                                        </div>

                                        {/* Resume & Portfolio download buttons */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                          {app.resume_url && (
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="text-xs"
                                              onClick={async () => {
                                                const url = await getSignedUrl(app.resume_url);
                                                if (url) window.open(url, '_blank');
                                              }}
                                            >
                                              View Resume
                                            </Button>
                                          )}
                                          {app.portfolio_url && (
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="text-xs"
                                              onClick={async () => {
                                                const url = await getSignedUrl(app.portfolio_url);
                                                if (url) window.open(url, '_blank');
                                              }}
                                            >
                                              View Portfolio
                                            </Button>
                                          )}
                                        </div>
                                      </div>

                                      {/* Column 3: Logistics & Motivation */}
                                      <div className="space-y-3">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                          Logistics
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                          <DetailRow label="Availability" value={app.availability} />
                                          <DetailRow label="Preferred format" value={app.preferred_format} />
                                          {app.rate_expectations && (
                                            <DetailRow label="Rate expectations" value={app.rate_expectations} />
                                          )}
                                        </div>

                                        {app.teaching_motivation && (
                                          <>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">
                                              Motivation
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                              {app.teaching_motivation}
                                            </p>
                                          </>
                                        )}

                                        <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                                          Submitted{' '}
                                          {app.created_at
                                            ? format(
                                                new Date(app.created_at),
                                                'MMM d, yyyy · h:mm a',
                                              )
                                            : ''}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
