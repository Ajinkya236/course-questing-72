
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Medal, Star, Download, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BadgesTabProps {
  teamMemberId?: string;
}

const BadgesTab: React.FC<BadgesTabProps> = ({ teamMemberId }) => {
  const viewingOwnBadges = !teamMemberId;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">
        {teamMemberId ? "Team Member's Badges & Certifications" : "My Badges & Certifications"}
      </h2>
      
      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Badges In Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inProgressBadges.map((badge) => (
              <InProgressBadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BadgeType {
  id: number;
  name: string;
  description: string;
  iconColor: string;
  icon: React.ReactNode;
  earnedDate: string;
}

const BadgeCard = ({ badge }: { badge: BadgeType }) => (
  <Card className="overflow-hidden">
    <div className={`h-2 ${badge.iconColor}`}></div>
    <CardContent className="pt-6 text-center">
      <div className="flex justify-center mb-4">
        <div className={`p-4 rounded-full ${badge.iconColor.replace('bg-', 'bg-')}/10`}>
          {badge.icon}
        </div>
      </div>
      <h4 className="font-semibold">{badge.name}</h4>
      <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
      <p className="text-xs text-muted-foreground mt-4">Earned on {badge.earnedDate}</p>
      
      <div className="flex justify-center mt-4 space-x-2">
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

interface InProgressBadgeType {
  id: number;
  name: string;
  description: string;
  progress: number;
  iconColor: string;
  icon: React.ReactNode;
  totalSteps: number;
  completedSteps: number;
}

const InProgressBadgeCard = ({ badge }: { badge: InProgressBadgeType }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${badge.iconColor.replace('bg-', 'bg-')}/10 mt-1`}>
          {badge.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{badge.name}</h4>
          <p className="text-sm text-muted-foreground">{badge.description}</p>
          
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${badge.iconColor}`}
                style={{ width: `${badge.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{badge.completedSteps}/{badge.totalSteps} steps completed</span>
              <span>{badge.progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface CertificateType {
  id: number;
  name: string;
  organization: string;
  iconColor: string;
  icon: React.ReactNode;
  issuedDate: string;
  expiryDate?: string;
}

const CertificateCard = ({ certificate }: { certificate: CertificateType }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${certificate.iconColor.replace('bg-', 'bg-')}/10 mt-1`}>
          {certificate.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{certificate.name}</h4>
          <p className="text-sm text-muted-foreground">{certificate.organization}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Issued: {certificate.issuedDate}
            {certificate.expiryDate && ` · Expires: ${certificate.expiryDate}`}
          </p>
          
          <div className="flex mt-4 space-x-2">
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Sample data
const badges: BadgeType[] = [
  {
    id: 1,
    name: "Leadership Expert",
    description: "Completed 5 leadership courses",
    iconColor: "bg-blue-500",
    icon: <Award className="h-6 w-6 text-blue-500" />,
    earnedDate: "May 15, 2023"
  },
  {
    id: 2,
    name: "Data Wizard",
    description: "Completed Data Academy track",
    iconColor: "bg-purple-500",
    icon: <Star className="h-6 w-6 text-purple-500" />,
    earnedDate: "June 23, 2023"
  },
  {
    id: 3,
    name: "Learning Enthusiast",
    description: "Maintained a 30-day learning streak",
    iconColor: "bg-amber-500",
    icon: <Medal className="h-6 w-6 text-amber-500" />,
    earnedDate: "July 10, 2023"
  },
  {
    id: 4,
    name: "Mentor Champion",
    description: "Mentored 3 colleagues successfully",
    iconColor: "bg-green-500",
    icon: <Award className="h-6 w-6 text-green-500" />,
    earnedDate: "August 5, 2023"
  }
];

const inProgressBadges: InProgressBadgeType[] = [
  {
    id: 1,
    name: "Innovation Master",
    description: "Complete all Innovation Academy courses",
    progress: 60,
    iconColor: "bg-cyan-500",
    icon: <Star className="h-6 w-6 text-cyan-500" />,
    totalSteps: 5,
    completedSteps: 3
  },
  {
    id: 2,
    name: "Product Management Guru",
    description: "Complete the PM certification path",
    progress: 40,
    iconColor: "bg-pink-500",
    icon: <Medal className="h-6 w-6 text-pink-500" />,
    totalSteps: 10,
    completedSteps: 4
  }
];

const certificates: CertificateType[] = [
  {
    id: 1,
    name: "Advanced Leadership Certification",
    organization: "Leadership Academy",
    iconColor: "bg-blue-500",
    icon: <Award className="h-6 w-6 text-blue-500" />,
    issuedDate: "January 15, 2023",
    expiryDate: "January 15, 2025"
  },
  {
    id: 2,
    name: "Data Analysis Professional",
    organization: "Data Academy",
    iconColor: "bg-purple-500",
    icon: <Star className="h-6 w-6 text-purple-500" />,
    issuedDate: "March 10, 2023"
  },
  {
    id: 3,
    name: "Digital Marketing Specialist",
    organization: "Marketing Academy",
    iconColor: "bg-green-500",
    icon: <Award className="h-6 w-6 text-green-500" />,
    issuedDate: "May 22, 2023",
    expiryDate: "May 22, 2025"
  }
];

export default BadgesTab;
