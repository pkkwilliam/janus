import type { Metadata } from "next";
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: "Contact Fortune Cookie - Get Support for Your Fortune Journey",
  description: "Get in touch with Fortune Cookie's support team for help with your fortune readings, account questions, or lucky insights. We respond within 24 hours with personalized assistance.",
  keywords: "fortune cookie contact, fortune telling support, lucky insights help, fortune reading questions, customer service, fortune journey assistance",
  openGraph: {
    title: "Contact Fortune Cookie - Get Support for Your Fortune Journey",
    description: "Get in touch with Fortune Cookie's support team for help with your fortune readings, account questions, or lucky insights.",
    url: "/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Fortune Cookie Support Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Fortune Cookie - Get Support for Your Fortune Journey",
    description: "Get in touch with Fortune Cookie's support team for help with your fortune readings, account questions, or lucky insights.",
    images: ["/og-contact.jpg"],
  },
};

export default function Contact() {
  return <ContactClient />;
}