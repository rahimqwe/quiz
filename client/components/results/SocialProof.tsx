import React from "react";
import { MessageSquare } from "lucide-react";

const microWins = [
  { name: "Kat", action: "sent invoice", time: "2m" },
  { name: "Mo", action: "wrote first sentence", time: "3m" },
  { name: "Anya", action: "sorted 7 receipts", time: "4m" },
];

const ugcQuote = {
  name: "Jamie R.",
  text: "I've tried 5 productivity systems. This actually got me moving. The 2-minute hack broke the freeze.",
};

export const SocialProof: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* UGC Card */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-base leading-relaxed italic text-foreground">
                "{ugcQuote.text}"
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                — {ugcQuote.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-wins carousel */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">
          Real wins (last 24h)
        </h4>
        <div className="grid gap-3">
          {microWins.map((win, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {win.name}
                </p>
                <p className="text-xs text-muted-foreground">{win.action}</p>
              </div>
              <p className="text-xs font-semibold text-secondary">{win.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
