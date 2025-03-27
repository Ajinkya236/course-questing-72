
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types/course';
import { Plus, GraduationCap, Flame, Calendar, Trophy } from 'lucide-react';

interface LearningGoalsTabProps {
  teamMemberId?: string;
}

// Sample course data for the goals
const sampleCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Leadership Essentials',
    description: 'Learn key leadership skills for modern managers',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    duration: '3 hours',
    instructor: 'John Smith',
    level: 'Intermediate',
    category: 'Leadership',
    progress: 75,
    rating: 4.8,
    source: 'Internal',
    type: 'Course'
  },
  {
    id: 'course-2',
    title: 'Data Analysis Fundamentals',
    description: 'Master the basics of data analysis using Excel and SQL',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    duration: '5 hours',
    instructor: 'Sarah Johnson',
    level: 'Beginner',
    category: 'Data Science',
    progress: 40,
    rating: 4.5,
    source: 'Coursera',
    type: 'Course'
  },
  {
    id: 'course-3',
    title: 'Project Management Professional',
    description: 'Prepare for the PMP certification with this comprehensive course',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    duration: '10 hours',
    instructor: 'Michael Brown',
    level: 'Advanced',
    category: 'Project Management',
    progress: 20,
    rating: 4.9,
    source: 'LinkedIn',
    type: 'Course'
  }
];

const LearningGoalsTab: React.FC<LearningGoalsTabProps> = ({ teamMemberId }) => {
  const [activeTab, setActiveTab] = useState('current');
  
  // Sample learning goals with attached courses
  const learningGoals = [
    {
      id: 'goal-1',
      title: 'Leadership Development',
      description: 'Improve leadership and management skills to lead cross-functional teams effectively',
      targetDate: '2023-12-31',
      progress: 65,
      courses: sampleCourses.slice(0, 1).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
      })),
    },
    {
      id: 'goal-2',
      title: 'Data Analysis Proficiency',
      description: 'Develop skills in data analysis using industry standard tools',
      targetDate: '2023-11-15',
      progress: 40,
      courses: sampleCourses.slice(1, 2).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
      })),
    },
    {
      id: 'goal-3',
      title: 'Project Management',
      description: 'Master project management methodologies to deliver projects on time and within budget',
      targetDate: '2024-01-15',
      progress: 20,
      courses: sampleCourses.slice(2).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
      })),
    },
  ];
  
  // Past learning goals
  const pastGoals = [
    {
      id: 'past-goal-1',
      title: 'Communication Skills',
      description: 'Enhance presentation and communication skills for internal and client meetings',
      completedDate: '2023-08-15',
      progress: 100,
      courses: sampleCourses.map(course => ({
        ...course,
        title: 'Communication Skills ' + course.title,
        progress: 100,
        isCompleted: true,
      })),
    },
    {
      id: 'past-goal-2',
      title: 'Marketing Fundamentals',
      description: 'Learn digital marketing concepts and implementation strategies',
      completedDate: '2023-07-01',
      progress: 100,
      courses: sampleCourses.map(course => ({
        ...course,
        title: 'Marketing Fundamentals: ' + course.title,
        progress: 100,
        isCompleted: true,
      })),
    },
  ];
  
  // Achievements based on completed goals
  const achievements = [
    {
      id: 'achievement-1',
      title: 'Communication Master',
      description: 'Completed all courses in the Communication Skills learning path',
      date: '2023-08-15',
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
    },
    {
      id: 'achievement-2',
      title: 'Marketing Guru',
      description: 'Completed the Marketing Fundamentals curriculum with distinction',
      date: '2023-07-01',
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
    },
  ];
  
  // Render a single learning goal card
  const renderGoalCard = (goal: any, showCompletedDate: boolean = false) => (
    <Card key={goal.id} className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{goal.title}</CardTitle>
            <CardDescription>{goal.description}</CardDescription>
          </div>
          {!showCompletedDate && (
            <Button variant="outline" size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Add Courses
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Progress: {goal.progress}%
            </span>
            <span className="text-sm text-muted-foreground">
              {showCompletedDate 
                ? `Completed: ${new Date(goal.completedDate).toLocaleDateString()}`
                : `Target: ${new Date(goal.targetDate).toLocaleDateString()}`
              }
            </span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Courses in this Goal:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goal.courses.map((course: Course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                thumbnail={course.imageUrl || course.thumbnail}
                duration={course.duration}
                instructor={typeof course.instructor === 'string' ? course.instructor : course.instructor?.name}
                level={course.level}
                category={course.category}
                progress={course.progress || 0}
                rating={course.rating}
                isAssigned={course.isAssigned || false}
                isCompleted={course.isCompleted || false}
                source={course.source || 'Internal'}
                type={course.type || 'Course'}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  // Render an achievement card
  const renderAchievementCard = (achievement: any) => (
    <Card key={achievement.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            {achievement.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{achievement.title}</h3>
            <p className="text-muted-foreground text-sm">{achievement.description}</p>
            <p className="text-xs mt-1">Achieved on {new Date(achievement.date).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Learning Goals</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Goal
        </Button>
      </div>
      
      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="current" className="flex gap-1 items-center">
            <Flame className="h-4 w-4" /> Current Goals
          </TabsTrigger>
          <TabsTrigger value="past" className="flex gap-1 items-center">
            <Calendar className="h-4 w-4" /> Past Goals
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex gap-1 items-center">
            <GraduationCap className="h-4 w-4" /> Achievements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          {learningGoals.map(goal => renderGoalCard(goal))}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastGoals.map(goal => renderGoalCard(goal, true))}
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          {achievements.map(achievement => renderAchievementCard(achievement))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningGoalsTab;
