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
import { InterstitialScreen } from "./pages/quiz/Interstitial";
import { InterstitialBinaryScreen } from "./pages/quiz/InterstitialBinary";
import { InterstitialObjectionsScreen } from "./pages/quiz/InterstitialObjections";
import { Q6TaskScreen } from "./pages/quiz/Q6Task";
import { Q7DerailScreen } from "./pages/quiz/Q7Derail";
import { Q8TimeScreen } from "./pages/quiz/Q8Time";
import { Q9ToolsScreen } from "./pages/quiz/Q9Tools";
import { Q10MomentumScreen } from "./pages/quiz/Q10Momentum";
import { Q11DeliveryScreen } from "./pages/quiz/Q11Delivery";
import { Q12TaskScreen } from "./pages/quiz/Q12Task";
import { LoadingScreen } from "./pages/Loading";
import { ResultsPage } from "./pages/Results";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz/1" element={<Q1PatternScreen />} />
            <Route path="/quiz/2" element={<Q2IntensityScreen />} />
            <Route path="/quiz/3" element={<Q3ClarityScreen />} />
            <Route path="/quiz/4" element={<Q4EmotionScreen />} />
            <Route path="/quiz/5" element={<Q5Pattern2Screen />} />
            <Route path="/quiz/interstitial" element={<InterstitialScreen />} />
            <Route path="/quiz/interstitial-binary" element={<InterstitialBinaryScreen />} />
            <Route path="/quiz/interstitial-objections" element={<InterstitialObjectionsScreen />} />
            <Route path="/quiz/6" element={<Q6TaskScreen />} />
            <Route path="/quiz/7" element={<Q7DerailScreen />} />
            <Route path="/quiz/8" element={<Q8TimeScreen />} />
            <Route path="/quiz/9" element={<Q9ToolsScreen />} />
            <Route path="/quiz/10" element={<Q10MomentumScreen />} />
            <Route path="/quiz/11" element={<Q11DeliveryScreen />} />
            <Route path="/quiz/12" element={<Q12TaskScreen />} />
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
