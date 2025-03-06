
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  BookOpen, 
  Calendar, 
  Edit, 
  FileText, 
  Search, 
  Send, 
  UserRound,
  AlertCircle,
  Check,
  Clock,
  Filter
} from 'lucide-react';
import MenteePreferences from '@/components/mentoring/MenteePreferences';
import MentorDiscovery from '@/components/mentoring/MentorDiscovery';
import MentorshipRequests from '@/components/mentoring/MentorshipRequests';
import ActiveEngagements from '@/components/mentoring/ActiveEngagements';
import MentoringHistory from '@/components/mentoring/MentoringHistory';

// Mock data - in a real app this would come from Supabase
const mockPreferences = {
  isSet: false,
  topics: [],
  objective: '',
  idealMentor: ''
};

const MenteeJourney = () => {
  const [preferences, setPreferences] = useState(mockPreferences);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  
  // Simulate first-time experience
  useEffect(() => {
    if (!preferences.isSet) {
      setShowPreferencesModal(true);
    }
  }, [preferences.isSet]);
  
  const handlePreferencesSave = (newPreferences: any) => {
    setPreferences({ ...newPreferences, isSet: true });
    setShowPreferencesModal(false);
  };

  return (
    <div>
      {!preferences.isSet && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Preferences Required</AlertTitle>
          <AlertDescription>
            Please set your mentoring preferences to unlock all features.
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={() => setShowPreferencesModal(true)}
            >
              Set Preferences
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mentee Dashboard</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setShowPreferencesModal(true)}
        >
          <Edit className="h-4 w-4" />
          Edit Preferences
        </Button>
      </div>
      
      <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="discover" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Find Mentors</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>My Requests</span>
          </TabsTrigger>
          <TabsTrigger value="engagements" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>Active Engagements</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover">
          <MentorDiscovery 
            isEnabled={preferences.isSet} 
            preferredTopics={preferences.topics} 
          />
        </TabsContent>
        
        <TabsContent value="requests">
          <MentorshipRequests isEnabled={preferences.isSet} />
        </TabsContent>
        
        <TabsContent value="engagements">
          <ActiveEngagements isEnabled={preferences.isSet} />
        </TabsContent>
        
        <TabsContent value="history">
          <MentoringHistory isEnabled={preferences.isSet} />
        </TabsContent>
      </Tabs>
      
      {showPreferencesModal && (
        <MenteePreferences 
          open={showPreferencesModal} 
          onOpenChange={setShowPreferencesModal}
          initialValues={preferences}
          onSave={handlePreferencesSave}
        />
      )}
    </div>
  );
};

export default MenteeJourney;
