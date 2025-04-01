
import React, { useState, useEffect, useRef } from 'react';
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
import { mockSkills } from '@/data/skillsData';

const SkillSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Only start searching when user types at least 3 characters
    if (searchQuery.trim().length >= 3) {
      const filtered = mockSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 10)); // Limit to 10 results for better UX
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSelectSkill = (skillId: number) => {
    setIsOpen(false);
    navigate(`/skills/${skillId}`);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim().length >= 3) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay closing the popover to allow for clicking on results
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        setIsOpen(false);
      }
    }, 200);
  };

  return (
    <div className="relative w-full">
      <Popover open={isOpen && searchResults.length > 0} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search skills..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length >= 3) {
                  setIsOpen(true);
                } else {
                  setIsOpen(false);
                }
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="max-h-[300px] overflow-auto">
            {searchResults.length > 0 ? (
              searchResults.map((skill) => (
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
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                Start typing to search skills (minimum 3 characters)
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SkillSearch;
