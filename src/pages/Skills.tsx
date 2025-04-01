
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { mockCourses } from '@/data/mockCoursesData';
import { ChevronLeft, ChevronRight, BrainCircuit, Lightbulb, TrendingUp, Award, Rocket } from 'lucide-react';
import SkillSearch from '@/components/skills/SkillSearch';

// Mock skills data - in a real app, this would come from your API
const mockSkills = [
  { id: 1, name: "Leadership", proficiency: "Knowledge", category: "role", icon: "Award" },
  { id: 2, name: "Project Management", proficiency: "Skill", category: "role", icon: "BrainCircuit" },
  { id: 3, name: "Data Analysis", proficiency: "Awareness", category: "role", icon: "Lightbulb" },
  { id: 4, name: "Machine Learning", proficiency: "Awareness", category: "recommended", icon: "BrainCircuit" },
  { id: 5, name: "React Development", proficiency: "Knowledge", category: "recommended", icon: "Rocket" },
  { id: 6, name: "UX Design", proficiency: "Awareness", category: "recommended", icon: "Lightbulb" },
  { id: 7, name: "Cloud Computing", proficiency: "Skill", category: "trending", icon: "TrendingUp" },
  { id: 8, name: "Cybersecurity", proficiency: "Awareness", category: "trending", icon: "BrainCircuit" },
  { id: 9, name: "DevOps", proficiency: "Knowledge", category: "trending", icon: "Rocket" },
  { id: 10, name: "Blockchain", proficiency: "Awareness", category: "trending", icon: "TrendingUp" },
];

// Proficiency color mapping
const proficiencyColors = {
  "Awareness": "bg-blue-100 text-blue-800",
  "Knowledge": "bg-purple-100 text-purple-800",
  "Skill": "bg-green-100 text-green-800",
  "Mastery": "bg-orange-100 text-orange-800",
};

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [proficiency, setProficiency] = useState("");
  
  // Refs for carousel scrolling
  const roleCarouselRef = useRef<HTMLDivElement>(null);
  const recommendedCarouselRef = useRef<HTMLDivElement>(null);
  const trendingCarouselRef = useRef<HTMLDivElement>(null);
  
  // Filter skills based on selected proficiency
  const filteredSkills = mockSkills.filter(skill => {
    const matchesProficiency = proficiency ? skill.proficiency === proficiency : true;
    return matchesProficiency;
  });
  
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

  // Function to get the right icon component
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Award': return <Award className="h-8 w-8 text-primary mb-2" />;
      case 'BrainCircuit': return <BrainCircuit className="h-8 w-8 text-primary mb-2" />;
      case 'Lightbulb': return <Lightbulb className="h-8 w-8 text-primary mb-2" />;
      case 'Rocket': return <Rocket className="h-8 w-8 text-primary mb-2" />;
      case 'TrendingUp': return <TrendingUp className="h-8 w-8 text-primary mb-2" />;
      default: return <BrainCircuit className="h-8 w-8 text-primary mb-2" />;
    }
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-gray-800 mb-6">Skills Development Hub</h1>
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
                  <SelectItem value="all-levels">All Proficiency Levels</SelectItem>
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
            <h2 className="text-2xl font-heading text-gray-700">Skills for Your Role</h2>
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
            {roleSkills.length > 0 ? (
              roleSkills.map((skill) => (
                <SkillBubble 
                  key={skill.id} 
                  skill={skill} 
                  iconComponent={getIconComponent(skill.icon)}
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
            <h2 className="text-2xl font-heading text-gray-700">Recommended Skills</h2>
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
            {recommendedSkills.length > 0 ? (
              recommendedSkills.map((skill) => (
                <SkillBubble 
                  key={skill.id} 
                  skill={skill} 
                  iconComponent={getIconComponent(skill.icon)}
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
            <h2 className="text-2xl font-heading text-gray-700">Trending Skills</h2>
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
            {trendingSkills.length > 0 ? (
              trendingSkills.map((skill) => (
                <SkillBubble 
                  key={skill.id} 
                  skill={skill} 
                  iconComponent={getIconComponent(skill.icon)}
                />
              ))
            ) : (
              <p className="text-gray-500">No trending skills match your criteria.</p>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

interface SkillProps {
  skill: {
    id: number;
    name: string;
    proficiency: string;
    category: string;
    icon: string;
  };
  iconComponent: React.ReactNode;
}

const SkillBubble: React.FC<SkillProps> = ({ skill, iconComponent }) => {
  return (
    <Link to={`/skills/${skill.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer min-w-[210px] max-w-[300px]">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center py-2">
            {iconComponent}
            <h3 className="font-sans text-lg mb-2">{skill.name}</h3>
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
