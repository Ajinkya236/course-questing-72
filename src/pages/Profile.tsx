
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Mail, MapPin, Briefcase, Building, Users, Calendar, Shield, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock data for role-based skills
const roleSkills = [
  { id: 1, name: 'Project Management', proficiency: 65, target: 80 },
  { id: 2, name: 'Leadership', proficiency: 60, target: 75 },
  { id: 3, name: 'Strategic Thinking', proficiency: 45, target: 70 },
  { id: 4, name: 'Communication', proficiency: 85, target: 85 },
  { id: 5, name: 'Data Analysis', proficiency: 30, target: 60 },
];

// Calculate overall role readiness
const calculateRoleReadiness = (): number => {
  if (!roleSkills.length) return 0;
  
  let totalProficiency = 0;
  let totalTarget = 0;
  
  roleSkills.forEach(skill => {
    totalProficiency += skill.proficiency;
    totalTarget += skill.target;
  });
  
  return Math.round((totalProficiency / totalTarget) * 100);
};

const roleReadiness = calculateRoleReadiness();
const isRoleReady = roleReadiness === 100;

const Profile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(
    document.documentElement.classList.contains('dark')
  );
  
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>My Profile | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Button>
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
              
              <Button variant="outline" className="w-full mt-6">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          {/* Role Readiness Section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Ready for Role Progress
                </CardTitle>
                <CardDescription>
                  Your progress towards being fully ready for your current role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Role Readiness</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{roleReadiness}%</span>
                      {isRoleReady ? (
                        <Badge variant="default" className="bg-green-600">
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>Role Ready</span>
                          </div>
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="opacity-70">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            <span>In Progress</span>
                          </div>
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={roleReadiness} className="h-2" />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold">Skills For Your Role</h3>
                  {roleSkills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                          {skill.proficiency}% / {skill.target}%
                        </span>
                      </div>
                      <Progress value={(skill.proficiency / skill.target) * 100} className="h-1.5" />
                    </div>
                  ))}
                </div>
                
                {isRoleReady ? (
                  <div className="flex justify-center mt-8">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-2">
                        <Award className="h-12 w-12 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-center">Role Ready Badge Earned!</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">You've mastered all required skills for your role</p>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed rounded-lg p-4 mt-6 bg-secondary/10">
                    <div className="flex items-center opacity-60">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                        <Award className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Role Ready Badge</h3>
                        <p className="text-xs text-muted-foreground mt-1">Complete all your role skills to unlock this badge</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
