
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteePreferences from './mentee/MenteePreferences';
import MentorDiscovery from './mentee/MentorDiscovery';
import MentorshipRequests from './mentee/MentorshipRequests';
import ActiveEngagements from './mentee/ActiveEngagements';
import MentoringHistory from './mentee/MentoringHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserCog, 
  Search, 
  ClipboardList, 
  Users, 
  History,
  BookOpen,
  Clock,
  Target
} from 'lucide-react';

const MenteeJourney = () => {
  const [activeTab, setActiveTab] = useState('preferences');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">My Mentee Journey</CardTitle>
          <CardDescription>
            Set your preferences, find mentors, and track your mentoring engagements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <UserCog className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Onboarding</h3>
                <p className="text-xs text-muted-foreground">Set your preferences</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Search className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Discovery</h3>
                <p className="text-xs text-muted-foreground">Find the right mentor</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Requests</h3>
                <p className="text-xs text-muted-foreground">Send and track requests</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Users className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Engagement</h3>
                <p className="text-xs text-muted-foreground">Active mentorships</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <History className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Conclusion</h3>
                <p className="text-xs text-muted-foreground">Complete and reflect</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="preferences" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-5 mb-6">
          <TabsTrigger value="preferences" className="flex items-center gap-1">
            <UserCog className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="discovery" className="flex items-center gap-1">
            <Search className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Active</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences">
          <MenteePreferences />
        </TabsContent>
        
        <TabsContent value="discovery">
          <MentorDiscovery />
        </TabsContent>
        
        <TabsContent value="requests">
          <MentorshipRequests />
        </TabsContent>
        
        <TabsContent value="active">
          <ActiveEngagements />
        </TabsContent>
        
        <TabsContent value="history">
          <MentoringHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenteeJourney;
