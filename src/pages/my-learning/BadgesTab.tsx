
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Star, Target, Clock, Lock, Download, Share2, ExternalLink, Trophy, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '@/hooks/use-toast';

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  earned: boolean;
  date?: string;
  shareable: boolean;
  rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
  timeLimited?: boolean;
  expiresOn?: string;
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
  const [showBadgePreview, setShowBadgePreview] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const { toast } = useToast();
  
  const badges: BadgeItem[] = [
    { id: 'b1', name: 'First Course Completed', icon: 'award', description: 'Awarded for completing your first course', category: 'Achievement', earned: true, date: '2023-08-15', shareable: true, rarity: 'common' },
    { id: 'b2', name: 'Perfect Assessment Score', icon: 'star', description: 'Achieved 100% in a course assessment', category: 'Excellence', earned: true, date: '2023-09-02', shareable: true, rarity: 'uncommon' },
    { id: 'b3', name: 'Learning Streak - 30 Days', icon: 'zap', description: 'Maintained a learning streak for 30 consecutive days', category: 'Dedication', earned: true, date: '2023-10-10', shareable: true, rarity: 'rare' },
    { id: 'b4', name: 'Course Creator', icon: 'penTool', description: 'Created your first learning resource', category: 'Contribution', earned: true, date: '2023-11-05', shareable: true, rarity: 'uncommon' },
    { id: 'b5', name: 'Team Learning Champion', icon: 'users', description: 'Highest learning points in your team for the month', category: 'Leadership', earned: false, shareable: true, rarity: 'rare' },
    { id: 'b6', name: 'Data Science Specialist', icon: 'database', description: 'Completed the Data Science learning path', category: 'Specialization', earned: false, shareable: true, rarity: 'uncommon' },
    { id: 'b7', name: 'Leadership Excellence', icon: 'award', description: 'Completed all leadership courses with distinction', category: 'Excellence', earned: false, shareable: true, rarity: 'rare' },
    { id: 'b8', name: 'Innovation Hackathon Participant', icon: 'code', description: 'Participated in the annual innovation hackathon', category: 'Event', earned: false, shareable: true, rarity: 'uncommon', timeLimited: true, expiresOn: '2023-12-31' },
    { id: 'b9', name: 'Master Mentor', icon: 'gift', description: 'Mentored 5 team members successfully', category: 'Leadership', earned: false, shareable: true, rarity: 'legendary' },
    { id: 'b10', name: 'Quarterly Learning Award', icon: 'trophy', description: 'Top learner for Q3 2023', category: 'Achievement', earned: false, shareable: true, rarity: 'legendary', timeLimited: true, expiresOn: '2023-12-31' },
  ];

  const certificates: Certificate[] = [
    {
      id: 'c1',
      name: 'Front-end Web Development',
      issuer: 'Jio Tech Academy',
      date: '2023-06-15',
      credentialId: 'JTA-FE-2023-001',
      category: 'Technical',
      image: '🖥️',
      isEarned: true,
      requirements: ['Complete 5 modules', 'Pass final assessment with 80%+', 'Build capstone project']
    },
    {
      id: 'c2',
      name: 'Leadership & Management',
      issuer: 'Business Excellence Institute',
      date: '2023-09-20',
      credentialId: 'BEI-LM-2023-108',
      category: 'Leadership',
      image: '🏆',
      isEarned: true,
      requirements: ['Complete all modules', 'Pass leadership assessment', 'Receive peer reviews']
    },
    {
      id: 'c3',
      name: 'Cloud Computing Fundamentals',
      issuer: 'Jio Cloud Academy',
      date: '2023-08-05',
      credentialId: 'JCA-CC-2023-056',
      category: 'Technical',
      image: '☁️',
      isEarned: true,
      requirements: ['Complete all modules', 'Pass hands-on labs', 'Final assessment']
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
      requirements: ['Complete ML basics course', 'Build a predictive model', 'Pass final assessment'],
      progress: 35
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
      requirements: ['Content marketing module', 'Social media strategy', 'Analytics certification', 'Final campaign project'],
      progress: 65
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const futureBadges = badges.filter(badge => !badge.earned);
  const earnedCertificates = certificates.filter(cert => cert.isEarned);
  const futureCertificates = certificates.filter(cert => !cert.isEarned);
  
  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case 'award':
        return <Award className="h-6 w-6" />;
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'penTool':
        return <PenTool className="h-6 w-6" />;
      case 'users':
        return <Users className="h-6 w-6" />;
      case 'database':
        return <Database className="h-6 w-6" />;
      case 'code':
        return <Code className="h-6 w-6" />;
      case 'gift':
        return <Gift className="h-6 w-6" />;
      case 'trophy':
        return <Trophy className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  const handleOpenBadgePreview = (badge: BadgeItem) => {
    setSelectedBadge(badge);
    setShowBadgePreview(true);
    
    if (badge.earned) {
      // Trigger confetti for earned badges
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 300);
    }
  };

  const handleOpenCertificatePreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificatePreview(true);
    
    if (certificate.isEarned) {
      // Trigger confetti for earned certificates
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }, 300);
    }
  };

  const handleShareBadge = () => {
    // Show share success message with toast
    toast({
      title: "Badge Shared!",
      description: `Your ${selectedBadge?.name} badge has been shared to your profile.`,
    });
    setShowShareSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowShareSuccess(false);
    }, 3000);
  };

  const handleDownloadCertificate = () => {
    // Show download success message with toast
    toast({
      title: "Certificate Downloaded!",
      description: `Your ${selectedCertificate?.name} certificate has been downloaded.`,
    });
  };

  // Helper function to get rarity color
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common':
        return 'bg-slate-400 text-white';
      case 'uncommon':
        return 'bg-green-500 text-white';
      case 'rare':
        return 'bg-blue-500 text-white';
      case 'legendary':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Tabs for Badges and Certificates */}
      <Tabs value={activeTabType} onValueChange={setActiveTabType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certifications</TabsTrigger>
        </TabsList>
        
        {/* Badges Content */}
        <TabsContent value="badges" className="space-y-6">
          {/* Badges Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">My Badges</h3>
                  <p className="text-muted-foreground">Track your achievements and accolades</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{earnedBadges.length}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{futureBadges.length}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className={getRarityColor('common')}>Common</Badge>
                <Badge className={getRarityColor('uncommon')}>Uncommon</Badge>
                <Badge className={getRarityColor('rare')}>Rare</Badge>
                <Badge className={getRarityColor('legendary')}>Legendary</Badge>
                <Badge variant="outline" className="animate-pulse border-amber-500 text-amber-500">Limited Time</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Badges Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
              <TabsTrigger value="available">Available ({futureBadges.length})</TabsTrigger>
            </TabsList>
            
            {/* Earned Badges Tab */}
            <TabsContent value="earned" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {earnedBadges.map(badge => (
                  <Card 
                    key={badge.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow hover-scale group overflow-hidden"
                    onClick={() => handleOpenBadgePreview(badge)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={`relative w-20 h-20 rounded-full flex items-center justify-center my-2 ${getRarityColor(badge.rarity || 'common')}`}>
                        {renderIcon(badge.icon)}
                        {badge.timeLimited && (
                          <span className="absolute top-0 right-0 h-5 w-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <Clock className="h-3 w-3 text-white" />
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium mt-3 line-clamp-2 h-12">{badge.name}</h4>
                      <Badge variant="outline" className="mt-2">{badge.category}</Badge>
                      <span className="text-xs text-muted-foreground mt-3">
                        {new Date(badge.date || '').toLocaleDateString()}
                      </span>
                      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Available Badges Tab */}
            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {futureBadges.map(badge => (
                  <Card 
                    key={badge.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow group relative overflow-hidden"
                    onClick={() => handleOpenBadgePreview(badge)}
                  >
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-10">
                      <Lock className="h-8 w-8 text-white/70" />
                    </div>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={`relative w-20 h-20 rounded-full flex items-center justify-center my-2 ${getRarityColor(badge.rarity || 'common')} opacity-30`}>
                        {renderIcon(badge.icon)}
                        {badge.timeLimited && (
                          <span className="absolute top-0 right-0 h-5 w-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <Clock className="h-3 w-3 text-white" />
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium mt-3 line-clamp-2 h-12">{badge.name}</h4>
                      <Badge variant="outline" className="mt-2">{badge.category}</Badge>
                      <div className="mt-2 animate-pulse">
                        <Badge variant="outline" className="border-primary/40 text-primary">Locked</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Certifications Content */}
        <TabsContent value="certificates" className="space-y-6">
          {/* Certifications Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">My Certifications</h3>
                  <p className="text-muted-foreground">Professional credentials and qualifications</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{earnedCertificates.length}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                  <div className="text-center px-3 py-2 bg-secondary/20 rounded-md">
                    <p className="text-2xl font-bold">{futureCertificates.length}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Certifications Tabs */}
          <Tabs defaultValue="earned">
            <TabsList>
              <TabsTrigger value="earned">Earned ({earnedCertificates.length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({futureCertificates.length})</TabsTrigger>
            </TabsList>
            
            {/* Earned Certifications Tab */}
            <TabsContent value="earned" className="mt-6 space-y-4">
              {earnedCertificates.map(cert => (
                <Card key={cert.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="mx-auto md:mx-0 h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center text-4xl animate-bounce-slow">
                        {cert.image}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="text-lg font-medium">{cert.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">{cert.category}</Badge>
                            <Badge variant="secondary">
                              <Trophy className="h-3 w-3 mr-1" /> Certified
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Issued by {cert.issuer}</p>
                          <p className="text-muted-foreground">Date: {cert.date}</p>
                          <p className="text-muted-foreground">Credential ID: {cert.credentialId}</p>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col justify-center gap-2">
                        <Button size="sm" variant="outline" className="flex gap-1" onClick={() => handleOpenCertificatePreview(cert)}>
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="flex gap-1" onClick={() => handleShareBadge()}>
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            {/* In Progress Certifications Tab */}
            <TabsContent value="in-progress" className="mt-6 space-y-4">
              {futureCertificates.map(cert => (
                <Card 
                  key={cert.id} 
                  className="hover:border-primary/20 transition-colors cursor-pointer"
                  onClick={() => handleOpenCertificatePreview(cert)}
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
                            <Badge variant="outline" className="ml-2 animate-pulse">In Progress</Badge>
                          </div>
                          <Badge variant="outline" className="mt-1">{cert.category}</Badge>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Issued by {cert.issuer}</p>
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
                      
                      <div className="flex md:flex-col justify-center">
                        <Button size="sm">Continue Learning</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Badge Preview Dialog */}
      <Dialog open={showBadgePreview} onOpenChange={setShowBadgePreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedBadge?.name}</DialogTitle>
            <DialogDescription>{selectedBadge?.description}</DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${selectedBadge?.earned ? getRarityColor(selectedBadge?.rarity || 'common') : 'bg-muted'}`}>
              {selectedBadge && renderIcon(selectedBadge.icon)}
              {selectedBadge?.timeLimited && (
                <span className="absolute top-5 right-5 h-7 w-7 bg-amber-500 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </span>
              )}
            </div>
            
            <div className="mt-4 space-y-2 text-center">
              <div className="flex justify-center gap-2">
                <Badge>{selectedBadge?.category}</Badge>
                {selectedBadge?.rarity && (
                  <Badge className={getRarityColor(selectedBadge.rarity)}>{selectedBadge.rarity}</Badge>
                )}
                {selectedBadge?.timeLimited && (
                  <Badge variant="outline" className="animate-pulse border-amber-500 text-amber-500">Limited Time</Badge>
                )}
              </div>
              
              {selectedBadge?.earned ? (
                <p className="text-sm">
                  Earned on {new Date(selectedBadge?.date || '').toLocaleDateString()}
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground italic">
                    Complete the requirements to earn this badge
                  </p>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">How to earn this badge:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedBadge?.name.includes('Learning Champion') && (
                        <>
                          <li>Earn the highest learning points in your team for a month</li>
                          <li>Complete at least 3 courses</li>
                          <li>Achieve 90%+ assessment scores</li>
                        </>
                      )}
                      {selectedBadge?.name.includes('Data Science') && (
                        <>
                          <li>Complete Data Fundamentals course</li>
                          <li>Complete Advanced Analytics course</li>
                          <li>Pass the Data Science assessment</li>
                        </>
                      )}
                      {selectedBadge?.name.includes('Leadership') && (
                        <>
                          <li>Complete all Leadership courses</li>
                          <li>Score 85%+ on all assessments</li>
                          <li>Receive manager endorsement</li>
                        </>
                      )}
                      {selectedBadge?.name.includes('Hackathon') && (
                        <>
                          <li>Register for the Innovation Hackathon</li>
                          <li>Submit a project entry</li>
                          <li>Present your innovation</li>
                          <li>Available until December 31, 2023</li>
                        </>
                      )}
                      {selectedBadge?.name.includes('Mentor') && (
                        <>
                          <li>Become a mentor in the mentorship program</li>
                          <li>Mentor at least 5 colleagues</li>
                          <li>Receive positive feedback from mentees</li>
                        </>
                      )}
                      {selectedBadge?.name.includes('Quarterly') && (
                        <>
                          <li>Earn the most learning points in Q3 2023</li>
                          <li>Complete at least 5 courses</li>
                          <li>Available until December 31, 2023</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="sm:justify-center gap-2">
            {selectedBadge?.earned ? (
              <>
                <Button variant="outline" disabled={showShareSuccess} onClick={handleShareBadge}>
                  {showShareSuccess ? 
                    <span className="flex items-center"><Check className="h-4 w-4 mr-1" /> Shared</span> : 
                    <span className="flex items-center"><Share2 className="h-4 w-4 mr-1" /> Share</span>
                  }
                </Button>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-1" /> View in Profile
                </Button>
              </>
            ) : (
              <Button>Continue Learning</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certificate Preview Dialog */}
      <Dialog open={showCertificatePreview} onOpenChange={setShowCertificatePreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Certificate Details</DialogTitle>
            <DialogDescription>
              {selectedCertificate?.isEarned ? 
                "Your earned certificate and credentials" : 
                "Progress towards earning this certificate"
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedCertificate?.isEarned ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 p-6 border rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 text-3xl">
                  {selectedCertificate.image}
                </div>
              </div>
              
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-primary">{selectedCertificate.name}</h3>
                <p className="text-muted-foreground">This is to certify that</p>
                <p className="text-lg font-medium">John Doe</p>
                <p className="text-muted-foreground">has successfully completed all requirements for</p>
                <p className="font-medium">{selectedCertificate.name}</p>
                <div className="my-3 border-t border-b py-2">
                  <p className="text-sm text-muted-foreground">Issued by: {selectedCertificate.issuer}</p>
                  <p className="text-sm text-muted-foreground">Date: {selectedCertificate.date}</p>
                  <p className="text-sm text-muted-foreground">Credential ID: {selectedCertificate.credentialId}</p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <Star className="h-4 w-4 text-amber-500" />
                  <Trophy className="h-4 w-4 text-amber-500" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted/50 rounded-lg flex items-center justify-center text-3xl opacity-50">
                  {selectedCertificate?.image}
                </div>
                <div>
                  <h3 className="font-medium">{selectedCertificate?.name}</h3>
                  <p className="text-sm text-muted-foreground">Issued by: {selectedCertificate?.issuer}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Certificate Progress</span>
                  <span>{selectedCertificate?.progress}%</span>
                </div>
                <Progress value={selectedCertificate?.progress} className="h-2" />
              </div>
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Requirements to earn this certificate:</h4>
                <ul className="space-y-2">
                  {selectedCertificate?.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${
                        index < Math.floor((selectedCertificate.progress || 0) / (100 / (selectedCertificate.requirements?.length || 1))) 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index < Math.floor((selectedCertificate.progress || 0) / (100 / (selectedCertificate.requirements?.length || 1))) ? 
                          <Check className="h-3 w-3" /> : 
                          <Clock className="h-3 w-3" />
                        }
                      </div>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2 flex-wrap">
            {selectedCertificate?.isEarned ? (
              <>
                <Button variant="outline" onClick={handleDownloadCertificate}>
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
                <Button variant="outline" onClick={handleShareBadge}>
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-1" /> Verify Certificate
                </Button>
              </>
            ) : (
              <Button>Continue Learning</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Icon Components
const PenTool = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>
  </svg>
);

const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Database = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const Code = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const Gift = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
  </svg>
);

const Zap = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

export default BadgesTab;
