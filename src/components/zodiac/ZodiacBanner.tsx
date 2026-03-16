"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ZODIAC_CONFIG, normalizeZodiac } from "@/types/zodiac";

interface ZodiacBannerProps {
  userZodiac: string;
  birthYear?: number;
}

export function ZodiacBanner({ userZodiac, birthYear }: ZodiacBannerProps) {
  const zodiac = normalizeZodiac(userZodiac);

  if (!zodiac) return null;

  const config = ZODIAC_CONFIG[zodiac];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Link href={`/zodiac/${zodiac.toLowerCase()}`}>
        <div
          className={`relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br ${config.bgGradient} p-4 cursor-pointer transition-all duration-300 hover:shadow-lg`}
          style={{ backdropFilter: "blur(20px)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-20">
            <div
              className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl transform translate-x-8 -translate-y-8 bg-gradient-to-br ${config.gradient}`}
            />
          </div>

          <div className="relative flex items-center gap-4">
            {/* Zodiac Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${config.gradient}`}
              style={{
                boxShadow: `0 4px 16px ${config.shadowColor}`,
              }}
            >
              <span className="text-2xl">{config.emoji}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium uppercase tracking-wider ${config.accentColor} mb-0.5`}>
                Your Chinese Zodiac
              </p>
              <h3 className="text-base font-semibold text-gray-900">
                Year of the {config.english}
              </h3>
              <p className={`text-sm ${config.accentColor} opacity-80`}>
                {config.character} • {config.element} • {config.yinYang}
                {birthYear && ` • ${birthYear}`}
              </p>
            </div>

            {/* Chevron indicator */}
            <ChevronRight className={`w-5 h-5 ${config.accentColor} opacity-60`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
