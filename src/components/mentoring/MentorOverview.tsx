
import React, { useState } from 'react';
import { Users, Calendar, Clock, CheckCircle, User, Award, Book, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MentorProfileSetup from './MentorProfileSetup';

const MentorOverview = () => {
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('dashboard');
  
  const isMentorProfileComplete = false;
  
  // Mock data
  const pendingRequests = [];
  const activeMentorships = [];
  
  if (!isMentorProfileComplete) {
    return <MentorProfileSetup onComplete={() => setShowProfileSetup(false)} />;
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Mentor Dashboard</h2>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setShowProfileSetup(true)}
        >
          <Settings className="h-4 w-4" />
          Edit Mentor Profile
        </Button>
      </div>
      
      <Tabs defaultValue={activeSubTab} onValueChange={setActiveSubTab} className="w-full mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Sessions
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingRequests.length}</div>
                <p className="text-sm text-muted-foreground mt-1">No pending mentorship requests</p>
                {pendingRequests.length > 0 ? (
                  <Button variant="outline" className="w-full mt-4 gap-2" onClick={() => setActiveSubTab('requests')}>
                    <Clock className="h-4 w-4" />
                    View Requests
                  </Button>
                ) : null}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Active Mentorships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeMentorships.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeMentorships.length > 0 
                    ? `You are currently mentoring ${activeMentorships.length} mentees` 
                    : 'You are not currently mentoring anyone'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground mt-1">No upcoming mentoring sessions</p>
                <Button variant="outline" className="w-full mt-4 gap-2" onClick={() => setActiveSubTab('sessions')}>
                  <Calendar className="h-4 w-4" />
                  Schedule Session
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-muted/50 rounded-lg">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Share Your Expertise</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              No active mentorships yet. Update your mentor profile to start receiving mentorship requests.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => setShowProfileSetup(true)}>
                <User className="h-4 w-4" />
                Update Mentor Profile
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sessions">
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Scheduled Sessions</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              You don't have any mentoring sessions scheduled. Once you have active mentorships, you can schedule sessions with your mentees.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="requests">
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Pending Requests</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              You don't have any pending mentorship requests. Update your mentor profile to increase visibility and attract mentees.
            </p>
            <Button size="lg" className="gap-2" onClick={() => setShowProfileSetup(true)}>
              <User className="h-4 w-4" />
              Update Mentor Profile
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorOverview;
