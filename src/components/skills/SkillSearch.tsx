
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { mockSkills } from '@/data/skillsData';
import { useNavigate } from 'react-router-dom';

interface SkillSearchProps {
  onSelectSkill?: (id: string) => void;
}

const SkillSearch: React.FC<SkillSearchProps> = ({ onSelectSkill }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filteredSkills = mockSkills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filteredSkills);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSelectSkill = (skillId: number | string) => {
    setShowResults(false);
    setSearchQuery('');
    
    console.log("Selected skill ID:", skillId);
    
    if (onSelectSkill) {
      onSelectSkill(skillId.toString());
    } else {
      navigate(`/skills/${skillId}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSelectSkill(searchResults[0].id);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search for skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchQuery.trim().length > 0) {
              setShowResults(true);
            }
          }}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto">
          {searchResults.map((skill) => (
            <div
              key={skill.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelectSkill(skill.id)}
            >
              <div className="font-medium">{skill.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{skill.proficiency}</div>
            </div>
          ))}
        </div>
      )}

      {showResults && searchQuery && searchResults.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">No skills found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default SkillSearch;
