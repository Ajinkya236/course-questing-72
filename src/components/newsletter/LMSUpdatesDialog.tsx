
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
          <Button variant="ghost" className="flex items-center gap-2 w-full justify-start">
            <Newspaper className="h-4 w-4" />
            <span>LMS Updates</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">LMS Feature Updates</DialogTitle>
        </DialogHeader>
        <LMSUpdatesNewsletter />
      </DialogContent>
    </Dialog>
  );
};

export default LMSUpdatesDialog;
