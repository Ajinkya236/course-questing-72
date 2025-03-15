
import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Course } from '@/types/course';

interface CourseSelectionProps {
  courses: Course[];
  isLoading: boolean;
  selectedCourses: string[];
  toggleCourseSelection: (courseId: string) => void;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({
  courses,
  isLoading,
  selectedCourses,
  toggleCourseSelection,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search courses..."
            className="mb-4"
          />
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course: Course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={() => toggleCourseSelection(course.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-muted-foreground text-sm">
            {selectedCourses.length} courses selected
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No courses available for assignment.
        </div>
      )}
    </>
  );
};

export default CourseSelection;
