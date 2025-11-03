import React from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { INTERSTITIALS } from "@/content/interstitials";
import { InterstitialCardOnly } from "@/components/quiz/InterstitialCardOnly";
import { ArrowLeft } from "lucide-react";
import afterQ6Img from "/public/second.webp";
export const InterstitialObjectionsScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
          aria-label="Go back to previous question"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        {/* Progress Bar */}
        {/* <ProgressBar current={10} total={14} /> */}
        {/* Interstitial Card in main content area */}
        <div className="space-y-8">
          <InterstitialCardOnly
            {...INTERSTITIALS.afterQ9}
            onContinue={() => navigate("/quiz/7")}
             image={
              <img
              src={afterQ6Img}
              alt="Calm line-art character with finger hovering near a softly glowing ON toggle"
              // width={420}        // set real intrinsic size if you know it
              height={420}       // (helps prevent layout shift)
              className="mx-auto w-full max-w-[240px] h-auto object-contain pb-2"
              fetchPriority="high"               
              loading="eager"
              decoding="async"
            />} // Placeholder
          />
        </div>
      </div>
    </div>
  );
};
