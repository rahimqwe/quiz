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
import testi1 from "/public/testi1.webp";
import testi2 from "/public/testi2.webp";
import testi3 from "/public/testi3.webp";
export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { outcome, answers } = useQuiz();

  // local copies that can be restored from localStorage
  const [hydratedOutcome, setHydratedOutcome] = useState(outcome || null);
  const [hydratedAnswers, setHydratedAnswers] = useState(answers || null as any);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // 1. If we have a fresh outcome from context, store it
    if (outcome && answers) {
      const payload = { outcome, answers };
      try {
        localStorage.setItem("lastResult", JSON.stringify(payload));
      } catch {
        // ignore storage errors
      }

      // fire analytics
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "results_view" });
      }
    }

    // 2. If we DON'T have an outcome from context, try to hydrate from localStorage
    if (!outcome || !answers) {
      try {
        const stored = localStorage.getItem("lastResult");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.outcome && parsed?.answers) {
            setHydratedOutcome(parsed.outcome);
            setHydratedAnswers(parsed.answers);
            // don't navigate away – we can render from hydrated data
          } else {
            navigate("/");
            return;
          }
        } else {
          navigate("/");
          return;
        }
      } catch {
        navigate("/");
        return;
      }
    }

    // 3. Scroll listener (unchanged)
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [outcome, answers, navigate]);


  const effectiveOutcome = hydratedOutcome || outcome;
  const effectiveAnswers = hydratedAnswers || answers;

  if (!effectiveOutcome || !effectiveAnswers) {
    return null;
  } 
  const clarityScore = calculateClarityScore(
    effectiveAnswers.q3_clarity,
    effectiveAnswers.q2_hover_time
  );
  const topObstacle = getTopObstacle(effectiveOutcome, effectiveAnswers);
  const startType = getStartTypeLabel(effectiveOutcome);
  const emotion = getEmotionLabel(effectiveAnswers.q4_emotion);
  const hoverTime = effectiveAnswers.q2_hover_time;
  const { launch: launchPrice, future: futurePrice } = getPrices();
  const deadline = getFormattedDeadline();

  const handleCTA = (position: string) => {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "cta_click",
      position,
      price: launchPrice,
    });
  }

  const baseUrl = "https://www.startminded.com/action-starter-checkout";

  let emailParam = "";
  try {
    const storedEmail = localStorage.getItem("quizEmail");
    console.log("ResultsPage quizEmail:", storedEmail);
    if (storedEmail) {
      const params = new URLSearchParams();
      params.set("email", storedEmail);
      emailParam = `?${params.toString()}`;
    }
  } catch {}

  window.location.href = `${baseUrl}${emailParam}`;
};

  const primaryCTAText = `Get My 5-Minute Start → $${launchPrice}`;
  const primaryCTATextNoPrice = "Get My 5-Minute Start";
  const secondaryCTAText = "Get My Personalized Start";
  const offerCTAText = "Unlock the Starter";

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
              high <span className="text-secondary">{topObstacle}</span>
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
              {/* <ArrowRight className="h-5 w-5" /> */}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Instant PDF • Works in 2–5 minutes
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
                "Spark Plug Protocol (4 steps) — go from overwhelm to a single first move in <5 minutes",
                "ON-Switch Script — copy-paste AI prompt that returns one tiny physical action, not a list",
                "2-Minute Commitment — the momentum trick that makes starting easier than stopping",
                "Friction-free setup — how to prep your space so starting has zero decisions",
              ].map((item, idx) => (
                // 1. Оборачиваем каждый элемент в 'flex'
                <div key={idx} className="flex items-start gap-2 text-left">
                  
                  {/* 2. Вставляем ваш кастомный 'span' для буллита */}
                  <span className="h-2 w-2 min-h-[0.5rem] min-w-[0.5rem] max-h-[0.5rem] max-w-[0.5rem] rounded-full bg-primary inline-block mt-[.5em]" />
                  
                  {/* 3. Оборачиваем текст в 'span' и применяем к нему стили */}
                  <span className="text-sm text-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Founders Bonuses */}
         

          {/* Product Mockup */}
          {/* <div className="h-48 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <div className="text-center">
              <Workflow className="h-12 w-12 text-primary mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">
                Product mockup — 9-page PDF on phone & desktop
              </p>
            </div>
          </div> */}
          <img className="h-64 mx-auto w-full object-contain flex items-center justify-center" src="/mockup.webp" alt="mockup" />
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
            
          </div>

          {/* CTA */}
          <button
            onClick={() => handleCTA("offer")}
            className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {primaryCTATextNoPrice}
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
            className="w-full px-6 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold transition-all duration-300 hover:bg-secondary/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
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
                imageUrl: testi1,
                name: "Sarah, 34 — freelance developer",
                quote:
                  "Avoided invoicing for 3 weeks → sent two invoices in 6 minutes.",
              },
              {
                imageUrl: testi2,
                name: "Marcus, 41 — startup founder",
                quote:
                  "Used it for a dreaded client call and taxes. Moving in under 5 minutes, twice.",
              },
              {
                imageUrl: testi3,
                name: "Evan, 29 — content creator",
                quote:
                  "Pasted a vague task → got a concrete first action. Used it 6 times this week.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-card border border-border space-y-2"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-32 mb-2" 
                />
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
      

      {/* ============ OBJECTION KILL BOX ============ */}
      <section className="px-4 py-16 md:py-20 bg-white border-t border-border">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Fast answers
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
                <p className="font-semibold text-foreground text-md">{item.q}</p>
                <p className="text-md text-muted-foreground leading-relaxed">
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
      <section className="px-4 py-16 md:py-20 bg-background border-t border-border">
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
            
          </div>

          {/* Large CTA */}
          <button
            onClick={() => handleCTA("urgency")}
            className="w-full px-8 py-6 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {primaryCTAText}
            {/* <ArrowRight className="h-6 w-6" />   */}
          </button>

          {/* Microtrust */}
          <p className="text-center text-sm text-muted-foreground">
            Instant delivery • Start something today 
          </p>
        </div>
      </section>
    </div>
  );
};
