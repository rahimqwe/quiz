import React from "react";
import { Zap } from "lucide-react";

export const MomentumForecast: React.FC = () => {
  const checkpoints = [
    { time: "0:45", label: "First spark" },
    { time: "2:00", label: "Momentum builds" },
    { time: "5:00", label: "Rolling" },
  ];

  return (
    <div className="space-y-4 p-6 rounded-2xl bg-primary/10 border border-primary/20">
      <h3 className="text-sm font-semibold text-foreground">Momentum Forecast</h3>

      <div className="space-y-4">
        {/* Timeline visualization */}
        <div className="relative h-24 flex items-end justify-between">
          {checkpoints.map((cp, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
              <div className="h-16 flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    idx === 0
                      ? "h-4 bg-primary"
                      : idx === 1
                        ? "h-10 bg-secondary"
                        : "h-16 bg-accent"
                  }`}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-foreground">{cp.time}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {cp.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Expect a click inside 90–150 seconds using the steps below.
        </p>
      </div>
    </div>
  );
};
