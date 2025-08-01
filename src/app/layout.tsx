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
  title: "Fortune Cookie - Your Fortune Awaits",
  description: "Discover your fortune with personalized readings, lucky insights, and ancient wisdom. Get your daily fortune cookie and unlock your destiny through our intuitive experience.",
  keywords: "fortune cookie, fortune telling, lucky numbers, daily fortune, personalized readings, ancient wisdom, destiny, luck, spiritual guidance",
  authors: [{ name: "Fortune Cookie" }],
  creator: "Fortune Cookie",
  publisher: "Fortune Cookie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://fortune-cookie.me'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fortune Cookie - Your Fortune Awaits",
    description: "Discover your fortune with personalized readings, lucky insights, and ancient wisdom. Get your daily fortune cookie and unlock your destiny.",
    url: "/",
    siteName: "Fortune Cookie",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fortune Cookie - Your Fortune Awaits",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Cookie - Your Fortune Awaits",
    description: "Discover your fortune with personalized readings, lucky insights, and ancient wisdom. Get your daily fortune cookie.",
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
        <meta name="theme-color" content="#F59E0B" />
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
