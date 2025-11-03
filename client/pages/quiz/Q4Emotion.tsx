import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q4EmotionScreen: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 4 ,
        question_id: "q4",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={4}
      question="What shows up first?"
      options={["Dread", "Guilt", "Anxiety", "Boredom"]}
      answerId="q4_emotion"
      totalScreens={11}
    />
  );
};
