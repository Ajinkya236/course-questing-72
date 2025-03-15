
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { PlusCircle, Trash, Video, Link, FileUpload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoActivityFormProps {
  courseData: any;
  updateCourseData: (data: any) => void;
}

const VideoActivityForm: React.FC<VideoActivityFormProps> = ({ courseData, updateCourseData }) => {
  const [videoActivities, setVideoActivities] = useState(courseData.videoActivities || []);
  const [selectedModule, setSelectedModule] = useState("");
  const [activityType, setActivityType] = useState("video"); // video, external
  
  const handleAddVideoActivity = () => {
    if (!selectedModule) {
      toast({
        title: "Module selection required",
        description: "Please select a module to add a video activity to",
        variant: "destructive"
      });
      return;
    }
    
    const newVideoActivity = {
      id: `video-${Date.now()}`,
      moduleId: selectedModule,
      title: "New Video Activity",
      description: "Video description",
      type: activityType,
      url: "",
      duration: "00:00",
      transcript: "",
      required: true
    };
    
    const updatedVideoActivities = [...videoActivities, newVideoActivity];
    setVideoActivities(updatedVideoActivities);
    updateCourseData({ videoActivities: updatedVideoActivities });
    
    toast({
      title: "Video activity added",
      description: `A new ${activityType} activity has been added to the module`
    });
  };
  
  const handleDeleteVideoActivity = (id: string) => {
    const updatedVideoActivities = videoActivities.filter((activity: any) => activity.id !== id);
    setVideoActivities(updatedVideoActivities);
    updateCourseData({ videoActivities: updatedVideoActivities });
    
    toast({
      title: "Video activity deleted",
      description: "The video activity has been removed"
    });
  };
  
  const getModuleTitle = (moduleId: string) => {
    const module = courseData.modules.find((m: any) => m.id === moduleId);
    return module ? module.title : "Unknown Module";
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Video & External Activities</CardTitle>
          <CardDescription>
            Add video uploads or external content to modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="module-select">Select Module</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {courseData.modules && courseData.modules.length > 0 ? (
                    courseData.modules.map((module: any) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-modules" disabled>
                      No modules available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Activity Type</Label>
              <Tabs defaultValue="video" value={activityType} onValueChange={setActivityType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video">Video Upload</TabsTrigger>
                  <TabsTrigger value="external">External Link</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Button 
              onClick={handleAddVideoActivity}
              disabled={!selectedModule || courseData.modules.length === 0}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add {activityType === "video" ? "Video" : "External"} Activity
            </Button>

            {courseData.modules && courseData.modules.length === 0 && (
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm text-muted-foreground">
                  You need to add modules first before adding activities.
                </p>
              </div>
            )}
            
            {videoActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg">
                <Video className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No video activities added yet</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {videoActivities.map((activity: any, index: number) => (
                  <AccordionItem key={activity.id} value={activity.id}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="text-left">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Module: {getModuleTitle(activity.moduleId)} | Type: {activity.type === "video" ? "Video" : "External Link"}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`video-title-${index}`}>Activity Title</Label>
                            <Input
                              id={`video-title-${index}`}
                              defaultValue={activity.title}
                              onChange={(e) => {
                                const updatedActivities = [...videoActivities];
                                updatedActivities[index].title = e.target.value;
                                setVideoActivities(updatedActivities);
                                updateCourseData({ videoActivities: updatedActivities });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`video-duration-${index}`}>Duration (e.g., 05:30)</Label>
                            <Input
                              id={`video-duration-${index}`}
                              defaultValue={activity.duration}
                              onChange={(e) => {
                                const updatedActivities = [...videoActivities];
                                updatedActivities[index].duration = e.target.value;
                                setVideoActivities(updatedActivities);
                                updateCourseData({ videoActivities: updatedActivities });
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`video-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`video-desc-${index}`}
                            defaultValue={activity.description}
                            onChange={(e) => {
                              const updatedActivities = [...videoActivities];
                              updatedActivities[index].description = e.target.value;
                              setVideoActivities(updatedActivities);
                              updateCourseData({ videoActivities: updatedActivities });
                            }}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`video-url-${index}`}>
                            {activity.type === "video" ? "Video URL or Upload" : "External Link URL"}
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id={`video-url-${index}`}
                              placeholder={activity.type === "video" 
                                ? "Upload a video or enter a video URL" 
                                : "https://example.com/external-content"
                              }
                              defaultValue={activity.url}
                              onChange={(e) => {
                                const updatedActivities = [...videoActivities];
                                updatedActivities[index].url = e.target.value;
                                setVideoActivities(updatedActivities);
                                updateCourseData({ videoActivities: updatedActivities });
                              }}
                            />
                            {activity.type === "video" && (
                              <Button variant="outline" className="whitespace-nowrap">
                                <FileUpload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {activity.type === "video" && (
                          <div className="space-y-2">
                            <Label htmlFor={`video-transcript-${index}`}>Transcript (Optional)</Label>
                            <Textarea
                              id={`video-transcript-${index}`}
                              placeholder="Enter video transcript"
                              defaultValue={activity.transcript}
                              className="min-h-28"
                              onChange={(e) => {
                                const updatedActivities = [...videoActivities];
                                updatedActivities[index].transcript = e.target.value;
                                setVideoActivities(updatedActivities);
                                updateCourseData({ videoActivities: updatedActivities });
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="pt-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteVideoActivity(activity.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Activity
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoActivityForm;
