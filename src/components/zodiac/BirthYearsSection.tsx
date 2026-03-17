"use client";

import { motion } from "framer-motion";
import { Zodiac, ZODIAC_CONFIG, getBirthYearsForZodiac } from "@/types/zodiac";
import {ScrollHint} from "@/components/zodiac/ScrollHint";

const SHOW_SCROLL_FADE_EDGES = false;

interface BirthYearsSectionProps {
  zodiac: Zodiac;
}

export function BirthYearsSection({ zodiac }: BirthYearsSectionProps) {
  const config = ZODIAC_CONFIG[zodiac];
  const birthYears = getBirthYearsForZodiac(zodiac);

  return (
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
        <div className={`absolute ${SHOW_SCROLL_FADE_EDGES && "left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"}`} />
        <div className={`absolute ${SHOW_SCROLL_FADE_EDGES && "right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"}`} />

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

    </motion.div>
  );
}
