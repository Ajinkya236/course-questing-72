
import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Calendar, 
  Award, 
  Target, 
  User
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CourseDetailTabProps {
  course: any;
}

const CourseDetailTab = ({ course }: CourseDetailTabProps) => {
  // Mock data for learning objectives and skills
  const learningObjectives = [
    "Understand key leadership principles and how to apply them in your role",
    "Develop effective communication strategies for team management",
    "Learn how to motivate teams and drive performance",
    "Build conflict resolution skills for challenging situations",
    "Create and implement strategic vision for your department"
  ];
  
  const skills = [
    { name: "Leadership", proficiency: 80 },
    { name: "Team Management", proficiency: 70 },
    { name: "Strategic Planning", proficiency: 60 },
    { name: "Conflict Resolution", proficiency: 75 },
    { name: "Change Management", proficiency: 65 }
  ];
  
  return (
    <div className="space-y-8">
      {/* Course Overview */}
      <div>
        <h3 className="text-xl font-bold mb-4">Course Overview</h3>
        <p className="text-muted-foreground mb-6">
          {course.description || "This comprehensive leadership course is designed for new and aspiring managers who want to develop essential leadership skills. Through practical examples, case studies, and interactive exercises, you'll learn how to lead teams effectively, communicate with clarity, and drive organizational success."}
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg">
            <Clock className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">{course.duration}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg">
            <Star className="h-6 w-6 text-yellow-500 mb-2" />
            <span className="text-sm font-medium">{course.rating} / 5.0</span>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">12 Activities</span>
            <span className="text-xs text-muted-foreground">Content</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg">
            <Calendar className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm font-medium">Updated</span>
            <span className="text-xs text-muted-foreground">June 2023</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Learning Objectives */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Learning Objectives</h3>
        </div>
        
        <ul className="space-y-2">
          {learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-xs font-medium">
                {index + 1}
              </div>
              <p>{objective}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <Separator />
      
      {/* Skills and Proficiency */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Skills You'll Gain</h3>
        </div>
        
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.proficiency}% Proficiency</span>
              </div>
              <Progress value={skill.proficiency} className="h-2" />
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Certificate Info */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Certificate</h3>
        </div>
        
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h4 className="font-bold text-lg mb-2">Leadership Excellence Certificate</h4>
          <p className="text-muted-foreground mb-4">
            Complete all course modules to earn a verified certificate that you can share with your network.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="bg-white/50">Shareable</Badge>
            <Badge variant="outline" className="bg-white/50">Verified</Badge>
            <Badge variant="outline" className="bg-white/50">Accredited</Badge>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Instructor Info */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Instructor</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Dr. Rajiv Kumar</h4>
            <p className="text-sm text-muted-foreground">Leadership Development Expert, 15+ years experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailTab;
