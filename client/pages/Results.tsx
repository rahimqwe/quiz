import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/use-quiz";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel.tsx";
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
  Brain,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  Lightbulb,
  Shield,
  Flame,
} from "lucide-react";

import testi1 from "/public/testi1.webp";
import testi2 from "/public/testi2.webp";
import testi3 from "/public/testi3.webp";
import { getOutcomeContent } from '@/components/results/OutcomeContent.tsx';
import e from "cors";
export const ResultsPage: React.FC = () => {
  interface Testimonial {
  quote: string;
  attribution: string;
  rating: number;
  initials: string;
  bgColor: string;
  image?: string;
}
const testimonials: Testimonial[] = [
  {
    quote:
      "Before this, I thought I was broken. I'd sit at my laptop for hours, tabs open, mind racing, accomplishing nothing. After week 3, something clicked. I actually *started* things without spiraling. I'm not 'cured,' but I finally feel like I'm driving my brain instead of being driven by it",
    attribution: "Jordan",
    rating: 5,
    initials: "JM",
    bgColor: "bg-blue-400",
  },
  {
    quote:
      "I've bought every ADHD planner, app, and course. Nothing worked because they all assumed I could just 'start.' This was different – it actually addressed the *freeze*, not the task. Within 10 days I'd sent emails I'd been avoiding for weeks. Worth every penny",
    attribution: "Alex",
    rating: 4.5,
    initials: "AD",
    bgColor: "bg-orange-400",
  },
  {
    quote:
      "My worst nightmare was replying to texts. I'd draft, delete, overthink, and ghost people for days. The 'Social Panic Loop' section nailed exactly what I do. Now I use the 5-minute rule and actually hit send. My friends noticed I'm back",
    attribution: "Casey",
    rating: 5,
    initials: "CL", 
    bgColor: "bg-pink-400",
  },
];

  const navigate = useNavigate();
  const { outcome, answers } = useQuiz();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
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

  const primaryCTAText = `Get My 5-Minute Start - $${launchPrice}`;
  const secondaryCTAText = `Show Me My Pattern's Fix`;
  const thirdCTAText = `Stop Overthinking Now`;
  const fourthCTAText = `Grab the Guide`;
  const fifthCTAText = `Start Breaking the Loop`;
  const sixthCTAText = `Get the Circuit Breakers`;
  const seventhCTAText = `Get My 5-Minute Start`;
  const eightCTAText = `Stop Overthinking Now - $${launchPrice}`;
  const currentOutcome = getOutcomeContent[effectiveOutcome];
  return (
    <div className="min-h-screen bg-background  ">
      {/* Sticky Timer (top-right) */}
      

      {/* ============ HERO ============ */}
      
      {/* ============ YOUR PATTERN ============ */}
      <section className="px-4 py-8 sm:py-10 md:py-12 bg-background border-b border-border text-center md:text-left">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            You're Stuck in the{" "}
            <span className="text-secondary">{currentOutcome.loopName}</span>
          </h2>
          
          <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
            {currentOutcome.description}
          </p>
            {/* <a
              href="#offer"
              // Если нужно отслеживать клик для аналитики, оставь onClick, если нет — можно убрать
              // onClick={() => handleCTA("hero")} 
              className="w-full block text-center px-6 py-4 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 no-underline cursor-pointer"
            >
              SEE THE SOLUTION
            </a> */}
        
          
          {/* <div className="pt-4 border-t border-border">
            <p className="text-base leading-relaxed text-foreground">
              {currentOutcome.bridge}
            </p>
          </div> */}
        </div>
      </section>  
      {/* ============ OFFER ============ */}
      <section className="px-4 pt-8 sm:pt-10 md:pt-12 pt-b sm:pb-6 md:pb-8 bg-card border-b border-border text-center md:text-left">
        <div className="w-full max-w-2xl mx-auto space-y-8 md:space-y-12">
          <div id="offer" className="space-y-4">
            <h2  className="text-3xl md:text-4xl font-bold text-foreground">
              There's a way out - and it takes only 5 minutes
            </h2>
            <p className="text-lg text-muted-foreground">
              Turn “I’ll start later” into “I did the first step” in 5 minutes, even on your most tired, overthinking days.
            </p>
          </div>
            
          {/* Product Mockup */}
          <img 
            src="/mockup.webp"
            alt="Stop Overthinking Toolkit"
            className="mx-auto h-64 w-auto object-contain "
          />
          {/* <div className="space-y-4 ">
            <button
              onClick={() => handleCTA("hero")}
              className="w-full px-6 py-4 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              {primaryCTAText}
            </button>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-secondary" />
                Instant access
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-secondary" />
                Science-backed
              </div>
              <span>•</span>
              <span>Money-back guarantee</span>
            </div>
            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground italic flex flex-col items-center justify-center gap-2 sm:flex-row">
                <span className="text-base"><StarRating rating={4.8} /></span>
                <span>4.8/5 from 143 members who stopped overthinking</span>
              </p>
            </div>
          </div> */}

          
         
        </div>
      </section>
            <section className="px-4 py-10 sm:py-10 md:py-14 bg-card border-b border-border text-center md:text-left">
        <div className="w-full max-w-2xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            What's inside
          </h2>

          <div className="space-y-6">
            {/* Intro */}
            {/* <div className="space-y-3 p-6 rounded-lg bg-card border border-border/50">
              <p className="font-semibold text-lg text-foreground">
                A simple 3-step system that breaks your overthinking loop in under 5 minutes:
              </p>
            </div> */}

            {/* The 3-Step Framework */}
            {/* <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  number: "1",
                  step: "NAME IT",
                  desc: "Identify your freeze (takes 30 seconds)",
                },
                {
                  number: "2",
                  step: "SHIFT IT",
                  desc: "One pattern-matched 5-minute move",
                },
                {
                  number: "3",
                  step: "LOCK IT",
                  desc: "Brain-reset phrase that makes it stick",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-card border-2 border-secondary/20 hover:border-secondary/40 transition-colors space-y-2"
                >
                  <div className="text-3xl font-bold text-secondary">
                    {item.number}
                  </div>
                  <p className="font-bold text-foreground">{item.step}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div> */}

            {/* You'll get */}
           <div className="space-y-4 p-6 rounded-lg bg-primary/5 border border-primary/20 text-left ">
            <ul className="space-y-4">
              {[
                {
                  title: "3-Question Circuit Breaker (5 min)",
                  desc: "A reset that breaks the spiral and gets you into a safe first step - even when you feel frozen."
                },
                {
                  title: "4 Pattern-Specific Action Guides",
                  desc: "Pick your loop → follow the script. Turns “impossible tasks” into simple next actions."
                },
                {
                  title: "Emergency Cheat Sheet (1 page)",
                  desc: "Screenshot it. Pull it up the moment you freeze and need a backup brain."
                },
                {
                  title: "Quick “Why You Freeze” Explainer",
                  desc: "A short, non-medical breakdown so the guilt drops and you stop calling it laziness."
                }
              ].map((item, idx) => (
                <li key={idx} className="text-sm text-foreground flex gap-3 items-start">
                  {/* Иконка галочки, чуть спущена вниз (mt-1) для выравнивания с первой строкой */}
                  <span className="text-secondary font-bold text-lg leading-none mt-0.5">✓</span>
                  
                  {/* Контейнер для текста: Заголовок сверху, описание снизу */}
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-base">{item.title}</span>
                    <span className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

            {/* No fluff callout */}
            <div className="space-y-3 p-6 rounded-lg bg-card border-2 border-secondary/20">
              <p className="font-semibold text-foreground text-lg">
                No 40-page textbook. No “optimize your life” bullshit. Just:
              </p>
              <p className="text-base text-muted-foreground">
                "I'm stuck" → do this → unstuck.
              </p>
            </div>
            <button
              onClick={() => handleCTA("hero")}
              className="w-full px-6 py-4 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              {primaryCTAText}
          </button>
          </div>
        </div>
      </section>
      {/* ============ WHAT HAPPENS ============ */}
          
      

      {/* ============ TESTIMONIALS ============ */}
      <section className="px-4 py-10 sm:py-12 md:py-20 bg-card border-b border-border">
        <div className="w-full max-w-2xl mx-auto space-y-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center md:text-left">
            What ADHD overthinkers like you are saying
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ============ OBJECTION: OVERTHINK THE TOOLKIT ============ */}
      <section className="px-4 py-10 sm:py-12 md:py-20 bg-background border-b border-border text-center md:text-left">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              "But what if I overthink the toolkit itself?"
            </h2>
            <p className="text-lg text-muted-foreground">
              We built it for that.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "One-page entry point",
                desc: "Answer 3 questions, pick your pattern, do one 5-minute move",
              },
              {
                label: "No setup required",
                desc: "Open PDF → Use tonight",
              },
              {
                label: "Works for all 4 overthinking loops",
                desc: "The guide gives ready 5-minute moves for each loop type, so you can just plug into the one that fits right now",
              },
              {
                label: "Cheat card included",
                desc: "You get a one-page quick reference you can screenshot and keep on your phone",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2 p-5 rounded-lg bg-background border border-border/50">
                <p className="font-semibold text-foreground text-base">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <button
              onClick={() => handleCTA("hero")}
              className="w-full px-6 py-4 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              {thirdCTAText}
          </button>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE ============ */}

      
                
      {/* ============ DOES IT ACTUALLY WORK ============ */}
      <section className="px-4 py-10 sm:py-12 md:py-20 bg-background border-b border-border text-center md:text-left">
        <div className="w-full max-w-2xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            "Does it actually work?"
          </h2>

          <div className="space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              Built on peer-reviewed ADHD research:
            </p>
            {[
              {
                title: "Behavioral Activation",
                desc: "Tiny actions reduce anxiety",
              },
              {
                title: "Implementation Intentions",
                desc: '"If I freeze, then I do X" rewires habit loops',
              },
              {
                title: "Cognitive Load Theory",
                desc: "Reducing complexity improves executive function",
              },
              {
                title: "Action Priming",
                desc: 'One small move makes the next move easier',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-background border border-border/50">
                <p className="font-semibold text-foreground text-sm">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
            <p className="text-sm text-foreground leading-relaxed">
              This isn't theory. It's what ADHD therapists and coaches already teach—just packaged for your worst moments.
            </p>
          </div>
          <button
              onClick={() => handleCTA("hero")}
              className="w-full px-6 py-4 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              {seventhCTAText}
          </button>
        </div>
      </section>

      {/* ============ ONE-TASK GUARANTEE ============ */}
      <section className="px-4 py-10 sm:py-12 md:py-20 bg-card border-b border-border">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center md:text-left">
            One-task guarantee
          </h2>

          <div className="space-y-4 p-6 rounded-lg bg-card border-2 border-secondary/20">
            <p className="text-base text-foreground leading-relaxed">
              Use it on one stuck task tonight.
            </p>
            <p className="text-base text-foreground leading-relaxed">
              If it doesn't help you start something - anything - just email us. We'll either:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-base text-foreground flex gap-2">
                <span className="text-secondary font-bold">→</span>
                <span>Walk you through it personally, or</span>
              </li>
              <li className="text-base text-foreground flex gap-2">
                <span className="text-secondary font-bold">→</span>
                <span>Refund you immediately</span>
              </li>
            </ul>
          </div>

          <p className="text-center font-semibold text-foreground">
            You risk ${launchPrice}. You gain the ability to start.
          </p>

          <button
            onClick={() => handleCTA("guarantee")}
            className="w-full px-6 py-4 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {secondaryCTAText}
            {/* <ArrowRight className="h-5 w-5" /> */}
          </button>
        </div>
      </section>

      {/* ============ FAQ ACCORDION ============ */}
      <section className="px-4 py-16 md:py-20 bg-background border-b border-border">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center md:text-left">
            Quick questions
          </h2>

          <div className="space-y-3">
            {[
              {
                question: "Do I need an ADHD diagnosis?",
                answer:
                  "No. If you overthink and freeze, this will help. This is designed for anyone who struggles with analysis paralysis and getting started.",
              },
              {
                question: "Is this just for personal tasks?",
                answer:
                  "No. Works for work emails, business decisions, school projects—anything you're avoiding. The patterns are universal.",
              },
              {
                question: "What if I'm too burned out even for 5 minutes?",
                answer:
                  "The first move is 60 seconds. If your brain can read this sentence, it can do Step 1. That's literally all we ask for.",
              },
              {
                question: "What if I forget to use it?",
                answer:
                  "That's why you get a 1-page card and a screenshot version. Tape it to your wall. Make it your phone background. You'll only need to use it once to remember it helps.",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                className="w-full text-left border border-border/50 rounded-lg px-6 py-4 transition-all hover:bg-secondary/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground text-sm md:text-base">{item.question}</p>
                  <ChevronDown
                    className={`h-5 w-5 text-secondary flex-shrink-0 transition-transform ${
                      expandedFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFAQ === idx && (
                  <p className="text-muted-foreground leading-relaxed mt-4 pt-4 border-t border-border/50 text-sm md:text-base">
                    {item.answer}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="px-4 py-16 md:py-20 bg-card border-b border-border text-center md:text-left">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Download the 5-Minute Toolkit
            </h2>
            <p className="text-lg text-muted-foreground">
              Use it on one task tonight - see how it works before deciding anything.
            </p>
          </div>

          <button
            onClick={() => handleCTA("final_cta")}
            className="w-full px-8 py-6 rounded-[9999px] bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold text-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {eightCTAText}
            {/* <ArrowRight className="h-6 w-6" /> */}
          </button>

          {/* Microtrust */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-secondary" />
              Use it tonight
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
              Instant download
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
