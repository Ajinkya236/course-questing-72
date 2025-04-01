
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
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

  // Function to search skills
  const searchSkills = (query: string) => {
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return mockSkills
      .filter(skill => 
        skill.name.toLowerCase().includes(normalizedQuery) ||
        (skill.description && skill.description.toLowerCase().includes(normalizedQuery))
      )
      .slice(0, 12); // Limit to 12 results for better UX
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    // Start searching when user types at least 2 characters
    if (searchQuery.trim().length >= 2) {
      const results = searchSkills(searchQuery);
      setSearchResults(results);
      setIsOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSelectSkill = (skillId: number) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate(`/skills/${skillId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search skills by name or description..."
              className="w-full pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleClearSearch();
                }
              }}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0" align="start">
          <div className="max-h-[400px] overflow-auto">
            {searchResults.length > 0 ? (
              <div>
                <div className="px-4 py-2 text-xs text-muted-foreground border-b">
                  Search results ({searchResults.length})
                </div>
                <div>
                  {searchResults.map((skill) => (
                    <Button
                      key={skill.id}
                      variant="ghost"
                      className="w-full justify-start text-left px-4 py-3 hover:bg-accent rounded-none"
                      onClick={() => handleSelectSkill(skill.id)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs text-muted-foreground max-w-[200px] truncate">
                            {skill.description || "No description available"}
                          </span>
                          <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {skill.proficiency}
                          </span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                {searchQuery.length < 2 
                  ? "Type at least 2 characters to search" 
                  : "No skills found. Try different search terms."}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SkillSearch;
