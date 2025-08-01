import { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Fortune Cookie - Your Fortune Awaits',
  description: 'Discover personalized fortune telling and spiritual insights through古の知恵. Get your daily fortune cookie, lucky numbers, and unlock your destiny.',
  keywords: 'fortune cookie, fortune telling, lucky numbers, daily fortune, personalized readings, ancient wisdom, destiny, luck',
};

export default function Home() {
  return <HomeClient />;
}