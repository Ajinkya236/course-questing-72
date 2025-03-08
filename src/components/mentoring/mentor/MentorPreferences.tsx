
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserCog, Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MentorPreferencesProps {
  inDialog?: boolean;
  onSave?: () => void;
}

const MentorPreferences: React.FC<MentorPreferencesProps> = ({ inDialog = false, onSave }) => {
  const { toast } = useToast();
  const [bio, setBio] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [idealMentee, setIdealMentee] = useState('');
  const [philosophy, setPhilosophy] = useState('');
  const [openTopicDialog, setOpenTopicDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTopic, setNewTopic] = useState('');

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const savedBio = localStorage.getItem('mentorBio');
    const savedTopics = localStorage.getItem('mentorTopics');
    const savedIdealMentee = localStorage.getItem('mentorIdealMentee');
    const savedPhilosophy = localStorage.getItem('mentorPhilosophy');
    
    if (savedBio) {
      setBio(savedBio);
    }
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
    if (savedIdealMentee) {
      setIdealMentee(savedIdealMentee);
    }
    if (savedPhilosophy) {
      setPhilosophy(savedPhilosophy);
    }
  }, []);

  // List of available topics
  const availableTopics = [
    "Leadership", "Project Management", "Public Speaking", "Data Analysis", 
    "Machine Learning", "UX Design", "Software Development", "Marketing",
    "Sales", "Customer Service", "Financial Planning", "Career Development",
    "Networking", "Negotiation", "Time Management", "Product Management",
    "Business Strategy", "Communication", "Team Building", "Problem Solving"
  ];

  const handleAddTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      if (topics.length < 5) {
        setTopics([...topics, newTopic.trim()]);
        setNewTopic('');
      } else {
        toast({
          title: "Maximum topics reached",
          description: "You can select up to 5 topics",
          variant: "destructive"
        });
      }
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setTopics(topics.filter(t => t !== topic));
  };

  const handleTopicSelect = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter(t => t !== topic));
    } else if (topics.length < 5) {
      setTopics([...topics, topic]);
    } else {
      toast({
        title: "Maximum topics reached",
        description: "You can select up to 5 topics",
        variant: "destructive"
      });
    }
  };

  const handleSavePreferences = () => {
    if (!bio.trim()) {
      toast({
        title: "Professional Bio Required",
        description: "Please provide a professional bio to continue",
        variant: "destructive"
      });
      return;
    }

    if (topics.length === 0) {
      toast({
        title: "Topics Required",
        description: "Please select at least one mentoring topic",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('mentorBio', bio);
    localStorage.setItem('mentorTopics', JSON.stringify(topics));
    localStorage.setItem('mentorIdealMentee', idealMentee);
    localStorage.setItem('mentorPhilosophy', philosophy);
    localStorage.setItem('mentorPreferencesSet', 'true');

    toast({
      title: "Preferences Saved",
      description: "Your mentor preferences have been updated successfully",
    });
    
    if (onSave) {
      onSave();
    }
  };

  const filteredTopics = availableTopics.filter(topic => 
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Professional Bio</h3>
        <Textarea 
          placeholder="Share your professional background and expertise..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="resize-none"
          rows={4}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Mentoring Topics (up to 5)</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {topics.map(topic => (
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
          
          {topics.length < 5 && (
            <Dialog open={openTopicDialog} onOpenChange={setOpenTopicDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 h-8">
                  <Plus className="h-3.5 w-3.5" />
                  Add Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Mentoring Topics</DialogTitle>
                  <DialogDescription>
                    Choose up to 5 topics you can mentor others in
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
                            topics.includes(topic) 
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
        {topics.length === 0 && (
          <p className="text-sm text-muted-foreground">No topics selected yet</p>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Ideal Mentee</h3>
        <Textarea 
          placeholder="Describe your ideal mentee..."
          value={idealMentee}
          onChange={(e) => setIdealMentee(e.target.value)}
          className="resize-none"
          rows={3}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Mentoring Philosophy</h3>
        <Textarea 
          placeholder="Share your approach to mentoring..."
          value={philosophy}
          onChange={(e) => setPhilosophy(e.target.value)}
          className="resize-none"
          rows={3}
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
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UserCog className="h-5 w-5 text-primary" />
        Mentor Preferences
      </h2>
      <p className="text-muted-foreground mb-6">
        Configure your mentoring profile to attract the right mentees
      </p>
      {content}
    </div>
  );
};

export default MentorPreferences;
