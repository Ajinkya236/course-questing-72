
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Star, 
  Filter, 
  Users, 
  ClipboardList, 
  ArrowRight, 
  Calendar, 
  BookOpen,
  Target,
  UserCheck,
  History
} from 'lucide-react';
import MentorCarousel from './MentorCarousel';
import ActiveEngagementCard from './ActiveEngagementCard';
import RequestCard from './RequestCard';
import { Link } from 'react-router-dom';
import MenteeJourney from './MenteeJourney';

// Sample mentor data
const recommendedMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    topics: ["Data Analysis", "Machine Learning", "Statistical Analysis"],
    rating: 4.9,
    reviewCount: 42,
    availability: "Available",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    topics: ["Product Management", "UX Research", "Team Leadership"],
    rating: 4.8,
    reviewCount: 37,
    availability: "Available",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "James Wilson",
    title: "Software Engineering Lead",
    topics: ["Software Development", "Leadership", "System Design"],
    rating: 4.7,
    reviewCount: 28,
    availability: "Unavailable until Oct 30",
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    topics: ["Leadership", "Communication", "Career Development"],
    rating: 5.0,
    reviewCount: 51,
    availability: "Available",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 5,
    name: "David Kim",
    title: "UI/UX Designer",
    topics: ["UX Design", "Interaction Design", "Design Systems"],
    rating: 4.6,
    reviewCount: 33,
    availability: "Available",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

// Sample request data
const requestsData = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    topic: "Data Analysis",
    status: "pending",
    date: "2023-10-15",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorTitle: "Product Manager",
    topic: "Product Management",
    status: "accepted",
    date: "2023-10-10",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    mentorName: "James Wilson",
    mentorTitle: "Software Engineering Lead",
    topic: "Leadership",
    status: "rejected",
    reason: "Currently at maximum mentee capacity",
    date: "2023-10-05",
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

// Sample active engagements
const activeEngagementsData = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    topic: "Data Analysis",
    startDate: "2023-10-20",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    progress: 40,
    sessions: [
      { id: 1, title: "Introduction to Data Analysis", date: "2023-10-25", status: "completed", notes: "Discussed key concepts and tools" },
      { id: 2, title: "Advanced Data Visualization", date: "2023-11-05", status: "upcoming" }
    ],
    tasks: [
      { id: 1, title: "Data Cleaning Exercise", dueDate: "2023-10-30", status: "completed" },
      { id: 2, title: "Visualization Project", dueDate: "2023-11-15", status: "pending" }
    ],
    courses: [
      { id: 1, title: "Fundamentals of Data Analysis", progress: 75, totalModules: 8, completedModules: 6 }
    ],
    goalsSet: false,
    sessionsCompleted: 1
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorTitle: "Product Manager",
    topic: "Product Management",
    startDate: "2023-09-15",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    progress: 65,
    sessions: [
      { id: 1, title: "Product Requirements", date: "2023-09-20", status: "completed", notes: "Learned how to gather and document requirements" },
      { id: 2, title: "Stakeholder Management", date: "2023-10-05", status: "completed", notes: "Discussed effective communication strategies" },
      { id: 3, title: "Product Roadmapping", date: "2023-10-20", status: "completed", notes: "Created a sample roadmap" },
      { id: 4, title: "Launch Strategies", date: "2023-11-10", status: "upcoming" }
    ],
    tasks: [
      { id: 1, title: "Competitive Analysis", dueDate: "2023-09-30", status: "completed" },
      { id: 2, title: "Create PRD Document", dueDate: "2023-10-15", status: "completed" },
      { id: 3, title: "User Persona Development", dueDate: "2023-11-05", status: "pending" }
    ],
    courses: [
      { id: 1, title: "Product Management Fundamentals", progress: 100, totalModules: 10, completedModules: 10 },
      { id: 2, title: "Agile Product Development", progress: 40, totalModules: 5, completedModules: 2 }
    ],
    goalsSet: true,
    sessionsCompleted: 3
  }
];

const MentoringDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestsFilter, setRequestsFilter] = useState('all');
  
  // Filter requests based on the active filter
  const filteredRequests = requestsData.filter(request => {
    if (requestsFilter === 'all') return true;
    return request.status === requestsFilter;
  });

  return (
    <div className="space-y-10">
      {/* Recommended Mentors Carousel */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recommended Mentors</h2>
          <Link to="/mentoring/discovery">
            <Button variant="link" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <MentorCarousel mentors={recommendedMentors} />
      </section>
      
      {/* Discovery Section */}
      <section>
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 text-primary mr-2" />
              Discover Mentors
            </CardTitle>
            <CardDescription>
              Find the perfect mentor to help you achieve your goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search mentors or topics..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>Find Mentors</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["Data Science", "Leadership", "Web Development", "UI/UX Design", "Product Management", "Marketing"].map(topic => (
                <Badge 
                  key={topic} 
                  variant="secondary" 
                  className="cursor-pointer py-1 px-3 hover:bg-primary/10 transition-colors"
                >
                  {topic}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="rounded-full">
                More Topics...
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Requests Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            My Requests
          </h2>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={requestsFilter} onValueChange={setRequestsFilter} className="mb-6">
          <TabsList className="w-full grid grid-cols-4 max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">Pending</TabsTrigger>
            <TabsTrigger value="accepted" className="flex items-center gap-1">Accepted</TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-1">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <div className="col-span-full text-center p-6 border rounded-lg bg-muted/30">
              <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">No Requests Found</h3>
              <p className="text-muted-foreground">You don't have any {requestsFilter !== 'all' ? requestsFilter : ''} requests.</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-right">
          <Link to="/mentoring?tab=requests">
            <Button variant="link" className="gap-1">
              View All Requests <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Active Engagements */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Engagements
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeEngagementsData.length > 0 ? (
            activeEngagementsData.map(engagement => (
              <ActiveEngagementCard key={engagement.id} engagement={engagement} />
            ))
          ) : (
            <div className="col-span-full text-center p-6 border rounded-lg bg-muted/30">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">No Active Engagements</h3>
              <p className="text-muted-foreground">You don't have any active mentoring engagements yet.</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-right">
          <Link to="/mentoring?tab=active">
            <Button variant="link" className="gap-1">
              Manage Engagements <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Mentee Journey at the bottom */}
      <section className="mt-10 pt-4 border-t">
        <h2 className="text-2xl font-semibold mb-6">My Mentee Journey</h2>
        <MenteeJourney />
      </section>
    </div>
  );
};

export default MentoringDashboard;
