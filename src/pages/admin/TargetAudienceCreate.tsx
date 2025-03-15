
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { useCourseDataAPI } from '@/hooks/useCourseDataAPI';
import { Course } from '@/types/course';

// Define form schema
const targetAudienceSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// Types for criteria
type CriteriaItem = {
  id: string;
  type: 'jobRole' | 'employeeId' | 'joiningDate' | 'location';
  value: string;
  operator?: 'equals' | 'contains' | 'before' | 'after' | 'between';
};

const TargetAudienceCreate: React.FC = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<CriteriaItem[]>([]);
  const [criteriaType, setCriteriaType] = useState<CriteriaItem['type']>('jobRole');
  const [criteriaValue, setCriteriaValue] = useState('');
  const [criteriaOperator, setCriteriaOperator] = useState<CriteriaItem['operator']>('equals');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch courses for assignment
  const { courses, isLoading: coursesLoading } = useCourseDataAPI({ limit: 100 });

  const form = useForm<z.infer<typeof targetAudienceSchema>>({
    resolver: zodResolver(targetAudienceSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  });

  const addCriteria = () => {
    if (!criteriaValue.trim()) {
      toast({
        title: "Criteria value required",
        description: "Please enter a value for the criteria.",
        variant: "destructive",
      });
      return;
    }

    const newCriteria: CriteriaItem = {
      id: crypto.randomUUID(),
      type: criteriaType,
      value: criteriaValue,
      operator: criteriaOperator,
    };

    setCriteria([...criteria, newCriteria]);
    setCriteriaValue('');
  };

  const removeCriteria = (id: string) => {
    setCriteria(criteria.filter(item => item.id !== id));
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const getCriteriaTypeLabel = (type: CriteriaItem['type']) => {
    switch(type) {
      case 'jobRole': return 'Job Role';
      case 'employeeId': return 'Employee ID';
      case 'joiningDate': return 'Date of Joining';
      case 'location': return 'Location';
      default: return type;
    }
  };

  const getOperatorLabel = (operator?: CriteriaItem['operator']) => {
    if (!operator) return '';
    switch(operator) {
      case 'equals': return 'equals';
      case 'contains': return 'contains';
      case 'before': return 'before';
      case 'after': return 'after';
      case 'between': return 'between';
      default: return operator;
    }
  };

  const onSubmit = async (data: z.infer<typeof targetAudienceSchema>) => {
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
            <CardHeader>
              <CardTitle>Audience Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter audience name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter audience description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
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
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-3">
                        <Select
                          value={criteriaType}
                          onValueChange={(value: CriteriaItem['type']) => setCriteriaType(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Criteria Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jobRole">Job Role</SelectItem>
                            <SelectItem value="employeeId">Employee ID</SelectItem>
                            <SelectItem value="joiningDate">Date of Joining</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-3">
                        <Select
                          value={criteriaOperator}
                          onValueChange={(value: CriteriaItem['operator']) => setCriteriaOperator(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            {criteriaType === 'joiningDate' && (
                              <>
                                <SelectItem value="before">Before</SelectItem>
                                <SelectItem value="after">After</SelectItem>
                                <SelectItem value="between">Between</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-4">
                        <Input
                          placeholder="Enter value"
                          value={criteriaValue}
                          onChange={(e) => setCriteriaValue(e.target.value)}
                          type={criteriaType === 'joiningDate' ? 'date' : 'text'}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Button 
                          type="button" 
                          onClick={addCriteria} 
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  {criteria.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Operator</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-[50px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {criteria.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{getCriteriaTypeLabel(item.type)}</TableCell>
                              <TableCell>{getOperatorLabel(item.operator)}</TableCell>
                              <TableCell>{item.value}</TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeCriteria(item.id)}
                                  className="text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground border rounded-md">
                      No criteria defined yet. Add your first criteria above.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Assign Courses to Target Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  {coursesLoading ? (
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
