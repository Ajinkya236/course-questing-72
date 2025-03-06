
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CheckIcon, X, Briefcase, Award, Book, Clock, Target, Plus } from 'lucide-react';

interface MentorProfileSetupProps {
  onComplete: () => void;
}

const MentorProfileSetup: React.FC<MentorProfileSetupProps> = ({ onComplete }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('expertise');
  
  const topics = [
    'Leadership', 'Technical Skills', 'Career Growth', 'Communication', 
    'Project Management', 'Work-Life Balance', 'Design', 'Marketing',
    'Product Management', 'Data Analysis', 'Team Management', 'Networking',
    'Public Speaking', 'Personal Branding', 'Industry Knowledge'
  ];
  
  const experienceLevels = ['1-3 years', '4-7 years', '8+ years', 'Expert'];
  
  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  return (
    <Card className="border shadow-lg animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle className="text-xl">Mentor Profile Setup</CardTitle>
        <CardDescription>
          Share your expertise to help others grow in their careers
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="expertise" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Expertise</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Availability</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="expertise" className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                <Book className="h-4 w-4 text-primary" />
                Expertise Areas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {topics.map((topic) => (
                  <div 
                    key={topic} 
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md cursor-pointer border",
                      selectedTopics.includes(topic) 
                        ? "border-primary bg-primary/5" 
                        : "border-input hover:border-primary/50"
                    )}
                    onClick={() => handleTopicToggle(topic)}
                  >
                    <div className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border",
                      selectedTopics.includes(topic) 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-primary"
                    )}>
                      {selectedTopics.includes(topic) && <CheckIcon className="h-3 w-3" />}
                    </div>
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-start">
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-3 w-3" />
                  Suggest a new topic
                </Button>
              </div>
              
              {selectedTopics.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-1">Selected topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTopics.map(topic => (
                      <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                        {topic}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTopicToggle(topic);
                          }} 
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-2">Experience Level</h3>
              <div className="space-y-2">
                {experienceLevels.map((level, index) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox id={`level-${index}`} />
                    <Label htmlFor={`level-${index}`}>{level}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={onComplete}>Cancel</Button>
              <Button onClick={() => setActiveTab('availability')}>Continue</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="availability" className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-2">Maximum Mentees</h3>
              <Input type="number" placeholder="3" min="1" max="10" defaultValue="3" />
              <p className="text-sm text-muted-foreground mt-1">
                We recommend starting with 1-3 mentees to ensure quality mentorship
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-2">Session Preferences</h3>
              <div className="space-y-4">
                <div>
                  <Label>Session Frequency</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekly" />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="biweekly" defaultChecked />
                      <Label htmlFor="biweekly">Bi-weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="asneeded" />
                      <Label htmlFor="asneeded">As needed</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Preferred Days</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox id={`day-${day.toLowerCase()}`} />
                        <Label htmlFor={`day-${day.toLowerCase()}`}>{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Preferred Session Duration</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['30 min', '45 min', '60 min'].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox id={`duration-${duration.replace(' ', '')}`} />
                        <Label htmlFor={`duration-${duration.replace(' ', '')}`}>{duration}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('expertise')}>Back</Button>
              <Button onClick={() => setActiveTab('experience')}>Continue</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-2">Bio</h3>
              <Textarea 
                placeholder="Share your professional background and mentoring philosophy..." 
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground mt-1">
                This will be visible to potential mentees
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-2">Mentoring Experience</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="formal-mentor" />
                  <Label htmlFor="formal-mentor">Formal mentor in a company program</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="informal-mentor" />
                  <Label htmlFor="informal-mentor">Informal mentor to colleagues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="first-time" />
                  <Label htmlFor="first-time">First time mentor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="external-mentor" />
                  <Label htmlFor="external-mentor">External mentoring experience</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('availability')}>Back</Button>
              <Button onClick={onComplete}>Complete Profile</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MentorProfileSetup;
