import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MicroAckProps {
  message?: string;
  visible: boolean;
}

const messages = [
  "Nice—one step closer to your first win.",
  "Getting clearer.",
  "Perfect. Keep going.",
  "You're on track.",
  "Almost there.",
];

export const MicroAck: React.FC<MicroAckProps> = ({
  message = messages[Math.floor(Math.random() * messages.length)],
  visible,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground shadow-lg transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
