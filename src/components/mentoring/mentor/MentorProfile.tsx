
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Check, X, Tag, UserCog, Info, Edit, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MentorProfile = () => {
  const { toast } = useToast();
  const [topics, setTopics] = useState([
    "Leadership Development", 
    "Career Transition", 
    "Technical Skills", 
    "Communication Skills"
  ]);
  const [newTopic, setNewTopic] = useState('');
  const [idealMentee, setIdealMentee] = useState('');
  const [mentoringPhilosophy, setMentoringPhilosophy] = useState('');
  const [showAddTopicDialog, setShowAddTopicDialog] = useState(false);
  const [editingPhilosophy, setEditingPhilosophy] = useState(false);
  const [editingIdealMentee, setEditingIdealMentee] = useState(false);
  const [profileData, setProfileData] = useState({
    philosophy: "My mentoring approach focuses on empowering mentees through personalized guidance and practical knowledge sharing. I believe in creating a supportive environment where mentees can grow both professionally and personally.",
    idealMentee: "Self-motivated individuals who are eager to learn and apply new concepts. Preferably with some background in technology or business, but open to mentees from all fields who demonstrate a strong commitment to growth."
  });

  // All expertise areas for suggestions
  const expertiseAreas = [
    "Software Development", "Data Science", "Machine Learning", "UX Design", 
    "Product Management", "Leadership", "Public Speaking", "Technical Writing",
    "Career Development", "Digital Marketing", "Project Management", "Agile Methodologies",
    "Cloud Computing", "DevOps", "Mobile Development", "Blockchain"
  ];

  // Filtered expertise that hasn't been added yet
  const suggestedTopics = expertiseAreas.filter(topic => 
    !topics.includes(topic) && 
    topic.toLowerCase().includes(newTopic.toLowerCase())
  ).slice(0, 5);

  const handleAddTopic = () => {
    if (newTopic && !topics.includes(newTopic)) {
      setTopics([...topics, newTopic]);
      setNewTopic('');
      setShowAddTopicDialog(false);
      toast({
        title: "Topic Added",
        description: `"${newTopic}" has been added to your mentoring topics.`
      });
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setTopics(topics.filter(topic => topic !== topicToRemove));
    toast({
      title: "Topic Removed",
      description: `"${topicToRemove}" has been removed from your mentoring topics.`
    });
  };

  const handleSavePhilosophy = () => {
    setProfileData({...profileData, philosophy: mentoringPhilosophy});
    setEditingPhilosophy(false);
    toast({
      title: "Philosophy Updated",
      description: "Your mentoring philosophy has been updated successfully."
    });
  };

  const handleSaveIdealMentee = () => {
    setProfileData({...profileData, idealMentee: idealMentee});
    setEditingIdealMentee(false);
    toast({
      title: "Ideal Mentee Updated",
      description: "Your ideal mentee description has been updated successfully."
    });
  };

  const handleSelectSuggestedTopic = (topic: string) => {
    setNewTopic(topic);
  };

  return (
    <div className="space-y-6">
      {/* Mentoring Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Mentoring Topics
          </CardTitle>
          <CardDescription>
            Areas where you can provide mentoring to others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {topics.map(topic => (
              <Badge key={topic} variant="secondary" className="px-3 py-1.5 text-sm gap-1 group">
                {topic}
                <X 
                  className="h-3.5 w-3.5 cursor-pointer opacity-70 hover:opacity-100 ml-1" 
                  onClick={() => handleRemoveTopic(topic)}
                />
              </Badge>
            ))}
          </div>
          <Dialog open={showAddTopicDialog} onOpenChange={setShowAddTopicDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Mentoring Topic</DialogTitle>
                <DialogDescription>
                  Add a new topic in which you can provide mentoring
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Input 
                  placeholder="Enter topic name..." 
                  value={newTopic} 
                  onChange={(e) => setNewTopic(e.target.value)}
                />
                
                {suggestedTopics.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Suggested topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTopics.map(topic => (
                        <Badge 
                          key={topic} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-secondary px-3 py-1.5"
                          onClick={() => handleSelectSuggestedTopic(topic)}
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddTopicDialog(false)}>Cancel</Button>
                <Button onClick={handleAddTopic}>Add Topic</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Mentoring Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Mentoring Philosophy
          </CardTitle>
          <CardDescription>
            What mentoring means to you and your approach
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingPhilosophy ? (
            <div className="space-y-4">
              <Textarea 
                className="min-h-[120px]"
                placeholder="Describe your mentoring philosophy..." 
                value={mentoringPhilosophy}
                onChange={(e) => setMentoringPhilosophy(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingPhilosophy(false)}>Cancel</Button>
                <Button onClick={handleSavePhilosophy}>Save Philosophy</Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profileData.philosophy}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-0 right-0"
                onClick={() => {
                  setMentoringPhilosophy(profileData.philosophy);
                  setEditingPhilosophy(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ideal Mentee */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Ideal Mentee
          </CardTitle>
          <CardDescription>
            Describe your ideal mentee for better matching
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingIdealMentee ? (
            <div className="space-y-4">
              <Textarea 
                className="min-h-[120px]"
                placeholder="Describe your ideal mentee..." 
                value={idealMentee}
                onChange={(e) => setIdealMentee(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingIdealMentee(false)}>Cancel</Button>
                <Button onClick={handleSaveIdealMentee}>Save Description</Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profileData.idealMentee}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-0 right-0"
                onClick={() => {
                  setIdealMentee(profileData.idealMentee);
                  setEditingIdealMentee(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;
