import { getAllArticles, getAllCategories } from "@/lib/markdown";
import { ArticleCard } from "@/components/ArticleCard";
import Link from "next/link";
import { Search, Mail } from "lucide-react";
import Image from "next/image";
import fs from "fs";
import path from "path";

// Social link icons as inline SVGs
function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Home() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  const featuredArticles = articles.slice(0, 2);
  const latestArticles = articles.slice(2, 8);

  // Check if user has uploaded a profile photo
  const profilePhotoPath = path.join(process.cwd(), "public/images/profile/avatar.jpg");
  const hasProfilePhoto = fs.existsSync(profilePhotoPath);

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1C4GRp4yAe/",
      icon: <FacebookIcon />,
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/isuru.dev?igsh=aGZydWFodzFpaWli",
      icon: <InstagramIcon />,
      color: "hover:text-pink-600 dark:hover:text-pink-400",
    },
    {
      label: "GitHub",
      href: "https://github.com/Dev-isururoy",
      icon: <GitHubIcon />,
      color: "hover:text-foreground",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@Isururoy",
      icon: <YouTubeIcon />,
      color: "hover:text-red-600 dark:hover:text-red-400",
    },
    {
      label: "Email",
      href: "mailto:dev.isururoy@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-accent",
    },
  ];

  return (
    <div className="space-y-24">

      {/* ── HERO SECTION ── */}
      <section className="pt-16 pb-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-border shadow-lg bg-card">
              {hasProfilePhoto ? (
                <Image
                  src="/images/profile/avatar.jpg"
                  alt="Roy's profile photo"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                /* Stylish initials placeholder */
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                  <span className="text-4xl md:text-5xl font-extrabold text-accent select-none">R</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-5">

            {/* Name + badge */}
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground">
                  Dev-Roy
                </h1>
                <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  ✦ Systems Engineer
                </span>
              </div>
              <p className="text-base text-muted font-medium">Isuru Roy &mdash; Sri Lanka 🇱🇰</p>
            </div>

            {/* Bio */}
            <p className="text-lg md:text-xl text-muted font-light leading-relaxed max-w-2xl">
              Systems Engineer passionate about IT Infrastructure, Networking & Cybersecurity.
              I write about technology, share what I learn, and simplify complex topics for everyone.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-2 pt-1 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border text-muted transition-all duration-200 hover:border-accent/50 hover:shadow-sm hover:scale-105 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-1 flex-wrap">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full font-semibold text-sm hover:bg-foreground/90 transition-all duration-200 hover:shadow-md"
              >
                Read Articles →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-card border border-border text-foreground rounded-full font-semibold text-sm hover:border-accent transition-all duration-200"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm md:max-w-md">
          <div className="text-center md:text-left p-4 bg-card rounded-2xl border border-border">
            <p className="text-2xl font-bold text-foreground">{articles.length}</p>
            <p className="text-xs text-muted mt-0.5">Articles</p>
          </div>
          <div className="text-center md:text-left p-4 bg-card rounded-2xl border border-border">
            <p className="text-2xl font-bold text-foreground">{categories.length}</p>
            <p className="text-xs text-muted mt-0.5">Categories</p>
          </div>
          <div className="text-center md:text-left p-4 bg-card rounded-2xl border border-border">
            <p className="text-2xl font-bold text-foreground">🇱🇰</p>
            <p className="text-xs text-muted mt-0.5">Sri Lanka</p>
          </div>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section>
        <form action="/articles" method="GET" className="relative max-w-xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted" />
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted"
            />
          </div>
        </form>
      </section>

      {/* ── CATEGORIES ── */}
      {categories.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-6">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/articles?category=${encodeURIComponent(category)}`}
                className="px-5 py-2.5 bg-card hover:bg-background border border-border hover:border-accent rounded-full text-sm font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FEATURED ARTICLES ── */}
      {featuredArticles.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
            <Link href="/articles" className="text-accent hover:underline text-sm font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ── LATEST ARTICLES ── */}
      {latestArticles.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
