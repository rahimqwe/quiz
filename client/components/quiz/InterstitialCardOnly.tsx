import React from "react";

export type InterstitialCardOnlyProps = {
  headline: string;
  subhead: string;
  bullets?: string[];
  ctaLabel?: string;
  onContinue?: () => void;
  image?: React.ReactNode; // placeholder for image above text
};

export const InterstitialCardOnly: React.FC<InterstitialCardOnlyProps> = ({
  headline,
  subhead,
  bullets,
  ctaLabel = "Continue",
  onContinue,
  image,
}) => {
  return (
    <div
      className="w-full rounded-2xl  flex flex-col items-center transition-all duration-200 ease-out animate-fade-in"
      style={{ minHeight: 220 }}
      tabIndex={0}
    >
      {/* Image placeholder */}
      {image && <div className=" w-full flex justify-center">{image}</div>}
      {/* Headline */}
      <h2 className="text-2xl font-bold text-[#435065] mb-2 text-center">
        {headline}
      </h2>
      {/* Subhead */}
      <p className="text-base text-muted-foreground mb-4 text-center">
        {subhead}
      </p>
      {/* Bullets (optional) */}
      {bullets && bullets.length > 0 && (
        <ul className="mb-10 space-y-2 w-full max-w-md">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-left text-foreground"
            >
              <span className="h-2 w-2 min-h-[0.5rem] min-w-[0.5rem] max-h-[0.5rem] max-w-[0.5rem] rounded-full bg-primary inline-block mt-[.5em]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {/* CTA */}
      <button
        onClick={onContinue}
        className="px-8 py-3 rounded-full w-full bg-gradient-to-r from-secondary to-secondary/80 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 hover:bg-primary/100 w-full max-w-xs mt-6"
        style={{ minWidth: 320 }}
        aria-label={ctaLabel}
      >
        {ctaLabel}
      </button>
    </div>
  );
};
