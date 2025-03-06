
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X, Edit, Check } from 'lucide-react';
import { toast } from 'sonner';

const MentorProfile = () => {
  const [mentorTopics, setMentorTopics] = useState([
    { id: 1, name: 'Leadership Development', expertise: 'Advanced' },
    { id: 2, name: 'Project Management', expertise: 'Expert' },
    { id: 3, name: 'Career Advancement', expertise: 'Intermediate' },
  ]);
  
  const [idealMenteeTypes, setIdealMenteeTypes] = useState([
    "Early-career professionals seeking growth",
    "Those transitioning to leadership roles",
    "Professionals looking to develop project management skills"
  ]);
  
  const [newTopic, setNewTopic] = useState('');
  const [newExpertise, setNewExpertise] = useState('Intermediate');
  const [newMenteeType, setNewMenteeType] = useState('');
  const [mentorPhilosophy, setMentorPhilosophy] = useState(
    "I believe in a collaborative approach to mentoring where we set clear goals and work together to achieve them. My focus is on both skill development and career navigation, helping mentees discover their strengths and address areas for growth."
  );
  const [isEditingPhilosophy, setIsEditingPhilosophy] = useState(false);
  const [tempPhilosophy, setTempPhilosophy] = useState(mentorPhilosophy);

  const handleAddTopic = () => {
    if (!newTopic) {
      toast.error("Please enter a topic name");
      return;
    }
    
    const newId = Math.max(0, ...mentorTopics.map(t => t.id)) + 1;
    setMentorTopics([...mentorTopics, { id: newId, name: newTopic, expertise: newExpertise }]);
    setNewTopic('');
    setNewExpertise('Intermediate');
    toast.success("Topic added successfully");
  };

  const handleDeleteTopic = (id: number) => {
    setMentorTopics(mentorTopics.filter(topic => topic.id !== id));
    toast.success("Topic removed");
  };

  const handleAddMenteeType = () => {
    if (!newMenteeType) {
      toast.error("Please enter a description of your ideal mentee");
      return;
    }
    
    setIdealMenteeTypes([...idealMenteeTypes, newMenteeType]);
    setNewMenteeType('');
    toast.success("Ideal mentee description added");
  };

  const handleDeleteMenteeType = (index: number) => {
    setIdealMenteeTypes(idealMenteeTypes.filter((_, i) => i !== index));
    toast.success("Mentee description removed");
  };

  const handleSavePhilosophy = () => {
    setMentorPhilosophy(tempPhilosophy);
    setIsEditingPhilosophy(false);
    toast.success("Mentoring philosophy updated");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Profile</CardTitle>
          <CardDescription>
            Customize your mentor profile to help connect with the right mentees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" alt="Mentor" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input id="title" defaultValue="Senior Product Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" defaultValue="12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base">Mentoring Philosophy</Label>
              {isEditingPhilosophy ? (
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setIsEditingPhilosophy(false);
                      setTempPhilosophy(mentorPhilosophy);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSavePhilosophy}
                    className="gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditingPhilosophy(true)}
                  className="gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
            
            {isEditingPhilosophy ? (
              <Textarea 
                value={tempPhilosophy}
                onChange={(e) => setTempPhilosophy(e.target.value)}
                className="min-h-[120px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{mentorPhilosophy}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mentoring Topics</CardTitle>
            <CardDescription>
              Areas where you can provide mentorship
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {mentorTopics.map(topic => (
                  <div key={topic.id} className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
                    <span>{topic.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {topic.expertise}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1"
                      onClick={() => handleDeleteTopic(topic.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 mt-4">
                    <Plus className="h-4 w-4" />
                    Add Topic
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Mentoring Topic</DialogTitle>
                    <DialogDescription>
                      Add a new topic that you can mentor others in
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic-name">Topic Name</Label>
                      <Input
                        id="topic-name"
                        placeholder="e.g., Leadership Development"
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expertise-level">Level of Expertise</Label>
                      <Select value={newExpertise} onValueChange={setNewExpertise}>
                        <SelectTrigger id="expertise-level">
                          <SelectValue placeholder="Select expertise level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={handleAddTopic}>Add Topic</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ideal Mentee</CardTitle>
            <CardDescription>
              Describe who would benefit most from your mentorship
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                {idealMenteeTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">{type}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => handleDeleteMenteeType(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="mentee-type">Add New Mentee Type</Label>
                  <div className="flex gap-2">
                    <Input
                      id="mentee-type"
                      placeholder="Describe your ideal mentee"
                      value={newMenteeType}
                      onChange={(e) => setNewMenteeType(e.target.value)}
                    />
                    <Button onClick={handleAddMenteeType}>Add</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-right">
        <Button size="lg">Save Profile</Button>
      </div>
    </div>
  );
};

export default MentorProfile;
