"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GlossaryTooltipProps {
  term: string;
  meaning: string;
  pinyin: string;
}

export default function GlossaryTooltip({
  term,
  meaning,
  pinyin,
}: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative">
      <span
        className="cursor-pointer text-indigo-600 underline decoration-dotted hover:text-indigo-800 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {term}
      </span>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full mb-2 z-50 left-1/2 transform -translate-x-1/2"
        >
          <div
            className="p-4 rounded-2xl border border-white/30 shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              width: "min(20rem, calc(100vw - 2rem))",
              maxWidth: "24rem",
            }}
          >
            <div className="text-sm md:text-base font-semibold text-gray-900 mb-2">
              {term}
            </div>
            <div className="text-xs md:text-sm text-indigo-600 mb-2 md:mb-3 font-medium">
              {pinyin}
            </div>
            <div className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {meaning}
            </div>
            {/* Small arrow pointing down */}
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(255, 255, 255, 0.95)",
              }}
            />
          </div>
        </motion.div>
      )}
    </span>
  );
}
