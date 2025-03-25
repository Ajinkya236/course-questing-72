
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import LMSUpdatesNewsletter from './LMSUpdatesNewsletter';

interface LMSUpdatesDialogProps {
  trigger?: React.ReactNode;
}

const LMSUpdatesDialog: React.FC<LMSUpdatesDialogProps> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            <span>LMS Updates</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>LMS Updates</DialogTitle>
        </DialogHeader>
        <LMSUpdatesNewsletter />
      </DialogContent>
    </Dialog>
  );
};

export default LMSUpdatesDialog;
