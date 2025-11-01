import { OutcomeType } from "@/hooks/use-quiz";

export interface OutcomeConfig {
  badge: string;
  title: string;
  reframe: string;
  fixSteps: string[];
  whyItWorks: string;
  primaryCta: string;
  primaryCtaLink: string;
  secondaryCta: string;
  guarantee: string;
}

const taskExamples: Record<string, string> = {
  "Writing/content": "Open doc, write one ugly sentence as placeholder.",
  "Client outreach": "Open email, type subject 'Quick question about [X]'.",
  "Product build/coding": "Open editor, add one comment describing the change.",
  "Admin/finance": "Open app, upload one receipt / rename one file.",
  "Studying/learning": "Open chapter, highlight one line; write one question.",
};

export const getOutcomeContent = (
  outcome: OutcomeType,
  taskType: string,
  customTask: string
): OutcomeConfig => {
  const personalisedFirstStep =
    customTask || taskExamples[taskType] || taskExamples["Writing/content"];

  const baseConfigs: Record<OutcomeType, OutcomeConfig> = {
    A: {
      badge: "Overthinking Loop",
      title: "Your Start Profile",
      reframe:
        "You're not lazy; your brain is protecting you when Step 1 is vague.",
      fixSteps: [
        "Open your capture tool. Set 60-sec timer. Brain-dump the task—including feelings.",
        "Paste that into AI with this exact prompt to get one 15-minute action.",
      ],
      whyItWorks:
        "We bypass overload by externalizing and shrinking to a single physical step.",
      primaryCta: "Get the 9-page 5-Minute Action Starter",
      primaryCtaLink: "/checkout/5-minute-action-starter",
      secondaryCta: "Email it to me",
      guarantee:
        "No first start in 24h? Reply 'NO START' for a refund.",
    },
    B: {
      badge: "Environment Friction",
      title: "Your Start Profile",
      reframe:
        "Micro-friction siphons your decisions; remove it before you start.",
      fixSteps: [
        "Close all tabs but one, silence phone, water on desk, set 15-min timer, open the app for the first step.",
      ],
      whyItWorks: "Fewer micro-decisions → fewer escape routes.",
      primaryCta: "Show me the 4-step Spark Plug Protocol",
      primaryCtaLink: "/checkout/5-minute-action-starter",
      secondaryCta: "Email it to me",
      guarantee:
        "No first start in 24h? Reply 'NO START' for a refund.",
    },
    C: {
      badge: "Panic-Starter",
      title: "Your Start Profile",
      reframe:
        "You rely on crisis dopamine; we can simulate momentum without the crash.",
      fixSteps: [
        "2-Minute Commitment—start for 2 minutes only; permission to stop.",
      ],
      whyItWorks: "Once moving, continuing is easier than stopping.",
      primaryCta: "Download the 5-minute guide",
      primaryCtaLink: "/checkout/5-minute-action-starter",
      secondaryCta: "Email it to me",
      guarantee:
        "No first start in 24h? Reply 'NO START' for a refund.",
    },
    D: {
      badge: "Perfectionism Pain",
      title: "Your Start Profile",
      reframe:
        "Your brain flags 'start' as risky; we lower the threat ceiling.",
      fixSteps: [
        "Terrible First Draft—deliberately bad for 2 minutes, then stop.",
      ],
      whyItWorks:
        "By forcing 'bad,' you remove the threat signal and unlock motion.",
      primaryCta: "Get the guide",
      primaryCtaLink: "/checkout/5-minute-action-starter",
      secondaryCta: "Email it to me",
      guarantee:
        "No first start in 24h? Reply 'NO START' for a refund.",
    },
  };

  return baseConfigs[outcome];
};

export const getPersonalisedFirstStep = (
  taskType: string,
  customTask: string
): string => {
  return customTask || taskExamples[taskType] || taskExamples["Writing/content"];
};
