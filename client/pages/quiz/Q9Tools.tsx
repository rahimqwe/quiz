import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q9ToolsScreen: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 9,
        question_id: "q9",
      });
    }
  }, []);
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
