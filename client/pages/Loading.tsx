import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";

const messages = [
  "Analyzing your answers…",
  "Identifying your overthinking pattern...",
  "Almost there — preparing your results...",
];

export const LoadingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { calculateOutcome, setOutcome } = useQuiz();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Calculate the outcome
    const outcome = calculateOutcome();
    setOutcome(outcome);

    // Fire outcome assigned event
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "outcome_assigned",
        outcome: outcome,
      });
    }

    // Cycle through messages
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => {
        const next = (prev + 1) % messages.length;
        if (next === 0) {
          // All messages shown, navigate to results
          setTimeout(() => {
            navigate("/results");
          }, 800);
          return prev;
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(messageTimer);
  }, [calculateOutcome, setOutcome, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          <div className="h-3 w-3 rounded-full bg-secondary animate-bounce" />
          <div className="h-3 w-3 rounded-full bg-secondary animate-bounce [animation-delay:200ms]" />
          <div className="h-3 w-3 rounded-full bg-secondary animate-bounce [animation-delay:400ms]" />
        </div>

        {/* Message */}
        <p className="text-xl font-medium text-foreground">
          {messages[messageIndex]}
        </p>

        {/* Progress */}
        <p className="text-sm text-muted-foreground">
          {Math.round((messageIndex / messages.length) * 100)}% complete
        </p>
      </div>
    </div>
  );
};
