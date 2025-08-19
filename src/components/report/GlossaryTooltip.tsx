"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlossaryTooltipProps } from "@/types/report";
import { GLASSMORPHISM_STYLES, ANIMATION_VARIANTS } from "@/lib/constants/report-styles";

/**
 * Interactive tooltip component for glossary terms in reports
 * Provides hover and click interactions with detailed term explanations
 */
export function GlossaryTooltip({ term, meaning, pinyin }: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsVisible(!isVisible);
    }
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  const handleClickOutside = () => {
    setIsVisible(false);
  };

  return (
    <span className="relative inline-block">
      <span
        className="cursor-pointer text-indigo-600 underline decoration-dotted hover:text-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 rounded"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Learn more about ${term}`}
        aria-expanded={isVisible}
        aria-haspopup="true"
      >
        {term}
      </span>
      
      {isVisible && (
        <>
          {/* Click outside overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={handleClickOutside}
            aria-hidden="true"
          />
          
          {/* Tooltip content */}
          <motion.div
            {...ANIMATION_VARIANTS.modalEntry}
            className="absolute bottom-full mb-2 z-50 left-1/2 transform -translate-x-1/2"
            role="tooltip"
            aria-live="polite"
          >
            <div
              className="p-4 rounded-2xl border border-white/30 shadow-xl"
              style={GLASSMORPHISM_STYLES.tooltip}
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
              
              {/* Arrow pointing down */}
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "8px solid rgba(255, 255, 255, 0.95)",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </>
      )}
    </span>
  );
}