
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft, Search, Plus, Check, Award } from "lucide-react";
import { toast } from "sonner";

const mockSkills = [
  "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork", "Innovation", "Strategy",
  "Artificial Intelligence", "Machine Learning", "Cloud Computing", "DevOps",
  "UX/UI Design", "Digital Marketing", "Content Creation", "SEO", "Data Science"
];

const FollowSkillsWidget: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [followedSkills, setFollowedSkills] = useState<string[]>([]);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const filteredSkills = searchTerm 
    ? mockSkills.filter(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase()))
    : mockSkills;

  const toggleFollowSkill = (skill: string) => {
    if (followedSkills.includes(skill)) {
      setFollowedSkills(followedSkills.filter(s => s !== skill));
      toast.info(`Unfollowed: ${skill}`);
    } else {
      if (followedSkills.length >= 15) {
        toast.error("You can follow up to 15 skills");
        return;
      }
      setFollowedSkills([...followedSkills, skill]);
      toast.success(`Following: ${skill}`);
    }
  };

  // Scroll skills container
  const scrollSkills = (direction: 'left' | 'right') => {
    if (skillsContainerRef.current) {
      const scrollAmount = 200;
      const container = skillsContainerRef.current;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 border rounded-xl">
          <Award className="h-8 w-8 text-primary" />
          <span className="font-semibold">Skills You Follow</span>
          <span className="text-sm text-muted-foreground">{followedSkills.length} of 15</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Follow Skills (Up to 15)</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="relative">
            {/* Scroll left button */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full z-10 bg-background shadow-md"
              onClick={() => scrollSkills('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Skills bubbles container */}
            <div 
              ref={skillsContainerRef}
              className="flex overflow-x-auto py-2 px-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-2 flex-wrap">
                {filteredSkills.map((skill) => (
                  <Button
                    key={skill}
                    variant={followedSkills.includes(skill) ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full text-sm px-4 transition-all flex gap-1 items-center my-1 ${
                      followedSkills.includes(skill) ? "bg-primary text-white" : "bg-white dark:bg-gray-800"
                    }`}
                    onClick={() => toggleFollowSkill(skill)}
                  >
                    {followedSkills.includes(skill) ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Scroll right button */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full z-10 bg-background shadow-md"
              onClick={() => scrollSkills('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Your followed skills:</h3>
            <div className="flex flex-wrap gap-2">
              {followedSkills.length > 0 ? (
                followedSkills.map(skill => (
                  <Badge key={skill} variant="outline" className="bg-primary/10 text-primary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">You haven't followed any skills yet.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowSkillsWidget;
