
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeRequests from './mentor/MenteeRequests';
import ActiveMentorships from './mentor/ActiveMentorships';
import MentorshipHistory from './mentor/MentorshipHistory';
import { 
  ClipboardList, 
  Users, 
  History,
  Filter,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentorPreferences from './mentor/MentorPreferences';
import { useToast } from '@/hooks/use-toast';

// Mock data for active mentees
const activeMentees = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    role: "Junior Developer", 
    lastActivity: "2 days ago", 
    avatar: "https://randomuser.me/api/portraits/women/33.jpg" 
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    role: "Marketing Specialist", 
    lastActivity: "Yesterday", 
    avatar: "https://randomuser.me/api/portraits/men/42.jpg" 
  },
  { 
    id: 3, 
    name: "Sarah Williams", 
    role: "Product Manager", 
    lastActivity: "Today", 
    avatar: "https://randomuser.me/api/portraits/women/64.jpg" 
  },
  { 
    id: 4, 
    name: "David Kim", 
    role: "Data Scientist", 
    lastActivity: "3 days ago", 
    avatar: "https://randomuser.me/api/portraits/men/58.jpg" 
  },
  { 
    id: 5, 
    name: "Olivia Martinez", 
    role: "UX Designer", 
    lastActivity: "5 days ago", 
    avatar: "https://randomuser.me/api/portraits/women/57.jpg" 
  }
];

const MentorJourney = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedMentee, setSelectedMentee] = useState(1);
  // Track whether preferences are set
  const [preferencesSet, setPreferencesSet] = useState(false);
  // Track if we need to show the preferences dialog
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  
  // Check if preferences have been set previously
  useEffect(() => {
    const savedPreferences = localStorage.getItem('mentorPreferencesSet');
    if (savedPreferences === 'true') {
      setPreferencesSet(true);
    } else {
      // If not set, show the preferences dialog on initial load
      setShowPreferencesDialog(true);
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
  const handlePreferencesSaved = () => {
    setPreferencesSet(true);
    setShowPreferencesDialog(false);
    // Save the preferences in localStorage to persist
    localStorage.setItem('mentorPreferencesSet', 'true');
    toast({
      title: "Preferences Saved",
      description: "Your mentor preferences have been saved successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Mentor Journey</h2>
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
            <DialogTitle>Set Your Mentor Preferences</DialogTitle>
            <DialogDescription>
              Please set your preferences before accessing mentor features
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <MentorPreferences inDialog={true} onSave={handlePreferencesSaved} />
          </div>
        </DialogContent>
      </Dialog>
      
      <Tabs defaultValue="requests" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Active Mentorships</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          {preferencesSet ? (
            <MenteeRequests />
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access mentee requests</p>
              <p className="text-muted-foreground mb-4">Your preferences help us match you with the right mentees</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active">
          {preferencesSet ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-64 lg:w-72 border rounded-lg p-4 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Active Mentees</h3>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {activeMentees.map(mentee => (
                    <div 
                      key={mentee.id}
                      onClick={() => setSelectedMentee(mentee.id)}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${selectedMentee === mentee.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={mentee.avatar} 
                            alt={mentee.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{mentee.name}</div>
                          <div className="text-xs text-muted-foreground">{mentee.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 pl-11">Last active: {mentee.lastActivity}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <ActiveMentorships selectedMentee={selectedMentee} />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access active mentorships</p>
              <p className="text-muted-foreground mb-4">Your preferences help us better manage your mentoring relationships</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          {preferencesSet ? (
            <MentorshipHistory />
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/50">
              <p className="text-lg font-medium mb-4">Please set your preferences to access your mentorship history</p>
              <p className="text-muted-foreground mb-4">Your preferences help us better track your mentoring impact</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorJourney;
