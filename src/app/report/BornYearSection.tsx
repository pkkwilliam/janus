"use client";

import { motion } from "framer-motion";

export type ZodiacAnimal =
  | "RAT"
  | "OX"
  | "TIGER"
  | "RABBIT"
  | "DRAGON"
  | "SNAKE"
  | "HORSE"
  | "GOAT"
  | "MONKEY"
  | "ROOSTER"
  | "DOG"
  | "PIG";

interface ZodiacConfig {
  emoji: string;
  character: string;
  english: string;
  gradient: string;
  shadowColor: string;
  bgGradient: string;
  accentColor: string;
}

const ZODIAC_MAP: Record<ZodiacAnimal, ZodiacConfig> = {
  RAT: {
    emoji: "🐀",
    character: "鼠",
    english: "Rat",
    gradient: "from-slate-600 via-gray-600 to-zinc-700",
    shadowColor: "rgba(100, 116, 139, 0.4)",
    bgGradient: "from-slate-100 via-gray-50 to-zinc-100",
    accentColor: "text-slate-700",
  },
  OX: {
    emoji: "🐂",
    character: "牛",
    english: "Ox",
    gradient: "from-stone-600 via-amber-800 to-yellow-900",
    shadowColor: "rgba(146, 64, 14, 0.4)",
    bgGradient: "from-stone-100 via-amber-50 to-yellow-50",
    accentColor: "text-amber-900",
  },
  TIGER: {
    emoji: "🐅",
    character: "虎",
    english: "Tiger",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadowColor: "rgba(251, 146, 60, 0.5)",
    bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
    accentColor: "text-orange-700",
  },
  RABBIT: {
    emoji: "🐇",
    character: "兔",
    english: "Rabbit",
    gradient: "from-pink-400 via-rose-400 to-fuchsia-400",
    shadowColor: "rgba(244, 114, 182, 0.5)",
    bgGradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    accentColor: "text-pink-700",
  },
  DRAGON: {
    emoji: "🐉",
    character: "龍",
    english: "Dragon",
    gradient: "from-amber-400 via-yellow-400 to-orange-400",
    shadowColor: "rgba(251, 191, 36, 0.5)",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
    accentColor: "text-amber-700",
  },
  SNAKE: {
    emoji: "🐍",
    character: "蛇",
    english: "Snake",
    gradient: "from-emerald-600 via-green-600 to-teal-600",
    shadowColor: "rgba(16, 185, 129, 0.4)",
    bgGradient: "from-emerald-50 via-green-50 to-teal-50",
    accentColor: "text-emerald-800",
  },
  HORSE: {
    emoji: "🐎",
    character: "馬",
    english: "Horse",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    shadowColor: "rgba(239, 68, 68, 0.4)",
    bgGradient: "from-red-50 via-rose-50 to-pink-50",
    accentColor: "text-red-700",
  },
  GOAT: {
    emoji: "🐐",
    character: "羊",
    english: "Goat",
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    shadowColor: "rgba(132, 204, 22, 0.4)",
    bgGradient: "from-lime-50 via-green-50 to-emerald-50",
    accentColor: "text-lime-800",
  },
  MONKEY: {
    emoji: "🐒",
    character: "猴",
    english: "Monkey",
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    shadowColor: "rgba(234, 179, 8, 0.5)",
    bgGradient: "from-yellow-50 via-amber-50 to-orange-50",
    accentColor: "text-yellow-800",
  },
  ROOSTER: {
    emoji: "🐓",
    character: "雞",
    english: "Rooster",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    shadowColor: "rgba(99, 102, 241, 0.4)",
    bgGradient: "from-blue-50 via-indigo-50 to-violet-50",
    accentColor: "text-indigo-700",
  },
  DOG: {
    emoji: "🐕",
    character: "狗",
    english: "Dog",
    gradient: "from-amber-700 via-yellow-700 to-orange-700",
    shadowColor: "rgba(180, 83, 9, 0.4)",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
    accentColor: "text-amber-900",
  },
  PIG: {
    emoji: "🐖",
    character: "豬",
    english: "Pig",
    gradient: "from-pink-500 via-rose-400 to-red-400",
    shadowColor: "rgba(236, 72, 153, 0.4)",
    bgGradient: "from-pink-50 via-rose-50 to-red-50",
    accentColor: "text-pink-700",
  },
};

// Export for external use
export { ZODIAC_MAP };

interface BornYearSectionProps {
  zodiac: string;
  bornYear?: string;
}

function normalizeZodiac(input: string): ZodiacAnimal | null {
  const normalized = input.toUpperCase().trim();
  if (normalized in ZODIAC_MAP) {
    return normalized as ZodiacAnimal;
  }
  // Try to match by English name
  for (const [key, config] of Object.entries(ZODIAC_MAP)) {
    if (config.english.toUpperCase() === normalized) {
      return key as ZodiacAnimal;
    }
  }
  return null;
}

export default function BornYearSection({ zodiac, bornYear }: BornYearSectionProps) {
  if (!zodiac) return null;

  const zodiacKey = normalizeZodiac(zodiac);
  const zodiacConfig = zodiacKey ? ZODIAC_MAP[zodiacKey] : null;

  // Fallback for unknown zodiac
  const fallbackZodiac: ZodiacConfig = {
    emoji: "✨",
    character: "命",
    english: zodiac,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    shadowColor: "rgba(139, 92, 246, 0.4)",
    bgGradient: "from-purple-50 via-indigo-50 to-blue-50",
    accentColor: "text-purple-700",
  };

  const config = zodiacConfig || fallbackZodiac;

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
              <span className={`text-xs font-semibold uppercase tracking-wider ${config.accentColor}`}>
                Birth Year
              </span>
              <div className={`h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-30 ${config.accentColor}`} />
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
                {bornYear} — Your Chinese zodiac sign influences your destiny and fortune
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
