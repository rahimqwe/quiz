import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizScreenTemplate } from "@/components/quiz/QuizScreenTemplate";
import second from "/second.webp";
export const Q6TaskScreen: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const img = new Image();
    img.src = second;
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "quiz_step_view",
        step: 7,
        question_id: "q6",
      });
    }
  }, []);
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
      totalScreens={11}
      onNavigateNext={() => navigate("/quiz/interstitial-objections")}
    />
  );
};
