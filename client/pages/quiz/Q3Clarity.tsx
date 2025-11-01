import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q3ClarityScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={3}
      question="Before you start, how clear is your very first step?"
      options={["Crystal", "Kinda", "Vague", "No idea"]}
      answerId="q3_clarity"
      totalScreens={12}
    />
  );
};
