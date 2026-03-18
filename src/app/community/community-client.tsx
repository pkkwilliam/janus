import type { Metadata } from "next";
import CommunityClient from './community-client';

export const metadata: Metadata = {
  title: "Fortune Cookie Community - Join Fellow Fortune Seekers",
  description: "Join our vibrant community of 50,000+ fortune seekers. Share readings, discuss spiritual insights, and connect with like-minded individuals on their mystical journey.",
  keywords: "fortune cookie community, fortune telling forum, spiritual community, astrology discussions, tarot community, mystical seekers",
  openGraph: {
    title: "Fortune Cookie Community - Join Fellow Fortune Seekers",
    description: "Join our vibrant community of 50,000+ fortune seekers. Share readings and connect with like-minded individuals.",
    url: "/community/",
    images: [
      {
        url: "/og-community.jpg",
        width: 1200,
        height: 630,
        alt: "Fortune Cookie Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Cookie Community - Join Fellow Fortune Seekers",
    description: "Join our vibrant community of 50,000+ fortune seekers. Share readings and connect with like-minded individuals.",
    images: ["/og-community.jpg"],
  },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
