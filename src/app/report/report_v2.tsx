"use client";

import { useState, useEffect, JSX, Suspense } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Star,
  BookOpen,
  Crown,
  Loader2,
  Sparkles,
  Briefcase,
  Wallet,
  Heart,
  Activity,
  User,
  Compass,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { reportsApi, ReportV2 } from "@/lib/api/report_v2";
import {
  translationApi,
  Language,
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from "@/lib/api/translation";
import { useAppInit } from "@/hooks/useAppInit";
import {
  GlossaryTooltip,
  TranslationToggle,
  LuckyColorSection,
  LuckyNumberSection,
  LuckyGemstonesSection,
  LuckyEnhancerSection,
  SpiritualGuidanceSection,
  BornYearSection,
  MonthlyBreakdownSection,
  ReadingBlurOverlay,
  LuckyElementsBlurOverlay,
} from "./components";

const SHOW_TRANSLATION_TOGGLE = false;
const SHOW_EXCLUSIVE = false; // Toggle to show/hide premium exclusive section
const SHOW_FORTUNE_READING_SECTION_TITLE = false;

// ==================== LOVE SECTION STYLE SYSTEM ====================
// Choose your style preset: "default" | "chroma" | "romantic" | "minimal"
const LOVE_SECTION_STYLE_PRESET = "chroma";

// Style Preset Definitions - Add new presets here!
const LOVE_STYLE_PRESETS = {
  // Default: Soft rose/pink theme
  default: {
    showAnimation: true,
    borderColor: "border-rose-300",
    ringColor: "ring-rose-200",
    bgGradient: "from-rose-50 via-pink-50 to-rose-50",
    bgColor: "bg-rose-50",
    titleColor: "text-rose-700",
    textColor: "text-rose-800/70",
    heartSize: "w-6 h-6",
    smallHeartSize: "w-4 h-4",
    heartOpacity: 0.5,
    badgeGradient: "from-rose-500 to-pink-500",
    badgeText: "✨ Popular",
    chromaAnimation: false,
    cardBgOpacity: 0.85,
  },

  // Chroma: Razer-like cycling red/purple colors
  chroma: {
    showAnimation: true,
    borderColor: "border-fuchsia-300",
    ringColor: "ring-fuchsia-200",
    bgGradient: "from-rose-100 via-fuchsia-50 to-purple-100",
    bgColor: "bg-fuchsia-50",
    titleColor: "text-fuchsia-800",
    textColor: "text-purple-900/75",
    heartSize: "w-8 h-8",
    smallHeartSize: "w-5 h-5",
    heartOpacity: 0.6,
    badgeGradient: "from-rose-600 via-fuchsia-500 to-purple-600",
    badgeText: "❤️ Most Read",
    chromaAnimation: true, // Enable color cycling
    cardBgOpacity: 0.9,
  },

  // Romantic: Deep reds and passionate pinks
  romantic: {
    showAnimation: true,
    borderColor: "border-red-300",
    ringColor: "ring-red-200",
    bgGradient: "from-red-50 via-rose-100 to-pink-50",
    bgColor: "bg-red-50",
    titleColor: "text-red-800",
    textColor: "text-rose-900/80",
    heartSize: "w-8 h-8",
    smallHeartSize: "w-5 h-5",
    heartOpacity: 0.55,
    badgeGradient: "from-red-500 to-rose-600",
    badgeText: "❤️ Most Read",
    chromaAnimation: false,
    cardBgOpacity: 0.88,
  },

  // Minimal: Clean and subtle
  minimal: {
    showAnimation: false,
    borderColor: "border-gray-200",
    ringColor: "ring-gray-100",
    bgGradient: "from-gray-50 to-white",
    bgColor: "bg-white",
    titleColor: "text-gray-800",
    textColor: "text-gray-600",
    heartSize: "w-5 h-5",
    smallHeartSize: "w-3 h-3",
    heartOpacity: 0.3,
    badgeGradient: "from-gray-500 to-gray-600",
    badgeText: "Popular",
    chromaAnimation: false,
    cardBgOpacity: 0.7,
  },
};

// Individual overrides object - Set any value to uncomment to override preset
const LOVE_STYLE_OVERRIDES = {
  // showAnimation: false,
  // borderColor: "border-red-400",
  // ringColor: "ring-red-300",
  // bgGradient: "from-red-50 via-pink-50 to-red-50",
  // bgColor: "bg-red-50",
  // titleColor: "text-red-800",
  // textColor: "text-red-900/70",
  // heartSize: "w-8 h-8",
  // smallHeartSize: "w-5 h-5",
  // heartOpacity: 0.6,
  // badgeGradient: "from-red-500 to-pink-600",
  // badgeText: "❤️ Popular",
  // chromaAnimation: true,
  // cardBgOpacity: 0.9,
};

// Merge preset with overrides to get final style config
const LOVE_STYLE = {
  ...LOVE_STYLE_PRESETS[LOVE_SECTION_STYLE_PRESET],
  ...LOVE_STYLE_OVERRIDES,
};
// ===================================================================

type SubSectionProps = {
  getCurrentContent: () => any;
};

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

function formatReportPeriod(report: ReportV2) {
  const endDate = new Date(report.endTime);
  return "2026";
}

// Function to replace glossary terms in text with interactive components
function processTextWithGlossary(text: string, glossary: any[]) {
  let processedText = text;
  const components: {
    key: string;
    placeholder: string;
    component: JSX.Element;
  }[] = [];
  let keyCounter = 0;

  // Sort glossary by term length (longest first) to avoid partial matches
  const sortedGlossary = [...glossary].sort(
    (a, b) => b.term.length - a.term.length,
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

// Function to truncate reading text for non-premium users to enhance blur effect
function truncateReadingForPreview(text: string, displayType: string): string {
  if (displayType === "FULL") {
    return text;
  }

  // For non-premium users, show approximately 60% of the content
  // This works better with the blur overlay that covers the bottom 60%
  const words = text.split(" ");
  const previewLength = Math.floor(words.length * 0.6);
  const truncatedWords = words.slice(0, previewLength);

  // Add some trailing words that will be partially visible under the blur
  const trailingWords = words.slice(previewLength, previewLength + 10);
  const fullPreview = [...truncatedWords, ...trailingWords].join(" ");

  return fullPreview;
}

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAppInit({ requireAuth: true });
  const [report, setReport] = useState<ReportV2 | null>(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportError, setReportError] = useState<string | null>(null);

  // Translation state
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageCode>("ENGLISH");

  // Get report ID from URL search params
  const reportId = searchParams.get("id");

  // Handle translation changes
  const handleTranslationChange = (content: any, language: LanguageCode) => {
    setTranslatedContent(content);
    setCurrentLanguage(language);
  };

  // Get current content (original or translated)
  const getCurrentContent = () => {
    return currentLanguage === "ENGLISH" || !translatedContent
      ? report?.reportContent
      : translatedContent;
  };

  const getCurrentContentV2 = () => {
    const reportContent = getCurrentContent();
    return [
      {
        title: "General Overview",
        reading: reportContent?.general,
        icon: Compass,
        gradient: "from-indigo-500 to-purple-600",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-100",
      },
      {
        title: "Career & Work",
        reading: reportContent?.career,
        icon: Briefcase,
        gradient: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
      },
      {
        title: "Financial Fortune",
        reading: reportContent?.financial,
        icon: Wallet,
        gradient: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-100",
      },
      {
        title: "Health & Wellness",
        reading: reportContent?.health,
        icon: Activity,
        gradient: "from-rose-500 to-pink-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-100",
      },
      {
        title: "Love & Relationships",
        reading: reportContent?.relationship,
        icon: Heart,
        gradient: "from-amber-500 to-orange-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-100",
      },
      {
        title: "Born Year Insights",
        reading: reportContent?.bornYear,
        icon: User,
        gradient: "from-violet-500 to-purple-600",
        bgColor: "bg-violet-50",
        borderColor: "border-violet-100",
      },
    ];
  };

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

  const { reportContent, type } = report;
  // Determine display type - you might want to check user's subscription status here
  const displayType = "FULL";

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>

          {/* Translation Toggle */}
          {SHOW_TRANSLATION_TOGGLE && report && (
            <TranslationToggle
              reportContent={report.reportContent}
              onTranslationChange={handleTranslationChange}
            />
          )}
        </div>

        <div
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Mobile-first layout: Stack on small screens, side-by-side on larger */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Report type and title */}
            <div className="flex items-center gap-3">
              <div
                className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${getTypeGradient(
                  type,
                )}`}
              >
                {getTypeIcon(type)}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-light text-gray-900 truncate">
                  {getReportTitle(type)}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    {formatReportPeriod(report)}
                  </span>
                </div>
              </div>
            </div>

            {/* Fortune Score - Compact mobile display */}
            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1 bg-white/20 sm:bg-transparent rounded-xl sm:rounded-none p-3 sm:p-0">
              <div className="text-sm sm:text-xs text-gray-600 sm:order-2">
                Fortune Score
              </div>
              <div className="text-2xl sm:text-3xl font-light text-indigo-600 sm:order-1">
                {reportContent.fortuneScore}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <SpiritualGuidanceSection getCurrentContent={getCurrentContent} />

      <div className="relative grid md:grid-cols-3 gap-6 mb-8">
        <LuckyColorSection getCurrentContent={getCurrentContent} />
        <LuckyNumberSection getCurrentContent={getCurrentContent} />
        <LuckyGemstonesSection getCurrentContent={getCurrentContent} />
        <LuckyEnhancerSection getCurrentContent={getCurrentContent} />
      </div>

      {/* Main Reading - Redesigned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        {/* Section Header */}
        {SHOW_FORTUNE_READING_SECTION_TITLE && (
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">
              Your Fortune Reading
            </h2>
          </div>
        )}

        {/* Reading Cards Grid */}
        <div className="flex flex-col gap-6">
          {getCurrentContentV2().map((section, index) => {
            const IconComponent = section.icon;
            const isLoveSection = section.title === "Love & Relationships";

            // Get love section styles from merged config
            const loveShowAnimation = LOVE_STYLE.showAnimation;
            const loveBorderColor = LOVE_STYLE.borderColor;
            const loveRingColor = LOVE_STYLE.ringColor;
            const loveBgGradient = LOVE_STYLE.bgGradient;
            const loveBgColor = LOVE_STYLE.bgColor;
            const loveTitleColor = LOVE_STYLE.titleColor;
            const loveTextColor = LOVE_STYLE.textColor;
            const loveHeartSize = LOVE_STYLE.heartSize;
            const loveSmallHeartSize = LOVE_STYLE.smallHeartSize;
            const loveHeartOpacity = LOVE_STYLE.heartOpacity;
            const loveBadgeGradient = LOVE_STYLE.badgeGradient;
            const loveBadgeText = LOVE_STYLE.badgeText;
            const loveChromaAnimation = LOVE_STYLE.chromaAnimation;
            const loveCardBgOpacity = LOVE_STYLE.cardBgOpacity;

            return (
              <motion.div
                key={`section-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group"
              >
                <div
                  className={`relative rounded-2xl border ${isLoveSection ? loveBorderColor : section.borderColor} overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-${section.bgColor}/50 ${isLoveSection ? `ring-2 ${loveRingColor}` : ""}`}
                  style={{
                    background: isLoveSection
                      ? `rgba(255, 245, 250, ${loveCardBgOpacity})`
                      : "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Chroma Color Cycling Background - Only for Love Section */}
                  {isLoveSection && loveChromaAnimation && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        animate={{
                          background: [
                            "radial-gradient(circle at 30% 30%, rgba(244, 63, 94, 0.4) 0%, transparent 50%)",
                            "radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
                            "radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
                            "radial-gradient(circle at 70% 30%, rgba(244, 63, 94, 0.4) 0%, transparent 50%)",
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          background: [
                            "linear-gradient(45deg, rgba(244, 63, 94, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)",
                            "linear-gradient(45deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(244, 63, 94, 0.3) 100%)",
                            "linear-gradient(45deg, rgba(236, 72, 153, 0.3) 0%, rgba(244, 63, 94, 0.3) 50%, rgba(168, 85, 247, 0.3) 100%)",
                            "linear-gradient(45deg, rgba(244, 63, 94, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)",
                          ],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}

                  {/* Floating Hearts Animation - Only for Love & Relationships */}
                  {isLoveSection && loveShowAnimation && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {/* Large floating hearts with chroma colors */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`heart-${i}`}
                          className="absolute"
                          style={{
                            left: `${10 + Math.random() * 80}%`,
                            bottom: "-20px",
                          }}
                          animate={{
                            y: [0, -400 - Math.random() * 200],
                            x: [0, (Math.random() - 0.5) * 100],
                            opacity: [0, loveHeartOpacity, loveHeartOpacity, 0],
                            scale: [0.5, 1, 1, 0.8],
                            rotate: [0, (Math.random() - 0.5) * 30],
                            color: loveChromaAnimation
                              ? [
                                  "rgb(244, 63, 94)",
                                  "rgb(168, 85, 247)",
                                  "rgb(236, 72, 153)",
                                  "rgb(244, 63, 94)",
                                ]
                              : undefined,
                          }}
                          transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: i * 1.2,
                            ease: "easeOut",
                          }}
                        >
                          <Heart
                            className={`${loveHeartSize} ${loveChromaAnimation ? "text-rose-500" : "text-rose-400"} ${loveChromaAnimation ? "fill-rose-400/50" : "fill-rose-300/40"}`}
                            style={{
                              filter: loveChromaAnimation
                                ? "drop-shadow(0 0 8px rgba(244, 63, 94, 0.5)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.3))"
                                : "drop-shadow(0 2px 4px rgba(244, 63, 94, 0.25))",
                            }}
                          />
                        </motion.div>
                      ))}
                      {/* Smaller floating hearts */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`small-heart-${i}`}
                          className="absolute"
                          style={{
                            left: `${15 + Math.random() * 70}%`,
                            bottom: "-15px",
                          }}
                          animate={{
                            y: [0, -350 - Math.random() * 150],
                            x: [0, (Math.random() - 0.5) * 60],
                            opacity: [
                              0,
                              loveHeartOpacity * 0.7,
                              loveHeartOpacity * 0.7,
                              0,
                            ],
                            scale: [0.3, 0.7, 0.7, 0.5],
                          }}
                          transition={{
                            duration: 6 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.8 + 0.5,
                            ease: "easeOut",
                          }}
                        >
                          <Heart
                            className={`${loveSmallHeartSize} ${loveChromaAnimation ? "text-fuchsia-400" : "text-pink-400"} ${loveChromaAnimation ? "fill-fuchsia-300/40" : "fill-pink-300/30"}`}
                          />
                        </motion.div>
                      ))}
                      {/* Sparkle effects with chroma colors */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            bottom: `${20 + Math.random() * 60}%`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.7,
                            ease: "easeInOut",
                          }}
                        >
                          <Sparkles
                            className={`w-3 h-3 ${loveChromaAnimation ? "text-fuchsia-400" : "text-rose-400"}`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Card Header with Gradient */}
                  <div
                    className={`relative px-6 py-4 ${isLoveSection ? loveBgColor : section.bgColor} border-b ${isLoveSection ? loveBorderColor : section.borderColor} ${isLoveSection ? `bg-gradient-to-r ${loveBgGradient}` : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon Container with chroma glow */}
                      <motion.div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${section.gradient} shadow-md group-hover:scale-110 transition-transform duration-300 ${isLoveSection ? "shadow-rose-200" : ""}`}
                        animate={
                          isLoveSection && loveChromaAnimation
                            ? {
                                boxShadow: [
                                  "0 0 20px rgba(244, 63, 94, 0.4)",
                                  "0 0 20px rgba(168, 85, 247, 0.4)",
                                  "0 0 20px rgba(236, 72, 153, 0.4)",
                                  "0 0 20px rgba(244, 63, 94, 0.4)",
                                ],
                              }
                            : {}
                        }
                        transition={
                          isLoveSection && loveChromaAnimation
                            ? {
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }
                            : {}
                        }
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3
                        className={`text-lg font-medium ${isLoveSection ? loveTitleColor : "text-gray-900"}`}
                      >
                        {section.title}
                      </h3>

                      {/* Special badge for Love section */}
                      {isLoveSection && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`ml-auto px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${loveBadgeGradient} text-white shadow-md`}
                        >
                          {loveBadgeText}
                        </motion.span>
                      )}
                    </div>

                    {/* Decorative gradient line with chroma animation */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${section.gradient} opacity-30 ${isLoveSection ? "opacity-60" : ""}`}
                      animate={
                        isLoveSection && loveChromaAnimation
                          ? {
                              background: [
                                "linear-gradient(90deg, rgba(244, 63, 94, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)",
                                "linear-gradient(90deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%)",
                                "linear-gradient(90deg, rgba(236, 72, 153, 0.8) 0%, rgba(244, 63, 94, 0.8) 100%)",
                                "linear-gradient(90deg, rgba(244, 63, 94, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)",
                              ],
                            }
                          : {}
                      }
                      transition={
                        isLoveSection && loveChromaAnimation
                          ? {
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }
                          : {}
                      }
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative z-10">
                    <p
                      className={`leading-relaxed text-[16px] font-normal whitespace-pre-line ${isLoveSection ? loveTextColor : "text-gray-700"}`}
                    >
                      {processTextWithGlossary(
                        truncateReadingForPreview(section.reading, displayType),
                        report?.reportContent?.glossary || [],
                      )}
                    </p>
                  </div>

                  {/* Subtle corner decoration */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${section.gradient} opacity-5 rounded-bl-full pointer-events-none ${isLoveSection ? "opacity-10" : ""}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show blur overlay for non-premium users */}
        {/* {displayType === "PARTIAL" && <ReadingBlurOverlay />} */}
      </motion.div>

      {/* Born Year - Chinese Zodiac Display */}
      <BornYearSection
        zodiac={reportContent.zodiac}
        bornYear={reportContent.bornYear}
      />

      {/* Monthly Breakdown - Collapsible List */}
      <MonthlyBreakdownSection monthly={getCurrentContent()?.monthly || []} />

      {/* Key Themes - Redesigned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div
          className="rounded-3xl border border-white/30 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border-b border-indigo-100/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                <Star className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Key Themes</h3>
            </div>
          </div>

          {/* Themes Grid */}
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {(getCurrentContent()?.keyThemes || []).map(
                (theme: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group"
                  >
                    <div className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100 transition-all duration-300 cursor-default">
                      <span className="text-sm font-medium text-indigo-700 group-hover:text-indigo-800">
                        {theme}
                      </span>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium Exclusive Section Header */}
      {SHOW_EXCLUSIVE && displayType === "FULL" && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div
            className="relative p-8 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 25%, rgba(138, 43, 226, 0.15) 75%, rgba(75, 0, 130, 0.2) 100%)",
              backdropFilter: "blur(25px)",
              boxShadow:
                "0 25px 50px rgba(255, 215, 0, 0.25), 0 0 80px rgba(138, 43, 226, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 0 0 2px transparent",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
            }}
          >
            {/* Gradient border using pseudo-element */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, #FFD700, #FFA500, #8A2BE2, #4B0082)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "2px",
              }}
            />
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
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
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
    </div>
  );
}

export default function ReportPage_V2() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
