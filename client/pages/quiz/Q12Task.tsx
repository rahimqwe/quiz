import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import { ProgressBar } from "@/components/quiz/ProgressBar";

export const Q12TaskScreen: React.FC = () => {
  const navigate = useNavigate();
  const { answers, setAnswer, setCurrentStep } = useQuiz();
  const [taskText, setTaskText] = useState(answers.q12_tasktext);

  useEffect(() => {
    setCurrentStep(12);
  }, [setCurrentStep]);

  const handleContinue = () => {
    if (taskText.trim()) {
      setAnswer("q12_tasktext", taskText.trim());
    }

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "q_answered",
        question_number: 12,
        answer: taskText || "skipped",
      });
    }

    navigate("/loading");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Progress Bar */}
        <ProgressBar current={12} total={12} />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Name one task you're avoiding.
          </h2>

          {/* Input */}
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Homepage headline / Email client X / Study chapter 3"
            aria-label="Name one task you're avoiding"
            className="w-full px-6 py-4 rounded-lg border-2 border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
          />

          {/* Note */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Optional, but it helps us personalize your results. You can skip if you'd like.
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            See my Start Profile →
          </button>
        </div>
      </div>
    </div>
  );
};
