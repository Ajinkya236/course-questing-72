
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Course } from '@/types/course';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface CourseDetailsProps {
  course: Course;
  userName?: string;
  isCompleted?: boolean;
}

const CourseDetailsTab: React.FC<CourseDetailsProps> = ({ 
  course, 
  userName = "Your Name", 
  isCompleted = false 
}) => {
  const [previewCertificate, setPreviewCertificate] = useState<string | null>(null);

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
            <div 
              key={index} 
              className="p-4 border rounded-md bg-primary/5 flex justify-between items-center cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreviewCertificate(certificate)}
            >
              <span className="font-medium">{certificate}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" /> Preview
                </Button>
                {isCompleted && (
                  <Button size="sm" variant="default">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Dialog */}
      <Dialog open={previewCertificate !== null} onOpenChange={() => setPreviewCertificate(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{previewCertificate}</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-lg bg-white">
            <div className="certificate-template p-8 border-8 border-double border-primary/20 text-center relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] opacity-5 pointer-events-none"></div>
              
              <h1 className="text-3xl font-bold text-primary mb-6">CERTIFICATE OF COMPLETION</h1>
              
              <p className="text-lg mb-4">This is to certify that</p>
              
              <h2 className="text-2xl font-semibold mb-4">
                {isCompleted ? userName : "[Your Name Here]"}
              </h2>
              
              <p className="text-lg mb-4">has successfully completed the course</p>
              
              <h3 className="text-xl font-bold mb-8">{course.title}</h3>
              
              <div className="mt-12 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm">{new Date().toLocaleDateString()}</p>
                  <p className="text-sm">Date</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">John Doe</p>
                  <p className="text-sm">Instructor</p>
                </div>
              </div>
              
              {!isCompleted && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="bg-white p-4 rounded-md shadow-lg">
                    <p className="text-lg font-semibold text-primary">
                      Complete the course to earn this certificate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPreviewCertificate(null)}>Close</Button>
            {isCompleted && <Button variant="default"><Download className="mr-2 h-4 w-4" /> Download</Button>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetailsTab;
