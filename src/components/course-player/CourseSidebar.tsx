
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  X, 
  ChevronDown, 
  Play, 
  FileText, 
  HelpCircle,
  Award
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Module {
  id: string;
  title: string;
  completed: boolean;
  activities: Activity[];
}

interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'h5p';
  completed: boolean;
  duration?: string;
}

// Mock data for modules and activities
const mockModules: Module[] = [
  {
    id: "module-1",
    title: "Introduction to Leadership",
    completed: true,
    activities: [
      { id: "act-1", title: "Welcome to the Course", type: "video", completed: true, duration: "5:30" },
      { id: "act-2", title: "What is Leadership?", type: "video", completed: true, duration: "10:15" },
      { id: "act-3", title: "Leadership Styles Quiz", type: "quiz", completed: true },
    ]
  },
  {
    id: "module-2",
    title: "Leadership in Action",
    completed: false,
    activities: [
      { id: "act-4", title: "Case Studies", type: "video", completed: true, duration: "15:45" },
      { id: "act-5", title: "Interactive Decision Making", type: "h5p", completed: false },
      { id: "act-6", title: "Leadership Challenges", type: "video", completed: false, duration: "12:20" },
    ]
  },
  {
    id: "module-3",
    title: "Team Management",
    completed: false,
    activities: [
      { id: "act-7", title: "Building Effective Teams", type: "video", completed: false, duration: "8:50" },
      { id: "act-8", title: "Team Communication", type: "video", completed: false, duration: "11:30" },
      { id: "act-9", title: "Team Management Quiz", type: "quiz", completed: false },
    ]
  },
  {
    id: "module-4",
    title: "Advanced Leadership",
    completed: false,
    activities: [
      { id: "act-10", title: "Strategic Leadership", type: "video", completed: false, duration: "14:10" },
      { id: "act-11", title: "Leadership Simulation", type: "h5p", completed: false },
      { id: "act-12", title: "Final Assessment", type: "quiz", completed: false },
    ]
  }
];

interface CourseSidebarProps {
  course: any;
  currentProgress: number;
  onClose: () => void;
}

const CourseSidebar = ({ course, currentProgress, onClose }: CourseSidebarProps) => {
  // Get activity icon based on type
  const getActivityIcon = (type: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4" />;
      case 'h5p':
        return <FileText className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r">
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="font-semibold">Course Contents</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        {/* Course progress summary */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm">{currentProgress}%</span>
          </div>
          <Progress value={currentProgress} className="h-2" />
        </div>
        
        <Separator className="my-4" />
        
        {/* Certificate info */}
        <div className="mb-6 p-3 bg-primary/10 rounded-lg flex items-center gap-3">
          <Award className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-medium text-sm">Certificate Available</h3>
            <p className="text-xs text-muted-foreground">Complete the course to earn your certificate</p>
          </div>
        </div>
        
        {/* Modules accordion */}
        <Accordion type="multiple" defaultValue={["module-1"]}>
          {mockModules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2">
                  {module.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  <span>{module.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  {module.activities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`p-2 rounded-md flex items-center gap-2 hover:bg-secondary cursor-pointer ${
                        activity.completed ? 'text-muted-foreground' : ''
                      }`}
                    >
                      {getActivityIcon(activity.type, activity.completed)}
                      <div className="flex-1">
                        <p className="text-sm">{activity.title}</p>
                        {activity.duration && (
                          <p className="text-xs text-muted-foreground">{activity.duration}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CourseSidebar;
