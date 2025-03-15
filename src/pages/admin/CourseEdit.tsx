
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useCourseDataAPI } from '@/hooks/useCourseDataAPI';

const CourseEdit: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { course, isLoading, error } = useCourseDataAPI({ courseId });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading course",
        description: "Failed to load course details. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Course</h1>
      </div>

      <Card className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">{course?.title || 'Course'}</h2>
        <p className="text-muted-foreground">
          The full course editor is under development. Please check back soon!
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/admin/courses')}>
            Return to Courses
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseEdit;
