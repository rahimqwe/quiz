// client/AnalyticsListener.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AnalyticsListener: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "page_view",
      page_path: location.pathname,
    });
  }, [location.pathname]);

  return null;
};
