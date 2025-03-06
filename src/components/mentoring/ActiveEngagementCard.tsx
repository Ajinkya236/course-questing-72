
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  FileText, 
  BookOpen, 
  Target, 
  ChevronRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Session {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'upcoming';
  notes?: string;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: 'completed' | 'pending';
}

interface Course {
  id: number;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

interface Engagement {
  id: number;
  mentorName: string;
  mentorTitle: string;
  topic: string;
  startDate: string;
  imageUrl: string;
  progress: number;
  sessions: Session[];
  tasks: Task[];
  courses: Course[];
  goalsSet: boolean;
  sessionsCompleted: number;
}

interface ActiveEngagementCardProps {
  engagement: Engagement;
}

const ActiveEngagementCard: React.FC<ActiveEngagementCardProps> = ({ engagement }) => {
  const isCompletionReady = engagement.goalsSet && engagement.sessionsCompleted > 0;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={engagement.imageUrl} 
              alt={engagement.mentorName} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1">
            <div>
              <h4 className="font-medium">{engagement.mentorName}</h4>
              <p className="text-sm text-muted-foreground">{engagement.mentorTitle}</p>
            </div>
            <div className="mt-1">
              <Badge variant="secondary">{engagement.topic}</Badge>
              <span className="text-xs text-muted-foreground ml-2">
                Started on {new Date(engagement.startDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm">{engagement.progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${engagement.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <Calendar className="h-4 w-4 mx-auto mb-1 text-primary" />
            <span className="text-xs block">Sessions</span>
            <span className="text-lg font-semibold">{engagement.sessionsCompleted}</span>
            <span className="text-xs text-muted-foreground">/{engagement.sessions.length}</span>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <FileText className="h-4 w-4 mx-auto mb-1 text-primary" />
            <span className="text-xs block">Tasks</span>
            <span className="text-lg font-semibold">
              {engagement.tasks.filter(t => t.status === 'completed').length}
            </span>
            <span className="text-xs text-muted-foreground">/{engagement.tasks.length}</span>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
            <span className="text-xs block">Courses</span>
            <span className="text-lg font-semibold">
              {engagement.courses.filter(c => c.progress === 100).length}
            </span>
            <span className="text-xs text-muted-foreground">/{engagement.courses.length}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <Checkbox id={`goals-${engagement.id}`} checked={engagement.goalsSet} />
          <label htmlFor={`goals-${engagement.id}`} className="text-sm flex items-center gap-1">
            <Target className="h-4 w-4 text-primary" />
            Goals Set
          </label>
        </div>
        
        {!isCompletionReady && (
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-xs text-amber-700">
                To complete this engagement, you need to set your goals and complete at least one session.
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
          >
            <Target className="h-4 w-4" />
            {engagement.goalsSet ? 'Edit Goals' : 'Set Goals'}
          </Button>
          
          <Link to={`/mentoring/engagement/${engagement.id}`}>
            <Button variant="default" size="sm" className="gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveEngagementCard;
