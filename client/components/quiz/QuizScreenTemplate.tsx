import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import { ProgressBar } from "./ProgressBar";
import { OptionCard } from "./OptionCard";
import { ArrowLeft } from "lucide-react";

interface QuizScreenTemplateProps {
  screenNumber: number;
  question: string;
  options: string[];
  answerId: string;
  totalScreens: number;
  onNavigateNext?: () => void;
}

export const QuizScreenTemplate: React.FC<QuizScreenTemplateProps> = ({
  screenNumber,
  question,
  options,
  answerId,
  totalScreens,
  onNavigateNext,
}) => {
  const navigate = useNavigate();
  const { answers, setAnswer, setCurrentStep } = useQuiz();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setCurrentStep(screenNumber);
    // Find selected index based on current answer
    const currentAnswer = (answers as any)[answerId];
    if (currentAnswer) {
      setSelectedIndex(options.indexOf(currentAnswer));
    }
  }, [screenNumber, setCurrentStep, answerId, answers, options]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleOptionClick(selectedIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, options.length]);

  const handleOptionClick = (index: number) => {
    const selectedValue = options[index];
    setAnswer(answerId as any, selectedValue);
    setSelectedIndex(index);

    // Fire analytics event
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "q_answered",
        question_number: screenNumber,
        answer: selectedValue,
      });
    }

    // Auto-advance after selection
    setTimeout(() => {
      if (onNavigateNext) {
        onNavigateNext();
      } else if (screenNumber < 12) {
        navigate(`/quiz/${screenNumber + 1}`);
      } else {
        navigate("/loading");
      }
    }, 500);
  };

  const handleBack = () => {
    if (screenNumber > 1) {
      navigate(`/quiz/${screenNumber - 1}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
          aria-label="Go back to previous question"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Progress Bar */}
        <ProgressBar current={screenNumber} total={totalScreens} />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <OptionCard
                key={index}
                label={option}
                isSelected={selectedIndex === index}
                onClick={() => handleOptionClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
