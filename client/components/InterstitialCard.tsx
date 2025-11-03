import React from "react";
import type { ReactNode } from "react";

export type InterstitialCardProps = {
  title: string;
  body: string;
  note?: string;
  ctaLabel?: string;
  onContinue?: () => void;
  variant?: "belief" | "proof" | "momentum";
  icon?: ReactNode;
};

export const InterstitialCard: React.FC<InterstitialCardProps> = ({
  title,
  body,
  note,
  ctaLabel = "Continue",
  onContinue,
  variant = "belief",
  icon,
}) => {
  // Reduced motion aware confetti pulse (hover dopamine)
  React.useEffect(() => {
    // Placeholder: add confetti pulse logic here
  }, []);

  return (
    <div
      className={
        "w-full max-w-md bg-blue-50 border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-200 ease-out animate-fade-in" +
        (variant === "proof"
          ? " bg-blue-100 border-blue-200"
          : variant === "momentum"
          ? " bg-blue-200 border-blue-300"
          : "")
      }
      style={{ minHeight: 320 }}
      tabIndex={0}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h2 className="text-2xl font-bold text-blue-900 mb-2">{title}</h2>
      <p className="text-base text-blue-800 mb-4">{body}</p>
      {note && <div className="text-sm text-blue-600 mb-6">{note}</div>}
      <button
        onClick={onContinue}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-150 hover:scale-105 relative"
        style={{ minWidth: 120 }}
        aria-label={ctaLabel}
      >
        {ctaLabel}
        {/* Confetti pulse effect would go here */}
      </button>
    </div>
  );
};
