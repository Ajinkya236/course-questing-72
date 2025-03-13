
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, Star, Target, Clock, Lock, Download, Share2, ExternalLink, Trophy, 
  Sparkles, Check, Calendar, ArrowLeft, Clock as ClockIcon, Timer, Medal, Flame
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import BadgeCard from '@/components/BadgeCard';

interface BadgeItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  isUnlocked: boolean;
  progress?: number;
  timeLimit?: string;
  isShareable?: boolean;
  milestones?: { name: string; completed: boolean }[];
  isLimited?: boolean;
  available?: string;
  earnedDate?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: string;
  date: string;
  credentialId: string;
  image: string;
  isEarned: boolean;
  requirements?: string[];
  progress?: number;
}

interface BadgesTabProps {
  teamMemberId?: string;
}

const BadgesTab: React.FC<BadgesTabProps> = ({ teamMemberId }) => {
  const [activeTabType, setActiveTabType] = useState("badges");
  const [activeTab, setActiveTab] = useState("earned");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample badges with different types including milestone, time-bound, and limited-time badges
  const badges: BadgeItem[] = [
    // Earned badges
    { 
      id: 'b1', 
      title: 'First Course Completed', 
      description: 'Awarded for completing your first course', 
      category: 'Achievement', 
      isUnlocked: true, 
      earnedDate: '2023-08-15', 
      isShareable: true,
      rarity: 'common'
    },
    { 
      id: 'b2', 
      title: 'Perfect Assessment Score', 
      description: 'Achieved 100% in a course assessment', 
      category: 'Excellence', 
      isUnlocked: true, 
      earnedDate: '2023-09-02', 
      isShareable: true,
      rarity: 'uncommon'
    },
    { 
      id: 'b3', 
      title: '50% Course Completion', 
      description: 'Milestone badge for reaching halfway through your assigned curriculum', 
      category: 'Milestone', 
      isUnlocked: true, 
      earnedDate: '2023-10-05', 
      isShareable: true,
      rarity: 'common'
    },
    
    // Available badges (not yet earned)
    { 
      id: 'b4', 
      title: '100% Course Completion', 
      description: 'Complete all your assigned courses', 
      category: 'Milestone', 
      isUnlocked: false, 
      progress: 65,
      milestones: [
        { name: 'Complete 5 courses', completed: true },
        { name: 'Complete 10 courses', completed: false },
        { name: 'Complete all required assessments', completed: false }
      ],
      isShareable: true,
      rarity: 'rare'
    },
    { 
      id: 'b5', 
      title: 'Quick Learner', 
      description: 'Complete a course within 24 hours of starting', 
      category: 'Time-bound', 
      isUnlocked: false, 
      timeLimit: '24 hours remaining',
      isShareable: true,
      rarity: 'uncommon'
    },
    { 
      id: 'b6', 
      title: 'Summer Learning Champion', 
      description: 'Special badge for summer learning campaign participants', 
      category: 'Limited Time', 
      isUnlocked: false, 
      isLimited: true,
      available: 'until Aug 31, 2023',
      isShareable: true,
      rarity: 'rare'
    },
    { 
      id: 'b7', 
      title: 'Learning Path Master', 
      description: 'Complete an entire learning path with distinction', 
      category: 'Mastery', 
      isUnlocked: false, 
      progress: 40,
      milestones: [
        { name: 'Complete core courses', completed: true },
        { name: 'Pass advanced assessments', completed: false },
        { name: 'Submit capstone project', completed: false }
      ],
      isShareable: true,
      rarity: 'legendary'
    },
    { 
      id: 'b8', 
      title: 'Knowledge Sharer', 
      description: 'Contribute to the learning community by sharing insights', 
      category: 'Consistency', 
      isUnlocked: false, 
      progress: 25,
      isShareable: true,
      rarity: 'uncommon'
    },
    { 
      id: 'b9', 
      title: 'Team Learning Leader', 
      description: 'Lead your team in learning hours for a month', 
      category: 'Excellence', 
      isUnlocked: false, 
      isShareable: true,
      rarity: 'rare'
    },
    { 
      id: 'b10', 
      title: 'Innovation Challenge Winner', 
      description: 'Win the quarterly innovation challenge', 
      category: 'Rare', 
      isUnlocked: false, 
      isLimited: true,
      available: 'until Dec 31, 2023',
      isShareable: true,
      rarity: 'legendary'
    },
  ];

  // Certificates data
  const certificates: Certificate[] = [
    {
      id: 'c1',
      name: 'Front-end Development',
      issuer: 'Jio Learning Academy',
      category: 'Technical',
      date: '2023-06-15',
      credentialId: 'FE-2023-001',
      image: '🖥️',
      isEarned: true,
      requirements: ['Complete all modules', 'Pass final assessment', 'Build portfolio project']
    },
    {
      id: 'c2',
      name: 'Leadership Essentials',
      issuer: 'Management Institute',
      category: 'Leadership',
      date: '2023-04-20',
      credentialId: 'LE-2023-042',
      image: '👥',
      isEarned: true,
      requirements: ['Complete leadership course', 'Pass assessment', 'Receive peer reviews']
    },
    {
      id: 'c3',
      name: 'Data Science Fundamentals',
      issuer: 'Jio Learning Academy',
      category: 'Technical',
      date: 'N/A',
      credentialId: 'PENDING',
      image: '📊',
      isEarned: false,
      progress: 65,
      requirements: ['Complete core modules', 'Pass assessment with 80%+', 'Complete data project']
    },
    {
      id: 'c4',
      name: 'Project Management Professional',
      issuer: 'PM Institute',
      category: 'Professional',
      date: 'N/A',
      credentialId: 'PENDING',
      image: '📋',
      isEarned: false,
      progress: 30,
      requirements: ['Complete all modules', 'Pass certification exam', 'Document project experience']
    }
  ];
  
  // Handle back button for team member view
  const handleBack = () => {
    navigate('/my-team');
  };
  
  // Filter badges based on active filter
  const filteredBadges = () => {
    if (activeFilter === 'all') return badges;
    return badges.filter(badge => badge.category === activeFilter);
  };
  
  // Get earned and available badges
  const earnedBadges = filteredBadges().filter(badge => badge.isUnlocked);
  const availableBadges = filteredBadges().filter(badge => !badge.isUnlocked);
  
  // Get earned and in-progress certificates
  const earnedCertificates = certificates.filter(cert => cert.isEarned);
  const inProgressCertificates = certificates.filter(cert => !cert.isEarned);
  
  // Share badge handler
  const handleShareBadge = (id: string) => {
    toast({
      title: "Badge Shared!",
      description: "Your badge has been shared to your LinkedIn profile.",
    });
  };
  
  // Download certificate handler
  const handleDownloadCertificate = (id: string) => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back button for team member view */}
      {teamMemberId && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team
        </Button>
      )}

      {/* Main Tabs for Badges and Certificates */}
      <Tabs value={activeTabType} onValueChange={setActiveTabType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certifications</TabsTrigger>
        </TabsList>
        
        {/* Badges Content */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">My Badges</h3>
                  <p className="text-muted-foreground">Earn badges by completing learning achievements</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{earnedBadges.length}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{availableBadges.length}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge 
                  variant="outline" 
                  className={`cursor-pointer ${activeFilter === 'all' ? 'bg-primary/20' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`cursor-pointer ${activeFilter === 'Achievement' ? 'bg-primary/20' : ''}`}
                  onClick={() => setActiveFilter('Achievement')}
                >
                  Achievement
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`cursor-pointer ${activeFilter === 'Milestone' ? 'bg-primary/20' : ''}`}
                  onClick={() => setActiveFilter('Milestone')}
                >
                  Milestone
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`cursor-pointer ${activeFilter === 'Time-bound' ? 'bg-primary/20' : ''}`}
                  onClick={() => setActiveFilter('Time-bound')}
                >
                  Time-bound
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`cursor-pointer ${activeFilter === 'Limited Time' ? 'bg-primary/20' : ''}`}
                  onClick={() => setActiveFilter('Limited Time')}
                >
                  Limited Time
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`cursor-pointer ${activeFilter === 'Rare' ? 'bg-primary/20' : ''}`}
                  onClick={() => setActiveFilter('Rare')}
                >
                  Rare
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Badges Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
              <TabsTrigger value="available">Available ({availableBadges.length})</TabsTrigger>
            </TabsList>
            
            {/* Earned Badges */}
            <TabsContent value="earned" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {earnedBadges.map(badge => (
                  <BadgeCard 
                    key={badge.id}
                    id={badge.id}
                    title={badge.title}
                    description={badge.description}
                    category={badge.category}
                    isUnlocked={badge.isUnlocked}
                    isShareable={badge.isShareable}
                    earnedDate={badge.earnedDate}
                  />
                ))}
                
                {earnedBadges.length === 0 && (
                  <div className="col-span-full py-10 text-center">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No badges earned yet</h3>
                    <p className="text-muted-foreground mt-2">Complete learning activities to earn badges</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Available Badges */}
            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableBadges.map(badge => (
                  <BadgeCard 
                    key={badge.id}
                    id={badge.id}
                    title={badge.title}
                    description={badge.description}
                    category={badge.category}
                    isUnlocked={badge.isUnlocked}
                    progress={badge.progress}
                    timeLimit={badge.timeLimit}
                    isShareable={badge.isShareable}
                    milestones={badge.milestones}
                    isLimited={badge.isLimited}
                    available={badge.available}
                    showPreview={true} // Show preview for available badges
                  />
                ))}
                
                {availableBadges.length === 0 && (
                  <div className="col-span-full py-10 text-center">
                    <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No available badges found</h3>
                    <p className="text-muted-foreground mt-2">Check back later for new badge opportunities</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Badge Information */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Types</CardTitle>
              <CardDescription>Learn about the different types of badges you can earn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Milestone Badges</h4>
                    <p className="text-sm text-muted-foreground">Awarded for reaching specific progress milestones like 50% or 100% completion of courses or learning paths.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Timer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Time-bound Badges</h4>
                    <p className="text-sm text-muted-foreground">Requires completing tasks within a specific time frame, such as finishing a course within 24 hours of starting.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Limited-time Badges</h4>
                    <p className="text-sm text-muted-foreground">Special badges available only during specific events or seasonal learning campaigns.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Rare Badges</h4>
                    <p className="text-sm text-muted-foreground">Exclusive badges awarded for exceptional achievements or participation in special events.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Certifications Content */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">My Certifications</h3>
                  <p className="text-muted-foreground">Track and manage your professional certifications</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{earnedCertificates.length}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{inProgressCertificates.length}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Certificates Tabs */}
          <Tabs defaultValue="earned">
            <TabsList>
              <TabsTrigger value="earned">Earned ({earnedCertificates.length})</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress ({inProgressCertificates.length})</TabsTrigger>
            </TabsList>
            
            {/* Earned Certificates */}
            <TabsContent value="earned" className="mt-6">
              <div className="space-y-4">
                {earnedCertificates.map(cert => (
                  <Card key={cert.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center text-4xl mx-auto md:mx-0">
                          {cert.image}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{cert.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{cert.category}</Badge>
                            <Badge variant="secondary">
                              <Trophy className="h-3 w-3 mr-1" /> Certified
                            </Badge>
                          </div>
                          <div className="text-sm mt-2">
                            <p className="text-muted-foreground">Issued by: {cert.issuer}</p>
                            <p className="text-muted-foreground">Date: {cert.date}</p>
                            <p className="text-muted-foreground">Credential ID: {cert.credentialId}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col gap-2 justify-center">
                          <Button size="sm" variant="outline" onClick={() => handleDownloadCertificate(cert.id)}>
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleShareBadge(cert.id)}>
                            <Share2 className="h-4 w-4 mr-1" /> Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {earnedCertificates.length === 0 && (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No certifications earned yet</h3>
                      <p className="text-muted-foreground mt-2">Complete certification courses to earn professional credentials</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            {/* In Progress Certificates */}
            <TabsContent value="inprogress" className="mt-6">
              <div className="space-y-4">
                {inProgressCertificates.map(cert => (
                  <Card key={cert.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="h-24 w-24 rounded-lg bg-muted/50 flex items-center justify-center text-4xl mx-auto md:mx-0 relative">
                          <span className="opacity-50">{cert.image}</span>
                          <Lock className="h-5 w-5 absolute bottom-1 right-1 text-muted-foreground bg-background rounded-full p-1" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{cert.name}</h3>
                            <Badge variant="outline" className="ml-2 animate-pulse">In Progress</Badge>
                          </div>
                          <Badge variant="outline" className="mt-1">{cert.category}</Badge>
                          
                          <div className="text-sm mt-2">
                            <p className="text-muted-foreground">Issued by: {cert.issuer}</p>
                            <p className="text-muted-foreground mb-2">Requirements:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                              {cert.requirements?.map((req, index) => (
                                <li key={index} className="text-xs flex items-start">
                                  <span className="inline-block mt-1 mr-1">
                                    {index < Math.floor((cert.progress || 0) / (100 / (cert.requirements?.length || 1))) ? 
                                      <Check className="h-3 w-3 text-green-500" /> : 
                                      <Clock className="h-3 w-3 text-muted-foreground" />
                                    }
                                  </span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{cert.progress}%</span>
                              </div>
                              <Progress value={cert.progress} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button size="sm">Continue Learning</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {inProgressCertificates.length === 0 && (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No certifications in progress</h3>
                      <p className="text-muted-foreground mt-2">Enroll in certification courses to begin your professional journey</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgesTab;
