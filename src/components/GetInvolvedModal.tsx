import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GetInvolvedModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

const GetInvolvedModal: React.FC<GetInvolvedModalProps> = ({ isOpen, onClose, type }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const getTitle = () => {
    switch (type) {
      case 'train': return 'Train With Us';
      case 'partner': return 'Partner With Us';
      case 'mentor': return 'Mentor With Us';
      case 'invest': return 'Invest in Us';
      case 'community': return 'Join Community';
      default: return 'Get Involved';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/hello@futurelabs.africa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New "${getTitle()}" Inquiry - FutureLabs.africa`,
          _template: 'table',
          'Full Name': formData.name,
          Email: formData.email,
          Phone: formData.phone || 'Not provided',
          Message: formData.message || 'Not provided',
          'Inquiry Type': getTitle(),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      toast({ title: 'Submitted!', description: 'Your inquiry has been sent. We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
          <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
          <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default GetInvolvedModal;
