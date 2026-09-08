import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ratatune — Harmonica Bend Accuracy | Know Where Your Bends Actually Land",
  description:
    "Ratatune listens to your harmonica bends through the microphone and shows you exactly where your note landed. Stop guessing — get measurable pitch feedback in real time. Join the early-access list.",
  keywords: [
    "harmonica",
    "bend accuracy",
    "pitch training",
    "harmonica practice",
    "bend tuning",
    "Ratatune",
    "music practice app",
  ],
  openGraph: {
    title: "Ratatune — Finally Hear Whether Your Bends Are Actually In Tune",
    description:
      "AI-powered harmonica bend accuracy. See exactly where your note landed compared with the target pitch.",
    type: "website",
    siteName: "Ratatune",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${syne.variable} ${spaceMono.variable} antialiased selection:bg-emerald-500/30 selection:text-emerald-300`}
    >
      <body className="min-h-screen flex flex-col bg-[#07090e] text-[#f0f4f8] font-sans relative overflow-x-hidden">{children}</body>
    </html>
  );
}
