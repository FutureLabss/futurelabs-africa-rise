import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Tables } from '@/integrations/supabase/types';

const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'events';
  const [events, setEvents] = useState<Tables<'events'>[]>([]);
  const [submissions, setSubmissions] = useState<Tables<'hackathon_submissions'>[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const [eventsRes, submissionsRes, registrationsRes] = await Promise.all([
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
        .order('created_at', { ascending: false })
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
        onValueChange={(val) => setSearchParams({ tab: val })} 
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
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{events.length} event{events.length !== 1 ? 's' : ''} total</h2>
            <Button asChild>
              <Link to="/admin/events/new">
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
                              <Link to={`/admin/events/${event.id}/edit`}>
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
