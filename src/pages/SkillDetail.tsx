
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockSkills } from '@/data/skillsData';
import { ChatMessage } from '@/components/skills/ChatInterface';
import SkillDetailLoader from '@/components/skills/detail/SkillDetailLoader';
import SkillNotFound from '@/components/skills/detail/SkillNotFound';
import SkillDetailLayout from '@/components/skills/detail/SkillDetailLayout';

const SkillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('learning');
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState<any>(null);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  
  useEffect(() => {
    // Add a small delay to simulate loading (can be removed in production)
    setTimeout(() => {
      if (id) {
        console.log("Looking for skill with ID:", id);
        
        let foundSkill = null;
        
        // Try to find by string ID first
        const numericId = parseInt(id);
        
        // Check if it's a valid number
        if (!isNaN(numericId)) {
          console.log("Searching for numeric ID:", numericId);
          foundSkill = mockSkills.find(s => s.id === numericId);
        }
        
        // If not found by ID, try by name (case insensitive)
        if (!foundSkill) {
          console.log("Searching by name:", id);
          foundSkill = mockSkills.find(s => 
            s.name.toLowerCase() === id.toLowerCase() ||
            s.name.toLowerCase().includes(id.toLowerCase())
          );
        }
        
        // Debug: Log all available skills
        console.log("Available skills:", mockSkills.map(s => ({ id: s.id, name: s.name })));
        
        if (foundSkill) {
          console.log("Found skill:", foundSkill);
          setSkill(foundSkill);
        } else {
          console.log("No skill found for ID or name:", id);
          // If we're here, no skill was found. Let's set skill to null explicitly
          setSkill(null);
        }
      }
      
      setIsLoading(false);
    }, 300);
  }, [id]);

  if (isLoading) {
    return <SkillDetailLoader />;
  }
  
  if (!skill) {
    return <SkillNotFound />;
  }

  return (
    <SkillDetailLayout
      skill={skill}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      sources={sources}
      setSources={setSources}
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
      isGeneratingPodcast={isGeneratingPodcast}
      setIsGeneratingPodcast={setIsGeneratingPodcast}
    />
  );
};

export default SkillDetail;
