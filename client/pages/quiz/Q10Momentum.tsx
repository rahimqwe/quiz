import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q10MomentumScreen: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 12,
        question_id: "q10",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={10}
      question="Once you start, what usually happens?"
      options={["I stop quickly", "I keep going", "It depends"]}
      answerId="q10_after_start"
      totalScreens={11}
    />
  );
};
