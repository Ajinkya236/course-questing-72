
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserCog, Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenteePreferencesFormProps {
  onComplete: () => void;
}

const topics = [
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

const MenteePreferencesForm: React.FC<MenteePreferencesFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [learningObjective, setLearningObjective] = useState('');
  const [idealMentor, setIdealMentor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    toast({
      title: "Preferences Saved",
      description: "Your mentoring preferences have been updated successfully.",
    });
    onComplete();
  };

  const filteredTopics = topics.filter(topic => 
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Topics of Interest (up to 3)</h3>
        <div className="flex flex-wrap gap-2 mb-3">
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
        </div>
        
        {selectedTopics.length < 3 && (
          <div className="space-y-3">
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            
            <div className="max-h-[150px] overflow-y-auto border rounded-md p-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
      
      <div className="flex justify-end">
        <Button onClick={handleSavePreferences} className="gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default MenteePreferencesForm;
