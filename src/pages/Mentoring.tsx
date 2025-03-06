
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  UserPlus, 
  Clock 
} from 'lucide-react';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Helmet>
        <title>Mentoring | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mentoring</h1>
            <p className="text-muted-foreground mt-1">Connect with mentors or become a mentor to help others grow</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Find a Mentor
            </Button>
            <Button className="gap-2">
              <Users className="h-4 w-4" />
              Become a Mentor
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="mentee" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">As Mentee</span>
            </TabsTrigger>
            <TabsTrigger value="mentor" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">As Mentor</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Active Mentorships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">You don't have any active mentorships</p>
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Users className="h-4 w-4" />
                    Find a Mentor
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Completed Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">No mentoring sessions completed yet</p>
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule a Session
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">No pending mentorship requests</p>
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Clock className="h-4 w-4" />
                    View Requests
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg border mb-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:flex-1">
                  <h3 className="text-xl font-semibold mb-2">Get Started with Mentoring</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with experienced professionals who can guide your career growth or share your knowledge by becoming a mentor.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Find a Mentor
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Users className="h-4 w-4" />
                      Become a Mentor
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-primary/10 p-4 md:w-[280px]">
                  <h4 className="font-medium mb-2">Benefits of Mentoring</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Personalized guidance and feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Accelerated skill development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Expanded professional network</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Knowledge sharing opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mentee">
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="rounded-full bg-primary/10 p-6 mb-4">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Start Your Mentee Journey</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Connect with experienced mentors who can guide you through your learning and career development.
              </p>
              <Button size="lg" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Find a Mentor
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="mentor">
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="rounded-full bg-primary/10 p-6 mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Share Your Knowledge as a Mentor</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Help others grow by becoming a mentor. Share your expertise and make a positive impact on someone's career.
              </p>
              <Button size="lg" className="gap-2">
                <Users className="h-4 w-4" />
                Become a Mentor
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
