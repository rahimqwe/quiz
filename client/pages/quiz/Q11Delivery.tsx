import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { Mail } from "lucide-react";

export const Q11DeliveryScreen: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically inject the systeme.io form script
    const script = document.createElement("script");
    script.id = "form-script-tag-21222180";
    script.src = "https://www.startminded.com/public/remote/page/34705639bff38cec8f11ecd5add244eb40a323a2.js";
    script.async = true;
    if (formRef.current) {
      formRef.current.innerHTML = ""; // Clear previous
      formRef.current.appendChild(script);
    }
    // Listen for postMessage from the systeme.io iframe
    function handleMessage(event: MessageEvent) {
      console.log('[Systeme.io form] postMessage event:', event);
      // Accept messages only from systeme.io
      if (event.origin.includes("systeme.io") || event.origin.includes("startminded.com")) {
        if (typeof event.data === "object" && event.data?.type === 'funnel_step_21222180_form_submit_success') {
          navigate("/loading");
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => {
      script.remove();
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Progress Bar */}
        <ProgressBar current={11} total={11} />
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight text-center">
            Enter your email to get your result
          </h2>
          <div className="bg-[#f6fafd] border border-[#e3eaf3] rounded-2xl p-6 w-full mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-[#435065]" />
              <span className="text-base font-semibold text-[#435065]">Email Address</span>
            </div>
            {/* Embedded systeme.io form */}
            <div ref={formRef} id="systeme-form-container" className="w-full flex justify-center"></div>
            <p className="text-xs text-muted-foreground mt-2">
              We promise not to use your email for any activities, and we guarantee its 100% safety and privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
