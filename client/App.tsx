import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/hooks/use-quiz";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Q1PatternScreen } from "./pages/quiz/Q1Pattern";
import { Q2IntensityScreen } from "./pages/quiz/Q2Intensity";
import { Q3ClarityScreen } from "./pages/quiz/Q3Clarity";
import { Q4EmotionScreen } from "./pages/quiz/Q4Emotion";
import { Q5Pattern2Screen } from "./pages/quiz/Q5Pattern2";
import { Q6TaskScreen } from "./pages/quiz/Q6Task";
import { Email } from "./pages/quiz/email";
import { LoadingScreen } from "./pages/Loading";
import { ResultsPage } from "./pages/Results";
import { AnalyticsListener } from "./AnalyticsListener";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <QuizProvider>
        <BrowserRouter>
        <AnalyticsListener />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz/1" element={<Q1PatternScreen />} />
            <Route path="/quiz/2" element={<Q2IntensityScreen />} />
            <Route path="/quiz/3" element={<Q3ClarityScreen />} />
            <Route path="/quiz/4" element={<Q4EmotionScreen />} />
            <Route path="/quiz/5" element={<Q5Pattern2Screen />} />
            <Route path="/quiz/6" element={<Q6TaskScreen />} />
            <Route path="/quiz/email" element={<Email />} />
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/results" element={<ResultsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root");

if (container) {
  // Store root on window to persist across HMR reloads
  if (!(window as any).__appRoot) {
    (window as any).__appRoot = createRoot(container);
  }
  (window as any).__appRoot.render(<App />);
}
