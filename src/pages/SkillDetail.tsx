
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockSkills } from '@/data/skillsData';
import { ChatMessage } from '@/components/skills/ChatInterface';
import SkillDetailLoader from '@/components/skills/detail/SkillDetailLoader';
import SkillNotFound from '@/components/skills/detail/SkillNotFound';
import SkillDetailLayout from '@/components/skills/detail/SkillDetailLayout';
import { Source } from '@/components/skills/knowledge/types';

const SkillDetail: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const [activeTab, setActiveTab] = useState('chat'); // Default to chat tab
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState<any>(null);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedProficiency, setSelectedProficiency] = useState<string>('');
  
  useEffect(() => {
    // Add a small delay to simulate loading (can be removed in production)
    const timer = setTimeout(() => {
      if (skillId) {
        console.log("Looking for skill with ID:", skillId);
        
        let foundSkill = null;
        
        // Try to find by numeric ID first
        const numericId = parseInt(skillId);
        
        // Check if it's a valid number
        if (!isNaN(numericId)) {
          console.log("Searching for numeric ID:", numericId);
          foundSkill = mockSkills.find(s => s.id === numericId);
          
          // Debug: Log the matched skill if found
          if (foundSkill) {
            console.log("Found skill by ID:", foundSkill);
          } else {
            console.log("No skill found with ID:", numericId);
            // Debug: Log available IDs
            console.log("Available IDs:", mockSkills.map(s => s.id));
          }
        }
        
        // If not found by ID, try by name (case insensitive)
        if (!foundSkill) {
          console.log("Searching by name:", skillId);
          foundSkill = mockSkills.find(s => 
            s.name.toLowerCase() === skillId.toLowerCase() ||
            s.name.toLowerCase().includes(skillId.toLowerCase())
          );
          
          if (foundSkill) {
            console.log("Found skill by name:", foundSkill);
          }
        }
        
        if (foundSkill) {
          setSkill(foundSkill);
          setSelectedProficiency(foundSkill.proficiency);
          
          // Add welcome message to chat
          setChatMessages([{
            role: 'assistant',
            content: `# Welcome to ${foundSkill.name} at ${foundSkill.proficiency} level\n\nI'm your AI learning assistant. Ask me anything about ${foundSkill.name} or use the learning tools on the right to generate resources.`
          }]);
        } else {
          console.log("No skill found for ID or name:", skillId);
          setSkill(null);
        }
      }
      
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [skillId]);

  const handleProficiencyChange = (newProficiency: string) => {
    setSelectedProficiency(newProficiency);
    
    // Update welcome message based on new proficiency
    if (skill) {
      setChatMessages([{
        role: 'assistant',
        content: `# Welcome to ${skill.name} at ${newProficiency} level\n\nI've updated the proficiency level to ${newProficiency}. How can I help you with ${skill.name}?`
      }]);
    }
  };

  if (isLoading) {
    return <SkillDetailLoader />;
  }
  
  if (!skill) {
    return <SkillNotFound />;
  }

  const skillWithCustomProficiency = {
    ...skill,
    proficiency: selectedProficiency
  };

  return (
    <SkillDetailLayout
      skill={skillWithCustomProficiency}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      sources={sources}
      setSources={setSources}
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
      isGeneratingPodcast={isGeneratingPodcast}
      setIsGeneratingPodcast={setIsGeneratingPodcast}
      onProficiencyChange={handleProficiencyChange}
    />
  );
};

export default SkillDetail;
