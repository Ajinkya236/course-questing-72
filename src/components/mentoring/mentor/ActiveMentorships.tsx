
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  ListChecks,
  GraduationCap,
} from 'lucide-react';

// Import components
import MenteeHeader from './active-mentorships/MenteeHeader';
import TasksTab from './active-mentorships/TasksTab';
import SessionsTab from './active-mentorships/SessionsTab';
import CoursesTab from './active-mentorships/CoursesTab';
import MentorshipActions from './active-mentorships/MentorshipActions';
import { menteeData } from './active-mentorships/MenteeData';
import { Task } from './active-mentorships/TasksTab';
import { Session } from './active-mentorships/SessionsTab';

interface ActiveMentorshipsProps {
  selectedMentee: number;
}

const ActiveMentorships: React.FC<ActiveMentorshipsProps> = ({ selectedMentee }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [menteeGoals, setMenteeGoals] = useState("Learn data analysis techniques and tools");

  // Mock tasks array for this mentee
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Complete skill assessment", 
      dueDate: "2023-11-15", 
      status: "pending",
      description: "Take the technical assessment to help identify areas for improvement.",
      hasSample: false,
      submission: null
    },
    { 
      id: 2, 
      title: "Review career goals document", 
      dueDate: "2023-11-20", 
      status: "completed",
      description: "Review and comment on the career development plan I shared with you.",
      hasSample: true,
      submission: { 
        id: 1, 
        fileName: "career_goals_review.pdf", 
        submittedDate: "2023-11-18",
        feedback: "Good job identifying your strengths. Consider adding more specific timeframes.",
        rating: 4 
      }
    }
  ]);
  
  // Mock sessions array
  const [sessions, setSessions] = useState<Session[]>([
    { 
      id: 1, 
      title: "Weekly Check-in", 
      date: "2023-11-10T10:00:00", 
      status: "completed",
      notes: "Discussed progress on learning SQL basics and set goals for next week."
    },
    { 
      id: 2, 
      title: "Career Discussion", 
      date: "2023-11-28T14:00:00", 
      status: "upcoming"
    }
  ]);
  
  // For the selected mentee
  const selectedMenteeData = menteeData[selectedMentee];
  
  return (
    <div className="space-y-4">
      <Card>
        <MenteeHeader menteeData={selectedMenteeData} />
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Track your mentorship progress, schedule sessions, and assign tasks.
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="sessions">
                <Calendar className="h-4 w-4 mr-2" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <ListChecks className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="courses">
                <GraduationCap className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sessions">
              <SessionsTab sessions={sessions} setSessions={setSessions} />
            </TabsContent>
            
            <TabsContent value="tasks">
              <TasksTab tasks={tasks} setTasks={setTasks} />
            </TabsContent>
            
            <TabsContent value="courses">
              <CoursesTab />
            </TabsContent>
          </Tabs>
          
          <MentorshipActions 
            menteeGoals={menteeGoals} 
            setMenteeGoals={setMenteeGoals}
            menteeName={selectedMenteeData?.name}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveMentorships;
