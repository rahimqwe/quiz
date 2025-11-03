import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q9ToolsScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <QuizScreenTemplate
      screenNumber={9}
      question="What have you tried that didn't stick?"
      options={[
        "Planners",
        "Pomodoro/apps",
        "Courses/coaches",
        "Everything above",
        "Nothing yet",
      ]}
      answerId="q9_tools"
      totalScreens={11}
      onNavigateNext={() => navigate("/quiz/10")}
    />
  );
};
