import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q10MomentumScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={10}
      question="Once you start, what usually happens?"
      options={["I stop quickly", "I keep going", "It depends"]}
      answerId="q10_after_start"
      totalScreens={12}
    />
  );
};
