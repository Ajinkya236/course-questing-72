
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RecommendedMentorsCarousel from './RecommendedMentorsCarousel';

interface MentorDiscoveryProps {
  selectedTopics?: string[];
}

const MentorDiscovery: React.FC<MentorDiscoveryProps> = ({ selectedTopics = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expertise, setExpertise] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

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

  // Filter mentors based on search term and selected expertise
  const filteredMentors = recommendedMentors.filter(mentor => {
    const matchesSearch = searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = expertise === 'all' || 
      (expertise === 'technical' && mentor.topics.some(t => ['Data Analysis', 'Machine Learning', 'Software Development', 'System Architecture', 'Cloud Computing'].includes(t))) ||
      (expertise === 'leadership' && mentor.topics.some(t => ['Leadership', 'Communication'].includes(t))) ||
      (expertise === 'career' && mentor.topics.some(t => ['Career Development'].includes(t)));
    
    return matchesSearch && matchesExpertise;
  });

  // Sort mentors based on selected sort criteria
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    // Default to relevance (which prioritizes topics matching the user's interests)
    return b.topics.filter(t => selectedTopics.includes(t)).length - 
           a.topics.filter(t => selectedTopics.includes(t)).length;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
                onChange={handleSearchChange}
              />
            </div>
            <Select value={expertise} onValueChange={setExpertise}>
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
            <Select value={sortBy} onValueChange={setSortBy}>
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

      {/* Recommended mentors carousel */}
      <RecommendedMentorsCarousel 
        mentors={sortedMentors} 
        selectedTopics={selectedTopics}
      />

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
