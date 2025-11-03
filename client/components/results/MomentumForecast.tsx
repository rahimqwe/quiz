import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import {
  calculateClarityScore,
  getTopObstacle,
  getStartTypeLabel,
  getEmotionLabel,
  getFormattedDeadline,
  getPrices,
} from "@/components/results/ResultsHelpers";
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Workflow,
  Clock,
  AlertCircle,
} from "lucide-react";

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { outcome, answers } = useQuiz();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!outcome) {
      navigate("/");
      return;
    }

    // Fire analytics event
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "results_view" });
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [outcome, navigate]);

  if (!outcome) {
    return null;
  }

  const clarityScore = calculateClarityScore(
    answers.q3_clarity,
    answers.q2_hover_time
  );
  const topObstacle = getTopObstacle(outcome, answers);
  const startType = getStartTypeLabel(outcome);
  const emotion = getEmotionLabel(answers.q4_emotion);
  const hoverTime = answers.q2_hover_time;
  const { launch: launchPrice, future: futurePrice } = getPrices();
  const deadline = getFormattedDeadline();

  const handleCTA = (position: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_click",
        position: position,
        price: launchPrice,
      });
    }
    window.open("/checkout/5-minute-action-starter", "_blank");
  };

  const primaryCTAText = `Get My 5-Minute Start → $${launchPrice}`;
  const secondaryCTAText = "Get My Personalized Start";

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Timer (top-right) */}
      {scrolled && (
        <div className="fixed top-4 right-4 px-4 py-2 rounded-lg bg-secondary/90 text-secondary-foreground text-sm font-semibold shadow-lg z-50 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Reserved until {deadline}</span>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="w-full max-w-2xl mx-auto space-y-12">
          {/* Hero Text - Exact 4 lines */}
          <div className="space-y-6 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              You're a <span className="text-secondary">{startType}</span> with
              high <span className="text-secondary">{topObstacle}</span>.
            </h1>

            <p className="text-lg leading-relaxed text-foreground">
              You scored <span className="font-semibold">{clarityScore}/10</span>{" "}
              on Step-1 clarity and hover{" "}
              <span className="font-semibold">{hoverTime}</span> before action.
            </p>

            <p className="text-base leading-relaxed text-foreground">
              That's not laziness — it's the OFF → ON pattern: when Step-1 is
              vague, your brain freezes to protect you.
            </p>

            <p className="text-base leading-relaxed text-foreground">
              You don't need another app. You need one tiny physical move that
              flips you ON in 2–5 minutes.
            </p>
          </div>

          {/* OFF→ON Toggle Visual */}
          <div className="h-56 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
            <div className="relative flex items-center gap-8">
              {/* OFF state */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-10 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-start p-1">
                  <div className="w-8 h-8 rounded-full bg-muted-foreground transition-all" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  OFF
                </span>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-6 w-6 text-secondary opacity-60" />

              {/* ON state with glow */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-secondary/30 blur-lg animate-pulse" />
                  <div className="relative w-16 h-10 rounded-full bg-secondary border-2 border-secondary flex items-center justify-end p-1">
                    <div className="w-8 h-8 rounded-full bg-secondary-foreground transition-all" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-secondary">ON</span>
              </div>
            </div>
          </div>

          {/* Primary CTA + Trust */}
          <div className="space-y-3">
            <button
              onClick={() => handleCTA("hero")}
              className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {primaryCTAText}
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Instant PDF • Works in 2–5 minutes • "NO START" refund in 24h
            </p>
          </div>
        </div>
      </section>

      {/* ============ OFFER ============ */}
      <section className="px-4 py-16 md:py-20 bg-card border-t border-border">
        <div className="w-full max-w-2xl mx-auto space-y-10">
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              The 5-Minute Action Starter
            </h2>
            <p className="text-base text-muted-foreground">
              Turn your brain from OFF to ON with one tiny move — no setup, no
              new tools.
            </p>
          </div>

          {/* What's Inside */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">
              What's inside
            </h3>
            <div className="space-y-3">
              {[
                "⚡ Spark Plug Protocol (4 steps) — blank screen → first action in minutes",
                "📚 Start Type Library (24 first moves) — content, outreach, admin, research",
                "🔓 ON-Switch Script (20 micro-prompts) — when Step-1 is foggy",
                "🧰 Troubleshooter — what to do if you stall mid-protocol",
              ].map((item, idx) => (
                <p key={idx} className="text-sm text-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Founders Bonuses */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">
              Founders bonuses
            </h3>
            <div className="space-y-3">
              {[
                "🎧 2-Minute Timer Cues (MP3) — calm audio to stop overthinking",
                "📱 Start Cards (print + lock screens) — instant access",
                "➕ Momentum Multiplier (1-pager) — turn 5 minutes into 25",
              ].map((item, idx) => (
                <p key={idx} className="text-sm text-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Product Mockup */}
          <div className="h-48 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <div className="text-center">
              <Workflow className="h-12 w-12 text-primary mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">
                Product mockup — 9-page PDF on phone & desktop
              </p>
            </div>
          </div>

          {/* Price & Guarantee */}
          <div className="space-y-4 p-6 rounded-2xl bg-secondary/10 border border-secondary/20">
            <p className="text-xl font-bold text-foreground">
              ${launchPrice}
              <span className="text-sm text-muted-foreground font-normal ml-2">
                (Founders pricing)
              </span>
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Increases to ${futurePrice} on {deadline} 11:59 PM
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Activation guarantee: If you don't start something within 24
              hours, reply "NO START" for a full refund.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => handleCTA("offer")}
            className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {primaryCTAText}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ============ WHY IT WORKS ============ */}
      <section className="px-4 py-16 md:py-20 bg-background">
        <div className="w-full max-w-2xl mx-auto space-y-10">
          {/* 4-Icon Protocol Strip */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: CheckCircle2, label: "Capture", ariaLabel: "Capture step" },
              {
                icon: Workflow,
                label: "Decompose",
                ariaLabel: "Decompose step",
              },
              { icon: Clock, label: "Commit", ariaLabel: "2-minute timer commit" },
              { icon: Zap, label: "Start", ariaLabel: "Start action" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border border-border"
              >
                <item.icon
                  className="h-6 w-6 text-secondary"
                  aria-label={item.ariaLabel}
                />
                <span className="text-xs font-semibold text-foreground text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mechanism Text */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-foreground">
              When Step-1 is vague, ADHD brains flip OFF to prevent failure.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              The Spark Plug Protocol externalizes Step-1 and asks your body to
              move first.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Motivation follows motion. Same 4 steps, any task.
            </p>
          </div>

          {/* Secondary CTA */}
          <button
            onClick={() => handleCTA("mechanism")}
            className="w-full px-6 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold transition-all duration-300 hover:bg-secondary/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            {secondaryCTAText}
          </button>
        </div>
      </section>

      {/* ============ FROM YOUR QUIZ ============ */}
      <section className="px-4 py-16 md:py-20 bg-card border-t border-border">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            From your quiz
          </h2>

          {/* Personalization Chips */}
          <div className="space-y-4">
            {[
              {
                label: "Step-1 Clarity",
                value: `${clarityScore}/10`,
                note: "→ high freeze risk",
              },
              {
                label: "Emotion at start",
                value: emotion,
                note: "→ overload at initiation",
              },
              {
                label: "Hover time",
                value: hoverTime,
                note: "→ decision loop",
              },
            ].map((chip, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1 p-4 rounded-lg bg-background border border-border"
              >
                <p className="text-xs font-semibold text-muted-foreground">
                  {chip.label}
                </p>
                <p className="text-base font-bold text-foreground">
                  {chip.value}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {chip.note}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* Bridge Line */}
          <p className="text-base leading-relaxed text-foreground border-t border-border pt-6">
            We convert that <span className="font-semibold">{emotion}</span> into
            one small, physical action your brain reads as "safe, doable, now."
          </p>

          {/* Inline CTA */}
          <button
            onClick={() => handleCTA("personalization")}
            className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 rounded px-1"
          >
            {secondaryCTAText}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="px-4 py-16 md:py-20 bg-background">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            What people are saying
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Sarah, 34 — freelance developer",
                quote:
                  "Avoided invoicing for 3 weeks → sent two invoices in 6 minutes.",
              },
              {
                name: "Marcus, 41 — startup founder",
                quote:
                  "Used it for a dreaded client call and taxes. Moving in under 5 minutes, twice.",
              },
              {
                name: "Jen, 29 — content creator",
                quote:
                  "Pasted a vague task → got a concrete first action. Used it 6 times this week.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-card border border-border space-y-2"
              >
                <p className="font-semibold text-sm text-foreground">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleCTA("social_proof")}
            className="w-full px-6 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold transition-all duration-300 hover:bg-secondary/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            I'm in — Flip Me ON
          </button>
        </div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="px-4 py-16 md:py-20 bg-card border-t border-border">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            What you get (quick)
          </h2>

          <div className="space-y-3">
            {[
              "Pages 1–2: Spark Plug Protocol (diagram + 4 steps)",
              "Pages 3–6: 24 Start-Type actions by task family",
              "Page 7: ON-Switch Script (20 micro-prompts)",
              "Page 8: Momentum Multiplier (5 → 25 min)",
              "Page 9: Troubleshooter (if you stall)",
              "Delivery: Instant download (PDF). Phone or desktop. Print if you want.",
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleCTA("what_you_get")}
            className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            Unlock the Starter → ${launchPrice}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ============ OBJECTION KILL BOX ============ */}
      <section className="px-4 py-16 md:py-20 bg-background">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Fast answers (objection kill box)
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "No time.",
                a: "Good. This takes 2–5 minutes. Start, then stop if you need to.",
              },
              {
                q: "Tried planners.",
                a: "This isn't a planner. It's the ignition that makes any planner work.",
              },
              {
                q: "No motivation.",
                a: "We start with body motion first — motivation follows.",
              },
              {
                q: "Too complex.",
                a: "We only handle the first visible inch.",
              },
              {
                q: "Not just business?",
                a: "Works for admin, appointments, taxes — anything that freezes you.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <p className="font-semibold text-foreground text-sm">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Inline Text CTA */}
          <button
            onClick={() => handleCTA("objections")}
            className="inline-flex text-secondary font-semibold hover:text-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 rounded px-1"
          >
            Start for 5 minutes. That's it.
          </button>
        </div>
      </section>

      {/* ============ URGENCY FOOTER ============ */}
      <section className="px-4 py-16 md:py-20 bg-card border-t border-border">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          {/* Countdown Bar */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-secondary/20 via-accent/10 to-secondary/20 border-2 border-secondary/30 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary" />
              <p className="font-bold text-foreground">
                Founders Edition ends {deadline} at 11:59 PM
              </p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Price goes ${launchPrice} → ${futurePrice} and bonuses disappear.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Activation guarantee: try it once. If you don't start within 24
              hours, reply "NO START" for a refund.
            </p>
          </div>

          {/* Large CTA */}
          <button
            onClick={() => handleCTA("urgency")}
            className="w-full px-8 py-6 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {primaryCTAText}
            <ArrowRight className="h-6 w-6" />
          </button>

          {/* Microtrust */}
          <p className="text-center text-sm text-muted-foreground">
            Instant delivery • Start something today • Free if it doesn't work
          </p>
        </div>
      </section>
    </div>
  );
};
