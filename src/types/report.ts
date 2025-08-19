// TypeScript interfaces for report-related types to improve type safety

export interface GlossaryItem {
  term: string;
  meaning: string;
  pinyin: string;
}

export interface ReportContent {
  reading: string;
  keyThemes: string[];
  spiritualGuidance: string;
  luckyColors?: string[];
  luckyNumbers?: number[];
  luckyGemstones?: string[];
  luckyEnhancer?: string[];
  glossary: GlossaryItem[];
  fortuneScore: number;
}

export interface ReportPeriod {
  year?: number;
  month?: number;
  week?: number;
  weekStart?: string;
  weekEnd?: string;
}

export interface Report {
  id: string;
  type: "YEARLY" | "MONTHLY" | "WEEKLY";
  reportContent: ReportContent;
  period: ReportPeriod | null;
  endTime: string;
  displayType?: "PARTIAL" | "FULL";
}

export interface TranslatedContent {
  reading: string;
  keyThemes: string[];
  spiritualGuidance: string;
  luckyGemstones: string[];
  luckyEnhancer: string[];
  glossary: GlossaryItem[];
}

export interface TranslationToggleProps {
  reportContent: ReportContent;
  onTranslationChange: (content: TranslatedContent, language: LanguageCode) => void;
}

export interface GlossaryTooltipProps {
  term: string;
  meaning: string;
  pinyin: string;
}

export interface LuckyElementCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBgGradient: string;
  iconTextColor: string;
  subtitleColor: string;
  delay: number;
  renderContent: () => React.ReactNode;
}

export interface ReportHeaderProps {
  report: Report;
  onTranslationChange: (content: TranslatedContent, language: LanguageCode) => void;
}

export interface ReportReadingProps {
  content: ReportContent | TranslatedContent;
  delay?: number;
}

export interface KeyThemesProps {
  themes: string[];
  delay?: number;
}

export interface SpiritualGuidanceProps {
  guidance: string;
  delay?: number;
}

export interface LuckyElementsGridProps {
  content: ReportContent | TranslatedContent;
  displayType: "PARTIAL" | "FULL";
}

export type ReportType = Report["type"];
export type DisplayType = Report["displayType"];
export type LanguageCode = "ENGLISH" | "CHINESE" | "SPANISH" | "FRENCH" | "GERMAN" | "JAPANESE" | "KOREAN";