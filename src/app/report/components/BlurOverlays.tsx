"use client";

import { motion } from "framer-motion";
import { Crown, BookOpen } from "lucide-react";

export function LuckyElementsBlurOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-md bg-white/20" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 relative z-20"
      >
        <div className="p-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 mb-4 inline-block">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Premium Feature
        </h4>
        <p className="text-sm text-gray-600 mb-4 max-w-xs">
          Unlock Lucky Elements guidance with Premium
        </p>
        <button
          onClick={() => window.open("/pricing", "_blank")}
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-medium rounded-full hover:from-amber-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
        >
          Upgrade to Premium
        </button>
      </motion.div>
    </div>
  );
}

export function ReadingBlurOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-4/5 flex items-end justify-center z-10 rounded-b-3xl overflow-hidden">
      {/* Ultra-smooth gradient fade with natural top and bottom transitions */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.002) 10%, rgba(255, 255, 255, 0.008) 20%, rgba(255, 255, 255, 0.02) 30%, rgba(255, 255, 255, 0.04) 40%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0.25) 70%, rgba(255, 255, 255, 0.4) 80%, rgba(255, 255, 255, 0.6) 90%, rgba(255, 255, 255, 0.45) 100%)",
        }}
      />
      {/* Graduated blur layers with soft edges top and bottom */}
      <div
        className="absolute top-1/4 left-0 right-0 bottom-2"
        style={{
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-1/2 left-0 right-0 bottom-4"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-3/4 left-0 right-0 bottom-6"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      />
      {/* Ultra-light background wash with soft edges */}
      <div
        className="absolute top-1/2 left-0 right-0 bottom-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(248, 250, 252, 0.03) 20%, rgba(248, 250, 252, 0.1) 40%, rgba(248, 250, 252, 0.25) 60%, rgba(248, 250, 252, 0.35) 80%, rgba(248, 250, 252, 0.25) 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center p-4 sm:p-6 relative z-20 mb-8"
      >
        <div
          className="p-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 mb-3 inline-block"
          style={{ boxShadow: "0 2px 8px rgba(99, 102, 241, 0.15)" }}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Continue Reading with Premium
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 max-w-xs">
          Unlock the complete fortune reading and detailed insights
        </p>
        <button
          onClick={() => window.open("/pricing", "_blank")}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white text-xs sm:text-sm font-medium rounded-full hover:from-indigo-500 hover:to-purple-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          style={{
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.15)",
          }}
          aria-label="Upgrade to Premium to read the complete fortune reading"
        >
          Unlock Full Reading
        </button>
      </motion.div>
    </div>
  );
}
