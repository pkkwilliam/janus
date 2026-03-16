import { notFound } from "next/navigation";
import { Zodiac, normalizeZodiac } from "@/types/zodiac";
import ZodiacDetailClient from "./ZodiacDetailClient";

// Generate static params for all zodiac animals (required for static export)
export function generateStaticParams() {
  return Object.values(Zodiac).map((zodiac) => ({
    zodiac: zodiac.toLowerCase(),
  }));
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
