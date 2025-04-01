
import React, { useState } from 'react';
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
import { mockData } from '@/data/mockData';

// Mock skills data - in a real app, this would come from your API
const mockSkills = [
  { id: 1, name: "Leadership", proficiency: "Knowledge", category: "role" },
  { id: 2, name: "Project Management", proficiency: "Skill", category: "role" },
  { id: 3, name: "Data Analysis", proficiency: "Awareness", category: "role" },
  { id: 4, name: "Machine Learning", proficiency: "Awareness", category: "recommended" },
  { id: 5, name: "React Development", proficiency: "Knowledge", category: "recommended" },
  { id: 6, name: "UX Design", proficiency: "Awareness", category: "recommended" },
  { id: 7, name: "Cloud Computing", proficiency: "Skill", category: "trending" },
  { id: 8, name: "Cybersecurity", proficiency: "Awareness", category: "trending" },
  { id: 9, name: "DevOps", proficiency: "Knowledge", category: "trending" },
  { id: 10, name: "Blockchain", proficiency: "Awareness", category: "trending" },
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
  
  // Filter skills based on search query and selected proficiency
  const filteredSkills = mockSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProficiency = proficiency ? skill.proficiency === proficiency : true;
    return matchesSearch && matchesProficiency;
  });
  
  const roleSkills = filteredSkills.filter(skill => skill.category === "role");
  const recommendedSkills = filteredSkills.filter(skill => skill.category === "recommended");
  const trendingSkills = filteredSkills.filter(skill => skill.category === "trending");
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Skills Development Hub</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search for skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
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
          <h2 className="text-2xl font-semibold mb-4">Skills for Your Role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {roleSkills.length > 0 ? (
              roleSkills.map((skill) => (
                <SkillBubble key={skill.id} skill={skill} />
              ))
            ) : (
              <p className="text-gray-500">No role-based skills match your criteria.</p>
            )}
          </div>
        </section>
        
        {/* Recommended Skills */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Recommended Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedSkills.length > 0 ? (
              recommendedSkills.map((skill) => (
                <SkillBubble key={skill.id} skill={skill} />
              ))
            ) : (
              <p className="text-gray-500">No recommended skills match your criteria.</p>
            )}
          </div>
        </section>
        
        {/* Trending Skills */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Trending Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingSkills.length > 0 ? (
              trendingSkills.map((skill) => (
                <SkillBubble key={skill.id} skill={skill} />
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
  };
}

const SkillBubble: React.FC<SkillProps> = ({ skill }) => {
  return (
    <Link to={`/skills/${skill.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium text-lg mb-2">{skill.name}</h3>
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
