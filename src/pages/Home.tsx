import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronRight, Bell, Gift, Award, Star, Zap, BookOpen, Clock, Trophy, Target, CalendarDays, Flame, Bookmark, Briefcase, TrendingUp, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/CourseCarousel';
import FollowSkills from '@/components/FollowSkills';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';
import LearningStreakDialog from '@/components/LearningStreakDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillsForRoleDialog from '@/components/SkillsForRoleDialog';

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
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      trainingCategory: 'Ready for Role'
    },
    {
      id: '2',
      title: 'Strategic Decision Making',
      description: 'Learn how to make effective decisions under pressure',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      category: 'Management',
      duration: '3h 15m',
      rating: 4.5,
      trainingCategory: 'Leadership'
    },
    {
      id: '3',
      title: 'Project Management Fundamentals',
      description: 'Master the basics of managing projects successfully',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      category: 'Project Management',
      duration: '5h 45m',
      rating: 4.8,
      trainingCategory: 'Technical'
    },
    {
      id: '4',
      title: 'Effective Team Communication',
      description: 'Improve communication within your team for better results',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      category: 'Communication',
      duration: '2h 30m',
      rating: 4.6,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      trainingCategory: 'Mandatory'
    },
    {
      id: '5',
      title: 'Data-Driven Decision Making',
      description: 'Using data analytics to make better business decisions',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
      category: 'Analytics',
      duration: '4h 15m',
      rating: 4.9,
      trainingCategory: 'Technical'
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
4 title: 'Cybersecurity Fundamentals',
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
  trendingCourses: [
    {
      id: '31',
      title: 'AI for Business Leaders',
      description: 'Understanding artificial intelligence for strategic business decisions',
      imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c',
      category: 'Technology',
      duration: '5h 15m',
      rating: 4.9,
      isHot: true
    },
    {
      id: '32',
      title: 'Remote Work Leadership',
      description: 'Lead distributed teams effectively in the digital age',
      imageUrl: 'https://images.unsplash.com/photo-1590402494610-2c378a9114c6',
      category: 'Leadership',
      duration: '4h 30m',
      rating: 4.8,
      isHot: true
    },
    {
      id: '33',
      title: 'Agile Project Management',
      description: 'Modern approach to managing projects with agility',
      imageUrl: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83',
      category: 'Project Management',
      duration: '6h 45m',
      rating: 4.7,
      isHot: true
    },
    {
      id: '34',
      title: 'Data Privacy Compliance',
      description: 'Navigating the complex landscape of data protection regulations',
      imageUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d',
      category: 'Legal',
      duration: '3h 30m',
      rating: 4.6,
      isHot: true
    },
    {
      id: '35',
      title: 'Sustainable Business Practices',
      description: 'Implementing environmental responsibility in business operations',
      imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      category: 'Business',
      duration: '4h 15m',
      rating: 4.8,
      isHot: true
    }
  ],
  newCourses: [
    {
      id: '41',
      title: 'Blockchain Fundamentals',
      description: 'Learn the basics of blockchain technology and its applications',
      imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
      category: 'Technology',
      duration: '6h 00m',
      rating: 4.5,
      isNew: true
    },
    {
      id: '42',
      title: 'Inclusive Leadership',
      description: 'Building diverse and inclusive teams for the modern workplace',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      category: 'Leadership',
      duration: '3h 45m',
      rating: 4.9,
      isNew: true
    },
    {
      id: '43',
      title: 'Digital Wellbeing',
      description: 'Managing technology use for better mental health and productivity',
      imageUrl: 'https://images.unsplash.com/photo-1507428217774-b274d7f4d441',
      category: 'Wellness',
      duration: '2h 30m',
      rating: 4.7,
      isNew: true
    },
    {
      id: '44',
      title: 'Advanced Data Visualization',
      description: 'Create compelling visual representations of complex data',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      category: 'Analytics',
      duration: '5h 15m',
      rating: 4.8,
      isNew: true
    },
    {
      id: '45',
      title: 'Crisis Management',
      description: 'Strategies for effectively managing organizational crises',
      imageUrl: 'https://images.unsplash.com/photo-1514820720301-4c4790309f46',
      category: 'Management',
      duration: '4h 00m',
      rating: 4.6,
      isNew: true
    }
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

const roleSkills = [
  { id: 1, name: 'Project Management', proficiency: 65, target: 80 },
  { id: 2, name: 'Leadership', proficiency: 60, target: 75 },
  { id: 3, name: 'Strategic Thinking', proficiency: 45, target: 70 },
  { id: 4, name: 'Communication', proficiency: 85, target: 85 },
  { id: 5, name: 'Data Analysis', proficiency: 30, target: 60 },
];

const Home = () => {
  const navigate = useNavigate();
  const [isMysteryBoxOpen, setIsMysteryBoxOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isStreakDialogOpen, setIsStreakDialogOpen] = useState(false);
  const [isSkillsForRoleOpen, setIsSkillsForRoleOpen] = useState(false);
  const [skillsTab, setSkillsTab] = useState('follow');
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleContinueLearningViewAll = () => {
    navigate('/my-learning', { state: { activeTab: 'courses', courseTab: 'in-progress' } });
  };

  const handleViewAllCategory = (category: string) => {
    navigate(`/view-all/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleViewActionables = () => {
    navigate('/actionables');
  };

  const handleViewRewards = () => {
    navigate('/my-learning', { state: { activeTab: 'rewards' } });
  };

  const handleViewMilestones = () => {
    navigate('/milestones');
  };

  const handleDiscoverClick = () => {
    navigate('/discover');
  };

  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      <div className="container py-8 space-y-12 mb-20">
        <section className="relative rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-accent p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Unlock Your Potential with Personalized Learning
              </h1>
              <p className="text-white/90">
                Discover tailored courses based on your role, interests, and learning history. 
                Earn points and badges as you progress through your learning journey.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="gap-2 bg-white text-primary hover:bg-white/90" 
                  onClick={handleDiscoverClick}
                >
                  Explore Courses
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  View Learning Path
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')] bg-cover bg-center opacity-20"></div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl"></div>
        </section>

        <section className="space-y-12">
          <CourseCarousel 
            title="Continue Learning" 
            courses={mockCoursesData.usageHistory} 
            onCourseClick={handleCourseClick}
            onViewAllClick={handleContinueLearningViewAll}
          />

          <CourseCarousel 
            title="Trending Courses" 
            courses={mockCoursesData.trendingCourses} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Trending Courses')}
            showBadges={true}
          />
          
          <CourseCarousel 
            title="New Courses" 
            courses={mockCoursesData.newCourses} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('New Courses')}
            showBadges={true}
          />
          
          <CourseCarousel 
            title="Assigned Courses" 
            courses={mockCoursesData.roleBasedSkillGaps.map(course => ({
              ...course
            }))} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Assigned Courses')}
            filterOptions={['All Categories', 'Ready for Role', 'Mandatory', 'Leadership', 'Technical']}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-2 bg-purple-500"></div>
              <div className="p-6">
                <Tabs value={skillsTab} onValueChange={setSkillsTab}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-50 p-1.5 rounded-lg">
                        <Star className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-semibold">Skills</h3>
                    </div>
                    <TabsList>
                      <TabsTrigger value="follow" className="text-xs">You Follow</TabsTrigger>
                      <TabsTrigger value="role" className="text-xs">For Your Role</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="follow">
                    <FollowSkills />
                  </TabsContent>
                  
                  <TabsContent value="role">
                    <div className="space-y-4">
                      {roleSkills.slice(0, 3).map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                              {skill.proficiency}% / {skill.target}%
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${skill.proficiency >= skill.target ? 'bg-green-500' : 'bg-primary'}`}
                              style={{ width: `${(skill.proficiency / skill.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 gap-2"
                        onClick={() => setIsSkillsForRoleOpen(true)}
                      >
                        <Target className="h-4 w-4" />
                        View All Role Skills
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-2 bg-blue-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold">Actionables</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="gap-1 text-primary text-sm p-0"
                    onClick={handleViewActionables}
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div>
                      <p className="font-medium">Complete Leadership Course</p>
                      <p className="text-sm text-muted-foreground">3 days remaining</p>
                    </div>
                    <Button size="sm">Resume</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div>
                      <p className="font-medium">Rate Marketing Strategy Course</p>
                      <p className="text-sm text-muted-foreground">Feedback requested</p>
                    </div>
                    <Button size="sm" variant="outline">Rate</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-2 bg-amber-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-50 p-1.5 rounded-lg">
                      <Gift className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-semibold">My Rewards</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="gap-1 text-primary text-sm p-0"
                    onClick={handleViewRewards}
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/10">
                      <Award className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                        <p className="text-xl font-bold">2,450</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/10">
                      <div className="relative">
                        <Trophy className="h-8 w-8 text-primary" />
                        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">
                          8
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rank</p>
                        <p className="text-xl font-bold">#42</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-50 p-2 rounded-lg">
                        <Flame className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Learning Streak</p>
                        <p className="text-sm text-muted-foreground">18 days streak</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setIsStreakDialogOpen(true)}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <Target className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Next Milestone</p>
                        <p className="text-sm text-muted-foreground">2,535 points to Gold</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleViewMilestones}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="secondary" 
                      className="flex items-center gap-2"
                      onClick={() => setIsMysteryBoxOpen(true)}
                    >
                      <div className="relative">
                        <Gift className="h-5 w-5 text-purple-500" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <span>Mystery Box</span>
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex items-center gap-2"
                      onClick={() => setIsSpinWheelOpen(true)}
                    >
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span>Spin the Wheel</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CourseCarousel 
            title="Top Picks for You" 
            courses={mockCoursesData.topPicks} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Top Picks for You')}
          />
          
          <CourseCarousel 
            title="Role-based Skills" 
            courses={mockCoursesData.roleBasedSkillGaps} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Role-based Skills')}
          />
          
          <CourseCarousel 
            title="Based on Your Interests" 
            courses={mockCoursesData.skillInterestsFollowed} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Based on Your Interests')}
          />
          
          <CourseCarousel 
            title="Popular with Similar Learners" 
            courses={mockCoursesData.similarUsers} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Popular with Similar Learners')}
          />
        </section>
        
        <MysteryBoxDialog 
          open={isMysteryBoxOpen} 
          onClose={() => setIsMysteryBoxOpen(false)} 
        />
        
        <SpinTheWheelDialog 
          open={isSpinWheelOpen} 
          onClose={() => setIsSpinWheelOpen(false)} 
        />
        
        <LearningStreakDialog 
          open={isStreakDialogOpen} 
          onClose={() => setIsStreakDialogOpen(false)} 
        />

        <SkillsForRoleDialog
          open={isSkillsForRoleOpen}
          onClose={() => setIsSkillsForRoleOpen(false)}
        />
      </div>
    </>
  );
};

export default Home;
