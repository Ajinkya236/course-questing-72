
import React from 'react';
import LearningProgress from '@/components/my-learning/LearningProgress';
import CourseFilters from '@/components/my-learning/CourseFilters';
import CoursesList from '@/components/my-learning/CoursesList';
import { useCoursesData } from '@/hooks/useCoursesData';

interface CoursesTabProps {
  teamMemberId?: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  const {
    activeFilter,
    setActiveFilter,
    completedPercentage,
    assignedCourses,
    inProgressCourses,
    completedCourses,
    filterCounts,
    getFilteredCourses,
    getFilterTitle
  } = useCoursesData(teamMemberId);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="space-y-8">
      {/* Learning Progress Section */}
      <LearningProgress
        assignedCount={assignedCourses.length}
        inProgressCount={inProgressCourses.length}
        completedCount={completedCourses.length}
        completedPercentage={completedPercentage}
      />

      {/* Course Filters */}
      <CourseFilters
        activeFilter={activeFilter}
        filterCounts={filterCounts}
        onFilterChange={handleFilterChange}
      />

      {/* Filtered Courses Display */}
      <CoursesList
        title={getFilterTitle()}
        courses={getFilteredCourses()}
        activeFilter={activeFilter}
        onViewAllClick={() => setActiveFilter('all')}
      />
    </div>
  );
};

export default CoursesTab;
