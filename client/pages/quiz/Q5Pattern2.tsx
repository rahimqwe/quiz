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
        step: 6,
        question_id: "q5",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={5}
      question="Which start pattern feels most like you?"
      options={[
        "All-or-nothing (dead stop → all-night sprint)",
        "Endless prep (notes, tools, 'perfect system')",
        "Avoidance until panic → then I move",
        "Start tiny bursts, fizzle fast",
      ]}
      answerId="q5_pattern2"
      totalScreens={11}
      onNavigateNext={() => navigate("/quiz/6")}
    />
  );
};
