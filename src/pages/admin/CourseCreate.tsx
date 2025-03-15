
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PlusCircle, X, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define form schema
const courseFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  trainingCategory: z.string().optional(),
  level: z.string().optional(),
  imageUrl: z.string().url("Please provide a valid URL").optional(),
  videoUrl: z.string().url("Please provide a valid URL").optional(),
  isHot: z.boolean().default(false),
  isNew: z.boolean().default(false),
});

// Define module type
type ModuleType = {
  id: string;
  title: string;
  activities: ActivityType[];
};

// Define activity type
type ActivityType = {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'h5p';
  duration: string;
};

const CategoryOptions = [
  "Leadership & Management",
  "Technical Skills",
  "Data & Analytics",
  "Marketing & Digital",
  "Product Management",
  "Design & Innovation",
  "Soft Skills",
  "Project Management",
  "Compliance & Safety"
];

const LevelOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert"
];

const CourseCreate: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      trainingCategory: "",
      level: "",
      imageUrl: "",
      videoUrl: "",
      isHot: false,
      isNew: true,
    }
  });

  // Add a new module
  const addModule = () => {
    const newModule: ModuleType = {
      id: crypto.randomUUID(),
      title: `Module ${modules.length + 1}`,
      activities: []
    };
    setModules([...modules, newModule]);
  };

  // Remove a module
  const removeModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  // Update module title
  const updateModuleTitle = (moduleId: string, title: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, title } : module
    ));
  };

  // Add activity to module
  const addActivity = (moduleId: string) => {
    const newActivity: ActivityType = {
      id: crypto.randomUUID(),
      title: "New Activity",
      type: "video",
      duration: "5 min"
    };
    
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, activities: [...module.activities, newActivity] } 
        : module
    ));
  };

  // Remove activity from module
  const removeActivity = (moduleId: string, activityId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, activities: module.activities.filter(activity => activity.id !== activityId) } 
        : module
    ));
  };

  // Update activity
  const updateActivity = (moduleId: string, activityId: string, data: Partial<ActivityType>) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            activities: module.activities.map(activity => 
              activity.id === activityId ? { ...activity, ...data } : activity
            ) 
          } 
        : module
    ));
  };

  // Move module up
  const moveModuleUp = (index: number) => {
    if (index === 0) return;
    const newModules = [...modules];
    [newModules[index], newModules[index - 1]] = [newModules[index - 1], newModules[index]];
    setModules(newModules);
  };

  // Move module down
  const moveModuleDown = (index: number) => {
    if (index === modules.length - 1) return;
    const newModules = [...modules];
    [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
    setModules(newModules);
  };

  // Move activity up
  const moveActivityUp = (moduleId: string, index: number) => {
    if (index === 0) return;
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        const newActivities = [...module.activities];
        [newActivities[index], newActivities[index - 1]] = [newActivities[index - 1], newActivities[index]];
        return { ...module, activities: newActivities };
      }
      return module;
    }));
  };

  // Move activity down
  const moveActivityDown = (moduleId: string, index: number) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (index === modules[moduleIndex].activities.length - 1) return;
    
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        const newActivities = [...module.activities];
        [newActivities[index], newActivities[index + 1]] = [newActivities[index + 1], newActivities[index]];
        return { ...module, activities: newActivities };
      }
      return module;
    }));
  };

  const onSubmit = async (data: z.infer<typeof courseFormSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Create a course object
      const courseData = {
        ...data,
        modules: modules.map((module, moduleIndex) => ({
          ...module,
          activities: module.activities.map((activity, activityIndex) => ({
            ...activity,
            completed: false
          }))
        }))
      };
      
      // Send to Supabase
      const { data: response, error } = await supabase.functions.invoke('course-data', {
        body: { action: 'create', course: courseData }
      });
      
      if (error) throw error;
      
      toast({
        title: "Course created",
        description: "The course has been successfully created.",
      });
      
      navigate('/admin/courses');
    } catch (error: any) {
      toast({
        title: "Error creating course",
        description: error.message || "Failed to create the course. Please try again.",
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
        <h1 className="text-3xl font-bold">Create New Course</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
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
                        <Textarea 
                          placeholder="Enter course description" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CategoryOptions.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LevelOptions.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 hours 30 min" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the total duration of the course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Media & Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Media & Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL for the course thumbnail image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/video.mp4" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL for the course introduction video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainingCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Professional Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <FormField
                    control={form.control}
                    name="isHot"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4"
                          />
                        </FormControl>
                        <FormLabel className="m-0">Mark as Hot</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isNew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4"
                          />
                        </FormControl>
                        <FormLabel className="m-0">Mark as New</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Modules */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Modules & Activities</CardTitle>
              <Button type="button" onClick={addModule} variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Module
              </Button>
            </CardHeader>
            <CardContent>
              {modules.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-md">
                  <p className="text-muted-foreground mb-4">No modules added yet</p>
                  <Button type="button" onClick={addModule} variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Your First Module
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {modules.map((module, moduleIndex) => (
                    <Card key={module.id} className="border border-muted">
                      <CardHeader className="bg-muted/50 py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Input
                              value={module.title}
                              onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                              className="font-medium bg-transparent border-0 px-0 h-8 focus-visible:ring-transparent"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => moveModuleUp(moduleIndex)}
                              disabled={moduleIndex === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => moveModuleDown(moduleIndex)}
                              disabled={moduleIndex === modules.length - 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeModule(module.id)}
                              className="text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        {module.activities.length > 0 ? (
                          <div className="space-y-3">
                            {module.activities.map((activity, activityIndex) => (
                              <div key={activity.id} className="grid grid-cols-12 gap-2 items-center p-2 border rounded-md">
                                <div className="col-span-5">
                                  <Input
                                    value={activity.title}
                                    onChange={(e) => updateActivity(module.id, activity.id, { title: e.target.value })}
                                    placeholder="Activity title"
                                    className="h-8"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <Select
                                    value={activity.type}
                                    onValueChange={(value: 'video' | 'quiz' | 'h5p') => 
                                      updateActivity(module.id, activity.id, { type: value })
                                    }
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="quiz">Quiz</SelectItem>
                                      <SelectItem value="h5p">Interactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-2">
                                  <Input
                                    value={activity.duration}
                                    onChange={(e) => updateActivity(module.id, activity.id, { duration: e.target.value })}
                                    placeholder="Duration"
                                    className="h-8"
                                  />
                                </div>
                                <div className="col-span-2 flex justify-end gap-1">
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => moveActivityUp(module.id, activityIndex)}
                                    disabled={activityIndex === 0}
                                  >
                                    <ChevronUp className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => moveActivityDown(module.id, activityIndex)}
                                    disabled={activityIndex === module.activities.length - 1}
                                  >
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => removeActivity(module.id, activity.id)}
                                    className="text-destructive h-7 w-7"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            No activities in this module
                          </div>
                        )}
                        <Button 
                          type="button" 
                          onClick={() => addActivity(module.id)} 
                          variant="ghost" 
                          size="sm"
                          className="mt-3"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Activity
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Course'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CourseCreate;
