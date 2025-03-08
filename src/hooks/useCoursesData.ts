
import { useState } from 'react';
import { mockCourses } from '@/data/mockCoursesData';
import { Course } from '@/types/course';

// The shared with me courses mock data
const sharedWithMeCourses: Course[] = [
  {
    id: "shared-001",
    title: "Business Strategy Masterclass",
    description: "Learn key business strategy concepts from industry experts.",
    imageUrl: "https://source.unsplash.com/random/300x200?business",
    category: "Business",
    duration: "4h 30m",
    rating: 4.7,
    isBookmarked: false,
    trainingCategory: "Strategy",
    status: 'assigned',
    sharedBy: "Alex Thompson (Manager)",
    previewUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  },
  {
    id: "shared-002",
    title: "Cybersecurity Fundamentals",
    description: "Essential cybersecurity concepts every professional should know.",
    imageUrl: "https://source.unsplash.com/random/300x200?security",
    category: "Technology",
    duration: "5h 15m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Technical",
    status: 'assigned',
    sharedBy: "Ryan Miller (Team Lead)",
    previewUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  }
];

export const useCoursesData = (teamMemberId?: string) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter courses based on status
  const assignedCourses = mockCourses.filter(course => 
    course.status === 'assigned'
  );
  
  const completedCourses = mockCourses.filter(course => 
    course.status === 'completed'
  );
  
  const inProgressCourses = mockCourses.filter(course => 
    course.status === 'in-progress'
  );
  
  // Saved courses
  const savedCourses = mockCourses.filter(course => 
    course.isBookmarked === true
  );
  
  // Calculate overall learning progress
  const totalCourses = assignedCourses.length + completedCourses.length + inProgressCourses.length;
  const completedPercentage = Math.round((completedCourses.length / (totalCourses || 1)) * 100);

  // Get courses based on active filter
  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'assigned':
        return assignedCourses;
      case 'in-progress':
        return inProgressCourses;
      case 'completed':
        return completedCourses;
      case 'saved':
        return savedCourses;
      case 'shared':
        return sharedWithMeCourses;
      default:
        return [...inProgressCourses, ...assignedCourses, ...completedCourses];
    }
  };

  // Generate filter counts
  const filterCounts = {
    all: totalCourses,
    assigned: assignedCourses.length,
    'in-progress': inProgressCourses.length,
    completed: completedCourses.length,
    saved: savedCourses.length,
    shared: sharedWithMeCourses.length
  };
  
  // Get title based on active filter
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'all':
        return 'All Courses';
      case 'in-progress':
        return 'In Progress Courses';
      case 'assigned':
        return 'Not Started Courses';
      case 'completed':
        return 'Completed Courses';
      case 'saved':
        return 'Saved Courses';
      case 'shared':
        return 'Courses Shared with Me';
      default:
        return 'All Courses';
    }
  };

  return {
    activeFilter,
    setActiveFilter,
    assignedCourses,
    completedCourses,
    inProgressCourses,
    savedCourses,
    sharedWithMeCourses,
    totalCourses,
    completedPercentage,
    getFilteredCourses,
    filterCounts,
    getFilterTitle
  };
};
