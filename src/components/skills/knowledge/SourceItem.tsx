
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, File, Edit, Trash } from 'lucide-react';
import { Source } from './types';

interface SourceItemProps {
  source: Source;
  onEdit: (source: Source) => void;
  onDelete: (id: string) => void;
}

const SourceItem: React.FC<SourceItemProps> = ({ 
  source, 
  onEdit, 
  onDelete 
}) => {
  const getIcon = () => {
    switch (source.type) {
      case 'link':
        return <LinkIcon className="h-4 w-4 text-blue-500" />;
      case 'text':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'file':
        return <File className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDescription = () => {
    if (source.description) return source.description;
    
    if (source.type === 'link') {
      try {
        const url = new URL(source.content);
        return `${url.hostname}${url.pathname.length > 1 ? '...' : ''}`;
      } catch {
        return source.content;
      }
    }
    
    return source.type === 'text' 
      ? source.content.length > 60 
        ? `${source.content.substring(0, 60)}...` 
        : source.content
      : 'File reference';
  };

  const isUrl = source.type === 'link' && (
    source.content.startsWith('http://') || 
    source.content.startsWith('https://')
  );

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <CardContent className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 bg-muted rounded-full">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">
              {isUrl ? (
                <a 
                  href={source.content} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {source.content}
                </a>
              ) : (
                <span>{source.content}</span>
              )}
            </div>
            {source.description && (
              <p className="text-xs text-muted-foreground truncate">{source.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onEdit(source)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(source.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceItem;
