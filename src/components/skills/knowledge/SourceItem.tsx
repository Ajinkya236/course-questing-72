
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, File, Edit, Trash, Youtube, Image, FileQuestion } from 'lucide-react';
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
        if (source.content.includes('youtube.com') || source.content.includes('youtu.be')) {
          return <Youtube className="h-4 w-4 text-red-500" />;
        }
        return <LinkIcon className="h-4 w-4 text-blue-500" />;
      case 'text':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'file':
        if (source.content.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return <Image className="h-4 w-4 text-purple-500" />;
        } else if (source.content.match(/\.(pdf|doc|docx|ppt|pptx|txt)$/i)) {
          return <FileText className="h-4 w-4 text-amber-500" />;
        }
        return <File className="h-4 w-4 text-amber-500" />;
      default:
        return <FileQuestion className="h-4 w-4" />;
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
      : source.content.split('/').pop() || 'File reference';
  };

  const isUrl = source.type === 'link' && (
    source.content.startsWith('http://') || 
    source.content.startsWith('https://')
  );

  const getContentDisplay = () => {
    if (isUrl) {
      const isYouTube = source.content.includes('youtube.com') || source.content.includes('youtu.be');
      return (
        <a 
          href={source.content} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`hover:underline ${isYouTube ? 'text-red-600' : 'text-blue-600'}`}
        >
          {source.content}
        </a>
      );
    }
    
    if (source.type === 'file' && source.content.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return <span className="text-purple-600">Image: {source.content.split('/').pop()}</span>;
    }
    
    if (source.type === 'file' && source.content.match(/\.(pdf|doc|docx)$/i)) {
      return <span className="text-amber-600">Document: {source.content.split('/').pop()}</span>;
    }
    
    return <span>{source.content}</span>;
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <CardContent className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 bg-muted rounded-full">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">
              {getContentDisplay()}
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
