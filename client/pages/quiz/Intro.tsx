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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-4 py-8 relative">
      {/* Fixed Logo Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center shadow">
          {/* TODO: Replace with your logo image */}
          <img src="/logo.webp" alt="logo" />
        </div>
      </div>
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Icon */}
        <img className="mx-auto w-full max-w-[240px] h-auto object-contain" loading="eager" decoding="async" src="/starting_image.webp" alt="Character" />

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
           What’s Actually Keeping You Stuck?
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Discover your ADHD overthinking pattern — and the fastest way to break the freeze
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="w-full px-6 py-3 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Start Quiz
        </button>
      </div>
      {/* Footer */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center">
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Startminded. All rights reserved.
        </span>
      </div>
    </div>
  );
};
