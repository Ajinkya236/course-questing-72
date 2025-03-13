
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MentorDiscovery from './mentee/MentorDiscovery';
import MentorshipRequests from './mentee/MentorshipRequests';
import ActiveEngagements from './mentee/ActiveEngagements';
import MentoringHistory from './mentee/MentoringHistory';
import { 
  Search, 
  ClipboardList, 
  Users, 
  History,
  Settings
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MenteePreferences from './mentee/MenteePreferences';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const MenteeJourney = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discovery');
  // Track whether preferences are set
  const [preferencesSet, setPreferencesSet] = useState(false);
  // Track if we need to show the preferences dialog
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  // Store selected topics
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  // Check if preferences have been set previously when component mounts
  useEffect(() => {
    const savedPreferences = localStorage.getItem('menteePreferencesSet');
    const savedTopics = localStorage.getItem('menteeSelectedTopics');
    
    if (savedPreferences === 'true') {
      setPreferencesSet(true);
      
      if (savedTopics) {
        try {
          setSelectedTopics(JSON.parse(savedTopics));
        } catch (e) {
          console.error("Failed to parse saved topics", e);
          // If we can't parse the saved topics, set some default ones
          setSelectedTopics(["Leadership", "Software Development"]);
        }
      } else {
        // If no saved topics, set some default ones
        setSelectedTopics(["Leadership", "Software Development"]);
      }
    } else {
      // If preferences aren't set, show the dialog on initial load
      setShowPreferencesDialog(true);
      // Set some default topics
      setSelectedTopics(["Leadership", "Software Development"]);
    }
  }, []);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    // If preferences aren't set, show the dialog
    if (!preferencesSet) {
      setShowPreferencesDialog(true);
      // Don't change the tab until preferences are set
      return;
    }
    setActiveTab(value);
  };
  
  // Handler for when preferences are saved
  const handlePreferencesSaved = (topics: string[]) => {
    setSelectedTopics(topics);
    setPreferencesSet(true);
    setShowPreferencesDialog(false);
    // Save that preferences are set in localStorage
    localStorage.setItem('menteePreferencesSet', 'true');
    localStorage.setItem('menteeSelectedTopics', JSON.stringify(topics));
    toast({
      title: "Preferences Saved",
      description: "Your mentee preferences have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Mentee Journey</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setShowPreferencesDialog(true)}
        >
          <Settings className="h-4 w-4" />
          Set Preferences
        </Button>
      </div>
      
      {/* Preferences Dialog */}
      <Dialog open={showPreferencesDialog} onOpenChange={(open) => {
        // If preferences aren't set, don't allow closing the dialog by clicking outside
        if (!preferencesSet && !open) return;
        setShowPreferencesDialog(open);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Set Your Mentee Preferences</DialogTitle>
            <DialogDescription>
              Please set your preferences before accessing mentee features
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <MenteePreferences inDialog={true} onSave={handlePreferencesSaved} />
          </div>
        </DialogContent>
      </Dialog>
      
      <Tabs defaultValue="discovery" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="discovery" className="flex items-center gap-1">
            <Search className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Mentor Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Active Engagements</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discovery">
          {preferencesSet ? (
            <MentorDiscovery selectedTopics={selectedTopics} />
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access mentor discovery</p>
              <p className="text-muted-foreground mb-4">Your preferences help us match you with the most relevant mentors</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests">
          {preferencesSet ? (
            <MentorshipRequests />
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access your mentorship requests</p>
              <p className="text-muted-foreground mb-4">Your preferences help us better manage your mentorship requests</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active">
          {preferencesSet ? (
            <ActiveEngagements />
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access your active engagements</p>
              <p className="text-muted-foreground mb-4">Your preferences help us better manage your mentorship experiences</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          {preferencesSet ? (
            <MentoringHistory />
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access your mentoring history</p>
              <p className="text-muted-foreground mb-4">Your preferences help us better track your mentoring progress</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenteeJourney;
