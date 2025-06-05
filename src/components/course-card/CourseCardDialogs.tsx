import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  User, 
  Search,
  X,
  Send,
  PlusCircle,
  UserPlus,
  Goal,
  Save,
  Plus,
  List,
  Eye,
  EyeOff
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CourseCardDialogsProps {
  id: string;
  title: string;
  showShareDialog: boolean;
  showAssignDialog: boolean;
  showSaveDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
  setShowAssignDialog: (show: boolean) => void;
  setShowSaveDialog: (show: boolean) => void;
}

// Mock employee data for email autocomplete
const employeeEmails = [
  { email: 'alex.johnson@company.com', name: 'Alex Johnson' },
  { email: 'jamie.smith@company.com', name: 'Jamie Smith' },
  { email: 'taylor.wilson@company.com', name: 'Taylor Wilson' },
  { email: 'morgan.lee@company.com', name: 'Morgan Lee' },
  { email: 'casey.brown@company.com', name: 'Casey Brown' },
];

// Sample team members data
const teamMembers = [
  { id: '1', name: 'Alex Johnson', role: 'Software Engineer' },
  { id: '2', name: 'Sam Reynolds', role: 'Product Manager' },
  { id: '3', name: 'Jesse Taylor', role: 'UX Designer' },
  { id: '4', name: 'Morgan Smith', role: 'Data Analyst' },
  { id: '5', name: 'Casey Brown', role: 'Marketing Specialist' },
];

// Sample mentees data
const mentees = [
  { id: '6', name: 'Riley Cooper', role: 'Junior Developer' },
  { id: '7', name: 'Jordan Miller', role: 'UX Intern' },
  { id: '8', name: 'Cameron White', role: 'Data Science Trainee' },
  { id: '9', name: 'Drew Thomas', role: 'Marketing Assistant' },
  { id: '10', name: 'Taylor Evans', role: 'Product Specialist' },
];

interface Playlist {
  id: string;
  name: string;
  isPublic: boolean;
  courseCount: number;
}

const CourseCardDialogs: React.FC<CourseCardDialogsProps> = ({
  id,
  title,
  showShareDialog,
  showAssignDialog,
  showSaveDialog,
  setShowShareDialog,
  setShowAssignDialog,
  setShowSaveDialog
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  const [selectedTeamForGoals, setSelectedTeamForGoals] = useState<string[]>([]);
  const [assignTab, setAssignTab] = useState("self");
  
  // State for email sharing
  const [emailRecipients, setEmailRecipients] = useState<EmailRecipient[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // State for save dialog
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistIsPublic, setNewPlaylistIsPublic] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>(['watch-later']);

  // Mock playlists data
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 'watch-later', name: 'Watch Later', isPublic: false, courseCount: 5 },
    { id: 'leadership', name: 'Leadership Skills', isPublic: true, courseCount: 12 },
    { id: 'tech-skills', name: 'Technical Skills', isPublic: false, courseCount: 8 },
  ]);

  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMentees = mentees.filter(mentee => 
    mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter email suggestions based on current input
  const filteredEmailSuggestions = employeeEmails.filter(employee => 
    employee.email.toLowerCase().includes(currentEmail.toLowerCase()) ||
    employee.name.toLowerCase().includes(currentEmail.toLowerCase())
  );

  const handleAddEmailRecipient = (email: string = currentEmail) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Add email to recipients if not already added
    if (!emailRecipients.some(recipient => recipient.email === email)) {
      setEmailRecipients([...emailRecipients, { email, id: Date.now().toString() }]);
      setCurrentEmail('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveEmailRecipient = (id: string) => {
    setEmailRecipients(emailRecipients.filter(recipient => recipient.id !== id));
  };

  const handleEmailInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentEmail) {
      e.preventDefault();
      handleAddEmailRecipient();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleShareCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (emailRecipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please add at least one email recipient",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);

    // Simulate sending process
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Course Shared",
        description: `"${title}" has been shared with ${emailRecipients.length} recipient${emailRecipients.length > 1 ? 's' : ''}`
      });
      
      // Reset and close
      setEmailRecipients([]);
      setPersonalMessage('');
      setShowShareDialog(false);
    }, 1500);
  };

  const handleSelectTeamMember = (userId: string) => {
    setSelectedTeamMembers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectMentee = (userId: string) => {
    setSelectedMentees(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectTeamForGoals = (userId: string) => {
    setSelectedTeamForGoals(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleAssignCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Check which tab is active and handle accordingly
    if (assignTab === "self") {
      toast({
        title: "Course Assigned",
        description: `"${title}" has been assigned to yourself`
      });
      
      // Save to local storage
      const assignedToSelf = JSON.parse(localStorage.getItem('assignedToSelf') || '[]');
      if (!assignedToSelf.includes(id)) {
        localStorage.setItem('assignedToSelf', JSON.stringify([...assignedToSelf, id]));
      }
    } 
    else if (assignTab === "team") {
      if (selectedTeamMembers.length === 0) {
        toast({
          title: "No team members selected",
          description: "Please select at least one team member",
          variant: "destructive"
        });
        return;
      }

      const selectedNames = selectedTeamMembers.map(id => 
        teamMembers.find(member => member.id === id)?.name
      ).join(', ');

      toast({
        title: "Course Assigned",
        description: `"${title}" has been assigned to ${selectedNames}`
      });
      
      // Save to local storage
      const assignedToTeam = JSON.parse(localStorage.getItem('assignedToTeam') || '{}');
      selectedTeamMembers.forEach(memberId => {
        const memberAssignments = assignedToTeam[memberId] || [];
        if (!memberAssignments.includes(id)) {
          assignedToTeam[memberId] = [...memberAssignments, id];
        }
      });
      localStorage.setItem('assignedToTeam', JSON.stringify(assignedToTeam));
    }
    else if (assignTab === "mentee") {
      if (selectedMentees.length === 0) {
        toast({
          title: "No mentees selected",
          description: "Please select at least one mentee",
          variant: "destructive"
        });
        return;
      }

      const selectedNames = selectedMentees.map(id => 
        mentees.find(mentee => mentee.id === id)?.name
      ).join(', ');

      toast({
        title: "Course Assigned",
        description: `"${title}" has been assigned to ${selectedNames}`
      });
      
      // Save to local storage
      const assignedToMentees = JSON.parse(localStorage.getItem('assignedToMentees') || '{}');
      selectedMentees.forEach(menteeId => {
        const menteeAssignments = assignedToMentees[menteeId] || [];
        if (!menteeAssignments.includes(id)) {
          assignedToMentees[menteeId] = [...menteeAssignments, id];
        }
      });
      localStorage.setItem('assignedToMentees', JSON.stringify(assignedToMentees));
    }
    else if (assignTab === "goals") {
      toast({
        title: "Course Assigned",
        description: `"${title}" has been added to your learning goals`
      });
      
      // Save to local storage
      const assignedToGoals = JSON.parse(localStorage.getItem('assignedToGoals') || '[]');
      if (!assignedToGoals.includes(id)) {
        localStorage.setItem('assignedToGoals', JSON.stringify([...assignedToGoals, id]));
      }
    }
    else if (assignTab === "teamGoals") {
      if (selectedTeamForGoals.length === 0) {
        toast({
          title: "No team members selected",
          description: "Please select at least one team member for goals",
          variant: "destructive"
        });
        return;
      }

      const selectedNames = selectedTeamForGoals.map(id => 
        teamMembers.find(member => member.id === id)?.name
      ).join(', ');

      toast({
        title: "Course Assigned",
        description: `"${title}" has been added to learning goals for ${selectedNames}`
      });
      
      // Save to local storage
      const assignedToTeamGoals = JSON.parse(localStorage.getItem('assignedToTeamGoals') || '{}');
      selectedTeamForGoals.forEach(memberId => {
        const memberGoals = assignedToTeamGoals[memberId] || [];
        if (!memberGoals.includes(id)) {
          assignedToTeamGoals[memberId] = [...memberGoals, id];
        }
      });
      localStorage.setItem('assignedToTeamGoals', JSON.stringify(assignedToTeamGoals));
    }
    
    // Reset and close dialog
    setSelectedTeamMembers([]);
    setSelectedMentees([]);
    setSelectedTeamForGoals([]);
    setSearchQuery('');
    setAssignTab("self");
    setShowAssignDialog(false);
  };

  // New handlers for save dialog
  const handlePlaylistToggle = (playlistId: string) => {
    setSelectedPlaylists(prev => {
      if (prev.includes(playlistId)) {
        return prev.filter(id => id !== playlistId);
      } else {
        return [...prev, playlistId];
      }
    });
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a playlist name",
        variant: "destructive"
      });
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      isPublic: newPlaylistIsPublic,
      courseCount: 0
    };

    setPlaylists(prev => [...prev, newPlaylist]);
    setSelectedPlaylists(prev => [...prev, newPlaylist.id]);
    setNewPlaylistName('');
    setNewPlaylistIsPublic(false);
    setShowCreatePlaylist(false);

    toast({
      title: "Playlist Created",
      description: `"${newPlaylist.name}" has been created and selected`
    });
  };

  const handleSaveCourse = () => {
    if (selectedPlaylists.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one playlist",
        variant: "destructive"
      });
      return;
    }

    const selectedPlaylistNames = selectedPlaylists.map(id => 
      playlists.find(playlist => playlist.id === id)?.name
    ).filter(Boolean).join(', ');

    // Save to appropriate locations
    selectedPlaylists.forEach(playlistId => {
      if (playlistId === 'watch-later') {
        // Save to saved courses
        const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
        if (!savedCourses.includes(id)) {
          localStorage.setItem('savedCourses', JSON.stringify([...savedCourses, id]));
        }
      } else {
        // Save to playlist
        const playlistCourses = JSON.parse(localStorage.getItem(`playlist_${playlistId}`) || '[]');
        if (!playlistCourses.includes(id)) {
          localStorage.setItem(`playlist_${playlistId}`, JSON.stringify([...playlistCourses, id]));
        }
      }
    });

    toast({
      title: "Course Saved",
      description: `"${title}" has been saved to: ${selectedPlaylistNames}`
    });

    // Reset and close
    setSelectedPlaylists(['watch-later']);
    setShowSaveDialog(false);
  };

  return (
    <>
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Share Course</DialogTitle>
            <DialogDescription>
              Share "{title}" with your colleagues
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Email recipients section */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Add recipients</p>
              
              {/* Email input and suggestions */}
              <div className="relative">
                <div className="flex items-center">
                  <Input 
                    placeholder="Enter email address" 
                    value={currentEmail}
                    onChange={(e) => {
                      setCurrentEmail(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={handleEmailInputKeyDown}
                    onFocus={() => setShowSuggestions(currentEmail.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddEmailRecipient();
                    }}
                    disabled={!currentEmail}
                    className="ml-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Email suggestions dropdown */}
                {showSuggestions && filteredEmailSuggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredEmailSuggestions.map(employee => (
                      <div 
                        key={employee.email}
                        className="p-2 hover:bg-muted cursor-pointer flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddEmailRecipient(employee.email);
                        }}
                      >
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Selected recipients */}
              {emailRecipients.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {emailRecipients.map(recipient => (
                    <div key={recipient.id} className="bg-muted px-2 py-1 rounded-md flex items-center text-sm">
                      <span className="mr-1">{recipient.email}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveEmailRecipient(recipient.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Personal message */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Add a personal message (optional)</p>
              <Textarea
                placeholder="I thought you might find this course interesting..."
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowShareDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleShareCourse}
              disabled={emailRecipients.length === 0 || isSending}
              className="ml-2"
            >
              {isSending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Share
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Assign Course</DialogTitle>
            <DialogDescription>
              Assign "{title}" to yourself or team members
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="self" value={assignTab} onValueChange={setAssignTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="self">Self</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="mentee">Mentees</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="teamGoals">Team Goals</TabsTrigger>
            </TabsList>
            
            {/* Self Assignment */}
            <TabsContent value="self" className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Assign this course to yourself for personal development.
              </p>
            </TabsContent>
            
            {/* Team Assignment */}
            <TabsContent value="team" className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto space-y-2 mt-4">
                  {filteredTeamMembers.map(member => (
                    <div 
                      key={member.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-muted"
                    >
                      <Checkbox 
                        id={`team-${member.id}`}
                        checked={selectedTeamMembers.includes(member.id)}
                        onCheckedChange={() => handleSelectTeamMember(member.id)}
                      />
                      <label 
                        htmlFor={`team-${member.id}`}
                        className="flex-1 cursor-pointer flex flex-col"
                      >
                        <span className="font-medium text-sm">{member.name}</span>
                        <span className="text-xs text-muted-foreground">{member.role}</span>
                      </label>
                    </div>
                  ))}
                  
                  {filteredTeamMembers.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-2">
                      No team members found
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Mentee Assignment */}
            <TabsContent value="mentee" className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto space-y-2 mt-4">
                  {filteredMentees.map(mentee => (
                    <div 
                      key={mentee.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-muted"
                    >
                      <Checkbox 
                        id={`mentee-${mentee.id}`}
                        checked={selectedMentees.includes(mentee.id)}
                        onCheckedChange={() => handleSelectMentee(mentee.id)}
                      />
                      <label 
                        htmlFor={`mentee-${mentee.id}`}
                        className="flex-1 cursor-pointer flex flex-col"
                      >
                        <span className="font-medium text-sm">{mentee.name}</span>
                        <span className="text-xs text-muted-foreground">{mentee.role}</span>
                      </label>
                    </div>
                  ))}
                  
                  {filteredMentees.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-2">
                      No mentees found
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Personal Goals Assignment */}
            <TabsContent value="goals" className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Add this course to your personal learning goals and development plan.
              </p>
            </TabsContent>
            
            {/* Team Goals Assignment */}
            <TabsContent value="teamGoals" className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto space-y-2 mt-4">
                  {filteredTeamMembers.map(member => (
                    <div 
                      key={member.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-muted"
                    >
                      <Checkbox 
                        id={`team-goals-${member.id}`}
                        checked={selectedTeamForGoals.includes(member.id)}
                        onCheckedChange={() => handleSelectTeamForGoals(member.id)}
                      />
                      <label 
                        htmlFor={`team-goals-${member.id}`}
                        className="flex-1 cursor-pointer flex flex-col"
                      >
                        <span className="font-medium text-sm">{member.name}</span>
                        <span className="text-xs text-muted-foreground">{member.role}</span>
                      </label>
                    </div>
                  ))}
                  
                  {filteredTeamMembers.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-2">
                      No team members found
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAssignDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAssignCourse}
              className="ml-2"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Save Course</DialogTitle>
            <DialogDescription>
              Save "{title}" to your playlists
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Create new playlist section */}
            {showCreatePlaylist ? (
              <div className="space-y-3 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Create New Playlist</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCreatePlaylist(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={newPlaylistIsPublic}
                    onCheckedChange={setNewPlaylistIsPublic}
                  />
                  <Label htmlFor="public" className="text-sm">
                    Make public
                  </Label>
                  {newPlaylistIsPublic ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Button onClick={handleCreatePlaylist} size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Playlist
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowCreatePlaylist(true)}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Playlist
              </Button>
            )}

            {/* Playlist selection */}
            <div className="space-y-2">
              <h4 className="font-medium">Select Playlists</h4>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {playlists.map(playlist => (
                  <div 
                    key={playlist.id}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-muted"
                  >
                    <Checkbox
                      id={`playlist-${playlist.id}`}
                      checked={selectedPlaylists.includes(playlist.id)}
                      onCheckedChange={() => handlePlaylistToggle(playlist.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <List className="h-4 w-4 text-muted-foreground" />
                        <label 
                          htmlFor={`playlist-${playlist.id}`}
                          className="font-medium text-sm cursor-pointer"
                        >
                          {playlist.name}
                        </label>
                        {playlist.isPublic ? (
                          <Eye className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <EyeOff className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {playlist.courseCount} courses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveCourse}
              disabled={selectedPlaylists.length === 0}
              className="ml-2"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCardDialogs;
