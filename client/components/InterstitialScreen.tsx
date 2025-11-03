import React from "react";
import { InterstitialCard, InterstitialCardProps } from "./InterstitialCard";

export const InterstitialScreen: React.FC<InterstitialCardProps & { progress: number; total: number }> = (props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 px-4 py-8">
      <div className="flex-1 flex items-center justify-center w-full">
        <InterstitialCard {...props} />
      </div>
      <div className="flex gap-2 mt-8 mb-4">
        {Array.from({ length: props.total }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i < props.progress ? "bg-blue-600" : "bg-blue-200"} transition-all`}
          />
        ))}
      </div>
    </div>
  );
};
