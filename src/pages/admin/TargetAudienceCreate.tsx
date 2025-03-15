
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { useCourseDataAPI } from '@/hooks/useCourseDataAPI';
import { CriteriaItem, TargetAudienceFormData, targetAudienceSchema } from './target-audience/types';
import AudienceDetailsForm from './target-audience/AudienceDetailsForm';
import CriteriaForm from './target-audience/CriteriaForm';
import CourseSelection from './target-audience/CourseSelection';

const TargetAudienceCreate: React.FC = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<CriteriaItem[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch courses for assignment
  const { courses, isLoading: coursesLoading } = useCourseDataAPI({ limit: 100 });

  const form = useForm<TargetAudienceFormData>({
    resolver: zodResolver(targetAudienceSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  });

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const onSubmit = async (data: TargetAudienceFormData) => {
    if (criteria.length === 0) {
      toast({
        title: "Criteria required",
        description: "Please add at least one criteria for the target audience.",
        variant: "destructive",
      });
      return;
    }

    if (selectedCourses.length === 0) {
      toast({
        title: "Courses required",
        description: "Please select at least one course to assign to this audience.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Target audience created",
        description: "The target audience has been successfully created.",
      });
      
      navigate('/admin/target-audience');
    } catch (error: any) {
      toast({
        title: "Error creating target audience",
        description: error.message || "Failed to create the target audience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Create Target Audience</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <AudienceDetailsForm form={form} />
          </Card>

          <Tabs defaultValue="criteria" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="criteria">Define Criteria</TabsTrigger>
              <TabsTrigger value="courses">Assign Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="criteria">
              <Card>
                <CardHeader>
                  <CardTitle>Define Target Audience Criteria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CriteriaForm 
                    criteria={criteria} 
                    setCriteria={setCriteria} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Assign Courses to Target Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <CourseSelection 
                    courses={courses}
                    isLoading={coursesLoading}
                    selectedCourses={selectedCourses}
                    toggleCourseSelection={toggleCourseSelection}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardFooter className="border-t p-4 flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Target Audience'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default TargetAudienceCreate;
