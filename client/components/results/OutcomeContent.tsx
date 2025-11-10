import { OutcomeType } from "@/hooks/use-quiz";

export interface OutcomeContent {
  loopName: string; // e.g., "Perfect Plan Trap"
  description: string; // 1 sentence
  bullets: string[]; // 2 relatable points
  bridge: string; // 1-2 sentence bridge to product
}

export const getOutcomeContent: Record<OutcomeType, OutcomeContent> = {
  A: {
    loopName: "Perfect Plan Trap",
    description: "You feel like you can't begin until you know *exactly* how it will go.",
    bullets: [
      "You mentally rehearse the steps until they get too complex to start.",
      "You get overwhelmed when you don't see a guaranteed outcome.",
    ],
    bridge: "You don’t need more advice — you need a simple reset to move without having it all figured out",
  },
  B: {
    loopName: "Research Spiral",
    description: "You get trapped in reading, watching, or scrolling before you act.",
    bullets: [
      "You 'prepare' endlessly to feel ready — but it never arrives.",
      "You feel productive but avoid the real first step.",
    ],
    bridge: "You don’t need another video — you need one small physical action to flip your brain into motion",
  },
  C: {
    loopName: "Social Panic Loop",
    description: "Your brain replays how you'll be seen, judged, or rejected if you get it wrong.",
    bullets: [
      "You stress about replies, DMs, and tasks involving other people.",
      "You freeze to avoid embarrassment, even if it delays everything.",
    ],
    bridge: "This isn’t therapy — it’s a tiny move that quiets the panic loop so starting feels safe",
  },
  D: {
    loopName: "Options Freeze",
    description: "You see too many choices and your brain can't commit to one.",
    bullets: [
      "You hover between tabs, waiting for a 'perfect' pick to emerge.",
      "You feel more tired the longer you debate what to do first.",
    ],
    bridge: "You need a tool that skips the choice maze by locking you onto one tiny move, fast",
  },
};