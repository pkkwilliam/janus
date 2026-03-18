import type { Metadata } from "next";
import GettingStartedClient from './getting-started-client';

export const metadata: Metadata = {
  title: "Getting Started - How to Use Fortune Cookie | Free Fortune Readings",
  description: "Learn how to get started with Fortune Cookie. Create your account, complete your profile, and get your first free personalized fortune reading in minutes.",
  keywords: "how to use fortune cookie, getting started fortune telling, free fortune reading guide, fortune cookie tutorial, first fortune reading, chinese zodiac guide",
  openGraph: {
    title: "Getting Started - How to Use Fortune Cookie",
    description: "Learn how to get started with Fortune Cookie. Create your account and get your first free personalized reading.",
    url: "/getting-started/",
    images: [
      {
        url: "/og-getting-started.jpg",
        width: 1200,
        height: 630,
        alt: "Getting Started with Fortune Cookie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Started - How to Use Fortune Cookie",
    description: "Learn how to get started with Fortune Cookie. Create your account and get your first free personalized reading.",
    images: ["/og-getting-started.jpg"],
  },
};

export default function GettingStartedPage() {
  return <GettingStartedClient />;
}
