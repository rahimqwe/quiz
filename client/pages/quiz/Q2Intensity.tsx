import React, { useEffect } from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q2IntensityScreen: React.FC = () => {
  useEffect(() => {
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "quiz_step_view",
          step: 2,
          question_id: "q2",
        });
      }
    }, []);
  return (
    <QuizScreenTemplate
      screenNumber={2}
      question="How long do you hover before your first click?"
      options={["<2 min", "2–10 min", "10–30 min", "30–60+ min"]}
      answerId="q2_hover_time"
      totalScreens={11}
    />
  );
};
