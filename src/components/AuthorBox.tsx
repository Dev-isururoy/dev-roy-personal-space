import Link from "next/link";
import { Github, Globe, Mail } from "lucide-react";

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
            className="p-2 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@dev-roy.com"
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
