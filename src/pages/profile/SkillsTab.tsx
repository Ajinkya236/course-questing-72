
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Search,
  Award,
  ArrowUp,
  Clock,
  CheckCircle2
} from 'lucide-react';

// Mock data for user skills
const skillsData = [
  {
    id: "skill-1",
    name: "Leadership",
    category: "Management",
    proficiency: 85,
    courses: 7,
    lastActivity: "2 days ago",
    trending: true
  },
  {
    id: "skill-2",
    name: "Product Strategy",
    category: "Product Management",
    proficiency: 90,
    courses: 5,
    lastActivity: "1 week ago",
    trending: true
  },
  {
    id: "skill-3",
    name: "Data Analysis",
    category: "Analytics",
    proficiency: 75,
    courses: 3,
    lastActivity: "3 days ago",
    trending: false
  },
  {
    id: "skill-4",
    name: "UX Design",
    category: "Design",
    proficiency: 65,
    courses: 4,
    lastActivity: "2 weeks ago",
    trending: false
  },
  {
    id: "skill-5",
    name: "Agile Methodologies",
    category: "Project Management",
    proficiency: 80,
    courses: 6,
    lastActivity: "5 days ago",
    trending: true
  },
  {
    id: "skill-6",
    name: "Business Communication",
    category: "Communication",
    proficiency: 95,
    courses: 8,
    lastActivity: "1 day ago",
    trending: false
  },
  {
    id: "skill-7",
    name: "Strategic Thinking",
    category: "Strategy",
    proficiency: 70,
    courses: 3,
    lastActivity: "1 month ago",
    trending: false
  },
  {
    id: "skill-8",
    name: "Stakeholder Management",
    category: "Management",
    proficiency: 85,
    courses: 5,
    lastActivity: "2 weeks ago",
    trending: false
  }
];

const SkillsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter skills based on search query
  const filteredSkills = searchQuery
    ? skillsData.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : skillsData;
  
  // Group skills by proficiency level
  const expertSkills = filteredSkills.filter(skill => skill.proficiency >= 90);
  const advancedSkills = filteredSkills.filter(skill => skill.proficiency >= 70 && skill.proficiency < 90);
  const intermediateSkills = filteredSkills.filter(skill => skill.proficiency >= 40 && skill.proficiency < 70);
  const beginnerSkills = filteredSkills.filter(skill => skill.proficiency < 40);
  
  // Render skill card
  const renderSkillCard = (skill: typeof skillsData[0]) => (
    <Card key={skill.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">{skill.name}</h3>
              <p className="text-xs text-muted-foreground">{skill.category}</p>
            </div>
            {skill.trending && (
              <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                <ArrowUp className="h-3 w-3" />
                Trending
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Proficiency</span>
              <span>{skill.proficiency}%</span>
            </div>
            <Progress value={skill.proficiency} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>{skill.courses} courses completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Last activity: {skill.lastActivity}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  // Render skill section with title
  const renderSkillSection = (
    title: string, 
    skills: typeof skillsData, 
    icon: React.ReactNode
  ) => (
    skills.length > 0 && (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-bold">{title} ({skills.length})</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(renderSkillCard)}
        </div>
      </div>
    )
  );
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Skills</h2>
        <Button>
          Add Skills
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search skills..." 
          className="pl-10"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-10">
        {renderSkillSection(
          "Expert Level", 
          expertSkills,
          <Award className="h-6 w-6 text-yellow-500" />
        )}
        
        {renderSkillSection(
          "Advanced", 
          advancedSkills,
          <Award className="h-6 w-6 text-blue-500" />
        )}
        
        {renderSkillSection(
          "Intermediate", 
          intermediateSkills,
          <Award className="h-6 w-6 text-green-500" />
        )}
        
        {renderSkillSection(
          "Beginner", 
          beginnerSkills,
          <Award className="h-6 w-6 text-gray-500" />
        )}
        
        {filteredSkills.length === 0 && (
          <div className="text-center p-10 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No skills match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsTab;
