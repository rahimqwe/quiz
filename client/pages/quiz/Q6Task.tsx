import React from "react";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";

export const Q6TaskScreen: React.FC = () => {
  return (
    <QuizScreenTemplate
      screenNumber={6}
      question="Where do you freeze most?"
      options={[
        "Writing/content",
        "Client outreach",
        "Product build/coding",
        "Admin/finance",
        "Studying/learning",
      ]}
      answerId="q6_task"
      totalScreens={12}
    />
  );
};
