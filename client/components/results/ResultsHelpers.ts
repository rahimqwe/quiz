import { QuizAnswers, OutcomeType } from "@/hooks/use-quiz";

const LAUNCH_PRICE = 12;
const FUTURE_PRICE = 29;
const DEADLINE_DATE = new Date("2025-11-09T23:59:59");  

export const calculateClarityScore = (
  clarity: string,
  hoverTime: string
): number => {
  // Base mapping from Q3 clarity
  const baseScores: Record<string, number> = {
    Crystal: 9,
    Kinda: 6,
    Vague: 3,
    "No idea": 1,
  };

  let score = baseScores[clarity] || 5;

  // Adjustment from Q2 hover time
  const adjustments: Record<string, number> = {
    "<2 min": 1,
    "2–10 min": 0,
    "10–30 min": -1,
    "30–60+ min": -2,
  };

  score += adjustments[hoverTime] || 0;

  // Clamp to 1-10
  return Math.max(1, Math.min(10, score));
};

export const getTopObstacle = (
  outcome: OutcomeType,
  answers: QuizAnswers
): string => {
  // Optional overrides (check these first)
  if (
    answers.q7_derail === "Environment full of friction" ||
    answers.q5_pattern2 === "Endless prep"
  ) {
    return "Tabs & Phone";
  }

  if (
    answers.q3_clarity === "Vague" ||
    answers.q3_clarity === "No idea" ||
    answers.q7_derail === "Too many options / can't choose" ||
    answers.q7_derail === "First step feels unclear"
  ) {
    return "Step-1 Blur";
  }

  if (
    answers.q1_pattern === "I wait for deadline-panic to kick in" ||
    answers.q5_pattern2 === "Avoidance until panic"
  ) {
    return "Deadline Reliance";
  }

  if (
    answers.q7_derail === "Perfectionism" ||
    answers.q7_derail === "Starting feels \"painful\" in the body"
  ) {
    return "Threat/Pain on Start";
  }

  // Default to outcome-based mapping
  const outcomeMap: Record<OutcomeType, string> = {
    A: "Step-1 Blur",
    B: "Tabs & Phone",
    C: "Deadline Reliance",
    D: "Threat/Pain on Start",
  };

  return outcomeMap[outcome];
};

export const getStartTypeLabel = (outcome: OutcomeType): string => {
  const typeMap: Record<OutcomeType, string> = {
    A: "Overthinker",
    B: "Environment-Sensitive",
    C: "Deadline-Dependent",
    D: "Perfectionist",
  };
  return typeMap[outcome];
};

export const getExampleActions = (taskType: string): [string, string] => {
  const examples: Record<string, [string, string]> = {
    "Writing/content": [
      "opening your doc to add one ugly sentence",
      "writing a placeholder headline in 90 seconds",
    ],
    "Client outreach": [
      "typing an email subject line in 2 minutes",
      "opening Slack to draft one message",
    ],
    "Product build/coding": [
      "opening your editor to add a comment",
      "pushing one tiny code change",
    ],
    "Admin/finance": [
      "uploading one receipt to your app",
      "renaming one file in your folder",
    ],
    "Studying/learning": [
      "highlighting one line from the chapter",
      "writing one question about it",
    ],
  };

  return examples[taskType] || examples["Writing/content"];
};

export const getFormattedDeadline = (): string => {
  return "Sunday, November 9, 2025";
};

export const getPrices = (): { launch: number; future: number } => {
  return { launch: LAUNCH_PRICE, future: FUTURE_PRICE };
};

export const isDeadlineActive = (): boolean => {
  return new Date() < DEADLINE_DATE;
};

export const getEmotionLabel = (emotion: string): string => {
  const emotionMap: Record<string, string> = {
    Dread: "dread",
    Guilt: "guilt",
    Anxiety: "anxiety",
    Boredom: "boredom",
  };
  return emotionMap[emotion] || emotion.toLowerCase();
};
