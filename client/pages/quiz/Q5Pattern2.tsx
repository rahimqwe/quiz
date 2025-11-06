import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q5Pattern2Screen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 5,
        question_id: "q5",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={5}
      question="How long would you realistically spend trying to get unstuck… in the moment?"
      options={[
        "1 minute",
        "3 minutes",
        "5 minutes",
        "If it actually helped me move, I’d try it",
      ]}
      answerId="q5"
      totalScreens={6}
    />
  );
};
