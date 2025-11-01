import React, { useEffect } from "react";
import { useQuiz } from "@/hooks/use-quiz";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

export const IntroScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useQuiz();

  useEffect(() => {
    // Fire analytics event
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "quiz_start" });
    }
    setCurrentStep(0);
  }, [setCurrentStep]);

  const handleStart = () => {
    navigate("/quiz/1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-primary/20">
            <Zap className="h-8 w-8 text-secondary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            Can't start? Let's flip your brain from OFF → ON in 5 minutes.
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            This isn't a planner or a system. It's a fast activation method made
            for ADHD brains.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Start (30–60 seconds)
        </button>

        {/* Subtext */}
        <p className="text-xs text-muted-foreground">
          No email required to start. You can save your results after.
        </p>
      </div>
    </div>
  );
};
