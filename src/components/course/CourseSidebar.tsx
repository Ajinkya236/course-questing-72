
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Circle, X, BookOpen, HelpCircle, 
  Play, FileQuestion, LayoutGrid 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Course, Activity } from '@/types/course';

interface CourseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onActivitySelect?: (activityId: string) => void;
  currentActivityId?: string;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ 
  isOpen, 
  onClose, 
  course, 
  onActivitySelect,
  currentActivityId 
}) => {
  // Calculate course progress
  const totalActivities = course.modules.reduce(
    (total, module) => total + module.activities.length, 0
  );
  
  const completedActivities = course.modules.reduce(
    (total, module) => 
      total + module.activities.filter(activity => activity.completed).length, 
    0
  );
  
  const progressPercentage = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100) 
    : 0;

  // Function to get the appropriate icon based on activity type
  const getActivityIcon = (type: 'video' | 'quiz' | 'h5p') => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'quiz':
        return <FileQuestion className="h-4 w-4" />;
      case 'h5p':
        return <LayoutGrid className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };
  
  const handleActivityClick = (activityId: string) => {
    if (onActivitySelect) {
      onActivitySelect(activityId);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-80 h-screen border-r bg-card transition-transform duration-300 ease-in-out
        lg:static lg:z-0 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="font-heading">Course Contents</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <ScrollArea className="h-[calc(100vh-144px)]">
          <div className="p-4 space-y-4">
            {course.modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <h3 className="font-heading">{module.title}</h3>
                <div className="space-y-1 pl-4">
                  {module.activities.map((activity) => (
                    <div 
                      key={activity.id}
                      className={`
                        flex items-center gap-2 p-2 rounded-md text-sm
                        ${activity.completed ? 'text-primary' : 'text-muted-foreground'}
                        ${currentActivityId === activity.id ? 'bg-primary/10' : 'hover:bg-muted'}
                        cursor-pointer transition-colors
                      `}
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      {activity.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                      <span className="flex-1 flex items-center gap-2">
                        {getActivityIcon(activity.type)}
                        {activity.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{activity.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default CourseSidebar;
