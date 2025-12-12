import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Mail, User } from 'lucide-react';
import { Attendee } from '@/hooks/use-attendees';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AttendeesModalProps {
  attendees: Attendee[];
  eventTitle: string;
}

const AttendeesModal = ({ attendees, eventTitle }: AttendeesModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-12 gap-2">
          <Users className="h-4 w-4" />
          View Attendees ({attendees.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Registered Attendees
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {attendees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No registrations yet</p>
              <p className="text-sm">Be the first to register!</p>
            </div>
          ) : (
            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-3">
                {attendees.map((attendee, index) => (
                  <div 
                    key={attendee.email + index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">
                        {attendee.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        {attendee.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendeesModal;
