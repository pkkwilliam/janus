import type { Metadata } from "next";
import { AboutClient } from './about-client';

export const metadata: Metadata = {
  title: "About Fortune Cookie - Ancient Wisdom Meets Modern Technology",
  description: "Learn about Fortune Cookie's mission to bring you personalized fortune telling and lucky insights. Discover ancient wisdom through our AI-powered fortune cookies and daily readings.",
  keywords: "about fortune cookie, fortune telling company, lucky insights technology, ancient wisdom AI, fortune cookie readings, daily fortune platform",
  openGraph: {
    title: "About Fortune Cookie - Ancient Wisdom Meets Modern Technology",
    description: "Learn about Fortune Cookie's mission to bring you personalized fortune telling and lucky insights through ancient wisdom and modern AI.",
    url: "/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Fortune Cookie - Fortune Telling Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Fortune Cookie - Ancient Wisdom Meets Modern Technology",
    description: "Learn about Fortune Cookie's mission to bring you personalized fortune telling and lucky insights through ancient wisdom and modern AI.",
    images: ["/og-about.jpg"],
  },
};
export default function AboutUs() {
  return <AboutClient />;
}