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

// FAQ Schema for structured data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create an account?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click 'Sign Up' in the top right corner, provide your email and create a secure password. You'll receive a verification email to activate your account."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are your readings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI combines traditional divination methods with sophisticated algorithms and your personal data for highly accurate insights. Accuracy improves with more complete profile information."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept all major credit cards, debit cards, and digital wallets through Stripe. Your payment information is securely encrypted."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel my subscription anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period."
      }
    },
    {
      "@type": "Question",
      "name": "How do you protect my personal information?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use industry-standard encryption and never share your personal data with third parties. Your readings and profile are completely private."
      }
    }
  ]
};

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HelpCenter />
    </>
  );
}
