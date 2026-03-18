import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Zodiac, normalizeZodiac, ZODIAC_CONFIG } from "@/types/zodiac";
import ZodiacDetailClient from "./ZodiacDetailClient";

// Generate static params for all zodiac animals (required for static export)
export function generateStaticParams() {
  return Object.values(Zodiac).map((zodiac) => ({
    zodiac: zodiac.toLowerCase(),
  }));
}

// Generate metadata for each zodiac page
export async function generateMetadata({ params }: { params: Promise<{ zodiac: string }> }): Promise<Metadata> {
  const { zodiac: zodiacParam } = await params;
  const zodiac = normalizeZodiac(zodiacParam);

  if (!zodiac) {
    return {
      title: "Zodiac Not Found - Fortune Cookie",
    };
  }

  const config = ZODIAC_CONFIG[zodiac];
  const zodiacName = config.english;
  const zodiacLower = zodiacName.toLowerCase();

  return {
    title: `${zodiacName} Zodiac 2026 - Fortune, Career & Love Reading | Fortune Cookie`,
    description: `Discover your ${zodiacName} Chinese zodiac fortune for 2026. Get personalized readings about your career, love life, lucky numbers, and spiritual guidance based on ancient wisdom.`,
    keywords: `${zodiacLower} zodiac, year of the ${zodiacLower}, ${zodiacLower} fortune 2026, ${zodiacLower} career, ${zodiacLower} love, chinese zodiac ${zodiacLower}, ${zodiacLower} lucky numbers, ${zodiacLower} horoscope`,
    openGraph: {
      title: `${zodiacName} Zodiac 2026 - Fortune, Career & Love Reading`,
      description: `Discover your ${zodiacName} Chinese zodiac fortune for 2026. Get personalized readings about your career, love life, and spiritual guidance.`,
      url: `/zodiac/${zodiacLower}/`,
      images: [
        {
          url: `/og-zodiac-${zodiacLower}.jpg`,
          width: 1200,
          height: 630,
          alt: `${zodiacName} Zodiac Fortune Reading 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${zodiacName} Zodiac 2026 - Fortune, Career & Love Reading`,
      description: `Discover your ${zodiacName} Chinese zodiac fortune for 2026. Get personalized readings about your career, love life, and spiritual guidance.`,
      images: [`/og-zodiac-${zodiacLower}.jpg`],
    },
    alternates: {
      canonical: `/zodiac/${zodiacLower}/`,
    },
  };
}

interface ZodiacPageProps {
  params: Promise<{ zodiac: string }>;
}

export default async function ZodiacDetailPage({ params }: ZodiacPageProps) {
  const { zodiac: zodiacParam } = await params;
  const zodiac = normalizeZodiac(zodiacParam);

  if (!zodiac) {
    notFound();
  }

  return <ZodiacDetailClient zodiac={zodiac} />;
}
