
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MenteeOverview from '@/components/mentoring/MenteeOverview';
import MentorOverview from '@/components/mentoring/MentorOverview';
import MentorshipRequests from '@/components/mentoring/MentorshipRequests';
import { 
  Users, 
  Target, 
  Calendar, 
  BookOpen,
  UserPlus
} from 'lucide-react';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Helmet>
        <title>Mentoring | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mentoring</h1>
            <p className="text-muted-foreground mt-1">Connect with mentors or become a mentor to help others grow</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Find a Mentor
            </Button>
            <Button className="gap-2">
              <Users className="h-4 w-4" />
              Become a Mentor
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="mentee" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">As Mentee</span>
            </TabsTrigger>
            <TabsTrigger value="mentor" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">As Mentor</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Active Mentorships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">You don't have any active mentorships</p>
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Users className="h-4 w-4" />
                    Find a Mentor
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Completed Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">No mentoring sessions completed yet</p>
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule a Session
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">No pending mentorship requests</p>
                  <Button variant="outline" className="w-full mt-4 gap-2" 
                    onClick={() => setActiveTab('mentee')}>
                    <UserPlus className="h-4 w-4" />
                    View Requests
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <MentorshipRequests />
          </TabsContent>
          
          <TabsContent value="mentee">
            <MenteeOverview />
          </TabsContent>
          
          <TabsContent value="mentor">
            <MentorOverview />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
