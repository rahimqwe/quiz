import React, { useEffect, useState } from "react";

interface Dot {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  color: string;
}

interface ConfettiProps {
  trigger: boolean;
}

const colors = ["#BFD7EA", "#7A9CC6", "#526D82", "#D9CBBE"];

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      const newDots: Dot[] = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 80 + 10,
        top: Math.random() * 20 + 20,
        delay: Math.random() * 100,
        duration: 400 + Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setDots(newDots);
      setKey((prev) => prev + 1);

      const timer = setTimeout(() => {
        setDots([]);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (dots.length === 0) {
    return null;
  }

  return (
    <div key={key} className="fixed inset-0 pointer-events-none overflow-hidden">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-2 h-2 rounded-full animate-out fade-out"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            backgroundColor: dot.color,
            animation: `confetti-burst ${dot.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
            animationDelay: `${dot.delay}ms`,
          }}
        />
      ))}

      <style>{`
        @keyframes confetti-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, ${Math.random() * 100 - 50}px), var(--ty, ${Math.random() * 200 + 100}px)) scale(0);
          }
        }
      `}</style>
    </div>
  );
};
