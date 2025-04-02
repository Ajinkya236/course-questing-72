
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, Share } from "lucide-react";

interface TabHeaderProps {
  setShowShareDialog: (show: boolean) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ setShowShareDialog }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
      <TabsList className="bg-muted/60">
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> AI Assistant
        </TabsTrigger>
        <TabsTrigger value="learn">
          Learning Resources
        </TabsTrigger>
      </TabsList>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowShareDialog(true)}
          className="flex items-center gap-2"
        >
          <Share className="h-4 w-4" /> Share
        </Button>
      </div>
    </div>
  );
};

export default TabHeader;
