"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-center gap-4 justify-between relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />

        <div className="flex-grow z-10 text-center sm:text-left">
          <p className="text-sm text-foreground font-medium mb-1">
            We use cookies to improve your experience and serve personalized ads.
          </p>
          <p className="text-xs text-muted">
            By continuing to use this site, you agree to our{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
          <button
            onClick={acceptCookies}
            className="flex-1 sm:flex-none px-6 py-2 bg-foreground text-background font-medium rounded-full text-sm hover:bg-foreground/90 transition-colors whitespace-nowrap"
          >
            Got it!
          </button>
          <button
            onClick={() => setShow(false)}
            aria-label="Close"
            className="p-2 text-muted hover:text-foreground hover:bg-background rounded-full transition-colors hidden sm:block"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
