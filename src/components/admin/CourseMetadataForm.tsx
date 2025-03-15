
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDown, ImagePlus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Sample skill options
const skillOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Data Analysis", value: "data-analysis" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Leadership", value: "leadership" },
  { label: "Communication", value: "communication" },
  { label: "Project Management", value: "project-management" },
  { label: "Agile Methodology", value: "agile" },
  { label: "Cloud Computing", value: "cloud-computing" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "DevOps", value: "devops" },
];

// Academy options
const academyOptions = [
  { label: "Technical Academy", value: "technical" },
  { label: "Leadership Academy", value: "leadership" },
  { label: "Product Academy", value: "product" },
  { label: "Business Academy", value: "business" },
];

// Sub-academy options (simplified - would be dynamic based on academy)
const subAcademyOptions = {
  technical: [
    { label: "Software Development", value: "software-dev" },
    { label: "Data Science", value: "data-science" },
    { label: "Cloud & Infrastructure", value: "cloud" },
  ],
  leadership: [
    { label: "Leadership Essentials", value: "leadership-essentials" },
    { label: "Executive Leadership", value: "executive" },
    { label: "Team Management", value: "team-management" },
  ],
  product: [
    { label: "Product Management", value: "product-management" },
    { label: "UX/UI Design", value: "ux-ui" },
    { label: "Product Strategy", value: "product-strategy" },
  ],
  business: [
    { label: "Finance", value: "finance" },
    { label: "Marketing", value: "marketing" },
    { label: "Operations", value: "operations" },
  ],
};

// Feedback form options
const feedbackFormOptions = [
  { label: "Course Evaluation Form", value: "course-evaluation" },
  { label: "Instructor Feedback", value: "instructor-feedback" },
  { label: "Content Quality Survey", value: "content-quality" },
  { label: "Learning Outcomes Assessment", value: "learning-outcomes" },
];

// Form schema
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters."
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters."
  }),
  skills: z.array(z.string()).min(1, {
    message: "At least one skill must be selected."
  }),
  proficiencyLevel: z.string(),
  imageUrl: z.string().optional(),
  academy: z.string(),
  subAcademy: z.string(),
  feedbackForms: z.array(z.string()),
});

interface CourseMetadataFormProps {
  data: any;
  updateData: (data: any) => void;
}

const CourseMetadataForm: React.FC<CourseMetadataFormProps> = ({ data, updateData }) => {
  const [selectedAcademy, setSelectedAcademy] = useState<string>(data.academy || "");
  const [imagePreview, setImagePreview] = useState<string | null>(data.imageUrl || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title || "",
      description: data.description || "",
      skills: data.skills || [],
      proficiencyLevel: data.proficiencyLevel || "beginner",
      imageUrl: data.imageUrl || "",
      academy: data.academy || "",
      subAcademy: data.subAcademy || "",
      feedbackForms: data.feedbackForms || [],
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
  };
  
  const handleAcademyChange = (value: string) => {
    setSelectedAcademy(value);
    form.setValue("academy", value);
    // Reset sub-academy when academy changes
    form.setValue("subAcademy", "");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      form.setValue("imageUrl", imageUrl);
    }
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
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
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter a detailed description of the course" 
                      className="min-h-32 resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 px-2 py-1">
                        {skillOptions.find(s => s.value === skill)?.label || skill}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => {
                            field.onChange(field.value.filter(s => s !== skill));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          Add skills
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search skills..." />
                          <CommandEmpty>No skill found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {skillOptions.map((skill) => (
                              <CommandItem
                                key={skill.value}
                                onSelect={() => {
                                  const currentValue = field.value || [];
                                  if (!currentValue.includes(skill.value)) {
                                    field.onChange([...currentValue, skill.value]);
                                  }
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(skill.value) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {skill.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proficiencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Image</FormLabel>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/50">
                    {imagePreview ? (
                      <div className="relative w-full">
                        <img 
                          src={imagePreview} 
                          alt="Course preview" 
                          className="rounded-md max-h-48 mx-auto object-contain" 
                        />
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          className="mt-2 w-full"
                          onClick={() => {
                            setImagePreview(null);
                            field.onChange("");
                          }}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <>
                        <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => {
                            document.getElementById('image-upload')?.click();
                          }}
                        >
                          Select Image
                        </Button>
                      </>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="academy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academy</FormLabel>
                  <Select 
                    onValueChange={(value) => handleAcademyChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select academy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {academyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              name="subAcademy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Academy</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedAcademy}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedAcademy ? "Select sub-academy" : "Please select an academy first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedAcademy && subAcademyOptions[selectedAcademy as keyof typeof subAcademyOptions]?.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              name="feedbackForms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Forms</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((formId) => (
                      <Badge key={formId} variant="secondary" className="gap-1 px-2 py-1">
                        {feedbackFormOptions.find(f => f.value === formId)?.label || formId}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => {
                            field.onChange(field.value.filter(f => f !== formId));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          Add feedback forms
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search forms..." />
                          <CommandEmpty>No form found.</CommandEmpty>
                          <CommandGroup>
                            {feedbackFormOptions.map((form) => (
                              <CommandItem
                                key={form.value}
                                onSelect={() => {
                                  const currentValue = field.value || [];
                                  if (!currentValue.includes(form.value)) {
                                    field.onChange([...currentValue, form.value]);
                                  }
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(form.value) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {form.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CourseMetadataForm;
