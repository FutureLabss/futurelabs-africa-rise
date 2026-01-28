import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Event = Database['public']['Tables']['events']['Row'];
export type Registration = Database['public']['Tables']['registrations']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Events
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_time', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function getUpcomingEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function getPastEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .lt('start_time', new Date().toISOString())
    .order('start_time', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getFeaturedEvent() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('featured', true)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(1)
    .maybeSingle();
  
  if (error) throw error;
  return data;
}

export async function getEventBySlug(slug: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) throw error;
  return data;
}

// Registrations
export async function registerForEvent(eventId: string, fullName: string, email: string) {
  const { data, error } = await supabase
    .from('registrations')
    .insert({
      event_id: eventId,
      full_name: fullName,
      email: email,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getEventRegistrations(eventId: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getRegistrationCount(eventId: string) {
  const { count, error } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('status', 'registered');
  
  if (error) throw error;
  return count || 0;
}

export async function updateRegistrationStatus(registrationId: string, status: 'registered' | 'cancelled' | 'attended') {
  const { data, error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', registrationId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Admin helpers
export async function createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, updates: Partial<Event>) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Check if current user is admin
export async function checkIsAdmin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle();
  
  if (error) return false;
  return !!data;
}

// Generate ICS calendar file content
export function generateICSContent(event: Event): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDate = new Date(event.start_time);
  const endDate = event.end_time ? new Date(event.end_time) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const locationText = event.location_type === 'virtual' 
    ? `Virtual Event - ${event.location_details || 'Link will be provided'}`
    : event.location_details || 'TBD';

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FutureLabs//Events//EN
BEGIN:VEVENT
UID:${event.id}@futurelabs.africa
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description?.replace(/\n/g, '\\n') || ''}
LOCATION:${locationText}
END:VEVENT
END:VCALENDAR`;
}

// Download ICS file
export function downloadICSFile(event: Event) {
  const content = generateICSContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.slug || 'event'}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
