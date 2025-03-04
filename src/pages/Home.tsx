
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import CourseCarousel from '@/components/CourseCarousel';

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

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      <div className="container py-8 space-y-12 mb-20">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/90 to-primary/70 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Unlock Your Potential with Personalized Learning
              </h1>
              <p className="text-white/90">
                Discover tailored courses based on your role, interests, and learning history. 
                Earn points and badges as you progress through your learning journey.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="gap-2">
                  Explore Courses
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  View Learning Path
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')] bg-cover bg-center opacity-10"></div>
        </section>

        {/* Course Carousels */}
        <section className="space-y-12">
          <CourseCarousel title="Role-based Skills" courses={mockCoursesData.roleBasedSkillGaps} />
          <CourseCarousel title="Based on Your Interests" courses={mockCoursesData.skillInterestsFollowed} />
          <CourseCarousel title="Continue Learning" courses={mockCoursesData.usageHistory} />
          <CourseCarousel title="Popular with Similar Learners" courses={mockCoursesData.similarUsers} />
          <CourseCarousel title="Top Picks for You" courses={mockCoursesData.topPicks} />
        </section>
      </div>
    </>
  );
};

export default Home;
