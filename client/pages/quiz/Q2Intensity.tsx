import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q2IntensityScreen: React.FC = () => {
  useEffect(() => {
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "quiz_step_view",
          step: 2,
          question_id: "q2",
        });
      }
    }, []);
  return (
    <QuizScreenTemplate
      screenNumber={2}
      question="When you're frozen or stuck, what tends to happen in your head?"
      options={[
        "I mentally replay the task over and over", 
        "I feel a rush of overwhelm and shut down", 
        "I want to start… but feel like I can’t move", 
        "I just avoid it and pretend it’s not there"
      ]}
      answerId="q2"
      totalScreens={6}
    />
  );
};
