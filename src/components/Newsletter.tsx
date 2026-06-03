"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    // Simulate API call for now.
    // In the future, hook this up to Mailchimp, ConvertKit, etc.
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="w-full my-12 p-8 sm:p-10 bg-accent/5 border border-accent/20 rounded-3xl text-center shadow-inner relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm border border-border mb-6">
          <Mail className="w-8 h-8 text-accent" />
        </div>
        
        <h3 className="text-3xl font-extrabold tracking-tight mb-3">
          Subscribe to my Newsletter
        </h3>
        <p className="text-muted text-base leading-relaxed mb-8">
          Get the latest articles on systems engineering, cybersecurity, and networking delivered straight to your inbox. No spam, ever.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-2 p-6 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-2xl w-full">
            <CheckCircle2 className="w-8 h-8" />
            <p className="font-semibold">You're subscribed!</p>
            <p className="text-sm opacity-80">Thank you for joining.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === "loading"}
              className="flex-grow px-5 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:opacity-50 transition-all shadow-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/50 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
