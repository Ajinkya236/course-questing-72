
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SkillSearch from '../skills/SkillSearch';

interface SearchBarProps {
  isSkillsPage: boolean;
  onFocus: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isSkillsPage, onFocus }) => {
  return (
    <div className="relative hidden md:block w-48 lg:w-64">
      {isSkillsPage ? (
        <div className="w-full relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search skills..."
            className="w-full rounded-lg pl-8 bg-background"
            onFocus={onFocus}
          />
        </div>
      ) : (
        <>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg pl-8 bg-background"
            onFocus={onFocus}
          />
        </>
      )}
    </div>
  );
};

export default SearchBar;
