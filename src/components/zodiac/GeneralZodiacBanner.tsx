"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { ZODIAC_CONFIG, normalizeZodiac } from "@/types/zodiac";

interface AttractiveZodiacBannerProps {
  userZodiac: string;
}

export function GeneralZodiacBanner({ userZodiac }: AttractiveZodiacBannerProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const zodiac = normalizeZodiac(userZodiac);

  if (!zodiac) return null;

  const config = ZODIAC_CONFIG[zodiac];

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRevealed(false);
  };

  return (
    <>
      {/* Main Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div
          onClick={handleReveal}
          className="group relative overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 200%" }}
          />

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          {/* Floating stars */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Sparkles className="w-4 h-4 text-white/60" />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative p-5 flex items-center gap-4">
            {/* Cool cosmic icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex-shrink-0"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-white/80" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Discover Your Destiny
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Unlock Your Zodiac Secrets
              </h3>
              <p className="text-sm text-white/90 leading-snug">
                Ancient wisdom awaits. Click to reveal your cosmic identity.
              </p>
            </div>

            {/* CTA Arrow */}
            <motion.div
              className="flex-shrink-0"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Reveal Modal */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.bgGradient} p-8 text-center shadow-2xl`}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-30">
                  <div
                    className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl bg-gradient-to-br ${config.gradient}`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl bg-gradient-to-tr ${config.gradient}`}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-4"
                  >
                    <div
                      className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center bg-gradient-to-br ${config.gradient} shadow-2xl`}
                      style={{ boxShadow: `0 20px 60px ${config.shadowColor}` }}
                    >
                      <span className="text-5xl">{config.emoji}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Your Cosmic Identity
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Year of the {config.english}
                    </h2>
                    <p className={`text-2xl font-bold ${config.accentColor} mb-4`}>
                      {config.character}
                    </p>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-6">
                      <span className="px-3 py-1 rounded-full bg-white/60">
                        {config.element}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/60">
                        {config.yinYang}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link href={`/zodiac/${zodiac.toLowerCase()}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${config.gradient} shadow-lg hover:shadow-xl transition-shadow`}
                      >
                        Explore Your Zodiac
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
