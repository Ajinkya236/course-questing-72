
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Medal, Trophy, Star, Download, ExternalLink, Share2 } from 'lucide-react';

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
}

const BadgesTab: React.FC<BadgesTabProps> = ({ teamMemberId }) => {
  // Mock data - in a real app, we'd fetch based on teamMemberId if provided
  const badges: BadgeItem[] = [
    { id: 'b1', name: 'First Course Completed', icon: 'award', description: 'Awarded for completing your first course', category: 'Achievement', earned: true, date: '2023-08-15' },
    { id: 'b2', name: 'Perfect Assessment Score', icon: 'star', description: 'Achieved 100% in a course assessment', category: 'Excellence', earned: true, date: '2023-09-02' },
    { id: 'b3', name: 'Leadership Pioneer', icon: 'trophy', description: 'Completed the leadership fundamentals pathway', category: 'Leadership', earned: false, progress: 75 },
    { id: 'b4', name: 'Team Collaborator', icon: 'medal', description: 'Participated in team learning activities', category: 'Collaboration', earned: true, date: '2023-10-10' },
    { id: 'b5', name: 'Learning Streak 30', icon: 'award', description: 'Maintained learning streak for 30 days', category: 'Consistency', earned: true, date: '2023-11-05' },
    { id: 'b6', name: 'Technical Master', icon: 'trophy', description: 'Demonstrated mastery in technical courses', category: 'Technical', earned: false, progress: 40 },
    { id: 'b7', name: 'Content Creator', icon: 'star', description: 'Created valuable content for peers', category: 'Contribution', earned: false, progress: 10 },
    { id: 'b8', name: 'Digital Transformation', icon: 'medal', description: 'Completed Digital Transformation pathway', category: 'Innovation', earned: true, date: '2023-10-25' },
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
    },
  ];
  
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);
  
  // Function to render the appropriate icon
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
                  </CardContent>
                  <CardFooter className="justify-center pt-0">
                    <Badge variant="outline">{badge.category}</Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Badges in Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inProgressBadges.map(badge => (
                <Card key={badge.id} className="bg-muted/50">
                  <CardHeader className="pb-2 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                      <div className="text-muted-foreground">
                        {renderIcon(badge.icon)}
                      </div>
                    </div>
                    <CardTitle className="text-base">{badge.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {badge.progress}% completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-2">
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </CardContent>
                  <CardFooter className="justify-center pt-0">
                    <Badge variant="outline">{badge.category}</Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            {certificates.map(cert => (
              <Card key={cert.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Certificate Icon/Image */}
                    <div className="mx-auto md:mx-0 h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center text-4xl">
                      {cert.image}
                    </div>
                    
                    {/* Certificate Details */}
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
                    
                    {/* Action Buttons */}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgesTab;
