
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CheckIcon, Calendar as CalendarIcon, X, CheckCircle, Clock, Target } from 'lucide-react';

interface MenteePreferencesProps {
  onClose: () => void;
}

const MenteePreferences: React.FC<MenteePreferencesProps> = ({ onClose }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  
  const topics = [
    'Leadership', 'Technical Skills', 'Career Growth', 'Communication', 
    'Project Management', 'Work-Life Balance', 'Design', 'Marketing',
    'Product Management', 'Data Analysis', 'Team Management', 'Networking',
    'Public Speaking', 'Personal Branding', 'Industry Knowledge'
  ];
  
  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };
  
  return (
    <Card className="border shadow-lg animate-in fade-in duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Mentee Preferences</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Setting your preferences helps us match you with the right mentors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Topics of Interest
            <Badge variant="outline" className="ml-2 text-xs">
              Select up to 3
            </Badge>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-2">
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
          {selectedTopics.length > 0 && (
            <div className="mt-2">
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
          <h3 className="text-base font-medium mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Availability
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="frequency">Preferred session frequency</Label>
              <RadioGroup defaultValue="biweekly" id="frequency" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="biweekly" id="biweekly" />
                  <Label htmlFor="biweekly">Bi-weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="days">Preferred days</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day.toLowerCase()} />
                    <Label htmlFor={day.toLowerCase()}>{day}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Earliest start date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-2",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            Mentorship Goals
          </h3>
          <Textarea 
            placeholder="Describe what you'd like to achieve through mentorship..." 
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default MenteePreferences;
