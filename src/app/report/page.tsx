"use client";

import { useState, useEffect, JSX, Suspense } from "react";
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
  Globe,
  Check,
  ChevronDown,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { reportsApi, Report } from "@/lib/api/reports";
import {
  translationApi,
  Language,
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from "@/lib/api/translation";
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

// Translation toggle component
function TranslationToggle({
  reportContent,
  onTranslationChange,
}: {
  reportContent: any;
  onTranslationChange: (content: any, language: LanguageCode) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0]
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  const translateContent = async (targetLanguage: Language) => {
    if (targetLanguage.code === "ENGLISH") {
      // If English is selected, use original content
      onTranslationChange(reportContent, "ENGLISH");
      setCurrentLanguage(targetLanguage);
      setIsOpen(false);
      return;
    }

    setIsTranslating(true);
    setTranslationError(null);

    try {
      // Use the translation API
      const response = await translationApi.translateContent(
        {
          readings: reportContent.readings || [],
          keyThemes: reportContent.keyThemes,
          spiritualGuidance: reportContent.spiritualGuidance,
          luckyGemstones: reportContent.luckyGemstones || [],
          luckyEnhancer: reportContent.luckyEnhancer || [],
          glossary: reportContent.glossary.map((item: any) => ({
            term: item.term,
            meaning: item.meaning,
            pinyin: item.pinyin,
          })),
        },
        targetLanguage.code as LanguageCode,
        "ENGLISH"
      );

      if (response.error) {
        // If it's an auth error, try the manual method
        if (
          response.error.code === "AUTH_ERROR" ||
          response.error.httpStatus === 401 ||
          response.error.httpStatus === 403
        ) {
          console.log("🔄 Trying manual fetch method due to auth error...");
          const manualResponse = await translationApi.translateContentManual(
            {
              readings: reportContent.readings || [],
              keyThemes: reportContent.keyThemes,
              spiritualGuidance: reportContent.spiritualGuidance,
              luckyGemstones: reportContent.luckyGemstones || [],
              luckyEnhancer: reportContent.luckyEnhancer || [],
              glossary: reportContent.glossary.map((item: any) => ({
                term: item.term,
                meaning: item.meaning,
                pinyin: item.pinyin,
              })),
            },
            targetLanguage.code as LanguageCode,
            "ENGLISH"
          );

          if (manualResponse.error) {
            throw new Error(manualResponse.error.message);
          }

          if (manualResponse.data?.success) {
            onTranslationChange(
              manualResponse.data.translatedContent,
              targetLanguage.code
            );
            setCurrentLanguage(targetLanguage);
            setIsOpen(false);
            return;
          } else {
            throw new Error(manualResponse.data?.error || "Translation failed");
          }
        } else {
          throw new Error(response.error.message);
        }
      }

      if (response.data?.success) {
        onTranslationChange(
          response.data.translatedContent,
          targetLanguage.code
        );
        setCurrentLanguage(targetLanguage);
        setIsOpen(false);
      } else {
        throw new Error(response.data?.error || "Translation failed");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslationError("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isTranslating}
      >
        {isTranslating ? (
          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        ) : (
          <Globe className="w-4 h-4 text-indigo-600" />
        )}
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full mt-2 right-0 z-50 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="p-3">
            <div className="text-xs font-semibold text-gray-500 mb-2 px-2">
              Select Language
            </div>
            <div className="max-h-64 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => translateContent(language)}
                  disabled={isTranslating}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-indigo-50 ${
                    currentLanguage.code === language.code
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700"
                  } ${isTranslating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium flex-1 text-left">
                    {language.name}
                  </span>
                  {currentLanguage.code === language.code && (
                    <Check className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Translation error notification */}
      {translationError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 right-0 z-50 p-3 bg-red-50 border border-red-200 rounded-xl shadow-lg"
        >
          <div className="text-sm text-red-700">{translationError}</div>
          <button
            onClick={() => setTranslationError(null)}
            className="text-xs text-red-500 hover:text-red-700 mt-1"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

// Reusable Lucky Element Card component
function LuckyElementCard({
  icon,
  title,
  subtitle,
  iconBgGradient,
  iconTextColor,
  subtitleColor,
  delay,
  renderContent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBgGradient: string;
  iconTextColor: string;
  subtitleColor: string;
  delay: number;
  renderContent: () => React.ReactNode;
}) {
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
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
          backdropFilter: "blur(30px)",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
          boxShadow:
            "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
        }}
      >
        {/* Gradient border using pseudo-element */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>

        {/* Premium indicator with pulse */}
        <div className="absolute top-3 right-3">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
          />
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className={`p-2 rounded-xl ${iconBgGradient}`}>
            <div className={iconTextColor}>{icon}</div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className={`text-xs font-medium ${subtitleColor}`}>{subtitle}</p>
          </div>
        </div>
        <div className="relative z-10">{renderContent()}</div>
      </div>
    </motion.div>
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

// Reading section blur overlay component for non-premium users
function ReadingBlurOverlay() {
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
  const components: {
    key: string;
    placeholder: string;
    component: JSX.Element;
  }[] = [];
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
  const [report, setReport] = useState<Report | null>(null);
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
          {report && (
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
                  type
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
            {displayType === "PARTIAL" && (
              <div className="ml-auto">
                <span className="px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">
                  Preview
                </span>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            {(getCurrentContent()?.readings || []).map((reading) => (
              <p className="text-gray-700 leading-relaxed">
                {processTextWithGlossary(
                  truncateReadingForPreview(reading, displayType),
                  getCurrentContent()?.glossary || []
                )}
              </p>
            ))}
          </div>

          {/* Show blur overlay for non-premium users */}
          {/* {displayType === "PARTIAL" && <ReadingBlurOverlay />} */}
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
            {(getCurrentContent()?.keyThemes || []).map((theme, index) => (
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

      {/* Lucky Elements Grid */}
      <div className="relative grid md:grid-cols-3 gap-6 mb-8">
        {displayType === "PARTIAL" && <LuckyElementsBlurOverlay />}
        {/* Lucky Colors */}
        <LuckyElementCard
          icon={<Palette className="w-5 h-5" />}
          title="Lucky Colors"
          subtitle="Exclusively Yours"
          iconBgGradient="bg-gradient-to-r from-pink-100 to-purple-100"
          iconTextColor="text-purple-600"
          subtitleColor="text-purple-600"
          delay={0.3}
          renderContent={() => (
            <div className="space-y-2">
              {(getCurrentContent()?.luckyColors || []).length > 0 ? (
                (getCurrentContent()?.luckyColors || []).map((color, index) => (
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
          )}
        />

        {/* Lucky Numbers */}
        <LuckyElementCard
          icon={<Hash className="w-5 h-5" />}
          title="Lucky Numbers"
          subtitle="Power Numbers"
          iconBgGradient="bg-gradient-to-r from-blue-100 to-indigo-100"
          iconTextColor="text-indigo-600"
          subtitleColor="text-indigo-600"
          delay={0.4}
          renderContent={() => (
            <div className="flex gap-2 flex-wrap">
              {(getCurrentContent()?.luckyNumbers || []).length > 0 ? (
                (getCurrentContent()?.luckyNumbers || []).map(
                  (number, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium"
                    >
                      {number}
                    </div>
                  )
                )
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No specific lucky numbers for this period
                </div>
              )}
            </div>
          )}
        />

        {/* Lucky Gemstones */}
        <LuckyElementCard
          icon={<Gem className="w-5 h-5" />}
          title="Lucky Gemstones"
          subtitle="Sacred Crystals"
          iconBgGradient="bg-gradient-to-r from-emerald-100 to-teal-100"
          iconTextColor="text-emerald-600"
          subtitleColor="text-emerald-600"
          delay={0.5}
          renderContent={() => (
            <div className="space-y-2">
              {(getCurrentContent()?.luckyGemstones || []).length > 0 ? (
                (getCurrentContent()?.luckyGemstones || []).map(
                  (gemstone, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      {gemstone}
                    </div>
                  )
                )
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No specific lucky gemstones for this period
                </div>
              )}
            </div>
          )}
        />

        {/* Lucky Enhancer Section - if available */}
        {(getCurrentContent()?.luckyEnhancer || []).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01, y: -3 }}
            className="md:col-span-3 group"
          >
            <div
              className="relative p-6 rounded-3xl h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
                backdropFilter: "blur(30px)",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
                boxShadow:
                  "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
              }}
            >
              {/* Gradient border using pseudo-element */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4))",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />
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
                {(getCurrentContent()?.luckyEnhancer || []).map(
                  (enhancer, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {enhancer}
                      </div>
                    </div>
                  )
                )}
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
            "{getCurrentContent()?.spiritualGuidance || ""}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ReportPage() {
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
