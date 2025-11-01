import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  isSelected,
  onClick,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isSelected}
      aria-label={`${label}${isSelected ? ", selected" : ""}`}
      className={cn(
        "relative w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected
          ? "border-secondary bg-secondary/10 text-foreground"
          : isHovered
            ? "border-primary bg-primary/5 text-foreground"
            : "border-border bg-card text-foreground hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      style={{
        transform: isSelected ? "scale(1)" : isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isSelected
          ? "0 10px 25px -5px rgba(122, 156, 198, 0.15)"
          : isHovered
            ? "0 10px 20px -5px rgba(122, 156, 198, 0.1)"
            : "0 2px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-base leading-relaxed">{label}</span>
        {isSelected && (
          <Check className="ml-auto h-5 w-5 text-secondary animate-in fade-in duration-300" />
        )}
      </div>
    </button>
  );
};
