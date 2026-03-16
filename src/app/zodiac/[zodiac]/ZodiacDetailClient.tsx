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
  ZODIAC_INFO,
  getBirthYearsForZodiac,
  getZodiacYearRange
} from "@/types/zodiac";

interface ZodiacDetailClientProps {
  zodiac: Zodiac;
}

export default function ZodiacDetailClient({ zodiac }: ZodiacDetailClientProps) {
  const config = ZODIAC_CONFIG[zodiac];
  const info = ZODIAC_INFO[zodiac];
  const prevZodiac = getPreviousZodiac(zodiac);
  const nextZodiac = getNextZodiac(zodiac);
  const birthYears = getBirthYearsForZodiac(zodiac);

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

        {/* Birth Years Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
            Birth Years for {config.english}
          </h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Based on the Lunar Calendar (Chinese New Year dates)
          </p>

          {/* Horizontal scrolling container */}
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-2 overflow-x-auto pb-3 px-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {birthYears.map(({ year, lunarNewYear }, index) => {
                const isHighlighted = year >= 1980 && year <= 2010;
                const isRecent = year >= 1990 && year <= 2024;

                // Random shake animation for each card
                const randomDelay = Math.random() * 2;
                const randomDuration = 2 + Math.random() * 2;

                return (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      rotate: [0, -0.5, 0.5, 0],
                    }}
                    transition={{
                      opacity: { delay: index * 0.02, duration: 0.3 },
                      x: { delay: index * 0.02, type: "spring", stiffness: 100 },
                      rotate: {
                        delay: randomDelay,
                        duration: randomDuration,
                        repeat: Infinity,
                        repeatDelay: 1 + Math.random() * 2,
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -8,
                      rotate: 0,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.92 }}
                    className={`flex-shrink-0 w-16 py-2 px-1 rounded-xl text-center cursor-pointer transition-shadow ${
                      isHighlighted
                        ? `bg-gradient-to-br ${config.bgGradient} border border-white shadow-md`
                        : isRecent
                          ? 'bg-white border border-gray-200 shadow-sm'
                          : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    {/* Year */}
                    <motion.p
                      className={`font-bold text-sm ${
                        isHighlighted ? config.accentColor : 'text-gray-900'
                      }`}
                    >
                      {year}
                    </motion.p>

                    {/* CNY Date */}
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      {new Date(lunarNewYear).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>

                    {/* Highlight indicator - tiny dot */}
                    {isHighlighted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`mt-1 mx-auto w-1 h-1 rounded-full bg-gradient-to-r ${config.gradient}`}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-gray-400 mt-1 flex items-center justify-center gap-1"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            Swipe to explore
            <motion.span
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Zodiac Navigation Grid - Horizontal Swipeable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Explore Other Zodiac Signs
          </h3>

          {/* Horizontal scrolling container */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-50/50 p-4">
            <motion.div
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {ZODIAC_ORDER.map((z, index) => {
                const zConfig = ZODIAC_CONFIG[z];
                const isActive = z === zodiac;

                return (
                  <motion.div
                    key={z}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.05,
                      duration: 0.4
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-shrink-0"
                  >
                    <Link href={`/zodiac/${z.toLowerCase()}`}>
                      <div
                        className={`w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                          isActive
                            ? `bg-gradient-to-br ${zConfig.gradient} text-white shadow-xl ring-2 ring-white`
                            : 'bg-white text-gray-700 shadow-sm hover:shadow-md border border-gray-100'
                        }`}
                      >
                        {/* Emoji */}
                        <span className="text-3xl">{zConfig.emoji}</span>

                        {/* English name */}
                        <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                          {zConfig.english}
                        </span>

                        {/* Chinese character */}
                        <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                          {zConfig.character}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            Swipe to explore
            <motion.span
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
