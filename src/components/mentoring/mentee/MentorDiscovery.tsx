
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, User, Star, Clock, Mail, Check, X, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// 50 sample topics for mentorship
const topics = [
  // Leadership & Management
  "Leadership", "Team Management", "Strategic Planning", "Change Management", "Conflict Resolution", 
  "Organizational Development", "Executive Coaching", "Performance Management", "Talent Management", "Succession Planning",
  
  // Technical Skills
  "Software Development", "Data Science", "Machine Learning", "Artificial Intelligence", "Cloud Computing", 
  "DevOps", "Cybersecurity", "Blockchain", "Mobile Development", "UI/UX Design",
  
  // Business & Marketing
  "Digital Marketing", "Product Management", "Business Strategy", "Entrepreneurship", "Financial Planning", 
  "Market Research", "Brand Management", "Content Marketing", "E-commerce", "Sales Strategies",
  
  // Personal Development
  "Public Speaking", "Communication Skills", "Emotional Intelligence", "Time Management", "Work-Life Balance", 
  "Networking", "Career Planning", "Personal Branding", "Mindfulness", "Stress Management",
  
  // Industry Specific
  "Healthcare Management", "Education Technology", "Fintech", "Sustainability", "Remote Work", 
  "Nonprofit Management", "Creative Arts", "Legal Compliance", "International Business", "Supply Chain Management"
];

// Mock data for mentors
const mentorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    topics: ["Data Science", "Machine Learning", "Leadership"],
    rating: 4.9,
    availability: "Available",
    experience: "10+ years",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    topics: ["Product Management", "UI/UX Design", "Team Management"],
    rating: 4.7,
    availability: "Available",
    experience: "8 years",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Marketing Director",
    topics: ["Digital Marketing", "Content Marketing", "Brand Management"],
    rating: 4.8,
    availability: "Unavailable",
    experience: "12 years",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Software Engineering Lead",
    topics: ["Software Development", "Leadership", "DevOps"],
    rating: 4.5,
    availability: "Available",
    experience: "15 years",
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    topics: ["Leadership", "Communication Skills", "Career Planning"],
    rating: 5.0,
    availability: "Available",
    experience: "20 years",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 6,
    name: "David Lee",
    title: "UX Designer",
    topics: ["UI/UX Design", "Mobile Development", "Product Management"],
    rating: 4.6,
    availability: "Available",
    experience: "7 years",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    id: 7,
    name: "Lisa Wang",
    title: "Cybersecurity Specialist",
    topics: ["Cybersecurity", "Cloud Computing", "DevOps"],
    rating: 4.9,
    availability: "Available",
    experience: "11 years",
    imageUrl: "https://randomuser.me/api/portraits/women/59.jpg"
  },
  {
    id: 8,
    name: "Robert Garcia",
    title: "Finance Director",
    topics: ["Financial Planning", "Business Strategy", "Leadership"],
    rating: 4.7,
    availability: "Available",
    experience: "18 years",
    imageUrl: "https://randomuser.me/api/portraits/men/23.jpg"
  }
];

// Mock data for sent requests
const sentRequestsIds = [3, 8]; // IDs of mentors to whom requests have been sent

const MentorDiscovery = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [showMentorDetails, setShowMentorDetails] = useState(false);
  const [sentRequests, setSentRequests] = useState<number[]>(sentRequestsIds);
  const [popularTopics, setPopularTopics] = useState<string[]>(topics.slice(0, 10));
  const [showAllTopics, setShowAllTopics] = useState(false);

  const handleTopicFilter = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSendRequest = (mentor: any) => {
    if (mentor.availability === "Unavailable") {
      toast({
        title: "Mentor Unavailable",
        description: "This mentor is currently not accepting new mentees.",
        variant: "destructive"
      });
      return;
    }
    
    // Add mentor ID to sent requests
    setSentRequests([...sentRequests, mentor.id]);
    
    toast({
      title: "Request Sent",
      description: `Your mentorship request to ${mentor.name} has been sent.`
    });
  };

  const filteredMentors = mentorsData.filter(mentor => {
    // Filter out mentors to whom requests have been sent
    if (sentRequests.includes(mentor.id)) {
      return false;
    }
    
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTopics = selectedTopics.length === 0 || 
                           selectedTopics.some(topic => mentor.topics.includes(topic));
    
    return matchesSearch && matchesTopics;
  });

  const displayedTopics = showAllTopics ? topics : popularTopics;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Find Your Mentor
          </CardTitle>
          <CardDescription>
            Discover mentors based on your interests and learning objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Filter by Topics</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAllTopics(!showAllTopics)}
                  className="text-xs h-7"
                >
                  {showAllTopics ? "Show Less" : "Show All"}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-1">
                {displayedTopics.map(topic => (
                  <Badge 
                    key={topic} 
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTopicFilter(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
              {selectedTopics.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Selected: {selectedTopics.length}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTopics([])}
                    className="text-xs h-7"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            {filteredMentors.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No mentors found matching your criteria</p>
              </div>
            ) : (
              filteredMentors.map(mentor => (
                <Card key={mentor.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row p-0">
                    <div className="sm:w-1/4 p-4 flex flex-row sm:flex-col items-center sm:text-center border-b sm:border-b-0 sm:border-r">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-0 sm:mb-3 mr-4 sm:mr-0">
                        <img src={mentor.imageUrl} alt={mentor.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-base sm:mt-2">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">{mentor.rating} Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm">{mentor.experience} Experience</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.topics.map(topic => (
                            <Badge key={topic} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Dialog open={showMentorDetails && selectedMentor?.id === mentor.id} onOpenChange={(open) => {
                          setShowMentorDetails(open);
                          if (open) setSelectedMentor(mentor);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline">View Profile</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Mentor Profile</DialogTitle>
                            </DialogHeader>
                            {selectedMentor && (
                              <div className="space-y-4 py-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img src={selectedMentor.imageUrl} alt={selectedMentor.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-lg">{selectedMentor.name}</h3>
                                    <p className="text-muted-foreground">{selectedMentor.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Star className="h-4 w-4 text-amber-500" />
                                      <span className="text-sm">{selectedMentor.rating} Rating</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Expertise</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedMentor.topics.map((topic: string) => (
                                      <Badge key={topic} variant="secondary">{topic}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Experience</h4>
                                  <p className="text-sm">{selectedMentor.experience} in the field</p>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                                  <Badge variant={selectedMentor.availability === "Available" ? "default" : "destructive"}>
                                    {selectedMentor.availability}
                                  </Badge>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button 
                                onClick={() => {
                                  handleSendRequest(selectedMentor);
                                  setShowMentorDetails(false);
                                }}
                                disabled={selectedMentor?.availability === "Unavailable"}
                                className="gap-2"
                              >
                                <Mail className="h-4 w-4" />
                                Send Request
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          onClick={() => handleSendRequest(mentor)}
                          disabled={mentor.availability === "Unavailable"}
                          className="gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Request
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorDiscovery;
