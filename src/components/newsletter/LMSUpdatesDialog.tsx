
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

interface LMSUpdatesDialogProps {
  trigger?: React.ReactNode;
}

const LMSUpdatesDialog: React.FC<LMSUpdatesDialogProps> = ({ trigger }) => {
  const navigate = useNavigate();
  
  const handleOpenUpdates = () => {
    navigate('/lms-updates');
  };
  
  return (
    <div onClick={handleOpenUpdates}>
      {trigger || (
        <Button variant="ghost" className="flex items-center gap-2 w-full justify-start">
          <Newspaper className="h-4 w-4" />
          <span>LMS Updates</span>
        </Button>
      )}
    </div>
  );
};

export default LMSUpdatesDialog;
