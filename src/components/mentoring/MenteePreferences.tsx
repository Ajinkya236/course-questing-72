
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Mock topics - in a real app this would come from the database
const availableTopics = [
  "Leadership", "Project Management", "Data Analysis", "AI & Machine Learning", 
  "Public Speaking", "UX Design", "Frontend Development", "Backend Development",
  "Career Growth", "Work-Life Balance", "Product Management", "Marketing",
  "Sales", "Customer Success", "Business Strategy", "Finance", "Operations",
  "Human Resources", "Communication", "Negotiation", "Critical Thinking",
  "Problem Solving", "Time Management", "Emotional Intelligence", "Networking",
  "Personal Branding", "Content Creation", "Writing", "Diversity & Inclusion",
  "Innovation", "Change Management", "Agile Methodologies", "DevOps",
  "Mobile Development", "Game Development", "Blockchain", "Cybersecurity",
  "Cloud Computing", "IoT", "Big Data", "Digital Marketing", "E-commerce",
  "Entrepreneurship", "Venture Capital", "Remote Work", "Team Building",
  "Conflict Resolution", "Mentoring", "Coaching", "Executive Presence"
];

interface MenteePreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: {
    topics: string[];
    objective: string;
    idealMentor: string;
    isSet?: boolean;
  };
  onSave: (preferences: any) => void;
}

const MenteePreferences = ({ 
  open, 
  onOpenChange, 
  initialValues, 
  onSave 
}: MenteePreferencesProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialValues.topics || []);
  const [objective, setObjective] = useState(initialValues.objective || '');
  const [idealMentor, setIdealMentor] = useState(initialValues.idealMentor || '');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTopics = availableTopics.filter(topic => 
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleTopicSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };
  
  const handleRemoveTopic = (topic: string) => {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
  };
  
  const handleSave = () => {
    onSave({
      topics: selectedTopics,
      objective,
      idealMentor
    });
  };
  
  const isFormValid = selectedTopics.length > 0 && objective.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mentee Preferences</DialogTitle>
          <DialogDescription>
            Set your preferences to help us match you with the right mentors.
            These preferences can be updated at any time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div>
            <Label htmlFor="topics" className="text-base font-medium mb-2 block">
              Topics of Interest (Select up to 3)
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              These topics will help us recommend mentors that match your interests.
            </p>
            
            {selectedTopics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTopics.map(topic => (
                  <Badge key={topic} className="px-2 py-1 flex items-center gap-1">
                    {topic}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveTopic(topic)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {filteredTopics.map(topic => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`topic-${topic}`}
                    checked={selectedTopics.includes(topic)}
                    onCheckedChange={() => handleTopicSelect(topic)}
                    disabled={selectedTopics.length >= 3 && !selectedTopics.includes(topic)}
                  />
                  <Label
                    htmlFor={`topic-${topic}`}
                    className={`text-sm ${selectedTopics.length >= 3 && !selectedTopics.includes(topic) ? 'text-muted-foreground' : ''}`}
                  >
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
            
            {selectedTopics.length === 3 && (
              <p className="text-sm text-warning mt-2">
                Maximum of 3 topics selected.
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="objective" className="text-base font-medium mb-2 block">
              Learning Objective
            </Label>
            <Textarea
              id="objective"
              placeholder="What do you hope to achieve through mentorship?"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="h-24"
            />
          </div>
          
          <div>
            <Label htmlFor="idealMentor" className="text-base font-medium mb-2 block">
              Ideal Mentor (Optional)
            </Label>
            <Textarea
              id="idealMentor"
              placeholder="Describe your ideal mentor. What qualities or experience are you looking for?"
              value={idealMentor}
              onChange={(e) => setIdealMentor(e.target.value)}
              className="h-24"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenteePreferences;
