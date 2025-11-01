import React, { createContext, useContext, useState, useCallback } from "react";

export interface QuizAnswers {
  q1_pattern: string;
  q2_hover_time: string;
  q3_clarity: string;
  q4_emotion: string;
  q5_pattern2: string;
  q6_task: string;
  q7_derail: string;
  q8_time: string;
  q9_tools: string;
  q10_after_start: string;
  q11_delivery: string;
  q12_tasktext: string;
}

export type OutcomeType = "A" | "B" | "C" | "D";

interface QuizContextType {
  answers: QuizAnswers;
  email: string;
  outcome: OutcomeType | null;
  currentStep: number;
  setAnswer: (key: keyof QuizAnswers, value: string) => void;
  setEmail: (email: string) => void;
  setOutcome: (outcome: OutcomeType) => void;
  setCurrentStep: (step: number) => void;
  resetQuiz: () => void;
  calculateOutcome: () => OutcomeType;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialAnswers: QuizAnswers = {
    q1_pattern: "",
    q2_hover_time: "",
    q3_clarity: "",
    q4_emotion: "",
    q5_pattern2: "",
    q6_task: "",
    q7_derail: "",
    q8_time: "",
    q9_tools: "",
    q10_after_start: "",
    q11_delivery: "",
    q12_tasktext: "",
  };

  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [email, setEmailState] = useState("");
  const [outcome, setOutcomeState] = useState<OutcomeType | null>(null);
  const [currentStep, setCurrentStepState] = useState(0);

  const setAnswer = useCallback((key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setEmailState(email);
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setCurrentStepState(step);
  }, []);

  const setOutcome = useCallback((outcome: OutcomeType) => {
    setOutcomeState(outcome);
  }, []);

  const calculateOutcome = useCallback((): OutcomeType => {
    // Outcome A (Overthinking / Step-1 Blur)
    if (
      ["Vague", "No idea"].includes(answers.q3_clarity) ||
      ["Too many options / can't choose", "First step feels unclear"].includes(
        answers.q7_derail
      )
    ) {
      return "A";
    }

    // Outcome B (Environment Friction)
    if (
      answers.q7_derail === "Environment full of friction" ||
      answers.q5_pattern2 === "Endless prep"
    ) {
      return "B";
    }

    // Outcome C (Panic-Starter)
    if (
      answers.q1_pattern === "I wait for deadline-panic to kick in" ||
      answers.q5_pattern2 === "Avoidance until panic"
    ) {
      return "C";
    }

    // Outcome D (Perfectionism Pain)
    if (
      ["Perfectionism", "Starting feels \"painful\" in the body"].includes(
        answers.q7_derail
      )
    ) {
      return "D";
    }

    return "A"; // Default to A
  }, [answers]);

  const resetQuiz = useCallback(() => {
    setAnswers(initialAnswers);
    setEmailState("");
    setOutcomeState(null);
    setCurrentStepState(0);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        answers,
        email,
        outcome,
        currentStep,
        setAnswer,
        setEmail,
        setOutcome,
        setCurrentStep,
        resetQuiz,
        calculateOutcome,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
};
