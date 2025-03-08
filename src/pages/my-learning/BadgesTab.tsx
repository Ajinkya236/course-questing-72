import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Award, Medal, Trophy, Star, Download, ExternalLink, Share2, Lock, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';

interface BadgesTabProps {
  teamMemberId?: string;
}

interface BadgeItem {
  id: string;
  name: string;
  icon: 'award' | 'medal' | 'trophy' | 'star';
  description: string;
  category: string;
  earned: boolean;
  date?: string;
  progress?: number;
  isRare?: boolean;
  isLimited?: boolean;
  expiresAt?: string;
  isTimeBound?: boolean;
  timeLimit?: string;
  shareable?: boolean;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId: string;
  category: string;
  image: string;
  isEarned: boolean;
  requirements?: string[];
  progress?: number;
}

const BadgesTab: React.FC<BadgesTabProps> = ({ teamMemberId }) => {
  const [showBadgePreview, setShowBadgePreview] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  const badges: BadgeItem[] = [
    { id: 'b1', name: 'First Course Completed', icon: 'award', description: 'Awarded for completing your first course', category: 'Achievement', earned: true, date: '2023-08-15', shareable: true },
    { id: 'b2', name: 'Perfect Assessment Score', icon: 'star', description: 'Achieved 100% in a course assessment', category: 'Excellence', earned: true, date: '2023-09-02', shareable: true },
    { id: 'b3', name: 'Leadership Pioneer', icon: 'trophy', description: 'Completed the leadership fundamentals pathway', category: 'Leadership', earned: false, progress: 75 },
    { id: 'b4', name: 'Team Collaborator', icon: 'medal', description: 'Participated in team learning activities', category: 'Collaboration', earned: true, date: '2023-10-10', shareable: true },
    { id: 'b5', name: 'Learning Streak 30', icon: 'award', description: 'Maintained learning streak for 30 days', category: 'Consistency', earned: true, date: '2023-11-05', shareable: true },
    { id: 'b6', name: 'Technical Master', icon: 'trophy', description: 'Demonstrated mastery in technical courses', category: 'Technical', earned: false, progress: 40 },
    { id: 'b7', name: 'Content Creator', icon: 'star', description: 'Created valuable content for peers', category: 'Contribution', earned: false, progress: 10 },
    { id: 'b8', name: 'Digital Transformation', icon: 'medal', description: 'Completed Digital Transformation pathway', category: 'Innovation', earned: true, date: '2023-10-25', shareable: true },
    { id: 'b9', name: '50% Learning Path Complete', icon: 'medal', description: 'Completed 50% of your assigned learning path', category: 'Milestone', earned: true, date: '2023-10-01', shareable: true },
    { id: 'b10', name: '100% Learning Path Complete', icon: 'trophy', description: 'Completed 100% of your assigned learning path', category: 'Milestone', earned: false, progress: 75 },
    { id: 'b11', name: 'Quick Learner', icon: 'star', description: 'Completed a course in under 24 hours', category: 'Speed', earned: true, date: '2023-09-15', isTimeBound: true, timeLimit: '24 hours', shareable: true },
    { id: 'b12', name: 'Winter Learning Champion', icon: 'trophy', description: 'Top performer in winter learning drive', category: 'Seasonal', earned: false, isLimited: true, expiresAt: '2023-12-31', progress: 30 },
    { id: 'b13', name: 'Platinum Learner', icon: 'star', description: 'One of only 10 learners to receive this badge', category: 'Exclusive', earned: false, isRare: true, progress: 20 },
  ];
  
  const certificates: Certificate[] = [
    {
      id: 'c1',
      name: 'Advanced Data Analysis',
      issuer: 'Jio Learning Academy',
      date: '2023-10-05',
      credentialId: 'JLA-ADA-2023-001',
      category: 'Data & Analytics',
      image: '📊',
      isEarned: true
    },
    {
      id: 'c2',
      name: 'Leadership Essentials',
      issuer: 'Jio Leadership Institute',
      date: '2023-09-15',
      expiryDate: '2025-09-15',
      credentialId: 'JLI-LE-2023-042',
      category: 'Leadership & Management',
      image: '👥',
      isEarned: true
    },
    {
      id: 'c3',
      name: 'Project Management Professional',
      issuer: 'Project Management Institute',
      date: '2023-07-20',
      expiryDate: '2026-07-20',
      credentialId: 'PMI-PMP-2023-12345',
      category: 'Project Management',
      image: '📋',
      isEarned: true
    },
    {
      id: 'c4',
      name: 'Machine Learning Fundamentals',
      issuer: 'Jio Tech Academy',
      date: 'N/A',
      credentialId: 'PENDING-ML-001',
      category: 'Artificial Intelligence',
      image: '🤖',
      isEarned: false,
      requirements: [
        'Complete AI Basics course',
        'Pass Machine Learning assessment with 80% score',
        'Complete practical project'
      ],
      progress: 65
    },
    {
      id: 'c5',
      name: 'Digital Marketing Specialist',
      issuer: 'Marketing Institute',
      date: 'N/A',
      credentialId: 'PENDING-DM-001',
      category: 'Marketing',
      image: '📱',
      isEarned: false,
      requirements: [
        'Complete all 5 courses in Digital Marketing track',
        'Submit final marketing campaign project',
        'Pass final assessment'
      ],
      progress: 30
    }
  ];
  
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);
  const earnedCertificates = certificates.filter(cert => cert.isEarned);
  const futureCertificates = certificates.filter(cert => !cert.isEarned);
  
  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case 'award':
        return <Award className="h-5 w-5" />;
      case 'medal':
        return <Medal className="h-5 w-5" />;
      case 'trophy':
        return <Trophy className="h-5 w-5" />;
      case 'star':
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const handleShareBadge = (badge: BadgeItem) => {
    toast({
      title: "Badge Shared",
      description: `Your ${badge.name} badge has been shared to your connected platforms.`
    });
  };

  const handleViewBadgePreview = (badge: BadgeItem) => {
    setSelectedBadge(badge);
    setShowBadgePreview(true);
  };

  const handleViewCertificatePreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificatePreview(true);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="badges">
        <TabsList className="mb-4">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Earned Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {earnedBadges.map(badge => (
                <Card key={badge.id}>
                  <CardHeader className="pb-2 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <div className="text-primary">
                        {renderIcon(badge.icon)}
                      </div>
                    </div>
                    <CardTitle className="text-base">{badge.name}</CardTitle>
                    <CardDescription className="text-xs">
                      Earned on {new Date(badge.date!).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-2">
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <div className="flex justify-center space-x-1 mt-2">
                      {badge.isRare && <Badge variant="secondary" className="bg-purple-100 text-purple-500 border-purple-200">Rare</Badge>}
                      {badge.isLimited && <Badge variant="secondary" className="bg-amber-100 text-amber-500 border-amber-200">Limited</Badge>}
                      {badge.isTimeBound && <Badge variant="secondary" className="bg-green-100 text-green-500 border-green-200">Time Challenge</Badge>}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center pt-0 flex flex-col gap-2">
                    <Badge variant="outline">{badge.category}</Badge>
                    {badge.shareable && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 text-xs" 
                        onClick={() => handleShareBadge(badge)}
                      >
                        <Share2 className="h-3 w-3 mr-1" /> Share on LinkedIn
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Badges in Progress & Locked Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inProgressBadges.map(badge => (
                <Card key={badge.id} className="bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleViewBadgePreview(badge)}>
                  <CardHeader className="pb-2 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2 relative">
                      <div className="text-muted-foreground opacity-70">
                        {renderIcon(badge.icon)}
                      </div>
                      <Lock className="h-4 w-4 absolute bottom-0 right-0 text-muted-foreground bg-background rounded-full p-0.5" />
                    </div>
                    <CardTitle className="text-base text-muted-foreground">{badge.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {badge.progress}% completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-2">
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <Progress value={badge.progress} className="h-1.5 mt-2" />
                    <div className="flex justify-center space-x-1 mt-2">
                      {badge.isRare && <Badge variant="outline" className="bg-muted text-muted-foreground">Rare</Badge>}
                      {badge.isLimited && <Badge variant="outline" className="bg-muted text-muted-foreground">Limited Time</Badge>}
                      {badge.isTimeBound && <Badge variant="outline" className="bg-muted text-muted-foreground">Time Challenge</Badge>}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center pt-0">
                    <Badge variant="outline" className="text-muted-foreground">{badge.category}</Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Earned Certificates</h3>
            <div className="grid grid-cols-1 gap-4">
              {earnedCertificates.map(cert => (
                <Card key={cert.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="mx-auto md:mx-0 h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center text-4xl">
                        {cert.image}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="text-lg font-medium">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <p className="font-medium">Issue Date</p>
                            <p className="text-muted-foreground">{new Date(cert.date).toLocaleDateString()}</p>
                          </div>
                          {cert.expiryDate && (
                            <div>
                              <p className="font-medium">Expiry Date</p>
                              <p className="text-muted-foreground">{new Date(cert.expiryDate).toLocaleDateString()}</p>
                            </div>
                          )}
                          <div>
                            <p className="font-medium">Credential ID</p>
                            <p className="text-muted-foreground">{cert.credentialId}</p>
                          </div>
                          <div>
                            <p className="font-medium">Category</p>
                            <p className="text-muted-foreground">{cert.category}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col justify-center gap-2">
                        <Button size="sm" variant="outline" className="flex gap-1">
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex gap-1">
                          <Share2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Share</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex gap-1">
                          <ExternalLink className="h-4 w-4" />
                          <span className="hidden sm:inline">Verify</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Available Certificates</h3>
            <p className="text-sm text-muted-foreground">Complete these learning paths to earn these certificates</p>
            
            <div className="grid grid-cols-1 gap-4">
              {futureCertificates.map(cert => (
                <Card 
                  key={cert.id} 
                  className="bg-muted/30 border-dashed cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleViewCertificatePreview(cert)}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="mx-auto md:mx-0 h-24 w-24 rounded-lg bg-muted/50 flex items-center justify-center text-4xl relative">
                        <span className="opacity-40">{cert.image}</span>
                        <Lock className="h-6 w-6 absolute bottom-1 right-1 text-muted-foreground bg-background rounded-full p-1" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{cert.name}</h3>
                            <Badge className="ml-2" variant="outline">Preview</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium">Completion: {cert.progress}%</p>
                            <Progress value={cert.progress} className="h-2 mt-1" />
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Requirements:</p>
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                              {cert.requirements?.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col justify-center">
                        <Button size="sm">Continue Learning</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showBadgePreview} onOpenChange={setShowBadgePreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Badge Preview</DialogTitle>
            <DialogDescription>
              Complete requirements to unlock this badge
            </DialogDescription>
          </DialogHeader>
          
          {selectedBadge && (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center mb-2">
                  <div className="text-muted-foreground opacity-70">
                    {renderIcon(selectedBadge.icon)}
                  </div>
                </div>
                <h3 className="text-lg font-medium">{selectedBadge.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedBadge.description}</p>
                
                <div className="flex justify-center space-x-2 mt-2">
                  {selectedBadge.isRare && (
                    <div className="flex items-center gap-1 text-xs text-purple-500">
                      <Sparkles className="h-3 w-3" /> Rare Badge
                    </div>
                  )}
                  {selectedBadge.isLimited && (
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <Clock className="h-3 w-3" /> Limited Time
                    </div>
                  )}
                  {selectedBadge.isTimeBound && (
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <AlertTriangle className="h-3 w-3" /> Time Challenge
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{selectedBadge.progress}%</span>
                </div>
                <Progress value={selectedBadge.progress} className="h-2" />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">How to unlock this badge?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">1</span>
                    </div>
                    <span>Continue with your current learning path</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">2</span>
                    </div>
                    <span>Complete all required assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">3</span>
                    </div>
                    <span>Submit final project if required</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCertificatePreview} onOpenChange={setShowCertificatePreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
            <DialogDescription>
              Complete requirements to earn this certificate
            </DialogDescription>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg bg-muted/50 flex items-center justify-center text-3xl">
                  <span className="opacity-60">{selectedCertificate.image}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedCertificate.name}</h3>
                  <p className="text-sm text-muted-foreground">Issued by {selectedCertificate.issuer}</p>
                  <Badge variant="outline" className="mt-1">{selectedCertificate.category}</Badge>
                </div>
              </div>
              
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Progress</span>
                  <span>{selectedCertificate.progress}%</span>
                </div>
                <Progress value={selectedCertificate.progress} className="h-2" />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Certificate Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-3">
                  {selectedCertificate.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button>Continue Learning</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BadgesTab;
