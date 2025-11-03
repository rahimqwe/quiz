import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";
import { useNavigate } from "react-router-dom";
import first from "/first.webp";
export const Q3ClarityScreen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const img = new Image();
    img.src = first;
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={3}
      question="Before you start, how clear is your very first step?"
      options={["Crystal", "Kinda", "Vague", "No idea"]}
      answerId="q3_clarity"
      totalScreens={11}
      onNavigateNext={() => navigate("/quiz/interstitial-binary")}
    />
  );
};
