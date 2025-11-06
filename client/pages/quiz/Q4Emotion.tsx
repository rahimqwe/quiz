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
      question="Which of these sounds like something you’ve said to yourself?"
      options={[
        "I’m not lazy, I just don’t know where to start", 
        "Why can’t I just do the thing?", 
        "It’s been on my list forever, but I can’t open it", 
        "I hate how I shut down over small stuff"]}
      answerId="q4"
      totalScreens={6}
    />
  );
};
