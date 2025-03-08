
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  FileText, 
  Calendar, 
  Video, 
  CheckCircle, 
  Plus,
  BookOpen
} from 'lucide-react';

interface ActiveMentorshipsProps {
  selectedMentee: number;
}

const ActiveMentorships: React.FC<ActiveMentorshipsProps> = ({ selectedMentee }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Mentorship Dashboard</CardTitle>
            <Badge variant="outline" className="px-2 py-0.5">Active</Badge>
          </div>
          <CardDescription>
            Mentee ID: {selectedMentee}
          </CardDescription>
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
          
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
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
            
            <TabsContent value="progress">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Skills Development</h4>
                  <div className="h-2 bg-secondary rounded-full w-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">65% Complete</span>
                    <span className="text-xs text-muted-foreground">13/20 Skills</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Sessions Completed</h4>
                  <div className="h-2 bg-secondary rounded-full w-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">40% Complete</span>
                    <span className="text-xs text-muted-foreground">4/10 Sessions</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full flex justify-between">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Career Development Plan
                  </span>
                </Button>
                
                <Button variant="outline" size="sm" className="w-full flex justify-between">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Recommended Reading
                  </span>
                </Button>
                
                <Button variant="outline" size="sm" className="w-full flex justify-between">
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    Interview Preparation
                  </span>
                </Button>
                
                <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                  <Plus className="h-4 w-4" />
                  Add Resource
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
