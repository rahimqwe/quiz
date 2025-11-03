import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q5Pattern2Screen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <QuizScreenTemplate
      screenNumber={5}
      question="Which start pattern feels most like you?"
      options={[
        "All-or-nothing (dead stop → all-night sprint)",
        "Endless prep (notes, tools, 'perfect system')",
        "Avoidance until panic → then I move",
        "Start tiny bursts, fizzle fast",
      ]}
      answerId="q5_pattern2"
      totalScreens={11}
      onNavigateNext={() => navigate("/quiz/6")}
    />
  );
};
