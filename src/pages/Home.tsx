import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronRight, Bell, Calendar, Clock, BookOpen, Gift, Trophy, TrendingUp } from 'lucide-react';
import CourseCarousel from '@/components/CourseCarousel';
import CourseCard from '@/components/CourseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

// Mock data for courses
const mockCoursesData = {
  roleBasedSkillGaps: [
    {
      id: '1',
      title: 'Leadership for New Managers',
      description: 'Essential skills for first-time managers and team leaders',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
      category: 'Leadership',
      duration: '4h 30m',
      rating: 4.7,
      isBookmarked: true,
    },
    {
      id: '2',
      title: 'Strategic Decision Making',
      description: 'Learn how to make effective decisions under pressure',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      category: 'Management',
      duration: '3h 15m',
      rating: 4.5,
    },
    {
      id: '3',
      title: 'Project Management Fundamentals',
      description: 'Master the basics of managing projects successfully',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      category: 'Project Management',
      duration: '5h 45m',
      rating: 4.8,
    },
    {
      id: '4',
      title: 'Effective Team Communication',
      description: 'Improve communication within your team for better results',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      category: 'Communication',
      duration: '2h 30m',
      rating: 4.6,
    },
    {
      id: '5',
      title: 'Data-Driven Decision Making',
      description: 'Using data analytics to make better business decisions',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
      category: 'Analytics',
      duration: '4h 15m',
      rating: 4.9,
    },
  ],
  skillInterestsFollowed: [
    {
      id: '6',
      title: 'Advanced Python Programming',
      description: 'Take your Python skills to the next level with advanced concepts',
      imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      category: 'Programming',
      duration: '8h 20m',
      rating: 4.8,
    },
    {
      id: '7',
      title: 'Digital Marketing Mastery',
      description: 'Comprehensive guide to modern digital marketing strategies',
      imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
      category: 'Marketing',
      duration: '6h 45m',
      rating: 4.6,
    },
    {
      id: '8',
      title: 'User Experience Design',
      description: 'Create intuitive and engaging user experiences',
      imageUrl: 'https://images.unsplash.com/photo-1525011268345-4d595308a8a2',
      category: 'Design',
      duration: '5h 30m',
      rating: 4.7,
    },
    {
      id: '9',
      title: 'Financial Planning Essentials',
      description: 'Master the fundamentals of personal and business finance',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      category: 'Finance',
      duration: '4h 15m',
      rating: 4.5,
      isBookmarked: true,
    },
    {
      id: '10',
      title: 'Public Speaking Confidence',
      description: 'Overcome fear and become a confident public speaker',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
      category: 'Communication',
      duration: '3h 45m',
      rating: 4.9,
    },
  ],
  usageHistory: [
    {
      id: '11',
      title: 'Agile Methodology & Scrum',
      description: 'Learn agile development principles and scrum framework',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
      category: 'Project Management',
      duration: '5h 15m',
      rating: 4.7,
    },
    {
      id: '12',
      title: 'Emotional Intelligence at Work',
      description: 'Develop emotional intelligence to enhance workplace relationships',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
      category: 'Personal Development',
      duration: '3h 30m',
      rating: 4.8,
    },
    {
      id: '13',
      title: 'Cybersecurity Fundamentals',
      description: 'Essential knowledge for protecting digital assets',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
      category: 'Security',
      duration: '6h 20m',
      rating: 4.9,
      isBookmarked: true,
    },
    {
      id: '14',
      title: 'Business Strategy Essentials',
      description: 'Learn key concepts in business strategy development',
      imageUrl: 'https://images.unsplash.com/photo-1460794418188-1bb7dba2720d',
      category: 'Business',
      duration: '4h 45m',
      rating: 4.6,
    },
    {
      id: '15',
      title: 'Negotiation Skills Mastery',
      description: 'Powerful techniques for successful negotiations',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-129418cb2dfe',
      category: 'Business Skills',
      duration: '3h 15m',
      rating: 4.7,
    },
  ],
  similarUsers: [
    {
      id: '16',
      title: 'Design Thinking Workshop',
      description: 'Practical approach to creative problem solving',
      imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4',
      category: 'Innovation',
      duration: '4h 30m',
      rating: 4.8,
    },
    {
      id: '17',
      title: 'Effective Time Management',
      description: 'Strategies for maximizing productivity and focus',
      imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
      category: 'Productivity',
      duration: '2h 45m',
      rating: 4.7,
    },
    {
      id: '18',
      title: 'Content Marketing Strategy',
      description: 'Create compelling content that drives engagement',
      imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
      category: 'Marketing',
      duration: '5h 15m',
      rating: 4.6,
      isBookmarked: true,
    },
    {
      id: '19',
      title: 'Introduction to Data Science',
      description: 'Fundamentals of data analysis and visualization',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      category: 'Data Science',
      duration: '7h 30m',
      rating: 4.9,
    },
    {
      id: '20',
      title: 'Critical Thinking Skills',
      description: 'Enhance your ability to analyze and evaluate information',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      category: 'Thinking Skills',
      duration: '3h 45m',
      rating: 4.8,
    },
  ],
  topPicks: [
    {
      id: '21',
      title: 'Mastering Remote Work',
      description: 'Strategies for productivity and collaboration in remote teams',
      imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6',
      category: 'Remote Work',
      duration: '4h 15m',
      rating: 4.9,
    },
    {
      id: '22',
      title: 'Advanced Excel for Business',
      description: 'Power user techniques for business analysis and reporting',
      imageUrl: 'https://images.unsplash.com/photo-1586282391129-76a6df230234',
      category: 'Business Tools',
      duration: '6h 30m',
      rating: 4.8,
      isBookmarked: true,
    },
    {
      id: '7',
      title: 'Digital Marketing Mastery',
      description: 'Comprehensive guide to modern digital marketing strategies',
      imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
      category: 'Marketing',
      duration: '6h 45m',
      rating: 4.6,
    },
    {
      id: '13',
      title: 'Cybersecurity Fundamentals',
      description: 'Essential knowledge for protecting digital assets',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
      category: 'Security',
      duration: '6h 20m',
      rating: 4.9,
    },
    {
      id: '3',
      title: 'Project Management Fundamentals',
      description: 'Master the basics of managing projects successfully',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      category: 'Project Management',
      duration: '5h 45m',
      rating: 4.8,
    },
  ],
};

// Mock organizational banner announcements
const bannerAnnouncements = [
  {
    id: '1',
    title: 'Annual Learning Challenge',
    description: 'Complete 5 courses by June 30th to earn a special badge and bonus points',
    bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    ctaText: 'Join Challenge',
  },
  {
    id: '2',
    title: 'New Leadership Program',
    description: 'Exclusive training for emerging leaders. Limited seats available!',
    bgColor: 'bg-gradient-to-r from-purple-600 to-pink-700',
    ctaText: 'Apply Now',
  },
  {
    id: '3',
    title: 'Tech Conference 2023',
    description: 'Register for our virtual tech conference with industry experts',
    bgColor: 'bg-gradient-to-r from-teal-600 to-cyan-700',
    ctaText: 'Register',
  }
];

// Mock actionable items
const actionableItems = [
  {
    id: '1',
    title: 'Complete Python Assessment',
    dueDate: 'Due in 2 days',
    priority: 'High',
    type: 'Assessment',
    icon: BookOpen,
  },
  {
    id: '2',
    title: 'Submit Project Proposal',
    dueDate: 'Due tomorrow',
    priority: 'Critical',
    type: 'Assignment',
    icon: Clock,
  },
  {
    id: '3',
    title: 'Mentorship Session',
    dueDate: 'Thursday, 3:00 PM',
    priority: 'Medium',
    type: 'Meeting',
    icon: Calendar,
  },
  {
    id: '4',
    title: 'Feedback Requested',
    dueDate: 'No deadline',
    priority: 'Low',
    type: 'Feedback',
    icon: Bell,
  },
];

// Categories for skill filters
const skillCategories = [
  { value: 'all', label: 'All Skills' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'technical', label: 'Technical' },
  { value: 'business', label: 'Business' },
  { value: 'communication', label: 'Communication' },
  { value: 'analytics', label: 'Analytics' },
];

const Home = () => {
  const [roleBasedSkillFilter, setRoleBasedSkillFilter] = useState('all');
  const [interestSkillFilter, setInterestSkillFilter] = useState('all');
  
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      <div className="container py-8 space-y-10 mb-20">
        {/* Banner Carousel */}
        <section className="relative rounded-xl overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {bannerAnnouncements.map((announcement) => (
                <CarouselItem key={announcement.id} className="basis-full">
                  <div className={`relative ${announcement.bgColor} p-8 md:p-12 lg:p-16 rounded-xl`}>
                    <div className="max-w-2xl space-y-4">
                      <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {announcement.title}
                      </h1>
                      <p className="text-white/90">
                        {announcement.description}
                      </p>
                      <div className="pt-4">
                        <Button variant="jio-outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                          {announcement.ctaText}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Summary Containers Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Actionables Container */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-jio" />
                    Actionables
                  </span>
                  <Badge variant="jio-outline" className="cursor-pointer">4 Pending</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionableItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-jio/10 p-2 rounded-full">
                          <item.icon className="h-5 w-5 text-jio" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={item.priority === 'Critical' ? 'destructive' : (item.priority === 'High' ? 'jio' : 'secondary')}>
                          {item.priority}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">View All Tasks</Button>
              </CardContent>
            </Card>
          </div>
          
          {/* My Rewards Summary */}
          <div>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-jio" />
                  My Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-jio">12,465</div>
                  <p className="text-sm text-muted-foreground">Total Points Earned</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Rank</span>
                    <span className="font-semibold">8th</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Badges Earned</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weekly Points</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">450</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Button variant="jio" className="w-full">
                    <Gift className="h-4 w-4 mr-2" />
                    View Rewards
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Course Carousels */}
        <section className="space-y-10">
          {/* Continue Learning */}
          <CourseCarousel 
            title="Continue Learning" 
            courses={mockCoursesData.usageHistory}
            viewAllLink="/my-learning"
          />
          
          {/* Top Picks for You */}
          <CourseCarousel 
            title="Top Picks for You" 
            courses={mockCoursesData.topPicks}
            viewAllLink="/discover"
          />
          
          {/* Role-based Skills with Filter */}
          <CourseCarousel 
            title="Role-based Skills" 
            courses={mockCoursesData.roleBasedSkillGaps}
            showFilter={true}
            filterOptions={skillCategories}
            filterValue={roleBasedSkillFilter}
            onFilterChange={setRoleBasedSkillFilter}
            viewAllLink="/discover?category=role-based"
          />
          
          {/* Based on Your Interests with Filter */}
          <CourseCarousel 
            title="Based on Your Interests" 
            courses={mockCoursesData.skillInterestsFollowed}
            showFilter={true}
            filterOptions={skillCategories}
            filterValue={interestSkillFilter}
            onFilterChange={setInterestSkillFilter}
            viewAllLink="/discover?category=interests"
          />
          
          {/* Popular with Similar Learners */}
          <CourseCarousel 
            title="Popular with Similar Learners" 
            courses={mockCoursesData.similarUsers}
            viewAllLink="/discover?category=similar"
          />
        </section>
      </div>
    </>
  );
};

export default Home;
