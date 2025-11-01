import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q4EmotionScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={4}
      question="What shows up first?"
      options={["Dread", "Guilt", "Anxiety", "Boredom"]}
      answerId="q4_emotion"
      totalScreens={12}
    />
  );
};
