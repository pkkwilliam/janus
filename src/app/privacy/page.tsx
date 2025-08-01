import type { Metadata } from "next";
import { PrivacyClient } from './privacy-client';

export const metadata: Metadata = {
  title: "Privacy Policy - How Fortune Cookie Protects Your Data",
  description: "Learn how Fortune Cookie protects your personal information and fortune data. We never sell your data and use enterprise-grade security to keep your fortune journey private and secure.",
  keywords: "fortune cookie privacy policy, fortune data protection, fortune telling privacy, personal data security, fortune reading privacy, data protection",
  openGraph: {
    title: "Privacy Policy - How Fortune Cookie Protects Your Data",
    description: "Learn how Fortune Cookie protects your personal information and fortune data. We never sell your data and use enterprise-grade security to keep your fortune journey private and secure.",
    url: "/privacy",
    images: [
      {
        url: "/og-privacy.jpg",
        width: 1200,
        height: 630,
        alt: "Fortune Cookie Privacy Policy - Data Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - How Fortune Cookie Protects Your Data",
    description: "Learn how Fortune Cookie protects your personal information and fortune data. We never sell your data and use enterprise-grade security to keep your fortune journey private and secure.",
    images: ["/og-privacy.jpg"],
  },
};

export default function Privacy() {
  return <PrivacyClient />;
}