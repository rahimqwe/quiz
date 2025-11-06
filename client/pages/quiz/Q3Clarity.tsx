import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";
import { useNavigate } from "react-router-dom";
export const Q3ClarityScreen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
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
      question="Have you ever abandoned a planner, app, or productivity system?"
      options={["Yes, too complicated", "Yes, I never used it", "Yes, setup took longer than action", "All of the above"]}
      answerId="q3"
      totalScreens={6}
      // onNavigateNext={() => navigate("/quiz/interstitial-binary")}
    />
  );
};
