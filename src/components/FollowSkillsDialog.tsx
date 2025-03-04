
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Sample skills data
const allSkills = [
  "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork", "Innovation", "Strategy",
  "Time Management", "Public Speaking", "Negotiation", "Emotional Intelligence", 
  "Customer Service", "Sales", "Business Development", "Agile", "Scrum", "DevOps",
  "UX Design", "UI Design", "Content Writing", "SEO", "Social Media"
];

const FollowSkillsDialog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followedSkills, setFollowedSkills] = useState<string[]>([
    "Leadership", "Project Management", "Communication", "Data Analysis"
  ]);
  const [open, setOpen] = useState(false);

  const handleToggleSkill = (skill: string) => {
    if (followedSkills.includes(skill)) {
      setFollowedSkills(followedSkills.filter(s => s !== skill));
      toast({
        title: "Skill unfollowed",
        description: `You are no longer following ${skill}`,
      });
    } else {
      if (followedSkills.length >= 15) {
        toast({
          title: "Maximum skills reached",
          description: "You can follow up to 15 skills. Please remove some before adding more.",
          variant: "destructive"
        });
        return;
      }
      setFollowedSkills([...followedSkills, skill]);
      toast({
        title: "Skill followed",
        description: `You are now following ${skill}`,
      });
    }
  };

  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full h-full flex flex-col items-center justify-center gap-2 py-6">
          <div className="flex flex-wrap gap-1 justify-center">
            {followedSkills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
            ))}
            {followedSkills.length > 3 && (
              <Badge variant="outline" className="font-normal">+{followedSkills.length - 3}</Badge>
            )}
          </div>
          <span className="text-base font-heading">Skills You Follow</span>
          <span className="text-sm text-muted-foreground">Click to manage</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Follow Skills</DialogTitle>
          <DialogDescription>
            Select up to 15 skills to follow. You'll get personalized content based on your interests.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="font-heading text-sm">
            Following ({followedSkills.length}/15)
          </div>
          
          <div className="flex flex-wrap gap-2">
            {followedSkills.map(skill => (
              <Badge 
                key={skill} 
                variant="secondary"
                className="pl-2 pr-1 py-1 flex items-center gap-1"
              >
                {skill}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1 hover:bg-destructive/20 rounded-full"
                  onClick={() => handleToggleSkill(skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          <div className="font-heading text-sm">
            Suggested Skills
          </div>
          
          <div className="max-h-[220px] overflow-y-auto pr-2">
            <div className="flex flex-wrap gap-2">
              {filteredSkills
                .filter(skill => !followedSkills.includes(skill))
                .map(skill => (
                  <Badge 
                    key={skill} 
                    variant="outline"
                    className="pl-2 pr-1 py-1 flex items-center gap-1 cursor-pointer hover:bg-secondary"
                    onClick={() => handleToggleSkill(skill)}
                  >
                    {skill}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 hover:bg-primary/20 rounded-full"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowSkillsDialog;
