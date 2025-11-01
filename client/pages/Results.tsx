import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import { MomentumForecast } from "@/components/results/MomentumForecast";
import { SocialProof } from "@/components/results/SocialProof";
import {
  getOutcomeContent,
  getPersonalisedFirstStep,
} from "@/components/results/OutcomeContent";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { outcome, answers, email, setEmail } = useQuiz();
  const [emailInput, setEmailInput] = useState(email);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!outcome) {
      navigate("/");
    }
  }, [outcome, navigate]);

  if (!outcome) {
    return null;
  }

  const content = getOutcomeContent(
    outcome,
    answers.q6_task,
    answers.q12_tasktext
  );

  const personalisedFirstStep = getPersonalisedFirstStep(
    answers.q6_task,
    answers.q12_tasktext
  );

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSecondaryEmail = () => {
    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setEmail(emailInput);

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "email_captured" });
    }

    // In a real app, would send email here
    setShowEmailForm(false);

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_clicked",
        cta_type: "secondary",
      });
    }
  };

  const handlePrimaryCta = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_clicked",
        cta_type: "primary",
      });
    }
    window.open(content.primaryCtaLink, "_blank");
  };

  const outcomeBadgeColors: Record<string, string> = {
    A: "bg-primary/20 text-primary border-primary/30",
    B: "bg-secondary/20 text-secondary border-secondary/30",
    C: "bg-accent/20 text-accent border-accent/30",
    D: "bg-muted/20 text-muted border-muted/30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div
              className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${outcomeBadgeColors[outcome]}`}
            >
              Profile {outcome}: {content.badge}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {content.title}
          </h1>
        </div>

        {/* Momentum Forecast */}
        <MomentumForecast />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Reframe */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">The Real Story</h2>
            <p className="text-base leading-relaxed text-foreground">
              {content.reframe}
            </p>
          </section>

          {/* Your Fix */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Your 90-second fix (now)
            </h2>
            <div className="space-y-3">
              {content.fixSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="text-secondary font-bold flex-shrink-0">
                    {idx + 1}.
                  </div>
                  <p className="text-base leading-relaxed text-foreground">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why It Works */}
          <aside className="space-y-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <p className="font-semibold text-foreground text-sm">
              Why it works:
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {content.whyItWorks}
            </p>
          </aside>

          {/* Personalized First Step */}
          <div className="space-y-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm">
                  Your first step:
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  {personalisedFirstStep}
                </p>
              </div>
            </div>
          </div>

          {/* Confidence line */}
          <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
            Win = you started. Anything beyond 2 minutes is bonus.
          </p>
        </div>

        {/* Social Proof */}
        <SocialProof />

        {/* Offer Block */}
        <div className="space-y-6 p-6 rounded-2xl bg-card border-2 border-secondary/30">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Start in 5 Minutes
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to flip your OFF switch:
            </p>
          </div>

          {/* Value Stack */}
          <div className="space-y-2">
            {[
              "9-page Starter PDF (zero setup)",
              "Your Profile Pack (A/B/C/D specific)",
              "3× one-minute audio ignitions",
              "First-page printables by task type",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="grid gap-3 md:grid-cols-2 pt-4">
            <button
              onClick={handlePrimaryCta}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              {content.primaryCta}
            </button>

            {!email ? (
              <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                className="px-6 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold transition-all duration-300 hover:bg-secondary/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {content.secondaryCta}
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-3 rounded-lg bg-secondary/20 text-secondary font-semibold opacity-60 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                Email saved
              </button>
            )}
          </div>

          {/* Email Form */}
          {showEmailForm && !email && (
            <div className="space-y-3 pt-4 border-t border-border">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError("");
                }}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              />
              {emailError && (
                <p className="text-sm text-destructive">{emailError}</p>
              )}
              <button
                onClick={handleSecondaryEmail}
                className="w-full px-4 py-2 rounded-lg bg-secondary/20 text-secondary font-medium transition-all hover:bg-secondary/30"
              >
                Send to my email
              </button>
            </div>
          )}

          {/* Guarantee */}
          <p className="text-xs text-center text-muted-foreground italic leading-relaxed pt-2">
            {content.guarantee}
          </p>
        </div>

        {/* Footer CTA */}
        <button
          onClick={handlePrimaryCta}
          className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          {content.primaryCta}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
