
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { UserCog, Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const topics = [
  "Leadership", "Project Management", "Public Speaking", "Data Analysis", 
  "Machine Learning", "UX Design", "Software Development", "Marketing",
  "Sales", "Customer Service", "Financial Planning", "Career Development",
  "Networking", "Negotiation", "Time Management", "Product Management",
  "Business Strategy", "Communication", "Team Building", "Problem Solving",
  "Critical Thinking", "Decision Making", "Innovation", "Coaching",
  "Mentoring", "Content Creation", "Social Media", "E-commerce",
  "Mobile Development", "Web Development", "DevOps", "Cloud Computing",
  "Cybersecurity", "Blockchain", "Artificial Intelligence", "AR/VR",
  "Digital Marketing", "SEO", "Email Marketing", "Content Marketing",
  "Brand Management", "Customer Experience", "User Research", "Prototyping",
  "Visual Design", "Interaction Design", "Frontend Development", "Backend Development",
  "Full Stack Development", "Quality Assurance", "Agile Methodologies", "Scrum"
];

interface MenteePreferencesProps {
  inDialog?: boolean;
  onSave?: (selectedTopics: string[]) => void;
}

const MenteePreferences: React.FC<MenteePreferencesProps> = ({ inDialog = false, onSave }) => {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [learningObjective, setLearningObjective] = useState('');
  const [idealMentor, setIdealMentor] = useState('');
  const [openTopicDialog, setOpenTopicDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const savedTopics = localStorage.getItem('menteeSelectedTopics');
    const savedLearningObjective = localStorage.getItem('menteeLearningObjective');
    const savedIdealMentor = localStorage.getItem('menteeIdealMentor');
    
    if (savedTopics) {
      setSelectedTopics(JSON.parse(savedTopics));
    }
    if (savedLearningObjective) {
      setLearningObjective(savedLearningObjective);
    }
    if (savedIdealMentor) {
      setIdealMentor(savedIdealMentor);
    }
  }, []);

  const handleTopicSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else if (selectedTopics.length < 3) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      toast({
        title: "Maximum topics reached",
        description: "You can select up to 3 topics of interest",
        variant: "destructive"
      });
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
  };

  const handleSavePreferences = () => {
    // Save to localStorage
    localStorage.setItem('menteeSelectedTopics', JSON.stringify(selectedTopics));
    localStorage.setItem('menteeLearningObjective', learningObjective);
    localStorage.setItem('menteeIdealMentor', idealMentor);
    localStorage.setItem('menteePreferencesSet', 'true');
    
    toast({
      title: "Preferences Saved",
      description: "Your mentoring preferences have been updated successfully.",
    });
    
    if (onSave) {
      onSave(selectedTopics);
    }
  };

  const filteredTopics = topics.filter(topic => 
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Topics of Interest (up to 3)</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTopics.map(topic => (
            <Badge key={topic} variant="secondary" className="px-3 py-1">
              {topic}
              <button 
                onClick={() => handleRemoveTopic(topic)} 
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {selectedTopics.length < 3 && (
            <Dialog open={openTopicDialog} onOpenChange={setOpenTopicDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 h-8">
                  <Plus className="h-3.5 w-3.5" />
                  Add Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Topics of Interest</DialogTitle>
                  <DialogDescription>
                    Choose up to 3 topics you'd like to be mentored in
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <Input
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                  />
                  
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {filteredTopics.map(topic => (
                        <div 
                          key={topic} 
                          className={`p-2 rounded-md cursor-pointer text-sm border ${
                            selectedTopics.includes(topic) 
                            ? 'bg-primary/10 border-primary' 
                            : 'hover:bg-accent border-transparent'
                          }`}
                          onClick={() => handleTopicSelect(topic)}
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button onClick={() => setOpenTopicDialog(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {selectedTopics.length === 0 && (
          <p className="text-sm text-muted-foreground">No topics selected yet</p>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Learning Objective</h3>
        <Textarea 
          placeholder="What do you hope to achieve through mentoring?"
          value={learningObjective}
          onChange={(e) => setLearningObjective(e.target.value)}
          className="resize-none"
          rows={4}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Ideal Mentor</h3>
        <Textarea 
          placeholder="Describe your ideal mentor and what you expect from them"
          value={idealMentor}
          onChange={(e) => setIdealMentor(e.target.value)}
          className="resize-none"
          rows={4}
        />
      </div>
      
      <Button onClick={handleSavePreferences} className="gap-2">
        <Save className="h-4 w-4" />
        Save Preferences
      </Button>
    </div>
  );

  if (inDialog) {
    return content;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          Mentee Preferences
        </CardTitle>
        <CardDescription>
          Set your preferences to help us match you with the right mentors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {content}
      </CardContent>
    </Card>
  );
};

export default MenteePreferences;
