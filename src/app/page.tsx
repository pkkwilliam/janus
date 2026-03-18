import { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Fortune Cookie - Free Chinese Zodiac Readings & Daily Fortune 2026',
  description: 'Get your free personalized Chinese zodiac fortune reading for 2026. Discover career predictions, love compatibility, lucky numbers & daily spiritual guidance based on ancient wisdom.',
  keywords: [
    'chinese zodiac',
    'fortune cookie',
    'free fortune reading',
    'daily fortune',
    'chinese horoscope 2026',
    'zodiac compatibility',
    'lucky numbers',
    'career fortune',
    'love fortune',
    'year of the snake 2026',
    'chinese astrology',
    'fortune telling online',
    'spiritual guidance',
    'destiny reading',
    'birth chart analysis',
  ],
  openGraph: {
    title: 'Fortune Cookie - Free Chinese Zodiac Readings & Daily Fortune',
    description: 'Get your free personalized Chinese zodiac fortune reading. Discover career predictions, love compatibility, lucky numbers & daily spiritual guidance.',
    url: '/',
    siteName: 'Fortune Cookie',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fortune Cookie - Free Chinese Zodiac Readings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fortune Cookie - Free Chinese Zodiac Readings & Daily Fortune',
    description: 'Get your free personalized Chinese zodiac fortune reading. Discover career predictions, love compatibility, lucky numbers & daily spiritual guidance.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}