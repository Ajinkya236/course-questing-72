
import React, { useState } from 'react';
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
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MenteePreferences from './mentee/MenteePreferences';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';

// Mock data for HR communications banner
const hrBanners = [
  {
    id: 1,
    title: "Find Your Perfect Mentor",
    description: "Use our enhanced search feature to find mentors who match your interests and career goals",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    id: 2,
    title: "Mentee Success Stories",
    description: "Read how other mentees have advanced their careers through effective mentorship",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    id: 3,
    title: "Maximize Your Mentorship",
    description: "Five tips for getting the most out of your mentoring relationship",
    imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca"
  }
];

const MenteeJourney = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discovery');
  // Track whether preferences are set
  const [preferencesSet, setPreferencesSet] = useState(false);
  // Track if we need to show the preferences dialog
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  // Store selected topics
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  // Track banner index for HR communications
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const isMobile = useMediaQuery();
  
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
    toast({
      title: "Preferences Saved",
      description: "Your mentee preferences have been saved successfully."
    });
  };

  // Navigate HR banner
  const navigateBanner = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentBannerIndex(prev => 
        prev === 0 ? hrBanners.length - 1 : prev - 1
      );
    } else {
      setCurrentBannerIndex(prev => 
        prev === hrBanners.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  // HR Banner component
  const HRBanner = () => {
    const banner = hrBanners[currentBannerIndex];
    
    return (
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => navigateBanner('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="mx-10 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="font-medium">{banner.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{banner.description}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => navigateBanner('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* HR Communications Banner */}
      <HRBanner />
      
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
