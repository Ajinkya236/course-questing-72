
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skill } from './types';

// Sample skills data - in a real app, this would come from an API
const mockSkills: Skill[] = [
  { id: 1, name: "Leadership", proficiency: "Knowledge", description: "Leadership skills", courses: [] },
  { id: 2, name: "Project Management", proficiency: "Skill", description: "Project management skills", courses: [] },
  { id: 3, name: "Data Analysis", proficiency: "Awareness", description: "Data analysis skills", courses: [] },
  { id: 4, name: "Machine Learning", proficiency: "Awareness", description: "Machine learning skills", courses: [] },
  { id: 5, name: "React Development", proficiency: "Knowledge", description: "React development skills", courses: [] },
  { id: 6, name: "UX Design", proficiency: "Awareness", description: "UX design skills", courses: [] },
  { id: 7, name: "Cloud Computing", proficiency: "Skill", description: "Cloud computing skills", courses: [] },
  { id: 8, name: "Cybersecurity", proficiency: "Awareness", description: "Cybersecurity skills", courses: [] },
  { id: 9, name: "DevOps", proficiency: "Knowledge", description: "DevOps skills", courses: [] },
  { id: 10, name: "Blockchain", proficiency: "Awareness", description: "Blockchain skills", courses: [] },
];

const SkillSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = mockSkills.filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSelectSkill = (skillId: number) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate(`/skills/${skillId}`);
  };

  return (
    <div className="relative w-full">
      <Popover open={isOpen && searchResults.length > 0} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search skills..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(e.target.value.trim() !== '');
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="max-h-[300px] overflow-auto">
            {searchResults.map((skill) => (
              <Button
                key={skill.id}
                variant="ghost"
                className="w-full justify-start text-left px-4 py-2 hover:bg-accent"
                onClick={() => handleSelectSkill(skill.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.proficiency}</span>
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SkillSearch;
