"use client";

import { motion } from "framer-motion";
import { LuckyElementCardProps } from "@/types/report";
import { GLASSMORPHISM_STYLES, ANIMATION_VARIANTS, PREMIUM_GRADIENTS } from "@/lib/constants/report-styles";

/**
 * Reusable card component for displaying lucky elements (colors, numbers, gemstones)
 * Features premium glassmorphism styling with hover effects and animations
 */
export function LuckyElementCard({
  icon,
  title,
  subtitle,
  iconBgGradient,
  iconTextColor,
  subtitleColor,
  delay,
  renderContent,
}: LuckyElementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <div
        className="relative p-6 rounded-3xl h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
        style={GLASSMORPHISM_STYLES.premium}
      >
        {/* Gradient border using pseudo-element */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: PREMIUM_GRADIENTS.border,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>

        {/* Premium indicator pulse */}
        <div className="absolute top-3 right-3">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
            aria-hidden="true"
          />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className={`p-2 rounded-xl ${iconBgGradient}`} aria-hidden="true">
            <div className={iconTextColor}>{icon}</div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className={`text-xs font-medium ${subtitleColor}`}>{subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10" role="region" aria-label={`${title} details`}>
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Blur overlay component for premium upsell on partial reports
 */
export function LuckyElementsBlurOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-md bg-white/20" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 relative z-20"
        role="region"
        aria-label="Premium feature upgrade prompt"
      >
        <div className="p-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 mb-4 inline-block">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3l14 9-14 9V3z"
            />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Premium Feature
        </h4>
        <p className="text-sm text-gray-600 mb-4 max-w-xs">
          Unlock Lucky Elements guidance with Premium
        </p>
        <button
          onClick={() => window.open("/pricing", "_blank")}
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-medium rounded-full hover:from-amber-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label="Upgrade to Premium to access Lucky Elements"
        >
          Upgrade to Premium
        </button>
      </motion.div>
    </div>
  );
}