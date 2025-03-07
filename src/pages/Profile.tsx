
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReadyForRoleProgress from '@/components/profile/ReadyForRoleProgress';
import { 
  User, 
  Mail, 
  Building, 
  Award, 
  FileText, 
  Edit, 
  Briefcase,
  MapPin,
  Calendar,
  Phone
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    role: "Senior Product Manager",
    email: "alex.johnson@example.com",
    department: "Product",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2020",
    bio: "Passionate product leader with over 8 years of experience in tech. Focused on creating user-centric solutions that drive business growth while solving real customer problems.",
    skills: ["Product Strategy", "User Research", "Agile Methodologies", "Cross-functional Leadership", "Data Analysis"],
    education: [
      { degree: "MBA, Business Administration", institution: "Stanford University", year: "2018" },
      { degree: "BS, Computer Science", institution: "University of California, Berkeley", year: "2014" }
    ],
    experience: [
      { role: "Senior Product Manager", company: "Current Company", duration: "2020 - Present" },
      { role: "Product Manager", company: "Tech Innovations Inc.", duration: "2017 - 2020" },
      { role: "Associate Product Manager", company: "StartUp Solutions", duration: "2015 - 2017" }
    ]
  };
  
  return (
    <>
      <Helmet>
        <title>My Profile | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.role}</p>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {user.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="mt-1">
                      {skill}
                    </Badge>
                  ))}
                  {user.skills.length > 3 && (
                    <Badge variant="outline" className="mt-1">
                      +{user.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{user.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{user.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <ReadyForRoleProgress />
            
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} className="px-3 py-1.5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 pl-4 pb-2 border-primary/30 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5" />
                          <h3 className="font-semibold">{exp.role}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mt-1">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.education.map((edu, index) => (
                        <div key={index} className="border-l-2 pl-4 pb-2 border-primary/30 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5" />
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
