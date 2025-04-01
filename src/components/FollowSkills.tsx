
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { X, Plus, Search, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FollowSkillsProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const FollowSkills: React.FC<FollowSkillsProps> = ({ 
  title = "Follow Skills",
  subtitle = "Select skills to personalize your learning experience",
  className = ""
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "JavaScript", "React", "TypeScript", "Node.js", "Design"
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSkillsDialog, setShowSkillsDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const MAX_SKILLS = 10;

  // Sample skills list
  const allSkills = [
    "JavaScript", "React", "TypeScript", "Node.js", "Python", "Java", "C#", "PHP", 
    "Ruby", "Swift", "Kotlin", "Go", "Rust", "SQL", "MongoDB", "Redis", "AWS", 
    "Azure", "Docker", "Kubernetes", "DevOps", "Machine Learning", "AI", "Data Science", 
    "Blockchain", "UX/UI", "Design", "Product Management", "Agile", "Scrum", 
    "Leadership", "Communication", "Project Management", "Marketing"
  ];
  
  // Filter skills based on search query and exclude already selected skills
  const filteredSkills = allSkills
    .filter(skill => 
      skill.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !selectedSkills.includes(skill)
    )
    .slice(0, 10); // Limit to 10 results for better UX
  
  const handleAddSkill = (skill: string) => {
    if (selectedSkills.length >= MAX_SKILLS) {
      toast({
        title: "Maximum skills reached",
        description: `You can follow a maximum of ${MAX_SKILLS} skills.`,
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    // Clear search after adding
    setSearchQuery('');
    // Focus back on input after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };
  
  // Focus input when dialog opens
  useEffect(() => {
    if (showSkillsDialog && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSkillsDialog]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map(skill => (
          <Badge key={skill} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
            <span>{skill}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 p-0 ml-1 hover:bg-muted rounded-full"
              onClick={() => handleRemoveSkill(skill)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill}</span>
            </Button>
          </Badge>
        ))}
        
        <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowSkillsDialog(true)}>
          View All Skills
        </Button>
      </div>
      
      {/* Skills Management Dialog */}
      <Dialog open={showSkillsDialog} onOpenChange={setShowSkillsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Your Skills</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Follow skills to personalize your learning</span>
              <span className="text-xs text-muted-foreground">
                {selectedSkills.length}/{MAX_SKILLS} skills selected
              </span>
            </div>
            
            {selectedSkills.length >= MAX_SKILLS && (
              <div className="flex items-center gap-2 p-2 bg-yellow-50 text-yellow-800 rounded text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Maximum {MAX_SKILLS} skills limit reached</span>
              </div>
            )}
            
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Search skills..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Search results */}
            {searchQuery && filteredSkills.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium">Search Results</p>
                {filteredSkills.map(skill => (
                  <Button
                    key={skill}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-left"
                    onClick={() => handleAddSkill(skill)}
                    disabled={selectedSkills.length >= MAX_SKILLS}
                  >
                    <Plus className="h-3 w-3" />
                    {skill}
                  </Button>
                ))}
              </div>
            )}
            
            {searchQuery && filteredSkills.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                No skills found matching "{searchQuery}"
              </p>
            )}
            
            {!searchQuery && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Popular Skills</p>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {allSkills
                    .filter(skill => !selectedSkills.includes(skill))
                    .slice(0, 10)
                    .map(skill => (
                      <Button
                        key={skill}
                        variant="ghost"
                        size="sm"
                        className="justify-start gap-1 text-left"
                        onClick={() => handleAddSkill(skill)}
                        disabled={selectedSkills.length >= MAX_SKILLS}
                      >
                        <Plus className="h-3 w-3" />
                        {skill}
                      </Button>
                    ))}
                </div>
              </div>
            )}
            
            {/* Selected skills */}
            {selectedSkills.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <h4 className="font-medium text-sm mb-2">Your Selected Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSkills.map(skill => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                      <span>{skill}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0 ml-1 hover:bg-muted rounded-full"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowSkillsDialog(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowSkills;
