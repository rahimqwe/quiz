import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q1PatternScreen: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 1,
        question_id: "q1",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={1}
      question="Which of these feels most familiar when you try to get started on something?"
      options={[
        "I plan the perfect way to start… but never do",
        "I bounce between options and pick nothing",
        "I read/watch too much, then shut down",
        "I overthink a message or reply… and ghost them instead",
      ]}
      answerId="q1"
      totalScreens={6}
    />
  );
};
