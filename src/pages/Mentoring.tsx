
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MenteeJourney from './mentoring/MenteeJourney';
import { Button } from '@/components/ui/button';
import { User, UserRound, Users } from 'lucide-react';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState('mentee');
  
  return (
    <>
      <Helmet>
        <title>Mentoring | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mentoring</h1>
        <p className="text-muted-foreground mb-6">Connect with mentors and grow your skills through guided learning experiences.</p>
        
        <Tabs defaultValue="mentee" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="mentee" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Mentee</span>
            </TabsTrigger>
            <TabsTrigger value="mentor" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span>Mentor</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Mentoring Overview</CardTitle>
                <CardDescription>
                  An overview of your mentoring activities, both as a mentee and mentor.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">My Mentee Journey</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">You have 1 active mentorship and 1 pending request.</p>
                      <Button onClick={() => setActiveTab('mentee')} variant="outline">Go to Mentee Dashboard</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">My Mentor Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">You're not yet registered as a mentor.</p>
                      <Button onClick={() => setActiveTab('mentor')} variant="outline">Become a Mentor</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mentee">
            <MenteeJourney />
          </TabsContent>
          
          <TabsContent value="mentor">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Dashboard</CardTitle>
                <CardDescription>
                  Manage your mentor profile, requests, and mentee engagements.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Become a Mentor</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Share your expertise and help others grow by becoming a mentor.
                    Complete your mentor profile to get started.
                  </p>
                  <Button>Set Up Mentor Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
