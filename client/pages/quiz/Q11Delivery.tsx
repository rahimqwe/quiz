import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { OptionCard } from "@/components/quiz/OptionCard";
import { Mail } from "lucide-react";

export const Q11DeliveryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { answers, setAnswer, setEmail, email, setCurrentStep } = useQuiz();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [emailInput, setEmailInput] = useState(email);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setCurrentStep(11);
    const current = answers.q11_delivery;
    if (current) {
      setSelectedIndex(current === "On-screen now" ? 0 : 1);
    }
  }, [setCurrentStep, answers.q11_delivery]);

  const options = ["On-screen now", "Email me the 5-minute PDF (plus on-screen)"];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
    setAnswer("q11_delivery", options[index]);

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "q_answered",
        question_number: 11,
        answer: options[index],
      });
    }
  };

  const handleContinue = () => {
    if (selectedIndex === 1) {
      if (!emailInput.trim()) {
        setEmailError("Email is required");
        return;
      }
      if (!validateEmail(emailInput)) {
        setEmailError("Please enter a valid email");
        return;
      }
      setEmail(emailInput);

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "email_captured" });
      }
    }

    navigate("/quiz/12");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Progress Bar */}
        <ProgressBar current={11} total={12} />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Pick how you'd like your first-step instructions delivered:
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <OptionCard
                key={index}
                label={option}
                isSelected={selectedIndex === index}
                onClick={() => handleOptionClick(index)}
              />
            ))}
          </div>

          {/* Email Input */}
          {selectedIndex === 1 && (
            <div className="space-y-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
              </div>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError("");
                }}
                placeholder="you@example.com"
                aria-label="Email address for PDF delivery"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : "email-note"}
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
              {emailError && (
                <p id="email-error" className="text-sm text-destructive" role="alert">
                  {emailError}
                </p>
              )}
              <p id="email-note" className="text-xs text-muted-foreground">
                We respect your privacy. You'll only hear from us about your results.
              </p>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={selectedIndex === -1}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};
