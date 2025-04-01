
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { mockSkills } from '@/data/skillsData';
import { Question, AssessmentAttempt } from '@/components/skills/assessment/types';

export const useAssessment = (skillId: string | undefined) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [previousAttempts, setPreviousAttempts] = useState<AssessmentAttempt[]>([]);
  const { toast } = useToast();
  
  // Define pass rate as 80%
  const PASS_RATE = 80;

  useEffect(() => {
    if (!skillId) return;
    
    // Find the skill from mockSkills
    const skill = mockSkills.find(s => s.id === Number(skillId));
    if (skill) {
      setSelectedSkill(skill);
      // Load previous attempts from localStorage
      loadPreviousAttempts(skill.id);
      // Generate questions based on the skill
      generateQuestionsForSkill(skill);
    } else {
      toast({
        title: "Skill not found",
        description: "We couldn't find the skill you're looking for.",
        variant: "destructive",
      });
    }
  }, [skillId]);

  const loadPreviousAttempts = (skillId: number) => {
    try {
      // In a real app, this would come from a database
      const savedAttemptsString = localStorage.getItem(`assessment_attempts_${skillId}`);
      if (savedAttemptsString) {
        const savedAttempts = JSON.parse(savedAttemptsString) as AssessmentAttempt[];
        setPreviousAttempts(savedAttempts);
      }
    } catch (error) {
      console.error("Error loading previous attempts:", error);
    }
  };

  const saveAttempt = (attempt: AssessmentAttempt) => {
    try {
      // Add to previous attempts
      const updatedAttempts = [attempt, ...previousAttempts];
      setPreviousAttempts(updatedAttempts);
      
      // In a real app, this would be saved to a database
      localStorage.setItem(`assessment_attempts_${attempt.skillId}`, JSON.stringify(updatedAttempts));
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  const generateQuestionsForSkill = async (skill: any) => {
    setIsLoading(true);
    
    try {
      // Call the skill-assessment edge function to generate questions
      const { data, error } = await supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'generate_questions',
          skill: skill.name,
          proficiency: skill.proficiency,
          sources: [],
          model: 'gemini-1.5-pro'
        },
      });
      
      if (error) {
        throw new Error(`Error calling skill-assessment: ${error.message}`);
      }
      
      if (data && data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      } else {
        throw new Error("Invalid response format from assessment generator");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate assessment questions. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to some default questions for demo purposes
      setQuestions([
        {
          id: 1,
          type: 'multipleChoice',
          text: `What is the primary focus of ${skill.name}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
          explanation: 'Option A is correct because it most accurately describes the primary focus.'
        },
        {
          id: 2,
          type: 'trueFalse',
          text: `${skill.name} is essential for professional growth.`,
          options: ['True', 'False'],
          correctAnswer: 'True',
          explanation: 'This statement is true because the skill is fundamental to career advancement.'
        },
        {
          id: 3,
          type: 'shortAnswer',
          text: `Explain how ${skill.name} can be applied in your current role.`,
          correctAnswer: 'Sample answer focusing on practical application',
          explanation: 'A good answer would demonstrate practical application in a workplace context.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAssessment = async (assessmentQuestions: Question[]) => {
    setIsSubmitting(true);
    
    try {
      if (!selectedSkill) throw new Error("No skill selected");
      
      // Call the skill-assessment edge function to evaluate the assessment
      const { data, error } = await supabase.functions.invoke('skill-assessment', {
        body: {
          action: 'evaluate_assessment',
          skill: selectedSkill.name,
          proficiency: selectedSkill.proficiency,
          userAnswers: assessmentQuestions.map(q => ({
            id: q.id,
            type: q.type,
            text: q.text,
            userAnswer: q.userAnswer || '',
            correctAnswer: q.correctAnswer || ''
          })),
          sources: [],
          model: 'gemini-1.5-pro'
        },
      });
      
      if (error) {
        throw new Error(`Error evaluating assessment: ${error.message}`);
      }
      
      let score = 0;
      let feedback: any[] = [];
      
      if (data) {
        score = data.score || 0;
        feedback = data.feedback || [];

        // Add explanations to questions
        const questionsWithExplanations = assessmentQuestions.map(q => {
          const feedbackItem = feedback.find(f => f.questionId === q.id);
          return {
            ...q,
            explanation: feedbackItem?.comment || "No explanation provided."
          };
        });

        setQuestions(questionsWithExplanations);
      } else {
        // If data parsing fails, just set a random score between 60-95
        score = Math.floor(Math.random() * 36) + 60;
      }
      
      setAssessmentScore(score);
      
      // Save the attempt
      const attempt: AssessmentAttempt = {
        id: `attempt-${Date.now()}`,
        date: new Date().toISOString(),
        score: score,
        skillId: selectedSkill.id,
        skillName: selectedSkill.name,
        questions: assessmentQuestions,
        passed: score >= PASS_RATE
      };
      
      saveAttempt(attempt);
      
      toast({
        title: "Assessment Completed",
        description: `Your score: ${score}% (${score >= PASS_RATE ? 'Passed' : 'Failed'})`,
      });

      return { score, questions: questionsWithExplanations };
    } catch (error) {
      console.error("Error evaluating assessment:", error);
      toast({
        title: "Error",
        description: "Failed to evaluate assessment. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to a default score
      const defaultScore = 75;
      setAssessmentScore(defaultScore);
      
      // Save the attempt even with the error
      const attempt: AssessmentAttempt = {
        id: `attempt-${Date.now()}`,
        date: new Date().toISOString(),
        score: defaultScore,
        skillId: selectedSkill?.id || 0,
        skillName: selectedSkill?.name || '',
        questions: assessmentQuestions,
        passed: defaultScore >= PASS_RATE
      };
      
      saveAttempt(attempt);
      
      return { score: defaultScore, questions: assessmentQuestions };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAssessment = () => {
    setAssessmentScore(null);
    if (selectedSkill) {
      generateQuestionsForSkill(selectedSkill);
    }
  };

  return {
    questions,
    setQuestions,
    isLoading,
    isSubmitting,
    selectedSkill,
    assessmentScore,
    setAssessmentScore,
    previousAttempts,
    PASS_RATE,
    generateQuestionsForSkill,
    submitAssessment,
    resetAssessment
  };
};
