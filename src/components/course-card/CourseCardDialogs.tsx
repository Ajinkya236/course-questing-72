
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
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  Mail, 
  Users, 
  User, 
  Search,
  Check,
  PlusCircle,
  X,
  Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CourseCardDialogsProps {
  id: string;
  title: string;
  showShareDialog: boolean;
  showAssignDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
  setShowAssignDialog: (show: boolean) => void;
}

interface EmailRecipient {
  email: string;
  id: string;
}

// Mock employee data for email autocomplete
const employeeEmails = [
  { email: 'alex.johnson@company.com', name: 'Alex Johnson' },
  { email: 'jamie.smith@company.com', name: 'Jamie Smith' },
  { email: 'taylor.wilson@company.com', name: 'Taylor Wilson' },
  { email: 'morgan.lee@company.com', name: 'Morgan Lee' },
  { email: 'casey.brown@company.com', name: 'Casey Brown' },
];

const CourseCardDialogs: React.FC<CourseCardDialogsProps> = ({
  id,
  title,
  showShareDialog,
  showAssignDialog,
  setShowShareDialog,
  setShowAssignDialog
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // State for email sharing
  const [emailRecipients, setEmailRecipients] = useState<EmailRecipient[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample team members data
  const teamMembers = [
    { id: '1', name: 'Alex Johnson', role: 'Software Engineer' },
    { id: '2', name: 'Sam Reynolds', role: 'Product Manager' },
    { id: '3', name: 'Jesse Taylor', role: 'UX Designer' },
    { id: '4', name: 'Morgan Smith', role: 'Data Analyst' },
    { id: '5', name: 'Casey Brown', role: 'Marketing Specialist' },
  ];

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter email suggestions based on current input
  const filteredEmailSuggestions = employeeEmails.filter(employee => 
    employee.email.toLowerCase().includes(currentEmail.toLowerCase()) ||
    employee.name.toLowerCase().includes(currentEmail.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleCopyLink = () => {
    // Mock copy to clipboard
    navigator.clipboard.writeText(`https://example.com/course/${id}`).then(() => {
      setLinkCopied(true);
      toast({
        title: "Link Copied",
        description: "Course link has been copied to clipboard"
      });

      // Reset copy status after 3 seconds
      setTimeout(() => setLinkCopied(false), 3000);
    });
  };

  const handleShareVia = (platform: string) => {
    // Mock sharing to platforms
    toast({
      title: `Shared on ${platform}`,
      description: `Course "${title}" has been shared on ${platform}`
    });
    setShowShareDialog(false);
  };

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

  const handleShareCourse = () => {
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

  const handleAssignCourse = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one team member",
        variant: "destructive"
      });
      return;
    }

    const selectedNames = selectedUsers.map(id => 
      teamMembers.find(member => member.id === id)?.name
    ).join(', ');

    toast({
      title: "Course Assigned",
      description: `"${title}" has been assigned to ${selectedNames}`
    });
    
    // Reset and close dialog
    setSelectedUsers([]);
    setSearchQuery('');
    setShowAssignDialog(false);
  };

  return (
    <>
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
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
                    onClick={() => handleAddEmailRecipient()}
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
                        onClick={() => {
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
                placeholder="I thought you might be interested in this course..."
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
            
            {/* Or separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">Or share via</span>
              </div>
            </div>
            
            {/* Social media options */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                onClick={() => handleShareVia('Facebook')}
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600"
                onClick={() => handleShareVia('Twitter')}
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
                onClick={() => handleShareVia('LinkedIn')}
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                onClick={() => handleShareVia('Email')}
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Share via Email</span>
              </Button>
            </div>
            
            {/* Copy link section */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Or copy the link</p>
              <div className="flex space-x-2">
                <Input 
                  value={`https://example.com/course/${id}`} 
                  readOnly
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="px-3"
                  onClick={handleCopyLink}
                >
                  {linkCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
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
              className="gap-2"
            >
              {isSending ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Share Course</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Course</DialogTitle>
            <DialogDescription>
              Assign "{title}" to team members
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Search team members</p>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or role..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Team members</p>
                <span className="text-xs text-muted-foreground">
                  {selectedUsers.length} selected
                </span>
              </div>
              
              <div className="border rounded-md divide-y max-h-60 overflow-y-auto">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(member => (
                    <div key={member.id} className="flex items-center p-3 hover:bg-muted">
                      <Checkbox 
                        id={`member-${member.id}`}
                        checked={selectedUsers.includes(member.id)}
                        onCheckedChange={() => handleSelectUser(member.id)}
                        className="mr-3"
                      />
                      <div className="flex items-center flex-1">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center p-4 text-muted-foreground">
                    No team members found
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAssignDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignCourse}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Assign Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCardDialogs;
