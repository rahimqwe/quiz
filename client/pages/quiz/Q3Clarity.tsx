import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";
import { useNavigate } from "react-router-dom";
import first from "/first.webp";
export const Q3ClarityScreen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const img = new Image();
    img.src = first;
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 3,
        question_id: "q3",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={3}
      question="Before you start, how clear is your very first step?"
      options={["Crystal", "Kinda", "Vague", "No idea"]}
      answerId="q3_clarity"
      totalScreens={11}
      onNavigateNext={() => navigate("/quiz/interstitial-binary")}
    />
  );
};
