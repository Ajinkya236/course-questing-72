
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Mail, MapPin, Briefcase, Building, Users, Star, Award, Trophy, User, Calendar, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Role skills data
const roleSkills = [
  { id: 1, name: 'Project Management', proficiency: 65, target: 80 },
  { id: 2, name: 'Leadership', proficiency: 60, target: 75 },
  { id: 3, name: 'Strategic Thinking', proficiency: 45, target: 70 },
  { id: 4, name: 'Communication', proficiency: 85, target: 85 },
  { id: 5, name: 'Data Analysis', proficiency: 30, target: 60 },
];

const Profile = () => {
  const navigate = useNavigate();
  
  // Calculate overall role readiness percentage
  const calculateRoleReadiness = () => {
    const totalTargets = roleSkills.reduce((sum, skill) => sum + skill.target, 0);
    const currentTotal = roleSkills.reduce((sum, skill) => {
      // Cap the proficiency at the target value
      const cappedProficiency = Math.min(skill.proficiency, skill.target);
      return sum + cappedProficiency;
    }, 0);
    
    return Math.round((currentTotal / totalTargets) * 100);
  };
  
  const roleReadiness = calculateRoleReadiness();
  const isRoleReady = roleReadiness === 100;
  
  return (
    <>
      <Helmet>
        <title>My Profile | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Senior Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Developer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Engineering</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Frontend Team</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined: January 2022</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <Trophy className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                  <p className="text-xs text-muted-foreground">Rank</p>
                  <p className="font-bold">#15</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <Star className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Points</p>
                  <p className="font-bold">8,450</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <Award className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                  <p className="text-xs text-muted-foreground">Badges</p>
                  <p className="font-bold">12</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          {/* Role Readiness section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Ready for Role Progress</CardTitle>
                  {isRoleReady ? (
                    <Badge className="bg-green-500">Role Ready</Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-500 border-amber-500">In Progress</Badge>
                  )}
                </div>
                <CardDescription>
                  Track your progress towards becoming fully prepared for your current role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Role Readiness</span>
                    <span className="text-sm font-medium">{roleReadiness}%</span>
                  </div>
                  <Progress value={roleReadiness} className="h-2" />
                  
                  {isRoleReady ? (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md flex items-center gap-3">
                      <Award className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium text-green-600">Congratulations!</p>
                        <p className="text-sm text-muted-foreground">You've achieved 100% role readiness and earned the Role Ready badge!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-center gap-3">
                      <EyeOff className="h-6 w-6 text-amber-500" />
                      <div>
                        <p className="font-medium text-amber-600">Role Ready Badge Locked</p>
                        <p className="text-sm text-muted-foreground">Complete your role readiness to unlock this achievement</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Role Skills</h3>
                  {roleSkills.map(skill => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                          {skill.proficiency}% / {skill.target}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${skill.proficiency >= skill.target ? 'bg-green-500' : 'bg-primary'}`}
                          style={{ width: `${(skill.proficiency / skill.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
