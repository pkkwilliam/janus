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
        title: "General",
        reading: reportContent?.general,
      },
      {
        title: "Career",
        reading: reportContent?.career,
      },
      {
        title: "Financial",
        reading: reportContent?.financial,
      },
      {
        title: "Health",
        reading: reportContent?.health,
      },
      {
        title: "Romance",
        reading: reportContent?.relationship,
      },
      {
        title: "Born Year",
        reading: reportContent?.bornYear,
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

      {/* Main Reading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div
          className="relative p-8 rounded-3xl border border-white/30 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-medium text-gray-900">Your Reading</h2>
          </div>

          <div className="flex flex-col gap-10">
            {getCurrentContentV2().map((section, index) => (
              <div
                key={`section-${index}`}
                className="relative flex flex-col gap-4"
              >
                {/* Elegant Section Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-indigo-200/60 to-transparent" />
                  <h3 className="text-sm tracking-widest uppercase text-indigo-600 font-semibold">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-indigo-200/60 to-transparent" />
                </div>

                {/* Reading Content */}
                <p className="text-gray-800/90 leading-8 text-[15.5px] font-light whitespace-pre-line">
                  {processTextWithGlossary(
                    truncateReadingForPreview(section.reading, displayType),
                    report?.reportContent?.glossary || [],
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Show blur overlay for non-premium users */}
          {/* {displayType === "PARTIAL" && <ReadingBlurOverlay />} */}
        </div>
      </motion.div>

      {/* Born Year - Chinese Zodiac Display */}
      <BornYearSection
        zodiac={reportContent.zodiac}
        bornYear={reportContent.bornYear}
      />

      {/* Monthly Breakdown - Collapsible List */}
      <MonthlyBreakdownSection monthly={getCurrentContent()?.monthly || []} />

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
            {(getCurrentContent()?.keyThemes || []).map(
              (theme: string, index: number) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
                >
                  <span className="text-sm font-medium text-indigo-700">
                    {theme}
                  </span>
                </div>
              ),
            )}
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
