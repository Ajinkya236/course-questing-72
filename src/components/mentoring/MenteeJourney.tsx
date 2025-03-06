
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MentorDiscovery from './mentee/MentorDiscovery';
import MentorshipRequests from './mentee/MentorshipRequests';
import ActiveEngagements from './mentee/ActiveEngagements';
import MentoringHistory from './mentee/MentoringHistory';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  UserCog, 
  Search, 
  ClipboardList, 
  Users, 
  History,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock recommended mentors data
const recommendedMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 38,
    topics: ["Data Analysis", "Machine Learning", "Statistics"]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 27,
    topics: ["Product Management", "UX Design", "Agile Methodologies"]
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5.0,
    reviews: 42,
    topics: ["Leadership", "Communication", "Career Development"]
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Software Engineering Lead",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.7,
    reviews: 31,
    topics: ["Software Development", "Cloud Computing", "System Architecture"]
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "Digital Marketing Director",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.8,
    reviews: 35,
    topics: ["Digital Marketing", "Brand Strategy", "Social Media"]
  },
  {
    id: 6,
    name: "Robert Taylor",
    title: "Data Engineering Manager",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4.6,
    reviews: 29,
    topics: ["Big Data", "Data Engineering", "ETL Processes"]
  }
];

const MenteeJourney = () => {
  const [activeTab, setActiveTab] = useState('discovery');
  const [scrollPosition, setScrollPosition] = useState(0);
  const recommendedSection = useRef(null);
  const navigate = useNavigate();
  
  const handleScroll = (direction) => {
    const container = recommendedSection.current;
    const scrollAmount = 300; // Adjust based on card width + gap
    
    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        if (scrollPosition > 0) {
          setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
        }
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (scrollPosition < maxScroll) {
          setScrollPosition(Math.min(maxScroll, scrollPosition + scrollAmount));
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">My Mentee Journey</h2>
      
      {/* Recommended Mentors with navigation buttons */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Mentors</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleScroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleScroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="link" 
              size="sm" 
              className="gap-1"
              onClick={() => navigate('/recommended-mentors')}
            >
              <Search className="h-4 w-4" />
              View All
            </Button>
          </div>
        </div>
        <div 
          ref={recommendedSection}
          className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {recommendedMentors.map(mentor => (
            <Card key={mentor.id} className="overflow-hidden flex-shrink-0" style={{ width: '260px' }}>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-medium">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{mentor.rating}</span>
                    <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentor.topics.slice(0, 2).map(topic => (
                      <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                    {mentor.topics.length > 2 && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        +{mentor.topics.length - 2}
                      </span>
                    )}
                  </div>
                  <Button className="mt-3 w-full" size="sm" variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="discovery" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="discovery" className="flex items-center gap-1">
            <Search className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Mentor Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Active Engagements</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discovery">
          <MentorDiscovery />
        </TabsContent>
        
        <TabsContent value="requests">
          <MentorshipRequests />
        </TabsContent>
        
        <TabsContent value="active">
          <ActiveEngagements />
        </TabsContent>
        
        <TabsContent value="history">
          <MentoringHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenteeJourney;
