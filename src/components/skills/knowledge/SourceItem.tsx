
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Source } from './types';

interface SourceItemProps {
  source: Source;
  onEdit: (source: Source) => void;
  onDelete: (id: string) => void;
}

const SourceItem: React.FC<SourceItemProps> = ({ source, onEdit, onDelete }) => {
  return (
    <div key={source.id} className="flex items-start justify-between p-3 bg-muted rounded-md">
      <div className="flex-1 mr-2">
        <p className="text-sm break-words">{source.content}</p>
        {source.description && (
          <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
        )}
      </div>
      <div className="flex space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7" 
          onClick={() => onEdit(source)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-destructive" 
          onClick={() => onDelete(source.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SourceItem;
