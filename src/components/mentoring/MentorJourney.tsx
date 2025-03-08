
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeRequests from './mentor/MenteeRequests';
import ActiveMentorships from './mentor/ActiveMentorships';
import MentorshipHistory from './mentor/MentorshipHistory';
import BannerCarousel from '@/components/BannerCarousel';
import { 
  ClipboardList, 
  Users, 
  History,
  Filter,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentorPreferences from './mentor/MentorPreferences';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMediaQuery } from '@/hooks/use-mobile';

// Mock data for HR communications banner
const hrBanners = [
  {
    id: 1,
    title: "New Mentoring Guidelines",
    description: "Updated mentoring best practices are now available in the resource center",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
  },
  {
    id: 2,
    title: "Mentor Recognition Program",
    description: "Nominate outstanding mentors for our quarterly recognition awards",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0"
  },
  {
    id: 3,
    title: "Upcoming Mentor Training",
    description: "Register for our advanced mentoring techniques workshop on June 15",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
  }
];

// Mock data for active mentees
const activeMentees = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    role: "Junior Developer", 
    lastActivity: "2 days ago",
    image: "https://randomuser.me/api/portraits/women/33.jpg" 
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    role: "Marketing Specialist", 
    lastActivity: "Yesterday",
    image: "https://randomuser.me/api/portraits/men/42.jpg" 
  },
  { 
    id: 3, 
    name: "Sarah Williams", 
    role: "Product Manager", 
    lastActivity: "Today",
    image: "https://randomuser.me/api/portraits/women/65.jpg" 
  },
  { 
    id: 4, 
    name: "David Kim", 
    role: "Data Scientist", 
    lastActivity: "3 days ago",
    image: "https://randomuser.me/api/portraits/men/22.jpg" 
  },
  { 
    id: 5, 
    name: "Olivia Martinez", 
    role: "UX Designer", 
    lastActivity: "5 days ago",
    image: "https://randomuser.me/api/portraits/women/47.jpg" 
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
  const handlePreferencesSaved = () => {
    setPreferencesSet(true);
    setShowPreferencesDialog(false);
    toast({
      title: "Preferences Saved",
      description: "Your mentor preferences have been saved successfully."
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
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mentee.image} alt={mentee.name} />
                          <AvatarFallback>{mentee.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{mentee.name}</div>
                          <div className="text-sm text-muted-foreground">{mentee.role}</div>
                          <div className="text-xs text-muted-foreground mt-1">Last active: {mentee.lastActivity}</div>
                        </div>
                      </div>
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
