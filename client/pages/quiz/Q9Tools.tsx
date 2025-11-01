import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q9ToolsScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={9}
      question="What have you tried that didn't stick?"
      options={[
        "Planners",
        "Pomodoro/apps",
        "Courses/coaches",
        "Everything above",
      ]}
      answerId="q9_tools"
      totalScreens={12}
    />
  );
};
