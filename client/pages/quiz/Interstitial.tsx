import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import { Lightbulb } from "lucide-react";

export const InterstitialScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useQuiz();

  useEffect(() => {
    setCurrentStep(5.5);
    const timer = setTimeout(() => {
      navigate("/quiz/6");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate, setCurrentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-2xl border border-border p-8 space-y-6 shadow-lg text-center">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl bg-primary/20">
              <Lightbulb className="h-8 w-8 text-secondary" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground">
            You don't need more willpower—just a smaller first step.
          </h3>

          {/* Copy */}
          <p className="text-base text-muted-foreground leading-relaxed">
            We'll surface one physical action and start in under 5 minutes. Keep
            tapping.
          </p>

          {/* Loading indicator */}
          <div className="flex justify-center gap-1 pt-4">
            <div className="h-2 w-2 rounded-full bg-secondary animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-secondary animate-bounce [animation-delay:200ms]" />
            <div className="h-2 w-2 rounded-full bg-secondary animate-bounce [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};
