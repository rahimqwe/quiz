import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";
export const Q6TaskScreen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 6,
        question_id: "q6",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={6}
      question="What’s the first thing you want to feel after using something to break your overthinking?"
      options={[
        "Relief",
        "Clarity",
        "Forward motion",
        "Pride that I started",
      ]}
      answerId="q6"
      totalScreens={6}
      onNavigateNext={() => navigate("/email")}
    />
  );
};
