
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  User, 
  Medal, 
  Award, 
  BookOpen, 
  Clock, 
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import SelfCertificationTab from './profile/SelfCertificationTab';
import SkillsTab from './profile/SkillsTab';
import RoleMappedSkillsTab from './profile/RoleMappedSkillsTab';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('self-certification');
  
  // Mock user data
  const user = {
    name: "Rahul Sharma",
    role: "Senior Product Manager",
    department: "Product Development",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    joinDate: "January 2020",
    bio: "Passionate product leader with 8+ years of experience in building digital products. Focused on customer-centric design and data-driven decision making.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
  };
  
  return (
    <>
      <Helmet>
        <title>My Profile | Learning Platform</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>
        
        {/* Profile Overview Card */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-32 w-32 border-4 border-primary/10">
                  <img src={user.profileImage} alt={user.name} />
                </Avatar>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {user.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{user.department}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{user.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined {user.joinDate}</span>
                  </div>
                </div>
                
                {/* Learning statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3 rounded-lg bg-secondary/20 flex flex-col items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">24</span>
                    <span className="text-xs text-muted-foreground">Courses Completed</span>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/20 flex flex-col items-center justify-center">
                    <Clock className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">164h</span>
                    <span className="text-xs text-muted-foreground">Learning Hours</span>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/20 flex flex-col items-center justify-center">
                    <Award className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">18</span>
                    <span className="text-xs text-muted-foreground">Badges Earned</span>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/20 flex flex-col items-center justify-center">
                    <Medal className="h-5 w-5 text-primary mb-1" />
                    <span className="text-lg font-bold">3,210</span>
                    <span className="text-xs text-muted-foreground">Total Points</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Tabs */}
        <Tabs 
          defaultValue="self-certification" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="self-certification" className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Self-Certification</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="role-mapped" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Role-Mapped Skills</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="self-certification">
            <SelfCertificationTab />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsTab />
          </TabsContent>
          
          <TabsContent value="role-mapped">
            <RoleMappedSkillsTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserProfile;
