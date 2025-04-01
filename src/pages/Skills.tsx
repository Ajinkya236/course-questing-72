
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SkillSearch from '@/components/skills/SkillSearch';
import { mockSkills, proficiencyColors, getIconByName } from '@/data/skillsData';

const Skills: React.FC = () => {
  const [proficiency, setProficiency] = useState("");
  
  // Refs for carousel scrolling
  const roleCarouselRef = useRef<HTMLDivElement>(null);
  const recommendedCarouselRef = useRef<HTMLDivElement>(null);
  const trendingCarouselRef = useRef<HTMLDivElement>(null);
  
  // Make sure mockSkills is defined and initialize filteredSkills safely
  const filteredSkills = mockSkills ? mockSkills.filter(skill => {
    const matchesProficiency = proficiency ? skill.proficiency === proficiency : true;
    return matchesProficiency;
  }) : [];
  
  // Safely filter categories
  const roleSkills = filteredSkills.filter(skill => skill.category === "role");
  const recommendedSkills = filteredSkills.filter(skill => skill.category === "recommended");
  const trendingSkills = filteredSkills.filter(skill => skill.category === "trending");
  
  // Function to scroll carousel
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-heading text-gray-800 mb-6">Skills Development Hub</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <SkillSearch />
          </div>
          <div className="w-full md:w-64">
            <Select value={proficiency} onValueChange={setProficiency}>
              <SelectTrigger>
                <SelectValue placeholder="Proficiency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Proficiency Levels</SelectItem>
                <SelectItem value="Awareness">Awareness</SelectItem>
                <SelectItem value="Knowledge">Knowledge</SelectItem>
                <SelectItem value="Skill">Skill</SelectItem>
                <SelectItem value="Mastery">Mastery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Role-based Skills */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading text-gray-700">Skills for Your Role</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel(roleCarouselRef, 'left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel(roleCarouselRef, 'right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={roleCarouselRef} 
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {roleSkills && roleSkills.length > 0 ? (
            roleSkills.map((skill) => (
              <SkillBubble 
                key={skill.id} 
                skill={skill} 
              />
            ))
          ) : (
            <p className="text-gray-500">No role-based skills match your criteria.</p>
          )}
        </div>
      </section>
      
      {/* Recommended Skills */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading text-gray-700">Recommended Skills</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel(recommendedCarouselRef, 'left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel(recommendedCarouselRef, 'right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={recommendedCarouselRef} 
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {recommendedSkills && recommendedSkills.length > 0 ? (
            recommendedSkills.map((skill) => (
              <SkillBubble 
                key={skill.id} 
                skill={skill} 
              />
            ))
          ) : (
            <p className="text-gray-500">No recommended skills match your criteria.</p>
          )}
        </div>
      </section>
      
      {/* Trending Skills */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading text-gray-700">Trending Skills</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel(trendingCarouselRef, 'left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel(trendingCarouselRef, 'right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={trendingCarouselRef} 
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {trendingSkills && trendingSkills.length > 0 ? (
            trendingSkills.map((skill) => (
              <SkillBubble 
                key={skill.id} 
                skill={skill} 
              />
            ))
          ) : (
            <p className="text-gray-500">No trending skills match your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

interface SkillProps {
  skill: {
    id: number;
    name: string;
    proficiency: string;
    category: string;
    icon: string;
    description?: string;
  };
}

const SkillBubble: React.FC<SkillProps> = ({ skill }) => {
  const IconComponent = getIconByName(skill.icon);
  
  return (
    <Link to={`/skills/${skill.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer min-w-[210px] max-w-[300px] bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center py-2">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            <h3 className="skill-title text-lg mb-2">{skill.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs ${proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]}`}>
              {skill.proficiency}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Skills;
