
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, Clock, Bookmark, Share } from 'lucide-react';

interface CourseFiltersProps {
  activeFilter: string;
  filterCounts: Record<string, number>;
  onFilterChange: (filter: string) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  activeFilter,
  filterCounts,
  onFilterChange
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={activeFilter === 'all' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('all')}
        className="flex items-center gap-1"
      >
        <BookOpen className="h-4 w-4" />
        All Courses
        <Badge variant="secondary" className="ml-1">{filterCounts.all}</Badge>
      </Button>
      
      <Button 
        variant={activeFilter === 'in-progress' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('in-progress')}
        className="flex items-center gap-1"
      >
        <Clock className="h-4 w-4" />
        In Progress
        <Badge variant="secondary" className="ml-1">{filterCounts['in-progress']}</Badge>
      </Button>
      
      <Button 
        variant={activeFilter === 'assigned' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('assigned')}
        className="flex items-center gap-1"
      >
        <BookOpen className="h-4 w-4" />
        Not Started
        <Badge variant="secondary" className="ml-1">{filterCounts.assigned}</Badge>
      </Button>
      
      <Button 
        variant={activeFilter === 'completed' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('completed')}
        className="flex items-center gap-1"
      >
        <Check className="h-4 w-4" />
        Completed
        <Badge variant="secondary" className="ml-1">{filterCounts.completed}</Badge>
      </Button>
      
      <Button 
        variant={activeFilter === 'saved' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('saved')}
        className="flex items-center gap-1"
      >
        <Bookmark className="h-4 w-4" />
        Saved
        <Badge variant="secondary" className="ml-1">{filterCounts.saved}</Badge>
      </Button>
      
      <Button 
        variant={activeFilter === 'shared' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('shared')}
        className="flex items-center gap-1"
      >
        <Share className="h-4 w-4" />
        Shared with Me
        <Badge variant="secondary" className="ml-1">{filterCounts.shared}</Badge>
      </Button>
    </div>
  );
};

export default CourseFilters;
