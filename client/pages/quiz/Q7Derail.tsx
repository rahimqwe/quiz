import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q7DerailScreen: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 7,
        question_id: "q7",
      });
    }
  }, []);
  return (
    <QuizScreenTemplate
      screenNumber={7}
      question="What derails you fastest?"
      options={[
        "Too many options / can't choose",
        "First step feels unclear",
        "Environment full of friction (tabs/phone)",
        "Perfectionism (\"it has to be good\")",
        "Starting feels \"painful\" in the body",
      ]}
      answerId="q7_derail"
      totalScreens={11}
    />
  );
};
