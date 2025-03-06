
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { User, Users, UserPlus, Target, ListChecks } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  role?: string;
  image?: string;
}

interface CourseActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  courseId: string;
  courseName: string;
  actionType: 'share' | 'assign';
}

const CourseActionDialog: React.FC<CourseActionDialogProps> = ({
  open,
  onClose,
  title,
  courseId,
  courseName,
  actionType
}) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState('');
  const [assignTab, setAssignTab] = useState('me');
  
  // Mock data for team members, mentees, etc.
  const teamMembers: Person[] = [
    { id: '1', name: 'Alex Johnson', role: 'Developer', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Sarah Williams', role: 'Designer', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', name: 'Michael Chen', role: 'Product Manager', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', name: 'Lisa Rodriguez', role: 'QA Engineer', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];
  
  const mentees: Person[] = [
    { id: '5', name: 'David Kim', role: 'Junior Developer', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: '6', name: 'Emma Davis', role: 'Associate Designer', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  ];
  
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  
  const handleShare = () => {
    if (!emails.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one email address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Course Shared",
      description: `"${courseName}" has been shared successfully`,
    });
    
    onClose();
    setEmails('');
  };
  
  const handleAssign = () => {
    let message = '';
    
    switch (assignTab) {
      case 'me':
        message = `"${courseName}" has been assigned to you`;
        break;
      case 'team':
        if (selectedTeamMembers.length === 0) {
          toast({
            title: "Error",
            description: "Please select at least one team member",
            variant: "destructive"
          });
          return;
        }
        message = `"${courseName}" has been assigned to ${selectedTeamMembers.length} team member(s)`;
        break;
      case 'mentee':
        if (selectedMentees.length === 0) {
          toast({
            title: "Error",
            description: "Please select at least one mentee",
            variant: "destructive"
          });
          return;
        }
        message = `"${courseName}" has been assigned to ${selectedMentees.length} mentee(s)`;
        break;
      case 'mygoals':
        message = `"${courseName}" has been added to your learning goals`;
        break;
      case 'teamgoals':
        if (selectedTeamMembers.length === 0) {
          toast({
            title: "Error",
            description: "Please select at least one team member",
            variant: "destructive"
          });
          return;
        }
        message = `"${courseName}" has been added to ${selectedTeamMembers.length} team member(s) learning goals`;
        break;
    }
    
    toast({
      title: "Course Assigned",
      description: message,
    });
    
    onClose();
    setSelectedTeamMembers([]);
    setSelectedMentees([]);
  };
  
  const handleCheckboxChange = (id: string, type: 'team' | 'mentee') => {
    if (type === 'team') {
      setSelectedTeamMembers(prev => 
        prev.includes(id) 
          ? prev.filter(memberId => memberId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedMentees(prev => 
        prev.includes(id) 
          ? prev.filter(menteeId => menteeId !== id)
          : [...prev, id]
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        {actionType === 'share' && (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="emails">Enter email addresses (comma separated)</Label>
                <Input
                  id="emails"
                  placeholder="colleague@example.com, teammate@example.com"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleShare}>Share Course</Button>
            </DialogFooter>
          </>
        )}
        
        {actionType === 'assign' && (
          <>
            <Tabs defaultValue="me" value={assignTab} onValueChange={setAssignTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="me" className="text-xs">
                  <User className="h-3.5 w-3.5 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Me</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="text-xs">
                  <Users className="h-3.5 w-3.5 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Team</span>
                </TabsTrigger>
                <TabsTrigger value="mentee" className="text-xs">
                  <UserPlus className="h-3.5 w-3.5 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Mentee</span>
                </TabsTrigger>
                <TabsTrigger value="mygoals" className="text-xs">
                  <Target className="h-3.5 w-3.5 mr-1 md:mr-2" />
                  <span className="hidden md:inline">My Goals</span>
                </TabsTrigger>
                <TabsTrigger value="teamgoals" className="text-xs">
                  <ListChecks className="h-3.5 w-3.5 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Team Goals</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="me" className="py-2">
                <p className="text-sm text-muted-foreground mb-4">
                  This course will be added to your assigned courses list.
                </p>
              </TabsContent>
              
              <TabsContent value="team" className="py-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Select team members to assign this course to:
                </p>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`team-${member.id}`} 
                        checked={selectedTeamMembers.includes(member.id)}
                        onCheckedChange={() => handleCheckboxChange(member.id, 'team')}
                      />
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img 
                            src={member.image || "/placeholder.svg"} 
                            alt={member.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Label 
                            htmlFor={`team-${member.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {member.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mentee" className="py-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Select mentees to assign this course to:
                </p>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {mentees.map(mentee => (
                    <div key={mentee.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`mentee-${mentee.id}`} 
                        checked={selectedMentees.includes(mentee.id)}
                        onCheckedChange={() => handleCheckboxChange(mentee.id, 'mentee')}
                      />
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img 
                            src={mentee.image || "/placeholder.svg"} 
                            alt={mentee.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Label 
                            htmlFor={`mentee-${mentee.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {mentee.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{mentee.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mygoals" className="py-2">
                <p className="text-sm text-muted-foreground mb-4">
                  This course will be added to your learning goals.
                </p>
              </TabsContent>
              
              <TabsContent value="teamgoals" className="py-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Select team members to add this course to their learning goals:
                </p>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`teamgoal-${member.id}`} 
                        checked={selectedTeamMembers.includes(member.id)}
                        onCheckedChange={() => handleCheckboxChange(member.id, 'team')}
                      />
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img 
                            src={member.image || "/placeholder.svg"} 
                            alt={member.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Label 
                            htmlFor={`teamgoal-${member.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {member.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleAssign}>Assign Course</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseActionDialog;
