import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q1PatternScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={1}
      question="When you try to start, what happens first most of the time?"
      options={[
        "My brain freezes / blank screen",
        "I spin in tabs, notes, and \"planning\"",
        "I wait for deadline-panic to kick in",
        "I overthink the \"right\" first step",
      ]}
      answerId="q1_pattern"
      totalScreens={11}
    />
  );
};
