"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Check, ChevronDown, Loader2 } from "lucide-react";
import {
  translationApi,
  Language,
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from "@/lib/api/translation";

interface TranslationToggleProps {
  reportContent: any;
  onTranslationChange: (content: any, language: LanguageCode) => void;
}

export default function TranslationToggle({
  reportContent,
  onTranslationChange,
}: TranslationToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0],
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
        "ENGLISH",
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
            "ENGLISH",
          );

          if (manualResponse.error) {
            throw new Error(manualResponse.error.message);
          }

          if (manualResponse.data?.success) {
            onTranslationChange(
              manualResponse.data.translatedContent,
              targetLanguage.code,
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
          targetLanguage.code,
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
