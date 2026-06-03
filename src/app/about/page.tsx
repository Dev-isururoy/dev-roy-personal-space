import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Roy and this blog.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <header className="text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About Me
        </h1>
        <p className="text-xl text-muted font-light leading-relaxed">
          Hello! I'm Roy. I'm a technology enthusiast with a passion for IT Infrastructure, Networking, and Cybersecurity.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Professional Summary</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted leading-relaxed">
          <p>
            I built this space to share my knowledge, document my learning journey, and connect with other professionals in the tech industry. 
            My focus is on simplifying complex technical topics and delivering them in an easy-to-digest format.
          </p>
          <p>
            With a background in systems architecture and network security, I aim to provide practical insights that you can apply to your own projects and career.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Core Skills</h2>
        <div className="flex flex-wrap gap-3">
          {['Networking', 'Cybersecurity', 'Cloud Infrastructure', 'System Administration', 'Next.js', 'React', 'TypeScript'].map(skill => (
             <span key={skill} className="px-4 py-2 bg-card text-foreground rounded-xl border border-border text-sm font-medium">
               {skill}
             </span>
          ))}
        </div>
      </section>

      <section className="pt-8 border-t border-border space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
        <p className="text-muted">Feel free to reach out for collaborations or just a friendly chat.</p>
        <div className="flex space-x-4">
          <a
            href="mailto:dev.isururoy@gmail.com"
            className="flex items-center space-x-2 px-5 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors font-medium text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-3 bg-card border border-border rounded-full hover:border-accent transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.1a5.1 5.1 0 0 0-1.5-3.8 4.7 4.7 0 0 0 .1-3.6s-1.2-.4-3.9 1.5a13.3 13.3 0 0 0-7 0C6.2 1.1 5 1.5 5 1.5a4.7 4.7 0 0 0 .1 3.6 5.1 5.1 0 0 0-1.5 3.8c0 5.7 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-3 bg-card border border-border rounded-full hover:border-accent transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </section>
    </div>
  );
}
