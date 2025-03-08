
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Check, 
  X, 
  Clock, 
  CheckCircle, 
  Calendar,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for mentee requests
const pendingRequests = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Junior Software Engineer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    message: "I'd love to learn more about frontend development and improving my React skills.",
    requestDate: "2 days ago",
    topics: ["React", "Frontend"]
  },
  {
    id: 2,
    name: "Sophia Chen",
    title: "UX Design Intern",
    image: "https://randomuser.me/api/portraits/women/62.jpg",
    message: "Looking for guidance on user research methods and design systems.",
    requestDate: "3 days ago",
    topics: ["UX Design", "User Research"]
  },
  {
    id: 3,
    name: "Marco Rodriguez",
    title: "Marketing Associate",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    message: "Would appreciate mentorship on digital marketing strategies and analytics.",
    requestDate: "1 week ago",
    topics: ["Digital Marketing", "Analytics"]
  }
];

const activeRequests = [
  {
    id: 4,
    name: "Priya Patel",
    title: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    message: "Currently working on improving my data visualization skills.",
    requestDate: "2 weeks ago",
    startDate: "1 week ago",
    nextSession: "Tomorrow, 3:00 PM",
    topics: ["Data Analysis", "Visualization"]
  },
  {
    id: 5,
    name: "James Wilson",
    title: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    message: "Seeking guidance on agile methodologies and product roadmapping.",
    requestDate: "3 weeks ago",
    startDate: "2 weeks ago",
    nextSession: "Friday, 10:00 AM",
    topics: ["Product Management", "Agile"]
  }
];

const completedRequests = [
  {
    id: 6,
    name: "Emily Zhang",
    title: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    message: "Thank you for helping me improve my JavaScript skills!",
    requestDate: "2 months ago",
    completionDate: "2 weeks ago",
    duration: "6 weeks",
    topics: ["JavaScript", "React"]
  },
  {
    id: 7,
    name: "David Lee",
    title: "Marketing Specialist",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    message: "Your guidance on SEO strategies was invaluable.",
    requestDate: "3 months ago",
    completionDate: "1 month ago",
    duration: "8 weeks",
    topics: ["Marketing", "SEO"]
  }
];

const MenteeRequests = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");

  const handleApprove = (id: number) => {
    toast({
      title: "Request Approved",
      description: "The mentorship request has been approved."
    });
  };

  const handleDecline = (id: number) => {
    toast({
      title: "Request Declined",
      description: "The mentorship request has been declined."
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Pending</span>
              <Badge variant="outline" className="ml-1">{pendingRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Active</span>
              <Badge variant="outline" className="ml-1">{activeRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1">
              <Check className="h-4 w-4" />
              <span>Completed</span>
              <Badge variant="outline" className="ml-1">{completedRequests.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
        
        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={request.image} alt={request.name} />
                        <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{request.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{request.title}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Requested {request.requestDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{request.message}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {request.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => handleDecline(request.id)}>
                      <X className="h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm" className="gap-1" onClick={() => handleApprove(request.id)}>
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="space-y-4">
            {activeRequests.map(request => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={request.image} alt={request.name} />
                        <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{request.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{request.title}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Started</p>
                      <p className="text-sm font-medium">{request.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Session</p>
                      <p className="text-sm font-medium">{request.nextSession}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {request.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      Schedule
                    </Button>
                    <Button size="sm" className="gap-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="space-y-4">
            {completedRequests.map(request => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={request.image} alt={request.name} />
                        <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{request.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{request.title}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Completed {request.completionDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{request.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Topics</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {request.topics.map(topic => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm italic mb-3">"{request.message}"</p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
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

export default MenteeRequests;
