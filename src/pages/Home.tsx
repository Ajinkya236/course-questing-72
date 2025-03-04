
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronRight, Bell, Gift, Award, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/CourseCarousel';
import FollowSkillsDialog from '@/components/FollowSkillsDialog';

// Import mock data
import { coursesList } from '@/data/mockData';

const Home = () => {
  const navigate = useNavigate();
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <Helmet>
        <title>Home | Jio Learning</title>
      </Helmet>
      <div className="container py-8 space-y-12 mb-20">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/90 to-primary/70 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl md:text-4xl font-heading text-white">
                Unlock Your Potential with Personalized Learning
              </h1>
              <p className="text-white/90">
                Discover tailored courses based on your role, interests, and learning history. 
                Earn points and badges as you progress through your learning journey.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="gap-2 font-heading">
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

        {/* Widgets Row Section - Actionables, My Rewards, and Skills You Follow */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Actionables Widget */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-heading">Actionables</h3>
                </div>
                <Button variant="link" className="gap-1 text-primary text-sm p-0">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10">
                  <div>
                    <p className="font-medium">Complete Leadership Course</p>
                    <p className="text-sm text-muted-foreground">3 days remaining</p>
                  </div>
                  <Button size="sm">Resume</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10">
                  <div>
                    <p className="font-medium">Rate Marketing Strategy Course</p>
                    <p className="text-sm text-muted-foreground">Feedback requested</p>
                  </div>
                  <Button size="sm" variant="outline">Rate</Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* My Rewards Widget */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-heading">My Rewards</h3>
                </div>
                <Button variant="link" className="gap-1 text-primary text-sm p-0" onClick={() => navigate('/my-learning?tab=rewards')}>
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/10">
                  <Award className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="text-xl font-bold">2,450</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/10">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Badges</p>
                    <p className="text-xl font-bold">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills You Follow Widget */}
          <FollowSkillsDialog />
        </section>

        {/* Course Carousels */}
        <section className="space-y-12">
          {/* Continue Learning Section */}
          <CourseCarousel 
            title="Continue Learning" 
            courses={coursesList.slice(0, 5)} 
            onCourseClick={handleCourseClick}
            viewAllLink="/my-learning"
          />
          
          {/* Top Picks Section */}
          <CourseCarousel 
            title="Top Picks for You" 
            courses={coursesList.slice(5, 10)} 
            onCourseClick={handleCourseClick}
          />
          
          {/* Role-based Skills with Skill Filters */}
          <CourseCarousel 
            title="Role-based Skills" 
            courses={coursesList.slice(10, 15)} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
          />
          
          {/* Based on Your Interests with Skill Filters */}
          <CourseCarousel 
            title="Based on Your Interests" 
            courses={coursesList.slice(15, 20)} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
          />
          
          {/* Popular with Similar Learners */}
          <CourseCarousel 
            title="Popular with Similar Learners" 
            courses={coursesList.slice(20, 25)} 
            onCourseClick={handleCourseClick}
          />
        </section>
      </div>
    </>
  );
};

export default Home;
