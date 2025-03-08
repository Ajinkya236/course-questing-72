
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  FileText, 
  Calendar, 
  Video, 
  CheckCircle, 
  Plus,
  BookOpen,
  ListChecks,
  GraduationCap
} from 'lucide-react';

interface ActiveMentorshipsProps {
  selectedMentee: number;
}

const ActiveMentorships: React.FC<ActiveMentorshipsProps> = ({ selectedMentee }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  // Mock data for the selected mentee
  const menteeData = {
    1: {
      id: 1,
      name: "Emma Johnson",
      role: "Junior Developer",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      lastActive: "2 days ago"
    },
    2: {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Specialist",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      lastActive: "Yesterday"
    },
    3: {
      id: 3,
      name: "Sarah Williams",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/64.jpg",
      lastActive: "Today"
    },
    4: {
      id: 4,
      name: "David Kim",
      role: "Data Scientist",
      avatar: "https://randomuser.me/api/portraits/men/58.jpg",
      lastActive: "3 days ago"
    },
    5: {
      id: 5,
      name: "Olivia Martinez",
      role: "UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/57.jpg",
      lastActive: "5 days ago"
    }
  };

  const selectedMenteeData = menteeData[selectedMentee];
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedMenteeData?.avatar} alt={selectedMenteeData?.name} />
                <AvatarFallback>{selectedMenteeData?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedMenteeData?.name}</CardTitle>
                <CardDescription>
                  {selectedMenteeData?.role} · Last active: {selectedMenteeData?.lastActive}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="px-2 py-0.5">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Track your mentorship progress, schedule sessions, and assign tasks.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Button size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <FileText className="h-4 w-4" />
              Notes
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <Video className="h-4 w-4" />
              Meeting
            </Button>
          </div>
          
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
              <div className="space-y-3">
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Weekly Check-in</h4>
                    <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM - 11:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Video className="h-4 w-4" />
                    Join
                  </Button>
                </div>
                
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Career Discussion</h4>
                    <p className="text-xs text-muted-foreground">Sep 28, 2:00 PM - 3:00 PM</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    Reschedule
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                  <Plus className="h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="space-y-3">
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Complete skill assessment</h4>
                    <p className="text-xs text-muted-foreground">Due in 3 days</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Review career goals document</h4>
                    <p className="text-xs text-muted-foreground">Due in 1 week</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveMentorships;
