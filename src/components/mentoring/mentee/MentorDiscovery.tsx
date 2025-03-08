
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MentorDiscoveryProps {
  selectedTopics?: string[];
}

const MentorDiscovery: React.FC<MentorDiscoveryProps> = ({ selectedTopics = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredMentors, setFilteredMentors] = useState<any[]>([]);

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
    }
  ];

  // Filter and sort mentors whenever search, filter or sort criteria change
  useEffect(() => {
    // Filter mentors based on search term and filters
    const filtered = recommendedMentors.filter(mentor => {
      // Search term filter
      if (searchTerm && !mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !mentor.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Expertise filter
      if (expertiseFilter !== "all") {
        const matchesExpertise = mentor.topics.some(topic => {
          switch (expertiseFilter) {
            case "technical":
              return ["Data Analysis", "Machine Learning", "Software Development", "Cloud Computing", "System Architecture"].includes(topic);
            case "leadership":
              return ["Leadership", "Communication", "Team Building"].includes(topic);
            case "career":
              return ["Career Development", "Professional Growth"].includes(topic);
            default:
              return true;
          }
        });
        
        if (!matchesExpertise) return false;
      }
      
      return true;
    });

    // Sort mentors based on sortBy
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "newest":
          // For this example, we're just using the id as a proxy for "newest"
          return a.id - b.id;
        default:
          // For relevance, prefer mentors with matching topics
          if (selectedTopics.length > 0) {
            const aMatchCount = a.topics.filter(topic => selectedTopics.includes(topic)).length;
            const bMatchCount = b.topics.filter(topic => selectedTopics.includes(topic)).length;
            return bMatchCount - aMatchCount;
          }
          return 0;
      }
    });

    setFilteredMentors(sorted);
  }, [searchTerm, expertiseFilter, sortBy, selectedTopics]);

  // Render mentor cards
  const renderMentorCards = () => {
    if (filteredMentors.length === 0) {
      return (
        <div className="py-8 text-center border rounded-lg bg-muted/30">
          <p className="text-muted-foreground">
            No mentors found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMentors.map(mentor => (
          <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                  <Search className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                  <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {mentor.topics.map(topic => (
                    <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Search and filter section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search mentors..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              defaultValue="all" 
              value={expertiseFilter}
              onValueChange={setExpertiseFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise Areas</SelectItem>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="career">Career Development</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              defaultValue="relevance" 
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mentors grid display */}
      {renderMentorCards()}

      {/* More content would go here */}
      <div className="py-8 text-center border rounded-lg bg-muted/30">
        <p className="text-muted-foreground">
          Explore our mentor profiles and find the perfect match for your learning journey
        </p>
      </div>
    </div>
  );
};

export default MentorDiscovery;
