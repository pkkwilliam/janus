import type { Metadata } from "next";
import OurStoryClient from './our-story-client';

export const metadata: Metadata = {
  title: "Our Story - About Fortune Cookie | Ancient Wisdom Meets AI",
  description: "Discover the story behind Fortune Cookie. Learn how we combine ancient divination wisdom with modern AI technology to bring personalized fortune readings to everyone.",
  keywords: "fortune cookie story, about fortune cookie, fortune telling history, ancient wisdom technology, AI fortune telling, spiritual technology",
  openGraph: {
    title: "Our Story - About Fortune Cookie",
    description: "Discover the story behind Fortune Cookie. Learn how we combine ancient divination wisdom with modern AI technology.",
    url: "/our-story/",
    images: [
      {
        url: "/og-our-story.jpg",
        width: 1200,
        height: 630,
        alt: "Fortune Cookie Our Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story - About Fortune Cookie",
    description: "Discover the story behind Fortune Cookie. Learn how we combine ancient divination wisdom with modern AI technology.",
    images: ["/og-our-story.jpg"],
  },
};

export default function OurStoryPage() {
  return <OurStoryClient />;
}
