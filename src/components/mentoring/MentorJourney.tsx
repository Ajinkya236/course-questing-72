
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, Clock, Users, LineChart } from 'lucide-react';

const MentorJourney = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Features Coming Soon</CardTitle>
          <CardDescription>
            We're currently building exciting features for mentors. Here's a preview of what's coming:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <UserCog className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Requests</span>
              </TabsTrigger>
              <TabsTrigger value="engagements" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Engagements</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Management</CardTitle>
                  <CardDescription>
                    Set up your mentoring topics, skills, and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">Coming soon features:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Profile setup wizard</li>
                    <li>Expertise mapping</li>
                    <li>Availability management</li>
                    <li>Rate and session configuration</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Request Handling</CardTitle>
                  <CardDescription>
                    Review and respond to mentorship requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon features:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Request inbox</li>
                    <li>Mentee profile review</li>
                    <li>Request acceptance workflow</li>
                    <li>Rejection with feedback options</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="engagements">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Management</CardTitle>
                  <CardDescription>
                    Manage your ongoing mentorships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon features:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Session planning and scheduling</li>
                    <li>Task assignment</li>
                    <li>Course recommendations</li>
                    <li>Progress tracking</li>
                    <li>Engagement conclusion</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Mentor Dashboard</CardTitle>
                  <CardDescription>
                    Track your impact and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon features:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Mentor impact metrics</li>
                    <li>Feedback analytics</li>
                    <li>Session history</li>
                    <li>Mentee success stories</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center pt-4">
            <Button disabled>Join Mentor Waitlist</Button>
            <p className="text-xs text-muted-foreground mt-2">Be the first to know when mentor features are available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorJourney;
