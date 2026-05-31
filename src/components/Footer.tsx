import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted">
            &copy; {currentYear} Dev-Roy. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.1a5.1 5.1 0 0 0-1.5-3.8 4.7 4.7 0 0 0 .1-3.6s-1.2-.4-3.9 1.5a13.3 13.3 0 0 0-7 0C6.2 1.1 5 1.5 5 1.5a4.7 4.7 0 0 0 .1 3.6 5.1 5.1 0 0 0-1.5 3.8c0 5.7 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a
            href="mailto:contact@dev-roy.com"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
