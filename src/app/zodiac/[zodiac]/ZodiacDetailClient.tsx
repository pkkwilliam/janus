"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Star,
  Palette
} from "lucide-react";
import Link from "next/link";
import {
  Zodiac,
  ZODIAC_CONFIG,
  ZODIAC_ORDER,
  getPreviousZodiac,
  getNextZodiac,
  ZODIAC_INFO
} from "@/types/zodiac";

interface ZodiacDetailClientProps {
  zodiac: Zodiac;
}

export default function ZodiacDetailClient({ zodiac }: ZodiacDetailClientProps) {
  const config = ZODIAC_CONFIG[zodiac];
  const info = ZODIAC_INFO[zodiac];
  const prevZodiac = getPreviousZodiac(zodiac);
  const nextZodiac = getNextZodiac(zodiac);

  const getSectionIcon = (header: string) => {
    switch (header) {
      case "Personality Traits":
        return <Sparkles className="w-5 h-5" />;
      case "Strengths":
        return <Star className="w-5 h-5" />;
      case "Best Matches":
        return <Heart className="w-5 h-5" />;
      case "Lucky Elements":
        return <Palette className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${config.bgGradient}`}>
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 bg-gradient-to-br ${config.gradient} blur-3xl`} />
          <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 bg-gradient-to-tr ${config.gradient} blur-3xl`} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-12">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Dashboard
              </motion.button>
            </Link>
            <div className="flex items-center gap-2">
              <Link href={`/zodiac/${prevZodiac.toLowerCase()}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href={`/zodiac/${nextZodiac.toLowerCase()}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Zodiac Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <div
                className={`w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br ${config.gradient} shadow-2xl`}
                style={{ boxShadow: `0 20px 60px ${config.shadowColor}` }}
              >
                <span className="text-5xl">{config.emoji}</span>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {config.english}
            </h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className={`text-3xl font-bold ${config.accentColor}`}>
                {config.character}
              </span>
              <span className="text-gray-400">•</span>
              <span className={config.accentColor}>{config.element}</span>
              <span className="text-gray-400">•</span>
              <span className={config.accentColor}>{config.yinYang}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {info.sections.map((section, index: number) => (
            <motion.div
              key={section.header}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${config.bgGradient}`}>
                  <div className={config.accentColor}>
                    {getSectionIcon(section.header)}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.header}
                </h2>
              </div>

              <ul className="space-y-3">
                {section.readings.map((reading: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r ${config.gradient}`} />
                    <span className="text-gray-700 leading-relaxed">{reading}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Zodiac Navigation Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Explore Other Zodiac Signs
          </h3>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {ZODIAC_ORDER.map((z) => {
              const zConfig = ZODIAC_CONFIG[z];
              const isActive = z === zodiac;
              return (
                <Link key={z} href={`/zodiac/${z.toLowerCase()}`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${config.gradient} text-white shadow-lg`
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span className="text-xl">{zConfig.emoji}</span>
                    <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {zConfig.english}
                    </span>
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
