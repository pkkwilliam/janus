"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zodiac, ZODIAC_CONFIG, ZODIAC_ORDER } from "@/types/zodiac";
import {ScrollHint} from "@/components/zodiac/ScrollHint";

interface ExploreZodiacsSectionProps {
  currentZodiac: Zodiac;
}

export function ExploreZodiacsSection({ currentZodiac }: ExploreZodiacsSectionProps) {
  return (
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
            const isActive = z === currentZodiac;

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

      <ScrollHint delay={1.2} />
    </motion.div>
  );
}
