import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q8TimeScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={8}
      question="How much energy/time can you spare right now?"
      options={["90 sec", "2–5 min", "10–15 min"]}
      answerId="q8_time"
      totalScreens={12}
    />
  );
};
