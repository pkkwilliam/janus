import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Navigation } from "@/components/ui/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystical - Your Spiritual Journey Awaits",
  description: "Discover your mystical path with personalized readings, meditation guides, and spiritual insights. Connect with your inner wisdom through our intuitive mobile experience.",
  keywords: "mystical, spiritual, meditation, tarot, astrology, wellness, mindfulness, personal growth",
  authors: [{ name: "Mystical App" }],
  creator: "Mystical App",
  publisher: "Mystical App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mystical-app.com'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mystical - Your Spiritual Journey Awaits",
    description: "Discover your mystical path with personalized readings, meditation guides, and spiritual insights.",
    url: "/",
    siteName: "Mystical App",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mystical App - Spiritual Journey",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystical - Your Spiritual Journey Awaits",
    description: "Discover your mystical path with personalized readings, meditation guides, and spiritual insights.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#007AFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen text-gray-900 overflow-x-hidden`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        <QueryProvider>
          <Navigation />
          <main className="pt-16 md:pt-16 pb-16 md:pb-0 min-h-screen">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
