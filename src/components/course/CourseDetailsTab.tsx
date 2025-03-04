
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Course } from '@/types/course';

interface CourseDetailsProps {
  course: Course;
}

const CourseDetailsTab: React.FC<CourseDetailsProps> = ({ course }) => {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Course Description</h2>
        <p className="text-muted-foreground">{course.description}</p>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
        <ul className="space-y-2 list-disc pl-5">
          {course.learningObjectives.map((objective, index) => (
            <li key={index} className="text-muted-foreground">{objective}</li>
          ))}
        </ul>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills & Proficiency</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
              <span className="font-medium">{skill.name}</span>
              <Badge 
                variant={
                  skill.proficiency === 'Advanced' ? 'default' : 
                  skill.proficiency === 'Intermediate' ? 'secondary' : 
                  'outline'
                }
              >
                {skill.proficiency}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Certificates</h2>
        <div className="space-y-2">
          {course.certificates.map((certificate, index) => (
            <div key={index} className="p-3 border rounded-md bg-primary/5">
              <span className="font-medium">{certificate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsTab;
