"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Star,
  Gem,
  Palette,
  Hash,
  BookOpen,
  Lightbulb,
  Crown,
  Loader2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { reportsApi, Report } from "@/lib/api/reports";
import { useAppInit } from "@/hooks/useAppInit";

// Tooltip component for glossary terms
function GlossaryTooltip({
  term,
  meaning,
  pinyin,
}: {
  term: string;
  meaning: string;
  pinyin: string;
}) {
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

// Single blur overlay component for entire Lucky Elements section
function LuckyElementsBlurOverlay() {
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

// Helper functions for report types
function getTypeGradient(type: string) {
  switch (type) {
    case "YEARLY":
      return "bg-gradient-to-r from-purple-500 to-indigo-600";
    case "MONTHLY":
      return "bg-gradient-to-r from-blue-500 to-cyan-600";
    case "WEEKLY":
      return "bg-gradient-to-r from-green-500 to-emerald-600";
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600";
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "YEARLY":
      return <Star className="w-6 h-6 text-white" />;
    case "MONTHLY":
      return <Calendar className="w-6 h-6 text-white" />;
    case "WEEKLY":
      return <Star className="w-6 h-6 text-white" />;
    default:
      return <Star className="w-6 h-6 text-white" />;
  }
}

function getReportTitle(type: string) {
  switch (type) {
    case "YEARLY":
      return "Yearly Fortune Report";
    case "MONTHLY":
      return "Monthly Fortune Report";
    case "WEEKLY":
      return "Weekly Fortune Report";
    default:
      return "Fortune Report";
  }
}

function formatReportPeriod(report: Report) {
  const endDate = new Date(report.endTime);
  const { period } = report;

  switch (report.type) {
    case "YEARLY":
      return `${period?.year || endDate.getFullYear()} Analysis`;
    case "MONTHLY":
      if (period?.year && period?.month) {
        const monthName = new Date(
          period.year,
          period.month - 1
        ).toLocaleDateString("en-US", { month: "long" });
        return `${monthName} ${period.year}`;
      }
      return endDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    case "WEEKLY":
      if (period?.weekStart && period?.weekEnd) {
        return `Week ${period.week || ""}, ${period.weekStart} - ${
          period.weekEnd
        }`;
      }
      // Calculate week for fallback
      const year = endDate.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const weekNum = Math.ceil(
        ((endDate.getTime() - startOfYear.getTime()) / 86400000 +
          startOfYear.getDay() +
          1) /
          7
      );
      const weekStart = new Date(endDate);
      weekStart.setDate(endDate.getDate() - endDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `Week ${weekNum}, ${weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${weekEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    default:
      return endDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  }
}

// Function to replace glossary terms in text with interactive components
function processTextWithGlossary(text: string, glossary: any[]) {
  let processedText = text;
  const components = [];
  let keyCounter = 0;

  // Sort glossary by term length (longest first) to avoid partial matches
  const sortedGlossary = [...glossary].sort(
    (a, b) => b.term.length - a.term.length
  );

  sortedGlossary.forEach((item) => {
    // Escape special regex characters in the term
    const escapedTerm = item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Use global flag to find all occurrences, no word boundaries for Chinese characters
    const regex = new RegExp(escapedTerm, "g");
    const matches = [...processedText.matchAll(regex)];

    matches.forEach(() => {
      const key = `glossary-${keyCounter++}`;
      const placeholder = `__GLOSSARY_${key}__`;
      // Replace only the first occurrence to maintain order
      processedText = processedText.replace(item.term, placeholder);
      components.push({
        key,
        placeholder,
        component: (
          <GlossaryTooltip
            key={key}
            term={item.term}
            meaning={item.meaning}
            pinyin={item.pinyin}
          />
        ),
      });
    });
  });

  // Split text and insert components
  const parts = processedText.split(/(__GLOSSARY_[^_]+__)/);
  return parts.map((part) => {
    const component = components.find((c) => c.placeholder === part);
    return component ? component.component : part;
  });
}

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAppInit({ requireAuth: true });
  const [report, setReport] = useState<Report | null>(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportError, setReportError] = useState<string | null>(null);

  // Get report ID from URL search params
  const reportId = searchParams.get("id");

  // Load report data
  useEffect(() => {
    if (user && reportId) {
      loadReport();
    } else if (!reportId) {
      // No report ID provided, redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, reportId, router]);

  const loadReport = async () => {
    if (!reportId) return;

    setReportLoading(true);
    setReportError(null);

    try {
      const response = await reportsApi.getReportById(reportId);

      if (response.error) {
        setReportError(response.error.message);
      } else if (response.data) {
        setReport(response.data);
      }
    } catch (error) {
      console.error("Failed to load report:", error);
      setReportError("Failed to load report");
    } finally {
      setReportLoading(false);
    }
  };

  // Show loading while checking authentication or loading report
  if (isLoading || reportLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (reportError || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="p-4 rounded-2xl bg-red-100 w-fit mx-auto mb-4">
            <Star className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Report Not Found
          </h3>
          <p className="text-gray-600 mb-4">
            {reportError || "The requested report could not be found."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={loadReport}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // This should not happen since useAppInit with requireAuth=true handles redirects
  if (!user) {
    return null;
  }

  const { reportContent, period, type } = report;
  // Determine display type - you might want to check user's subscription status here
  const displayType = report.displayType || "PARTIAL"; // TODO: Check if user has premium subscription

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div
          className="p-6 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${getTypeGradient(type)}`}>
              {getTypeIcon(type)}
            </div>
            <div>
              <h1 className="text-2xl font-light text-gray-900">
                {getReportTitle(type)}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatReportPeriod(report)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-3xl font-light text-indigo-600">
              {reportContent.fortuneScore}%
            </div>
            <div className="text-sm text-gray-600">Fortune Score</div>
          </div>
        </div>
      </motion.div>

      {/* Main Reading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div
          className="p-8 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-medium text-gray-900">Your Reading</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {processTextWithGlossary(
                reportContent.reading,
                reportContent.glossary
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Themes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div
          className="p-6 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Themes</h3>
          <div className="grid grid-cols-2 gap-3">
            {reportContent.keyThemes.map((theme, index) => (
              <div
                key={index}
                className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
              >
                <span className="text-sm font-medium text-indigo-700">
                  {theme}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Premium Exclusive Section Header */}
      {displayType === "FULL" && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div
            className="relative p-8 rounded-3xl border-2 overflow-hidden transition-all duration-500 hover:shadow-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 25%, rgba(138, 43, 226, 0.15) 75%, rgba(75, 0, 130, 0.2) 100%)",
              backdropFilter: "blur(25px)",
              borderImage:
                "linear-gradient(135deg, #FFD700, #FFA500, #8A2BE2, #4B0082) 1",
              boxShadow:
                "0 25px 50px rgba(255, 215, 0, 0.25), 0 0 80px rgba(138, 43, 226, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Floating sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                style={{
                  top: `${15 + Math.random() * 70}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.6, 1.4, 0.6],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Additional floating gems */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`gem-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${15 + Math.random() * 70}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="text-center relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="p-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 relative"
                  style={{ boxShadow: "0 0 40px rgba(255, 215, 0, 0.5)" }}
                >
                  <Crown className="w-6 h-6 text-white" />
                  {/* Crown sparkles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: `${10 + i * 15}%`,
                        left: `${80 + i * 5}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold tracking-wide shadow-lg"
                  style={{ boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)" }}
                >
                  PREMIUM EXCLUSIVE
                </motion.div>
              </div>

              <h2 className="text-2xl md:text-3xl font-light mb-3 bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Your Personal Lucky Elements
              </h2>

              <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed mb-4">
                ✨ <span className="font-medium">Congratulations!</span> These
                exclusive insights are crafted specifically for you as a valued
                Premium member. Your investment in deeper wisdom has unlocked
                the most powerful elements of your fortune.
              </p>

              {/* Celebration badges */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
                  style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-white/90" 
                  />
                  FORTUNE UNLOCKED
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: 1.0, type: "spring" }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
                  style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-2 h-2 rounded-full bg-white/90" 
                  />
                  WISDOM ACTIVATED
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
                  style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)" }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
                    className="w-2 h-2 rounded-full bg-white/90" 
                  />
                  DESTINY REVEALED
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lucky Elements Grid */}
      <div className="relative grid md:grid-cols-3 gap-6 mb-8">
        {displayType === "PARTIAL" && <LuckyElementsBlurOverlay />}
        {/* Lucky Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group"
        >
          <div
            className="relative p-6 rounded-3xl border h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(30px)",
              borderImage:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4)) 1",
              boxShadow:
                "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
            
            {/* Premium indicator with pulse */}
            <div className="absolute top-3 right-3">
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg" 
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Lucky Colors
                </h3>
                <p className="text-xs text-purple-600 font-medium">
                  Exclusively Yours
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {reportContent.luckyColors &&
              reportContent.luckyColors.length > 0 ? (
                reportContent.luckyColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    <span className="text-sm text-gray-700">{color}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No specific lucky colors for this period
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Lucky Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group"
        >
          <div
            className="relative p-6 rounded-3xl border h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(30px)",
              borderImage:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4)) 1",
              boxShadow:
                "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
            
            {/* Premium indicator with pulse */}
            <div className="absolute top-3 right-3">
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg" 
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100">
                <Hash className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Lucky Numbers
                </h3>
                <p className="text-xs text-indigo-600 font-medium">
                  Power Numbers
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {reportContent.luckyNumbers &&
              reportContent.luckyNumbers.length > 0 ? (
                reportContent.luckyNumbers.map((number, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium"
                  >
                    {number}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No specific lucky numbers for this period
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Lucky Gemstones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group"
        >
          <div
            className="relative p-6 rounded-3xl border h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(30px)",
              borderImage:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4)) 1",
              boxShadow:
                "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
            
            {/* Premium indicator with pulse */}
            <div className="absolute top-3 right-3">
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg" 
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100">
                <Gem className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Lucky Gemstones
                </h3>
                <p className="text-xs text-emerald-600 font-medium">
                  Sacred Crystals
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {reportContent.luckyGemstones &&
              reportContent.luckyGemstones.length > 0 ? (
                reportContent.luckyGemstones.map((gemstone, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    {gemstone}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No specific lucky gemstones for this period
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Lucky Enhancer Section - if available */}
        {reportContent.luckyEnhancer &&
          reportContent.luckyEnhancer.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="md:col-span-3 group"
            >
              <div
                className="relative p-6 rounded-3xl border h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
                  backdropFilter: "blur(30px)",
                  borderImage:
                    "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4)) 1",
                  boxShadow:
                    "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
                
                {/* Premium indicator with pulse */}
                <div className="absolute top-3 right-3">
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg" 
                  />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Lucky Enhancement Suggestions
                    </h3>
                    <p className="text-xs text-amber-600 font-medium">
                      Premium Insights
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {reportContent.luckyEnhancer.map((enhancer, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {enhancer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
      </div>

      {/* Spiritual Guidance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <div
          className="p-6 rounded-3xl border border-white/30 bg-gradient-to-r from-purple-50/50 to-indigo-50/50"
          style={{
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Spiritual Guidance
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed italic">
            "{reportContent.spiritualGuidance}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}
