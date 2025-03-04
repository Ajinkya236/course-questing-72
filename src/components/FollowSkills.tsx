
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Search, Plus, Check } from "lucide-react";
import { toast } from "sonner";

const mockSkills = [
  "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork", "Innovation", "Strategy",
  "Artificial Intelligence", "Machine Learning", "Cloud Computing", "DevOps",
  "UX/UI Design", "Digital Marketing", "Content Creation", "SEO", "Data Science"
];

const FollowSkills: React.FC = () => {
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
    <div className="space-y-4 bg-white dark:bg-gray-900 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Follow Skills</h2>
        <Button variant="link" className="gap-1 text-primary">
          View All <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
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
          <div className="flex gap-2 whitespace-nowrap">
            {filteredSkills.map((skill) => (
              <Button
                key={skill}
                variant={followedSkills.includes(skill) ? "default" : "outline"}
                size="sm"
                className={`rounded-full text-sm px-4 transition-all flex gap-1 items-center ${
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
      
      {followedSkills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Your followed skills:</h3>
          <div className="flex flex-wrap gap-2">
            {followedSkills.map(skill => (
              <Badge key={skill} variant="outline" className="bg-primary/10 text-primary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowSkills;
