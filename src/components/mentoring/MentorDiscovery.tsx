
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Search } from 'lucide-react';
import MentorCard from './MentorCard';
import MentorshipRequestDialog from './MentorshipRequestDialog';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app this would come from the database
const mockMentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    department: "Product",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    topics: ["Product Management", "Leadership", "Career Growth"],
    rating: 4.8,
    menteeCount: 12,
    isAvailable: true,
    maxMentees: 3
  },
  {
    id: "2",
    name: "David Chen",
    role: "Engineering Lead",
    department: "Engineering",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    topics: ["Frontend Development", "Backend Development", "Career Growth"],
    rating: 4.9,
    menteeCount: 8,
    isAvailable: true,
    maxMentees: 2
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "UX Research Manager",
    department: "Design",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    topics: ["UX Design", "User Research", "Leadership"],
    rating: 4.7,
    menteeCount: 5,
    isAvailable: false,
    maxMentees: 2
  },
  {
    id: "4",
    name: "Marcus Williams",
    role: "Data Science Director",
    department: "Analytics",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    topics: ["Data Analysis", "AI & Machine Learning", "Career Growth"],
    rating: 4.6,
    menteeCount: 10,
    isAvailable: true,
    maxMentees: 3
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    role: "Marketing Director",
    department: "Marketing",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
    topics: ["Marketing", "Content Creation", "Personal Branding"],
    rating: 4.5,
    menteeCount: 7,
    isAvailable: true,
    maxMentees: 2
  },
  {
    id: "6",
    name: "James Kim",
    role: "VP of Sales",
    department: "Sales",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    topics: ["Sales", "Negotiation", "Leadership"],
    rating: 4.9,
    menteeCount: 15,
    isAvailable: true,
    maxMentees: 3
  }
];

// Mock data - in a real app this would come from the database
const allTopics = [
  "Leadership", "Project Management", "Data Analysis", "AI & Machine Learning", 
  "Public Speaking", "UX Design", "Frontend Development", "Backend Development",
  "Career Growth", "Work-Life Balance", "Product Management", "Marketing",
  "Sales", "Customer Success", "Business Strategy", "Finance", "Operations",
  "Human Resources", "Communication", "Negotiation", "Critical Thinking",
  "Problem Solving", "Time Management", "Emotional Intelligence", "Networking",
  "Personal Branding", "Content Creation", "Writing", "Diversity & Inclusion"
];

// Mock data - in a real application, this would be fetched from the database
const mockActiveEngagements = [
  { id: "eng1", topic: "Leadership", mentorId: "1" },
  { id: "eng2", topic: "Product Management", mentorId: "5" }
];

const mockPendingRequests = [
  { id: "req1", topic: "Data Analysis", mentorId: "4" }
];

interface MentorDiscoveryProps {
  isEnabled: boolean;
  preferredTopics: string[];
}

const MentorDiscovery = ({ isEnabled, preferredTopics }: MentorDiscoveryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  // Function to filter mentors based on search term and selected topics
  const filteredMentors = mockMentors.filter(mentor => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by selected topics
    const matchesTopics = 
      selectedTopics.length === 0 || 
      mentor.topics.some(topic => selectedTopics.includes(topic));
    
    // Filter by availability
    const matchesAvailability = !showOnlyAvailable || mentor.isAvailable;
    
    return matchesSearch && matchesTopics && matchesAvailability;
  });
  
  const handleTopicSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  const handleRequestMentorship = (mentorId: string) => {
    const mentor = mockMentors.find(m => m.id === mentorId);
    if (mentor) {
      setSelectedMentor(mentor);
      setIsRequestDialogOpen(true);
    }
  };
  
  const handleRequestSubmit = (topic: string, message: string) => {
    // In a real app, this would send the request to the backend
    console.log("Request submitted:", { mentorId: selectedMentor.id, topic, message });
    
    toast({
      title: "Mentorship Request Sent",
      description: `Your request has been sent to ${selectedMentor.name}.`,
    });
    
    setIsRequestDialogOpen(false);
  };
  
  // Check if mentee has 2 active engagements
  const hasMaxEngagements = mockActiveEngagements.length >= 2;
  
  // Function to check if mentee already has an active engagement for a topic
  const hasMentorForTopic = (topic: string) => {
    return mockActiveEngagements.some(eng => eng.topic === topic);
  };
  
  // Function to check if mentee already has a pending request for a topic
  const hasPendingRequestForTopic = (topic: string) => {
    return mockPendingRequests.some(req => req.topic === topic);
  };
  
  // Function to get disabled reason for a mentor
  const getMentorDisabledReason = (mentor: any) => {
    if (hasMaxEngagements) {
      return "You've reached the maximum of 2 active engagements.";
    }
    
    for (const topic of mentor.topics) {
      if (hasMentorForTopic(topic)) {
        return `You already have an active engagement for ${topic}.`;
      }
      if (hasPendingRequestForTopic(topic)) {
        return `You already have a pending request for ${topic}.`;
      }
    }
    
    return '';
  };

  return (
    <div className={`${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Find a Mentor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
            >
              <Filter className="h-4 w-4" />
              {showOnlyAvailable ? 'Show All' : 'Available Only'}
            </Button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Filter by Topic</h3>
            <div className="flex flex-wrap gap-2">
              {allTopics.slice(0, 15).map(topic => (
                <Badge 
                  key={topic}
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </Badge>
              ))}
              <Badge variant="secondary" className="cursor-pointer">+ More</Badge>
            </div>
          </div>
          
          {preferredTopics.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Your Preferred Topics</h3>
              <div className="flex flex-wrap gap-2">
                {preferredTopics.map(topic => (
                  <Badge 
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleTopicSelect(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-bold mb-4">Available Mentors</h2>
      
      {filteredMentors.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No mentors found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedTopics([]);
            }}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <MentorCard 
              key={mentor.id} 
              mentor={mentor} 
              onRequestMentorship={handleRequestMentorship}
              isDisabled={hasMaxEngagements || mentor.topics.some(topic => 
                hasMentorForTopic(topic) || hasPendingRequestForTopic(topic)
              )}
              disabledReason={getMentorDisabledReason(mentor)}
            />
          ))}
        </div>
      )}
      
      {selectedMentor && (
        <MentorshipRequestDialog
          open={isRequestDialogOpen}
          onOpenChange={setIsRequestDialogOpen}
          mentor={selectedMentor}
          onSubmit={handleRequestSubmit}
        />
      )}
    </div>
  );
};

export default MentorDiscovery;
