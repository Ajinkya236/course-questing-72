
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen,
  Plus 
} from 'lucide-react';

const CoursesTab: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="p-3 border rounded-md flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-primary/10 rounded-md p-2">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">JavaScript Fundamentals</h4>
            <p className="text-xs text-muted-foreground">Recommended: 2 days ago</p>
          </div>
        </div>
        <Badge variant="outline">In Progress</Badge>
      </div>
      
      <div className="p-3 border rounded-md flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-primary/10 rounded-md p-2">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Agile Project Management</h4>
            <p className="text-xs text-muted-foreground">Recommended: 1 week ago</p>
          </div>
        </div>
        <Badge variant="outline">Not Started</Badge>
      </div>
      
      <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
        <Plus className="h-4 w-4" />
        Recommend Course
      </Button>
    </div>
  );
};

export default CoursesTab;
