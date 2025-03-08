
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, Plus, Star } from 'lucide-react';

interface SkillsSelectDialogProps {
  trigger?: React.ReactNode;
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsSelectDialog: React.FC<SkillsSelectDialogProps> = ({
  trigger,
  selectedSkills = [],
  onSkillsChange
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [localSelectedSkills, setLocalSelectedSkills] = useState<string[]>(selectedSkills);
  
  const allSkills = [
    "JavaScript", "TypeScript", "React", "Vue", "Angular", 
    "Node.js", "Python", "Java", "C#", ".NET",
    "Product Management", "UI/UX Design", "DevOps", "Cloud Architecture",
    "Data Science", "Machine Learning", "Artificial Intelligence",
    "Project Management", "Agile", "Scrum", "Leadership",
    "Communication", "Presentation", "Public Speaking"
  ];
  
  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleSkill = (skill: string) => {
    let newSkills: string[];
    
    if (localSelectedSkills.includes(skill)) {
      newSkills = localSelectedSkills.filter(s => s !== skill);
    } else {
      newSkills = [...localSelectedSkills, skill];
    }
    
    setLocalSelectedSkills(newSkills);
  };
  
  const handleSave = () => {
    onSkillsChange(localSelectedSkills);
    setOpen(false);
  };
  
  const handleCancel = () => {
    setLocalSelectedSkills(selectedSkills); // Reset to original selection
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full mt-2 gap-2">
            <Star className="h-4 w-4" />
            View All Skills You Follow
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Skills You Follow</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Selected Skills</h4>
              <div className="flex flex-wrap gap-2 min-h-10">
                {localSelectedSkills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No skills selected</p>
                ) : (
                  localSelectedSkills.map(skill => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button 
                        onClick={() => toggleSkill(skill)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Available Skills</h4>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {filteredSkills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No skills found</p>
                ) : (
                  filteredSkills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant={localSelectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      {localSelectedSkills.includes(skill) ? (
                        <X className="ml-1 h-3 w-3" />
                      ) : (
                        <Plus className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsSelectDialog;
