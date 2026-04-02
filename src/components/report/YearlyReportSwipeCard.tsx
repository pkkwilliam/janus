"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Report } from "@/lib/api/reports";
import { Zodiac, ZODIAC_CONFIG, normalizeZodiac } from "@/types/zodiac";

/* ---------------- TYPES ---------------- */

// Re-export Zodiac for backward compatibility
export type { Zodiac };

interface YearlyReportSwipeCardProps {
  reports: Report[];
  zodiacAnimal: Zodiac;
  onReportClick?: (report: Report) => void;
  animationEnabled?: boolean;
}

/* ---------------- ZODIAC CONFIG ADAPTER ---------------- */

// Adapter to convert centralized config to component-specific format
const ZODIAC_SWIPE_CONFIG: Record<
  Zodiac,
  { emoji: string; label: string; gradient: string }
> = {
  [Zodiac.RAT]: { emoji: ZODIAC_CONFIG[Zodiac.RAT].emoji, label: ZODIAC_CONFIG[Zodiac.RAT].english, gradient: "from-gray-600 to-gray-800" },
  [Zodiac.OX]: { emoji: ZODIAC_CONFIG[Zodiac.OX].emoji, label: ZODIAC_CONFIG[Zodiac.OX].english, gradient: "from-amber-700 to-amber-900" },
  [Zodiac.TIGER]: { emoji: ZODIAC_CONFIG[Zodiac.TIGER].emoji, label: ZODIAC_CONFIG[Zodiac.TIGER].english, gradient: "from-orange-500 to-red-600" },
  [Zodiac.RABBIT]: { emoji: ZODIAC_CONFIG[Zodiac.RABBIT].emoji, label: ZODIAC_CONFIG[Zodiac.RABBIT].english, gradient: "from-pink-400 to-rose-500" },
  [Zodiac.DRAGON]: { emoji: ZODIAC_CONFIG[Zodiac.DRAGON].emoji, label: ZODIAC_CONFIG[Zodiac.DRAGON].english, gradient: "from-red-500 to-purple-600" },
  [Zodiac.SNAKE]: { emoji: ZODIAC_CONFIG[Zodiac.SNAKE].emoji, label: ZODIAC_CONFIG[Zodiac.SNAKE].english, gradient: "from-emerald-500 to-green-700" },
  [Zodiac.HORSE]: { emoji: ZODIAC_CONFIG[Zodiac.HORSE].emoji, label: ZODIAC_CONFIG[Zodiac.HORSE].english, gradient: "from-amber-500 to-orange-600" },
  [Zodiac.GOAT]: { emoji: ZODIAC_CONFIG[Zodiac.GOAT].emoji, label: ZODIAC_CONFIG[Zodiac.GOAT].english, gradient: "from-stone-400 to-stone-600" },
  [Zodiac.MONKEY]: { emoji: ZODIAC_CONFIG[Zodiac.MONKEY].emoji, label: ZODIAC_CONFIG[Zodiac.MONKEY].english, gradient: "from-amber-400 to-yellow-600" },
  [Zodiac.ROOSTER]: { emoji: ZODIAC_CONFIG[Zodiac.ROOSTER].emoji, label: ZODIAC_CONFIG[Zodiac.ROOSTER].english, gradient: "from-red-400 to-rose-600" },
  [Zodiac.DOG]: { emoji: ZODIAC_CONFIG[Zodiac.DOG].emoji, label: ZODIAC_CONFIG[Zodiac.DOG].english, gradient: "from-orange-400 to-amber-600" },
  [Zodiac.PIG]: { emoji: ZODIAC_CONFIG[Zodiac.PIG].emoji, label: ZODIAC_CONFIG[Zodiac.PIG].english, gradient: "from-pink-300 to-rose-400" },
};

/* ---------------- ANIMATION COMPONENTS ---------------- */

function FloatingEmoji({ emoji, delay, duration, x, y, scale }: {
  emoji: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
  scale: number;
}) {
  return (
    <motion.div
      className="absolute text-4xl opacity-20 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: [-20, 20, -20],
        opacity: [0.1, 0.25, 0.1],
        scale: [scale * 0.8, scale * 1.2, scale * 0.8],
        rotate: [-10, 10, -10],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {emoji}
    </motion.div>
  );
}

function ZodiacBackground({ zodiacAnimal, enabled }: { zodiacAnimal: Zodiac; enabled: boolean }) {
  const config = ZODIAC_SWIPE_CONFIG[zodiacAnimal];
  const positions = [
    { x: "5%", y: "10%", delay: 0, duration: 6, scale: 1 },
    { x: "85%", y: "15%", delay: 1, duration: 7, scale: 1.2 },
    { x: "15%", y: "70%", delay: 2, duration: 5, scale: 0.9 },
    { x: "75%", y: "75%", delay: 0.5, duration: 8, scale: 1.1 },
    { x: "45%", y: "85%", delay: 1.5, duration: 6.5, scale: 0.8 },
    { x: "90%", y: "50%", delay: 2.5, duration: 7.5, scale: 1.3 },
    { x: "8%", y: "45%", delay: 3, duration: 5.5, scale: 0.7 },
  ];

  if (!enabled) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5 rounded-3xl`} />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      <div className={`absolute inset-0 bg-gradient-to-br \${config.gradient} opacity-10`} />
      {positions.map((pos, idx) => (
        <FloatingEmoji
          key={idx}
          emoji={config.emoji}
          delay={pos.delay}
          duration={pos.duration}
          x={pos.x}
          y={pos.y}
          scale={pos.scale}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-white/10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export function YearlyReportSwipeCard({
  reports,
  zodiacAnimal,
  onReportClick,
  animationEnabled: initialAnimationEnabled = true,
}: YearlyReportSwipeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationEnabled, setAnimationEnabled] = useState(initialAnimationEnabled);
  const [direction, setDirection] = useState(0);

  const yearlyReports = reports.filter((r) => r.type === "YEARLY");
  const currentReport = yearlyReports[currentIndex];
  const zodiacConfig = ZODIAC_SWIPE_CONFIG[zodiacAnimal];

  const goToNext = useCallback(() => {
    if (currentIndex < yearlyReports.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, yearlyReports.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrev();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  };

  const formatYear = (report: Report) => {
    return new Date(report.endTime).getFullYear();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (yearlyReports.length === 0) {
    return (
      <div className="w-full p-8 rounded-3xl border border-white/30 bg-white/40 backdrop-blur-sm text-center">
        <div className="text-4xl mb-4">📅</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Yearly Reports Yet</h3>
        <p className="text-sm text-gray-600">Your yearly fortune reports will appear here once generated.</p>
      </div>
    );
  }

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="w-full">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{zodiacConfig.emoji}</span>
          <span className="text-sm font-medium text-gray-700">{zodiacConfig.label} Year</span>
        </div>
        <button
          onClick={() => setAnimationEnabled(!animationEnabled)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          style={{
            background: animationEnabled ? "rgba(139, 92, 246, 0.1)" : "rgba(0,0,0,0.05)",
            color: animationEnabled ? "rgb(139, 92, 246)" : "rgb(107, 114, 128)",
          }}
        >
          {animationEnabled ? (
            <><Volume2 className="w-3.5 h-3.5" /><span>Animation On</span></>
          ) : (
            <><VolumeX className="w-3.5 h-3.5" /><span>Animation Off</span></>
          )}
        </button>
      </div>

      {/* Swipeable Card Container */}
      <div className="relative w-full aspect-[4/3] max-h-[500px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentReport.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Card */}
            <div
              className="relative w-full h-full rounded-3xl border border-white/40 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Animated Zodiac Background */}
              <ZodiacBackground zodiacAnimal={zodiacAnimal} enabled={animationEnabled} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
                {/* Top: Year Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-light text-gray-900">
                      {formatYear(currentReport)}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                    🌟 Yearly
                  </span>
                </div>

                {/* Center: Score & Themes */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className={`px-6 py-3 rounded-full text-3xl font-light mb-6 \${getScoreColor(
                      parseInt(currentReport.reportContent.fortuneScore)
                    )}`}
                  >
                    {currentReport.reportContent.fortuneScore}%
                  </motion.div>

                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    Yearly Fortune Report
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                    {currentReport.reportContent.keyThemes.slice(0, 4).map((theme: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs bg-white/60 backdrop-blur-sm text-gray-700 rounded-full border border-white/40"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: View Button */}
                <div className="mt-6">
                  <button
                    onClick={() => onReportClick?.(currentReport)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500/80 to-indigo-600/80 hover:from-purple-500 hover:to-indigo-600 text-white font-medium transition-all flex items-center justify-center gap-2 group"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Full Report</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Desktop) */}
        {yearlyReports.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === yearlyReports.length - 1}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {yearlyReports.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {yearlyReports.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all \${
                idx === currentIndex
                  ? "w-6 bg-purple-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe hint (Mobile) */}
      {yearlyReports.length > 1 && (
        <p className="text-center text-xs text-gray-400 mt-3 md:hidden">
          Swipe to browse reports
        </p>
      )}
    </div>
  );
}
