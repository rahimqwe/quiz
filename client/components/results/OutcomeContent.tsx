import { OutcomeType } from "@/hooks/use-quiz";

export interface OutcomeContent {
  loopName: string; // e.g., "Perfect Plan Trap"
  description: string; // 1 sentence
  // bridge: string; // 1-2 sentence bridge to product
}

export const getOutcomeContent: Record<OutcomeType, OutcomeContent> = {
  A: {
    loopName: "Perfect Plan Trap",
    description: `You can’t start until you’ve found the “right” way - so you keep planning and still don’t begin.

Your brain treats “starting wrong” as danger, so it demands certainty first.

For this pattern, complex systems are just another place to hide.`

  },
  B: {
    loopName: "Research Spiral",
    description: `You keep watching videos and collecting info instead of starting.

Why? Learning gives dopamine without the stress of doing. “One more tip” feels safer than the first step.

For this pattern, research isn’t preparation - it’s avoidance.`

  },
  C: {
    loopName: "Social Panic Loop",
    description: `You rewrite texts and emails over and over - or don’t send them at all.

You’re scared of saying the wrong thing and being judged, so your brain keeps you rehearsing until you’re exhausted.

For this pattern, more time doesn’t help - it makes it heavier.`

  },
  D: {
    loopName: "Options Freeze",
    description: `Too many choices and you pick none - even with simple stuff like what to eat or which task to start.

Your brain can’t filter “important” from “unimportant,” so every choice feels high-stakes.

You don’t need better decision tools - you need fewer decisions.`

  },
};