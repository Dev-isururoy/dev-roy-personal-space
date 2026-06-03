import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Dev-Roy | Personal Blog",
    template: "%s | Dev-Roy",
  },
  description: "Minimal, elegant, and fast personal article website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Navigation />
          <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
