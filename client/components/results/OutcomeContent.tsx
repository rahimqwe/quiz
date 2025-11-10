import { OutcomeType } from "@/hooks/use-quiz";

export interface OutcomeContent {
  loopName: string; // e.g., "Perfect Plan Trap"
  description: string; // 1 sentence
  // bridge: string; // 1-2 sentence bridge to product
}

export const getOutcomeContent: Record<OutcomeType, OutcomeContent> = {
  A: {
    loopName: "Perfect Plan Trap",
    description: "You feel like you can't begin until you know *exactly* how it will go",
   
    // bridge: "There’s a way out of the Perfect Plan Trap - and it only takes 5 minutes",
  },
  B: {
    loopName: "Research Spiral",
    description: "You get trapped in reading, watching, or scrolling before you act",
    
    // bridge: "There’s a way out of the Research Spiral - and it only takes 5 minutes",
  },
  C: {
    loopName: "Social Panic Loop",
    description: "Your brain replays how you'll be seen, judged, or rejected if you get it wrong",
    
    // bridge: "There’s a way out of the Social Panic Loop - and it only takes 5 minutes",
  },
  D: {
    loopName: "Options Freeze",
    description: "You see too many choices and your brain can't commit to one",
    
    // bridge: "There’s a way out of the Options Freeze - and it only takes 5 minutes",
  },
};