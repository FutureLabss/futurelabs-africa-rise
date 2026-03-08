import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Loader2, ArrowLeft, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';
import RichTextEditor from '@/components/admin/RichTextEditor';

type LocationType = Database['public']['Enums']['location_type'];

const AdminEventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    start_time: '',
    end_time: '',
    location_type: 'in-person' as LocationType,
    location_details: '',
    capacity: '',
    featured: false,
    image_url: '',
  });

  useEffect(() => {
    if (!isEdit) return;
    supabase.from('events').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) {
        toast({ title: 'Event not found', variant: 'destructive' });
        navigate('/admin');
        return;
      }
      setForm({
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        start_time: data.start_time ? new Date(data.start_time).toISOString().slice(0, 16) : '',
        end_time: data.end_time ? new Date(data.end_time).toISOString().slice(0, 16) : '',
        location_type: data.location_type,
        location_details: data.location_details || '',
        capacity: data.capacity?.toString() || '',
        featured: data.featured,
        image_url: data.image_url || '',
      });
      if (data.image_url) setImagePreview(data.image_url);
      setLoading(false);
    });
  }, [id, isEdit]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'title' && !isEdit) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return form.image_url || null;

    const ext = imageFile.name.split('.').pop();
    const path = `events/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('event-images').upload(path, imageFile);
    if (error) {
      toast({ title: 'Image upload failed', description: error.message, variant: 'destructive' });
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from('event-images').getPublicUrl(path);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.start_time) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const imageUrl = await uploadImage();

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      start_time: new Date(form.start_time).toISOString(),
      end_time: form.end_time ? new Date(form.end_time).toISOString() : null,
      location_type: form.location_type,
      location_details: form.location_details.trim() || null,
      capacity: form.capacity ? parseInt(form.capacity) : null,
      featured: form.featured,
      image_url: imageUrl,
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from('events').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('events').insert(payload));
    }

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: isEdit ? 'Event updated' : 'Event created' });
      navigate('/admin');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-2">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Event' : 'Create New Event'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_time">Start Date & Time *</Label>
                <Input id="start_time" type="datetime-local" value={form.start_time} onChange={(e) => handleChange('start_time', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">End Date & Time</Label>
                <Input id="end_time" type="datetime-local" value={form.end_time} onChange={(e) => handleChange('end_time', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location Type</Label>
                <Select value={form.location_type} onValueChange={(v) => handleChange('location_type', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In Person</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location_details">Location Details</Label>
                <Input id="location_details" placeholder="e.g. Lagos, Nigeria" value={form.location_details} onChange={(e) => handleChange('location_details', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" min="1" value={form.capacity} onChange={(e) => handleChange('capacity', e.target.value)} />
              </div>
              <div className="flex items-center gap-3 pt-7">
                <Switch checked={form.featured} onCheckedChange={(v) => handleChange('featured', v)} />
                <Label>Featured Event</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Image</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors text-sm">
                  <Upload className="h-4 w-4" />
                  {imageFile ? imageFile.name : 'Choose image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 rounded-md max-h-48 object-cover" />
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isEdit ? 'Update Event' : 'Create Event'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEventForm;
