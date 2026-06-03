"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    
    // REPLACE THESE WITH YOUR ACTUAL GITHUB REPO DETAILS LATER
    script.setAttribute("data-repo", "Dev-isururoy/dev-roy-personal-space");
    script.setAttribute("data-repo-id", "R_kgDONgLh2A"); // You'll need to get your actual repo ID from Giscus
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDONgLh2M4ClWeM"); // You'll need to get your actual category ID
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "transparent_dark" : "light");
    script.setAttribute("data-lang", "en");

    ref.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="w-full my-12">
      <h3 className="text-2xl font-bold tracking-tight mb-8">Comments</h3>
      <div ref={ref} className="min-h-[200px]" />
    </div>
  );
}
