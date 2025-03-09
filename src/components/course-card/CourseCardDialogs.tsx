
import React from 'react';
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface CourseCardDialogsProps {
  id: string;
  title: string;
  showShareDialog: boolean;
  showAssignDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
  setShowAssignDialog: (show: boolean) => void;
}

const CourseCardDialogs: React.FC<CourseCardDialogsProps> = ({
  id,
  title,
  showShareDialog,
  showAssignDialog,
  setShowShareDialog,
  setShowAssignDialog
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [linkCopied, setLinkCopied] = React.useState(false);

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
              Share "{title}" with your team or on social media
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium">Share via social media</p>
              <div className="flex flex-wrap gap-2">
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
            </div>
            
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
          
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => setShowShareDialog(false)}
            >
              Close
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
