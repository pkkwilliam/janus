import type { Metadata } from "next";
import { PricingClient } from './pricing-client';

export const metadata: Metadata = {
  title: "Fortune Cookie Pricing - Premium Fortune Readings & Lucky Insights",
  description: "Choose your fortune journey with Fortune Cookie's flexible pricing plans. Get detailed lucky element guidance, personalized fortune advice, and premium daily readings.",
  keywords: "fortune cookie pricing, fortune telling subscription, premium fortune readings, daily fortune pricing, lucky insights subscription, fortune guidance plans",
  openGraph: {
    title: "Fortune Cookie Pricing - Premium Fortune Readings & Lucky Insights",
    description: "Choose your fortune journey with flexible pricing plans. Get detailed lucky element guidance and personalized fortune insights.",
    url: "/pricing",
    images: [
      {
        url: "/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Fortune Cookie Pricing Plans - Fortune Reading Subscription",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Cookie Pricing - Premium Fortune Readings & Lucky Insights",
    description: "Choose your fortune journey with flexible pricing plans. Get detailed lucky element guidance and personalized fortune insights.",
    images: ["/og-pricing.jpg"],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}

