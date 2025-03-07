
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Star, Filter, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for recommended mentors
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
    name: "Aisha Patel",
    title: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 4.6,
    reviews: 24,
    topics: ["Digital Marketing", "Content Strategy", "Brand Development"]
  },
  {
    id: 6,
    name: "Thomas Wright",
    title: "Finance Advisor",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.9,
    reviews: 36,
    topics: ["Financial Planning", "Investment Strategies", "Risk Management"]
  },
  {
    id: 7,
    name: "Sophia Kim",
    title: "UX Research Lead",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    rating: 4.8,
    reviews: 29,
    topics: ["User Research", "Usability Testing", "Design Thinking"]
  },
  {
    id: 8,
    name: "David Nguyen",
    title: "AI Engineer",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 4.9,
    reviews: 33,
    topics: ["Artificial Intelligence", "Machine Learning", "Neural Networks"]
  }
];

// Extract all unique topics from mentors for filters
const allTopics = Array.from(
  new Set(recommendedMentors.flatMap(mentor => mentor.topics))
);

const RecommendedMentorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleTopicFilter = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const filteredMentors = recommendedMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTopics = selectedTopics.length === 0 || 
                         selectedTopics.some(topic => mentor.topics.includes(topic));
    
    return matchesSearch && matchesTopics;
  });

  return (
    <>
      <Helmet>
        <title>Recommended Mentors | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => navigate('/mentoring')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Recommended Mentors</h1>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, title, or expertise..."
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
            <h2 className="text-sm font-medium mb-3">Filter by Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {allTopics.map(topic => (
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
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMentors.map(mentor => (
            <Card key={mentor.id} className="overflow-hidden h-full">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-medium text-lg">{mentor.name}</h3>
                  <p className="text-muted-foreground mb-2">{mentor.title}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentor.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                  <Button className="mt-4 w-full" size="sm">Request Mentorship</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredMentors.length === 0 && (
          <div className="p-8 text-center border rounded-lg">
            <p className="text-lg font-medium">No mentors found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecommendedMentorsPage;
