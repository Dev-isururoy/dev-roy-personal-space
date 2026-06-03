import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects and work by Isuru Roy — Systems Engineer from Sri Lanka.",
};

const projects = [
  {
    title: "Dev-Roy Personal Blog",
    description:
      "A lightning-fast personal blog built with Next.js 16, Tailwind CSS v4, and Decap CMS. Deployed on Cloudflare Pages with GitHub OAuth authentication.",
    tags: ["Next.js", "Tailwind CSS", "Cloudflare Pages", "Decap CMS"],
    github: "https://github.com/Dev-isururoy/dev-roy-personal-space",
    live: "https://dev-roy-personal-space.pages.dev",
    status: "Live",
    category: "Web Development",
  },
  {
    title: "Network Infrastructure Lab",
    description:
      "A home lab setup featuring enterprise-grade networking with VLANs, firewall rules, and a monitoring stack. Documents the full architecture and configuration.",
    tags: ["Networking", "VLANs", "Firewall", "pfSense"],
    github: "https://github.com/Dev-isururoy",
    live: null,
    status: "In Progress",
    category: "Networking",
  },
  {
    title: "Cybersecurity Notes & CTF Writeups",
    description:
      "A growing collection of cybersecurity notes, Capture the Flag challenge writeups, and penetration testing methodology documentation.",
    tags: ["Cybersecurity", "CTF", "Penetration Testing", "Documentation"],
    github: "https://github.com/Dev-isururoy",
    live: null,
    status: "Ongoing",
    category: "Cybersecurity",
  },
  {
    title: "Automated Server Monitoring",
    description:
      "Scripts and dashboards for monitoring server health, disk usage, CPU load, and network traffic with real-time alerting via email and Telegram.",
    tags: ["Python", "Bash", "Grafana", "Prometheus"],
    github: "https://github.com/Dev-isururoy",
    live: null,
    status: "Completed",
    category: "Systems Administration",
  },
];

const statusColors: Record<string, string> = {
  Live: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "In Progress": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  Ongoing: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Completed: "bg-accent/10 text-accent border-accent/20",
};

export default function PortfolioPage() {
  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16">

      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Portfolio</h1>
        <p className="text-xl text-muted font-light leading-relaxed max-w-2xl">
          A collection of projects I&apos;ve built, experiments I&apos;ve run, and things I&apos;ve learned along the way.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-card border border-border rounded-full text-xs font-medium text-muted"
            >
              {cat}
            </span>
          ))}
        </div>
      </header>

      {/* Projects grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col p-6 bg-card rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-md"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-muted font-medium">{project.category}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  statusColors[project.status]
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors leading-snug">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed flex-grow mb-5">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-background text-xs text-foreground rounded-lg border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 mt-auto">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors font-medium"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
                >
                  <Globe className="w-4 h-4" />
                  Live Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center py-10 px-6 bg-card rounded-3xl border border-border">
        <h2 className="text-2xl font-bold mb-3">Want to collaborate?</h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          I&apos;m always open to interesting projects, freelance work, or just a good tech conversation.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="mailto:contact@dev-roy.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full font-semibold text-sm hover:bg-foreground/90 transition-all"
          >
            Get in Touch
          </a>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-background border border-border text-foreground rounded-full font-semibold text-sm hover:border-accent transition-all"
          >
            About Me
          </Link>
        </div>
      </section>
    </div>
  );
}
