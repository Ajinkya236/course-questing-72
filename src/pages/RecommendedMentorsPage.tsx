
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowLeft, UserCog, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock recommended mentors data - enhanced with more mentors
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
  },
  {
    id: 7,
    name: "Jin Lee",
    title: "UX Research Lead",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 4.9,
    reviews: 41,
    topics: ["User Research", "Usability Testing", "Design Thinking"]
  },
  {
    id: 8,
    name: "Malik Johnson",
    title: "Engineering Director",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 5.0,
    reviews: 48,
    topics: ["Technical Leadership", "Engineering Management", "System Design"]
  }
];

const RecommendedMentorsPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Recommended Mentors | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate('/mentoring')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Recommended Mentors</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Discover mentors matched to your skills, interests, and career goals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedMentors.map(mentor => (
            <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-1">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{mentor.title}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{mentor.rating}</span>
                    <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mentor.topics.map(topic => (
                      <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Button className="mt-4 w-full" variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedMentorsPage;
