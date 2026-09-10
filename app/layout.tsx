import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Human Atlas — Interactive Anatomy",
  description: "Explore male and female anatomy in 3D, isolate body systems, and learn about structures and pain locations.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
