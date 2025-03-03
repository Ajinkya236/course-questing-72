
import React, { useState } from 'react';
import BadgeCard from '@/components/BadgeCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Share2, Download, Clock, Star, Trophy, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Enhanced mock data for badges with more categories and details
const badges = [
  {
    id: '1',
    title: 'Fast Learner',
    description: 'Completed 5 courses in under 30 days',
    category: 'Achievement',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-08-15',
  },
  {
    id: '2',
    title: 'Tech Enthusiast',
    description: 'Completed all courses in the Technology track',
    category: 'Specialization',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-09-02',
  },
  {
    id: '3',
    title: 'Team Player',
    description: 'Shared courses with 10 different colleagues',
    category: 'Social',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-09-18',
  },
  {
    id: '4',
    title: 'Perfect Score',
    description: 'Achieved 100% on 3 different assessments',
    category: 'Excellence',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-10-05',
  },
  {
    id: '5',
    title: 'Leadership Guru',
    description: 'Mastered all leadership competencies',
    category: 'Mastery',
    isUnlocked: false,
    progress: 75,
    isShareable: false,
    milestones: [
      { name: '3 Leadership Courses', completed: true },
      { name: 'Leadership Assessment', completed: true },
      { name: 'Mentoring Session', completed: false },
      { name: 'Final Leadership Project', completed: false },
    ],
  },
  {
    id: '6',
    title: 'Data Wizard',
    description: 'Completed all data science and analytics courses',
    category: 'Specialization',
    isUnlocked: false,
    progress: 40,
    isShareable: false,
    milestones: [
      { name: 'Data Fundamentals', completed: true },
      { name: 'SQL Mastery', completed: true },
      { name: 'Data Visualization', completed: false },
      { name: 'Machine Learning Basics', completed: false },
      { name: 'Advanced Analytics Project', completed: false },
    ],
  },
  {
    id: '7',
    title: 'Early Riser',
    description: 'Completed 10 courses before 9 AM',
    category: 'Habit',
    isUnlocked: false,
    progress: 60,
    timeLimit: '9:00 AM',
    isShareable: false,
  },
  {
    id: '8',
    title: 'Weekend Warrior',
    description: 'Spent more than 24 hours learning over weekends',
    category: 'Dedication',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-10-22',
  },
  {
    id: '9',
    title: 'Streak Master',
    description: 'Maintained a 30-day learning streak',
    category: 'Consistency',
    isUnlocked: false,
    progress: 60,
    isShareable: false,
    timeLimit: '30 days',
  },
  {
    id: '10',
    title: 'Feedback Champion',
    description: 'Provided constructive feedback on 20 courses',
    category: 'Contribution',
    isUnlocked: false,
    progress: 25,
    isShareable: false,
  },
  {
    id: '11',
    title: 'Global Learner',
    description: 'Completed courses from 5 different countries',
    category: 'Diversity',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-11-05',
  },
  {
    id: '12',
    title: 'Night Owl',
    description: 'Completed 15 learning sessions after 10 PM',
    category: 'Habit',
    isUnlocked: false,
    progress: 80,
    timeLimit: 'After 10 PM',
    isShareable: false,
  },
  // Add new limited-time badges
  {
    id: '13',
    title: 'Spring Learning Challenge',
    description: 'Complete 5 courses during Spring Learning Week',
    category: 'Limited Time',
    isUnlocked: false,
    progress: 20,
    available: 'Until May 31',
    isShareable: false,
    isLimited: true,
  },
  {
    id: '14',
    title: 'AI Innovator',
    description: 'Complete all courses in the AI special event track',
    category: 'Limited Time',
    isUnlocked: false,
    progress: 40,
    available: 'Until June 15',
    isShareable: false,
    isLimited: true,
  },
];

// List of badge categories for filtering
const categories = ['All', 'Achievement', 'Specialization', 'Social', 'Excellence', 'Mastery', 'Habit', 'Dedication', 'Consistency', 'Contribution', 'Diversity', 'Limited Time'];

const BadgesTab = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('earned');
  
  const unlockedBadges = badges.filter(badge => badge.isUnlocked);
  const lockedBadges = badges.filter(badge => !badge.isUnlocked);
  const limitedTimeBadges = badges.filter(badge => badge.isLimited);
  
  const filteredUnlockedBadges = activeCategory === 'All' 
    ? unlockedBadges 
    : unlockedBadges.filter(badge => badge.category === activeCategory);
    
  const filteredLockedBadges = activeCategory === 'All' 
    ? lockedBadges 
    : lockedBadges.filter(badge => badge.category === activeCategory);
  
  const handleShareBadge = (badgeTitle: string) => {
    toast({
      title: "Badge Shared!",
      description: `You've shared your "${badgeTitle}" badge to your profile.`,
    });
  };
  
  const handleDownloadBadge = (badgeTitle: string) => {
    toast({
      title: "Badge Downloaded!",
      description: `You've downloaded your "${badgeTitle}" badge.`,
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Badge Collection Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{unlockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Earned Badges</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{lockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges to Earn</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{limitedTimeBadges.length}</div>
              <div className="text-sm text-muted-foreground">Limited-Time Badges</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <Tabs defaultValue="earned" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="earned">Earned Badges</TabsTrigger>
          <TabsTrigger value="toEarn">Badges to Earn</TabsTrigger>
          <TabsTrigger value="limited">Limited Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earned">
          {filteredUnlockedBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredUnlockedBadges.map(badge => (
                <div key={badge.id} className="space-y-2">
                  <BadgeCard {...badge} />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => handleShareBadge(badge.title)}
                    >
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => handleDownloadBadge(badge.title)}
                    >
                      <Download className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No badges found matching your selection.</p>
          )}
        </TabsContent>
        
        <TabsContent value="toEarn">
          {filteredLockedBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredLockedBadges.map(badge => (
                <BadgeCard key={badge.id} {...badge} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No badges found matching your selection.</p>
          )}
        </TabsContent>
        
        <TabsContent value="limited">
          {limitedTimeBadges.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Limited Time Badges</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {limitedTimeBadges.map(badge => (
                  <div key={badge.id} className="relative">
                    <div className="absolute top-0 right-0 z-10 bg-amber-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                      {badge.available}
                    </div>
                    <BadgeCard {...badge} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No limited-time badges available right now.</p>
              <p className="text-sm mt-2">Check back later for special events!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgesTab;
