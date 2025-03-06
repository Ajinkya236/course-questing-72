
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, Trash2, GraduationCap, UserCog, Award, Pencil, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock topics data
const allTopics = [
  "Leadership", "Software Development", "Data Science", "UX Design", "Product Management", 
  "Digital Marketing", "Business Strategy", "Machine Learning", "Cloud Computing", "DevOps",
  "Artificial Intelligence", "Blockchain", "Cybersecurity", "Project Management", "Agile Methodologies",
  "Content Strategy", "SEO", "Social Media Marketing", "Financial Planning", "Strategic Planning",
  "Team Building", "Conflict Resolution", "Time Management", "Career Development", "Personal Growth",
  "Public Speaking", "Presentation Skills", "Technical Writing", "Business Communication", "Entrepreneurship",
  "Business Development", "Sales Strategy", "Customer Success", "Operations Management", "Supply Chain",
  "Human Resources", "Talent Development", "Corporate Training", "Executive Coaching", "Diversity & Inclusion",
  "Innovation", "Creative Thinking", "Problem Solving", "Decision Making", "Strategic Leadership",
  "Change Management", "Organizational Development", "Corporate Culture", "Remote Work", "Work-Life Balance"
];

const MentorProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [showTopicDialog, setShowTopicDialog] = useState(false);
  const [topicSearchTerm, setTopicSearchTerm] = useState('');
  
  // Mock profile data
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    yearsExperience: 12,
    bio: "Experienced data scientist with a PhD in Statistics and 12+ years in the industry. Passionate about mentoring the next generation of data professionals.",
    topics: ["Data Science", "Machine Learning", "Statistics", "Python", "Big Data"],
    idealMentee: "Motivated individuals looking to transition into data science or advance their analytical skills. Prefer mentees with some programming background and a strong willingness to learn.",
    mentoringPhilosophy: "I believe in a collaborative approach to mentoring where I guide rather than direct. My goal is to help mentees discover their own solutions while providing structure, feedback, and industry insights.",
    availability: "2-3 hours per week",
    profileImgUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your mentor profile has been successfully updated."
    });
  };

  const handleAddTopic = (topic: string) => {
    if (!profile.topics.includes(topic)) {
      setProfile({
        ...profile,
        topics: [...profile.topics, topic]
      });
      setNewTopic('');
      setShowTopicDialog(false);
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setProfile({
      ...profile,
      topics: profile.topics.filter(topic => topic !== topicToRemove)
    });
  };

  const filteredTopics = allTopics.filter(
    topic => 
      topic.toLowerCase().includes(topicSearchTerm.toLowerCase()) && 
      !profile.topics.includes(topic)
  );

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="h-24 w-24 rounded-full overflow-hidden">
                <img 
                  src={profile.profileImgUrl} 
                  alt={profile.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.title}</CardDescription>
                <div className="mt-2 flex flex-wrap gap-1">
                  {profile.topics.slice(0, 3).map(topic => (
                    <Badge key={topic} variant="secondary">{topic}</Badge>
                  ))}
                  {profile.topics.length > 3 && (
                    <Badge variant="outline">+{profile.topics.length - 3} more</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Bio Section */}
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <UserCog className="h-4 w-4 text-primary" />
                Professional Bio
              </h3>
              {isEditing ? (
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="h-24"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              )}
            </div>
            
            {/* Mentoring Topics */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Mentoring Topics
                </h3>
                {isEditing && (
                  <Dialog open={showTopicDialog} onOpenChange={setShowTopicDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Plus className="h-3 w-3" />
                        Add Topic
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Mentoring Topics</DialogTitle>
                        <DialogDescription>
                          Select topics that align with your expertise
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-4 space-y-4">
                        <Input 
                          placeholder="Search topics..." 
                          value={topicSearchTerm}
                          onChange={(e) => setTopicSearchTerm(e.target.value)}
                        />
                        
                        <div className="h-64 overflow-y-auto border rounded-md p-2">
                          {filteredTopics.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                              {filteredTopics.map(topic => (
                                <div 
                                  key={topic}
                                  className="px-3 py-2 text-sm rounded-md hover:bg-accent cursor-pointer flex justify-between items-center"
                                  onClick={() => handleAddTopic(topic)}
                                >
                                  <span>{topic}</span>
                                  <Plus className="h-4 w-4 text-muted-foreground" />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              No matching topics found
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowTopicDialog(false)}>
                          Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.topics.map(topic => (
                  <Badge 
                    key={topic} 
                    variant="secondary"
                    className={isEditing ? "pr-1 flex items-center gap-1" : ""}
                  >
                    {topic}
                    {isEditing && (
                      <button 
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                        onClick={() => handleRemoveTopic(topic)}
                      >
                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Ideal Mentee */}
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Ideal Mentee
              </h3>
              {isEditing ? (
                <Textarea 
                  value={profile.idealMentee}
                  onChange={(e) => setProfile({...profile, idealMentee: e.target.value})}
                  className="h-24"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.idealMentee}</p>
              )}
            </div>
            
            {/* Mentoring Philosophy */}
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Mentoring Philosophy
              </h3>
              {isEditing ? (
                <Textarea 
                  value={profile.mentoringPhilosophy}
                  onChange={(e) => setProfile({...profile, mentoringPhilosophy: e.target.value})}
                  className="h-24"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.mentoringPhilosophy}</p>
              )}
            </div>
          </div>
        </CardContent>
        
        {isEditing && (
          <CardFooter className="flex justify-end space-x-2 border-t pt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardFooter>
        )}
      </Card>
      
      {/* Mentor Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mentoring Statistics</CardTitle>
          <CardDescription>Overview of your mentoring impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Mentees Guided</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">48</p>
              <p className="text-sm text-muted-foreground">Sessions Conducted</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">4.9</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Completed Engagements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;
