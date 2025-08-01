import { Metadata } from 'next'
import TermsClient from './terms-client'

export const metadata: Metadata = {
  title: 'Terms of Service - Fortune Cookie Usage Agreement',
  description: 'Read Fortune Cookie\'s terms of service and usage agreement. Understand your rights and responsibilities when using our fortune telling platform and daily readings service.',
  keywords: 'fortune cookie terms of service, fortune telling terms, usage agreement, fortune reading terms, service agreement, fortune cookie legal',
  authors: [{ name: 'Fortune Cookie' }],
  creator: 'Fortune Cookie',
  publisher: 'Fortune Cookie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: 'Terms of Service - Fortune Cookie Usage Agreement',
    description: 'Read Fortune Cookie\'s terms of service and usage agreement. Understand your rights and responsibilities when using our fortune telling platform and daily readings service.',
    type: 'website',
    siteName: 'Fortune Cookie',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fortune Cookie Terms of Service'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Fortune Cookie Usage Agreement',
    description: 'Read Fortune Cookie\'s terms of service and usage agreement. Understand your rights and responsibilities when using our fortune telling platform and daily readings service.',
    images: ['/og-image.jpg'],
    creator: '@fortunecookie'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code'
  }
}

export default function Terms() {
  return <TermsClient />
}