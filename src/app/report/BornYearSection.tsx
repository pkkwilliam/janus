"use client";

import { motion } from "framer-motion";
import { Zodiac, ZODIAC_CONFIG, normalizeZodiac } from "@/types/zodiac";

interface BornYearSectionProps {
  zodiac: string;
  bornYear?: string;
}

export default function BornYearSection({
  zodiac,
  bornYear,
}: BornYearSectionProps) {
  if (!zodiac) return null;

  const zodiacKey = normalizeZodiac(zodiac);
  const zodiacConfig = zodiacKey ? ZODIAC_CONFIG[zodiacKey] : null;

  // Fallback for unknown zodiac
  const fallbackConfig = {
    emoji: "✨",
    character: "命",
    english: zodiac,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    shadowColor: "rgba(139, 92, 246, 0.4)",
    bgGradient: "from-purple-50 via-indigo-50 to-blue-50",
    accentColor: "text-purple-700",
    element: "Earth" as const,
    yinYang: "Yang" as const,
  };

  const config = zodiacConfig || fallbackConfig;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-6"
    >
      <div
        className={`relative p-5 rounded-2xl border border-white/50 overflow-hidden bg-gradient-to-br ${config.bgGradient}`}
        style={{
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl transform translate-x-20 -translate-y-20 bg-gradient-to-br ${config.gradient}`}
          />
          <div
            className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl transform -translate-x-16 translate-y-16 bg-gradient-to-tr ${config.gradient}`}
          />
        </div>

        {/* Floating Chinese character watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none select-none"
        >
          <span
            className={`text-8xl font-bold bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}
            style={{ writingMode: "vertical-rl" }}
          >
            {config.character}
          </span>
        </motion.div>

        <div className="relative flex items-center gap-4">
          {/* Zodiac Icon Circle */}
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex-shrink-0"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${config.gradient}`}
              style={{
                boxShadow: `0 8px 32px ${config.shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
              }}
            >
              <span className="text-3xl">{config.emoji}</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${config.accentColor}`}
              >
                Birth Year
              </span>
              <div
                className={`h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-30 ${config.accentColor}`}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-medium text-gray-900">
                Born in the Year of the {config.english}
              </h3>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`text-2xl font-bold bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}
              >
                {config.character}
              </motion.span>
            </div>
            {bornYear && (
              <p className={`text-sm mt-1 opacity-80 ${config.accentColor}`}>
                {bornYear}
              </p>
            )}
          </div>

          {/* Decorative rotating element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block opacity-20"
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                className={config.accentColor}
              />
              <circle
                cx="28"
                cy="28"
                r="16"
                stroke="currentColor"
                strokeWidth="1"
                className={config.accentColor}
              />
              {/* Zodiac character in center */}
              <text
                x="28"
                y="32"
                textAnchor="middle"
                className={`text-xs font-bold ${config.accentColor}`}
                fill="currentColor"
              >
                {config.character}
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
