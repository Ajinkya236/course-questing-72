import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { coursesList } from '@/data/mockData';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BookOpen, GraduationCap, Users, Book } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  
  // Prepare courses with the necessary properties for CourseCard
  const preparedCourses = React.useMemo(() => {
    return coursesList.map(course => ({
      ...course,
      // Add required fields for CourseCard
      category: course.level || 'General',
      rating: 4 + Math.random(),
      instructor: course.author,
      thumbnail: course.imageUrl,
      type: 'Course',
      source: 'Internal',
      trainingCategory: ['Ready for Role', 'Mandatory', 'Leadership', 'Technical'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  // Filter courses based on the search query
  const filteredCourses = React.useMemo(() => {
    if (!query) return [];
    
    return preparedCourses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase()) ||
      course.level.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, preparedCourses]);

  // Additional mock results for other tabs
  const courses = filteredCourses;
  const skills = [
    { id: 'skill1', name: 'React Development', popularity: 'High', courses: 24 },
    { id: 'skill2', name: 'Leadership', popularity: 'Medium', courses: 15 },
    { id: 'skill3', name: 'Data Analysis', popularity: 'High', courses: 32 },
  ].filter(skill => skill.name.toLowerCase().includes(query.toLowerCase()));
  
  const mentors = [
    { id: 'mentor1', name: 'Jennifer Thompson', expertise: 'Frontend Development', rating: 4.9 },
    { id: 'mentor2', name: 'Michael Clarke', expertise: 'Project Management', rating: 4.7 },
    { id: 'mentor3', name: 'Sarah Wilson', expertise: 'Data Science', rating: 4.8 },
  ].filter(mentor => 
    mentor.name.toLowerCase().includes(query.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(query.toLowerCase())
  );
  
  const resources = [
    { id: 'resource1', title: 'React Best Practices Guide', type: 'PDF', downloads: 1243 },
    { id: 'resource2', title: 'Project Management Templates', type: 'ZIP', downloads: 987 },
    { id: 'resource3', title: 'Data Visualization Cheatsheet', type: 'PDF', downloads: 1578 },
  ].filter(resource => resource.title.toLowerCase().includes(query.toLowerCase()));

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>Search Results: {query} | Learning Management System</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
        <p className="text-muted-foreground mt-1">
          Showing results for: "<span className="font-medium">{query}</span>"
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="all" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            All ({courses.length + skills.length + mentors.length + resources.length})
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center">
            <Book className="mr-2 h-4 w-4" />
            Courses ({courses.length})
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Skills ({skills.length})
          </TabsTrigger>
          <TabsTrigger value="mentors" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Mentors ({mentors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {courses.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Courses</h2>
                {courses.length > 4 && (
                  <Button variant="ghost" onClick={() => setActiveTab('courses')}>
                    View all courses
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.slice(0, 4).map((course) => (
                  <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                    <CourseCard 
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      thumbnail={course.imageUrl}
                      duration={course.duration}
                      instructor={course.author}
                      level={course.level}
                      category={course.category}
                      progress={course.progress || 0}
                      rating={course.rating || 4.5}
                      isAssigned={false}
                      isCompleted={course.progress === 100}
                      source="Internal"
                      type="Course"
                      trainingCategory={course.trainingCategory}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                {skills.length > 4 && (
                  <Button variant="ghost" onClick={() => setActiveTab('skills')}>
                    View all skills
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.id} className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Popularity: {skill.popularity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Courses: {skill.courses}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mentors.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Mentors</h2>
                {mentors.length > 4 && (
                  <Button variant="ghost" onClick={() => setActiveTab('mentors')}>
                    View all mentors
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mentors.slice(0, 4).map((mentor) => (
                  <div key={mentor.id} className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="text-lg font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Expertise: {mentor.expertise}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rating: {mentor.rating}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resources.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Resources</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {resources.slice(0, 4).map((resource) => (
                  <div key={resource.id} className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Type: {resource.type}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Downloads: {resource.downloads}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="courses">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                  <CourseCard 
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    thumbnail={course.imageUrl}
                    duration={course.duration}
                    instructor={course.author}
                    level={course.level}
                    category={course.category}
                    progress={course.progress || 0}
                    rating={course.rating || 4.5}
                    isAssigned={false}
                    isCompleted={course.progress === 100}
                    source="Internal"
                    type="Course"
                    trainingCategory={course.trainingCategory}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses match your search query. Try different keywords.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="skills">
          {skills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div key={skill.id} className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Popularity: {skill.popularity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Courses: {skill.courses}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No skills match your search query. Try different keywords.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="mentors">
          {mentors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="text-lg font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expertise: {mentor.expertise}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Rating: {mentor.rating}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No mentors match your search query. Try different keywords.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;
