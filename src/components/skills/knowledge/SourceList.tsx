
import React from 'react';
import SourceItem from './SourceItem';
import { Source } from './types';

interface SourceListProps {
  sources: Source[];
  onEditSource: (source: Source) => void;
  onDeleteSource: (id: string) => void;
}

const SourceList: React.FC<SourceListProps> = ({ 
  sources, 
  onEditSource, 
  onDeleteSource 
}) => {
  if (sources.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No sources added yet. Add sources to improve AI responses.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <SourceItem 
          key={source.id}
          source={source}
          onEdit={() => onEditSource(source)}
          onDelete={() => onDeleteSource(source.id)}
        />
      ))}
    </div>
  );
};

export default SourceList;
