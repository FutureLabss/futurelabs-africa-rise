import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

const STORAGE_KEY = 'tutorModalDismissed';

const TutorCtaModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
    setOpen(isOpen);
  };

  const handleCtaClick = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md gap-6 p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-poppins font-bold text-foreground">
            Are You a Cybersecurity Expert?
          </DialogTitle>
          <DialogDescription className="text-sm font-roboto text-muted-foreground leading-relaxed">
            We're looking for qualified cybersecurity professionals to join our
            tutor network. If you have the skills and passion to teach, we'd
            love to hear from you.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3">
          <Button
            asChild
            onClick={handleCtaClick}
            className="w-full h-12 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/apply-to-teach">Apply to Teach</Link>
          </Button>

          <DialogClose asChild>
            <button className="text-sm font-roboto text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Maybe Later
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorCtaModal;
