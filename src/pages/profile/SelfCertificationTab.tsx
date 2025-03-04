
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Calendar
} from 'lucide-react';

const SelfCertificationTab = () => {
  // Mock data for certification paths
  const certificationPaths = [
    {
      id: "cert-1",
      title: "Product Management Excellence",
      description: "Master the core skills needed for effective product management",
      progress: 75,
      coursesTotal: 8,
      coursesCompleted: 6,
      dueDate: "October 15, 2023",
      isOverdue: false,
      skills: ["Strategy", "UX", "Data Analysis", "Roadmapping"]
    },
    {
      id: "cert-2",
      title: "Leadership Development",
      description: "Essential leadership skills for managers and team leads",
      progress: 40,
      coursesTotal: 5,
      coursesCompleted: 2,
      dueDate: "December 30, 2023",
      isOverdue: false,
      skills: ["Coaching", "Decision Making", "Communication", "Team Building"]
    },
    {
      id: "cert-3",
      title: "Digital Transformation",
      description: "Understanding and implementing digital transformation initiatives",
      progress: 20,
      coursesTotal: 6,
      coursesCompleted: 1,
      dueDate: "August 10, 2023",
      isOverdue: true,
      skills: ["Change Management", "Agile", "Tech Strategy", "Innovation"]
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Self-Certification Progress</h2>
        <Button variant="outline" size="sm">
          View All Certifications
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {certificationPaths.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <div className={`h-1 ${
              cert.progress >= 100 
                ? 'bg-green-500' 
                : cert.isOverdue 
                  ? 'bg-red-500' 
                  : 'bg-primary'
            }`}></div>
            
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Certificate info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{cert.title}</h3>
                      <p className="text-muted-foreground">{cert.description}</p>
                    </div>
                    
                    {cert.isOverdue ? (
                      <Badge variant="destructive" className="w-fit">Overdue</Badge>
                    ) : cert.progress >= 100 ? (
                      <Badge variant="default" className="bg-green-500 w-fit">Completed</Badge>
                    ) : (
                      <Badge variant="outline" className="w-fit">In Progress</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completion Progress</span>
                      <span className="text-sm">{cert.progress}%</span>
                    </div>
                    <Progress 
                      value={cert.progress} 
                      className={`h-2 ${
                        cert.isOverdue ? 'bg-red-100' : ''
                      }`} 
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-secondary/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>
                        {cert.coursesCompleted}/{cert.coursesTotal} Courses Completed
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className={cert.isOverdue ? "text-red-500" : ""}>
                        Due: {cert.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex md:flex-col justify-between gap-2 md:border-l md:pl-6">
                  <Button className="flex-1">
                    Continue <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  
                  {cert.progress >= 100 && (
                    <Button variant="outline" className="flex-1">
                      <Award className="h-4 w-4 mr-2" /> View Certificate
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelfCertificationTab;
