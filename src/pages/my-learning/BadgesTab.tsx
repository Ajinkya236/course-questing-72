import React, { useState } from 'react';
import BadgeCard from '@/components/BadgeCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Share2, 
  Download, 
  Clock, 
  Star, 
  Trophy, 
  CalendarDays, 
  Award, 
  Filter,
  Sparkle,
  Timer,
  Flame,
  Target,
  Medal,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  {
    id: '15',
    title: '50% Learning Path Complete',
    description: 'You\'ve completed 50% of the Data Science learning path',
    category: 'Milestone',
    isUnlocked: true,
    progress: 50,
    isShareable: true,
    earnedDate: '2023-09-10',
    imageUrl: 'https://placehold.co/200x200/4f46e5/ffffff?text=50%'
  },
  {
    id: '16',
    title: '100% Learning Path Complete',
    description: 'Congratulations! You\'ve completed the entire Leadership learning path',
    category: 'Milestone',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-11-12',
    imageUrl: 'https://placehold.co/200x200/10b981/ffffff?text=100%'
  },
  {
    id: '17',
    title: 'Speedy Learner',
    description: 'Completed a course in less than 24 hours',
    category: 'Time-bound',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-10-15',
    imageUrl: 'https://placehold.co/200x200/f97316/ffffff?text=24h'
  },
  {
    id: '18',
    title: 'Weekend Achievement',
    description: 'Completed a module during the weekend',
    category: 'Achievement',
    isUnlocked: true,
    isShareable: true,
    earnedDate: '2023-09-30',
  },
  {
    id: '19',
    title: '25% Marketing Path',
    description: 'Complete 25% of the Marketing learning path',
    category: 'Milestone',
    isUnlocked: false,
    progress: 15,
    milestones: [
      { name: 'Marketing Basics', completed: true },
      { name: 'Digital Marketing', completed: false },
      { name: 'Social Media Marketing', completed: false },
    ]
  },
  {
    id: '20',
    title: '75% Project Management',
    description: 'Complete 75% of the Project Management learning path',
    category: 'Milestone',
    isUnlocked: false,
    progress: 60,
    milestones: [
      { name: 'PM Fundamentals', completed: true },
      { name: 'Agile Methodology', completed: true },
      { name: 'Risk Management', completed: true },
      { name: 'Stakeholder Management', completed: false },
    ]
  },
  {
    id: '21',
    title: 'Summer Learning Challenge',
    description: 'Complete the special summer learning challenge',
    category: 'Rare',
    isUnlocked: false,
    progress: 0,
    isLimited: true,
    available: 'Jun 1 - Aug 31',
    imageUrl: 'https://placehold.co/200x200/eab308/ffffff?text=Summer'
  },
  {
    id: '22',
    title: 'Quick Responder',
    description: 'Complete an assigned course within 24 hours of assignment',
    category: 'Time-bound',
    isUnlocked: false,
    progress: 0,
    timeLimit: '24 hours from assignment',
    imageUrl: 'https://placehold.co/200x200/ef4444/ffffff?text=24h'
  },
];

const categories = [
  'All', 
  'Achievement', 
  'Specialization', 
  'Social', 
  'Excellence', 
  'Mastery', 
  'Habit', 
  'Dedication', 
  'Consistency', 
  'Contribution', 
  'Diversity', 
  'Limited Time',
  'Milestone',
  'Time-bound',
  'Rare'
];

const BadgesTab = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('earned');
  const [sortBy, setSortBy] = useState('recent');
  const [showPreview, setShowPreview] = useState(false);
  
  const unlockedBadges = badges.filter(badge => badge.isUnlocked);
  const lockedBadges = badges.filter(badge => !badge.isUnlocked);
  const limitedTimeBadges = badges.filter(badge => badge.isLimited);
  const milestoneBadges = badges.filter(badge => badge.category === 'Milestone');
  const timeBoundBadges = badges.filter(badge => badge.category === 'Time-bound');
  
  const filteredUnlockedBadges = activeCategory === 'All' 
    ? unlockedBadges 
    : unlockedBadges.filter(badge => badge.category === activeCategory);
    
  const filteredLockedBadges = activeCategory === 'All' 
    ? lockedBadges 
    : lockedBadges.filter(badge => badge.category === activeCategory);
  
  const sortBadges = (badgeList) => {
    if (sortBy === 'recent') {
      return [...badgeList].sort((a, b) => {
        if (!a.earnedDate) return 1;
        if (!b.earnedDate) return -1;
        return new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime();
      });
    } else if (sortBy === 'alphabetical') {
      return [...badgeList].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'category') {
      return [...badgeList].sort((a, b) => a.category.localeCompare(b.category));
    }
    return badgeList;
  };
  
  const handleShareBadge = (badgeTitle: string, platform: string) => {
    toast({
      title: `Badge Shared to ${platform}!`,
      description: `You've shared your "${badgeTitle}" badge to ${platform}.`,
    });
  };
  
  const handleDownloadBadge = (badgeTitle: string) => {
    toast({
      title: "Badge Downloaded!",
      description: `You've downloaded your "${badgeTitle}" badge.`,
    });
  };

  const toggleBadgePreview = () => {
    setShowPreview(!showPreview);
    toast({
      title: showPreview ? "Badge previews hidden" : "Badge previews enabled",
      description: showPreview 
        ? "You'll no longer see previews of locked badges" 
        : "You can now see previews of locked badges you can earn",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Badge Collection Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{unlockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Earned Badges</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{lockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">To Earn</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{limitedTimeBadges.length}</div>
              <div className="text-sm text-muted-foreground">Limited-Time</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{milestoneBadges.length}</div>
              <div className="text-sm text-muted-foreground">Milestones</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">{timeBoundBadges.length}</div>
              <div className="text-sm text-muted-foreground">Time-Bound</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleBadgePreview}
          className="flex items-center gap-2 mb-2"
        >
          {showPreview ? (
            <>
              <Filter className="h-4 w-4" />
              <span>Hide Badge Previews</span>
            </>
          ) : (
            <>
              <Sparkle className="h-4 w-4" />
              <span>Show Badge Previews</span>
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="earned" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="earned">Earned</TabsTrigger>
          <TabsTrigger value="toEarn">To Earn</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="limited">Limited Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earned">
          {filteredUnlockedBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortBadges(filteredUnlockedBadges).map(badge => (
                <div key={badge.id} className="space-y-2">
                  <BadgeCard {...badge} />
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={() => handleDownloadBadge(badge.title)}
                      >
                        <Download className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleShareBadge(badge.title, 'LinkedIn')}
                      >
                        <Share2 className="h-4 w-4 mr-1" /> Share
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleShareBadge(badge.title, 'LinkedIn')}>
                        LinkedIn
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShareBadge(badge.title, 'Forum')}>
                        Forum
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShareBadge(badge.title, 'Email')}>
                        Email
                      </Button>
                    </div>
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
            <>
              {!showPreview && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg flex items-center gap-2">
                  <Sparkle className="h-5 w-5 text-primary" />
                  <p className="text-sm">
                    Enable badge previews to see what badges you can earn. 
                    <Button variant="link" className="px-1 h-auto" onClick={toggleBadgePreview}>
                      Show previews
                    </Button>
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortBadges(filteredLockedBadges).map(badge => (
                  <BadgeCard 
                    key={badge.id} 
                    {...badge} 
                    showPreview={showPreview} 
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground py-8">No badges found matching your selection.</p>
          )}
        </TabsContent>
        
        <TabsContent value="milestones">
          {milestoneBadges.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Learning Path Milestones</h3>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Medal className="h-5 w-5 text-gray-300" />
                        <span className="text-gray-400">Start</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">Complete</span>
                        <Crown className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full my-3 relative">
                      <div className="absolute top-0 left-[25%] w-3 h-3 bg-amber-500 rounded-full transform -translate-y-1/4"></div>
                      <div className="absolute top-0 left-[50%] w-3 h-3 bg-emerald-500 rounded-full transform -translate-y-1/4"></div>
                      <div className="absolute top-0 left-[75%] w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/4"></div>
                      <div className="absolute top-0 left-[100%] w-3 h-3 bg-purple-500 rounded-full transform -translate-y-1/4"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortBadges(milestoneBadges).map(badge => (
                  <div key={badge.id}>
                    <BadgeCard {...badge} showPreview={showPreview} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No milestone badges available.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="limited">
          {limitedTimeBadges.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Limited Time & Rare Badges</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortBadges(limitedTimeBadges).map(badge => (
                  <div key={badge.id} className="relative">
                    <div className="absolute top-0 right-0 z-10 bg-amber-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                      {badge.available}
                    </div>
                    <BadgeCard {...badge} showPreview={showPreview} />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Timer className="h-5 w-5 text-green-500" />
                    Time-Bound Challenges
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortBadges(timeBoundBadges).map(badge => (
                    <div key={badge.id}>
                      <BadgeCard {...badge} showPreview={showPreview} />
                    </div>
                  ))}
                </div>
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
