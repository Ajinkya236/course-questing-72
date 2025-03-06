import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronRight, Bell, Gift, Award, Star, Zap, Target, Trophy, Flame, Target as TargetIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/CourseCarousel';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';
import LearningStreakDialog from '@/components/LearningStreakDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillsForRoleDialog from '@/components/SkillsForRoleDialog';

const mockCoursesData = {
  // ... keep existing mockCoursesData object
};

const roleSkills = [
  { id: 1, name: 'Project Management', proficiency: 65, target: 80 },
  { id: 2, name: 'Leadership', proficiency: 60, target: 75 },
  { id: 3, name: 'Strategic Thinking', proficiency: 45, target: 70 },
  { id: 4, name: 'Communication', proficiency: 85, target: 85 },
  { id: 5, name: 'Data Analysis', proficiency: 30, target: 60 },
];

const skillsYouFollow = [
  { id: 1, name: 'JavaScript', proficiency: 75 },
  { id: 2, name: 'Product Management', proficiency: 60 },
  { id: 3, name: 'UI/UX Design', proficiency: 45 },
  { id: 4, name: 'DevOps', proficiency: 30 },
  { id: 5, name: 'Cloud Architecture', proficiency: 50 },
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

  const handleViewLearningGoals = () => {
    navigate('/my-learning', { state: { activeTab: 'goals' } });
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
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={handleViewLearningGoals}
                >
                  View Learning Goals
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
                    <div className="space-y-4">
                      {skillsYouFollow.map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-2">
                        View All Skills You Follow
                      </Button>
                    </div>
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
                        <TargetIcon className="h-4 w-4" />
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
                        <TargetIcon className="h-5 w-5 text-purple-500" />
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
            title="Popular with Similar Learners" 
            courses={mockCoursesData.similarUsers} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Popular with Similar Learners')}
          />
          
          <CourseCarousel 
            title="Trending Now" 
            courses={mockCoursesData.trendingCourses} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Trending Now')}
          />
          
          <CourseCarousel 
            title="New Courses" 
            courses={mockCoursesData.newCourses} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('New Courses')}
          />
        </section>
      </div>
      
      <MysteryBoxDialog open={isMysteryBoxOpen} onOpenChange={setIsMysteryBoxOpen} />
      <SpinTheWheelDialog open={isSpinWheelOpen} onOpenChange={setIsSpinWheelOpen} />
      <LearningStreakDialog open={isStreakDialogOpen} onOpenChange={setIsStreakDialogOpen} />
      <SkillsForRoleDialog 
        open={isSkillsForRoleOpen} 
        onOpenChange={setIsSkillsForRoleOpen} 
        skills={roleSkills}
      />
    </>
  );
};

export default Home;
