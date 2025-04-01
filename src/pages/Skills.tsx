
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, ChevronRight, TrendingUp } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type Skill = {
  id: string;
  name: string;
  domain_id?: string;
  proficiency?: number | null;
  category?: string;
  trending?: boolean;
};

type ProficiencyLevel = "awareness" | "knowledge" | "mastery";

const SkillsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState<ProficiencyLevel | ''>('');
  const [roleSkills, setRoleSkills] = useState<Skill[]>([]);
  const [recommendedSkills, setRecommendedSkills] = useState<Skill[]>([]);
  const [trendingSkills, setTrendingSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const { getSkillProficiencies, getSkills, getSkillGaps } = useSupabase();

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        setLoading(true);
        
        // Get user's current skills with proficiency
        const proficienciesResponse = await getSkillProficiencies();
        if (proficienciesResponse?.data) {
          setRoleSkills(proficienciesResponse.data);
        }
        
        // Get skill gaps as recommendations
        const gapsResponse = await getSkillGaps();
        if (gapsResponse?.data) {
          setRecommendedSkills(gapsResponse.data);
        }
        
        // Get all skills and filter for trending ones
        const allSkillsResponse = await getSkills();
        if (allSkillsResponse) {
          // For demo purposes, mark random skills as trending
          const randomTrending = allSkillsResponse
            .sort(() => 0.5 - Math.random())
            .slice(0, 6)
            .map(skill => ({ ...skill, trending: true }));
          
          setTrendingSkills(randomTrending);
        }
      } catch (error) {
        console.error('Error fetching skills data:', error);
        toast({
          title: "Error loading skills",
          description: "There was a problem loading your skills data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkillsData();
  }, [getSkillProficiencies, getSkillGaps, getSkills]);

  const getProficiencyColor = (proficiency?: number | null): string => {
    if (!proficiency) return "bg-gray-200 text-gray-700";
    
    if (proficiency < 30) return "bg-blue-100 text-blue-700 border-blue-300";
    if (proficiency < 70) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  const getProficiencyText = (proficiency?: number | null): string => {
    if (!proficiency) return "No proficiency";
    
    if (proficiency < 30) return "Awareness";
    if (proficiency < 70) return "Knowledge";
    return "Mastery";
  };

  const renderSkillBubble = (skill: Skill) => (
    <Link 
      to={`/skills/${skill.id}`} 
      key={skill.id}
      className="no-underline"
    >
      <Badge 
        className={`mr-2 mb-2 py-2 px-3 cursor-pointer hover:opacity-90 transition ${getProficiencyColor(skill.proficiency)}`}
        variant="outline"
      >
        {skill.name}
        {skill.proficiency && <span className="ml-2 text-xs opacity-70">{getProficiencyText(skill.proficiency)}</span>}
      </Badge>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Skills Explorer</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Find and Track Your Skills</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64">
            <Select 
              value={selectedProficiency} 
              onValueChange={value => setSelectedProficiency(value as ProficiencyLevel | '')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Proficiencies</SelectItem>
                <SelectItem value="awareness">Awareness</SelectItem>
                <SelectItem value="knowledge">Knowledge</SelectItem>
                <SelectItem value="mastery">Mastery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="shrink-0">
            Search
          </Button>
        </div>
      </div>
      
      {/* Role Skills Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Role Skills</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/skills/role" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : roleSkills.length > 0 ? (
            <div>
              {roleSkills.map(renderSkillBubble)}
            </div>
          ) : (
            <p className="text-muted-foreground">No role skills found. Add skills to your profile to see them here.</p>
          )}
        </div>
      </div>
      
      {/* Recommended Skills Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Skills</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/skills/recommended" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : recommendedSkills.length > 0 ? (
            <div>
              {recommendedSkills.map(skill => (
                <Link to={`/skills/${skill.id}`} key={skill.id} className="no-underline">
                  <Badge 
                    className="mr-2 mb-2 py-2 px-3 cursor-pointer hover:opacity-90 transition bg-gray-100 text-gray-700 border-gray-300"
                    variant="outline"
                  >
                    {skill.name}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recommended skills found at this time.</p>
          )}
        </div>
      </div>
      
      {/* Trending Skills Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Trending Skills
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/skills/trending" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : trendingSkills.length > 0 ? (
            <div>
              {trendingSkills.map(skill => (
                <Link to={`/skills/${skill.id}`} key={skill.id} className="no-underline">
                  <Badge 
                    className="mr-2 mb-2 py-2 px-3 cursor-pointer hover:opacity-90 transition bg-purple-100 text-purple-700 border-purple-300"
                    variant="outline"
                  >
                    {skill.name}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No trending skills found at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
