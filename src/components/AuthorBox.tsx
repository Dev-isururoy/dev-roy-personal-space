"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export function AuthorBox({ author = "Isuru Roy" }: { author?: string }) {
  return (
    <div className="w-full my-12 p-8 bg-card border border-border rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-background bg-accent flex items-center justify-center text-3xl font-bold text-white shadow-lg">
        {/* We can use the avatar.jpg if it exists, otherwise fallback to initials */}
        <img 
          src="/images/profile/avatar.jpg" 
          alt={author}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <span className="absolute">IR</span>
      </div>

      {/* Bio */}
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center sm:justify-start gap-2">
          {author}
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            Author
          </span>
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">
          Systems Engineer from Sri Lanka. I write about enterprise networking, cybersecurity, homelabs, and web development. Passionate about building robust infrastructure and sharing knowledge.
        </p>
        
        {/* Links */}
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <a
            href="https://github.com/Dev-isururoy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="mailto:dev.isururoy@gmail.com"
            className="p-2 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <Link
            href="/about"
            className="text-sm font-medium text-accent hover:underline ml-2"
          >
            Read full bio &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
