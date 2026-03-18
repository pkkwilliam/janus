import type { Metadata } from "next";
import HelpCenter from './help-client';

export const metadata: Metadata = {
  title: "Fortune Cookie Help Center - FAQ & Support",
  description: "Get answers to your questions about fortune readings, account settings, billing, and more. Browse our comprehensive FAQ or contact our support team.",
  keywords: "fortune cookie help, fortune telling FAQ, fortune reading support, how to use fortune cookie, fortune cookie guide, spiritual readings help",
  openGraph: {
    title: "Fortune Cookie Help Center - FAQ & Support",
    description: "Get answers to your questions about fortune readings, account settings, billing, and more.",
    url: "/help/",
    images: [
      {
        url: "/og-help.jpg",
        width: 1200,
        height: 630,
        alt: "Fortune Cookie Help Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Cookie Help Center - FAQ & Support",
    description: "Get answers to your questions about fortune readings, account settings, billing, and more.",
    images: ["/og-help.jpg"],
  },
};

export default function HelpPage() {
  return <HelpCenter />;
}
