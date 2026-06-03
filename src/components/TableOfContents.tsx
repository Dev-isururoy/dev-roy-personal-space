"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-10% 0% -60% 0%" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden mb-10">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold hover:bg-background/50 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-foreground">
          <List className="w-4 h-4 text-accent" />
          Table of Contents
        </span>
        <span className={`text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* Items */}
      {open && (
        <nav className="px-5 pb-5 space-y-1 border-t border-border pt-3">
          {headings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`block text-sm py-1 transition-colors border-l-2 hover:text-foreground ${
                level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === id
                  ? "border-accent text-foreground font-medium"
                  : "border-transparent text-muted hover:border-border"
              }`}
            >
              {text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
