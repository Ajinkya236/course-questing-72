
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CourseQuizProps {
  quizId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  onComplete: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const CourseQuiz: React.FC<CourseQuizProps> = ({
  quizId,
  title,
  description,
  questions,
  onComplete,
  isFullscreen,
  toggleFullscreen
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answer
    });
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion.id] === null || selectedAnswers[currentQuestion.id] === undefined) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      
      // Show results
      setShowResults(true);
      
      // Trigger confetti if score is good
      if (finalScore >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleFinish = () => {
    onComplete();
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}% on this quiz.`,
    });
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 bg-background z-50 p-4 overflow-y-auto' : 'w-full'}`}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleFullscreen}
              className="rounded-full"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <CardTitle className="font-heading">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {!showResults && (
            <>
              <div className="mt-4 flex justify-between text-sm">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{progress.toFixed(0)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2 mt-2" />
            </>
          )}
        </CardHeader>

        <CardContent>
          {showResults ? (
            <div className="text-center py-6 space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
                <CheckCircle className={`h-12 w-12 ${score >= 70 ? 'text-primary' : 'text-amber-500'}`} />
              </div>
              <div>
                <h3 className="text-2xl font-heading mb-2">Quiz Completed!</h3>
                <p className="text-xl mb-1">Your Score: <span className="font-bold">{score}%</span></p>
                <p className="text-muted-foreground">
                  {score >= 70 ? 'Great job! You passed the quiz.' : 'Keep learning and try again!'}
                </p>
              </div>
              <div className="pt-4">
                <Progress value={score} className="h-3 mb-2" />
                <div className="flex justify-between text-sm">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 space-y-6">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              <RadioGroup
                value={selectedAnswers[currentQuestion.id]?.toString() || ""}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/30 cursor-pointer">
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`option-${index}`} 
                        className="w-5 h-5"
                      />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          {showResults ? (
            <Button 
              onClick={handleFinish} 
              size="lg"
              className="gap-2"
            >
              Complete Quiz <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleNext} 
              size="lg"
              className="gap-2"
              disabled={selectedAnswers[currentQuestion.id] === undefined}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>Next Question <ChevronRight className="h-4 w-4" /></>
              ) : (
                <>Finish Quiz <ChevronRight className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseQuiz;
