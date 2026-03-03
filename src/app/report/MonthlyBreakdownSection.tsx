"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";

export interface FortuneByMonth {
  dateEnd: string;
  dateStart: string;
  reading: string;
}

interface MonthlyBreakdownSectionProps {
  monthly: FortuneByMonth[];
}

// Get seasonal color scheme based on month (0-11)
function getSeasonalColors(month: number): { bg: string; text: string; label: string } {
  // Spring: March, April, May (2, 3, 4)
  if (month >= 2 && month <= 4) {
    return {
      bg: "bg-gradient-to-r from-emerald-400 to-teal-500",
      text: "text-emerald-700",
      label: "Spring",
    };
  }
  // Summer: June, July, August (5, 6, 7)
  if (month >= 5 && month <= 7) {
    return {
      bg: "bg-gradient-to-r from-amber-400 to-orange-500",
      text: "text-amber-700",
      label: "Summer",
    };
  }
  // Autumn/Fall: September, October, November (8, 9, 10)
  if (month >= 8 && month <= 10) {
    return {
      bg: "bg-gradient-to-r from-orange-500 to-red-500",
      text: "text-orange-700",
      label: "Autumn",
    };
  }
  // Winter: December, January, February (11, 0, 1)
  return {
    bg: "bg-gradient-to-r from-blue-400 to-indigo-500",
    text: "text-blue-700",
    label: "Winter",
  };
}

export default function MonthlyBreakdownSection({ monthly }: MonthlyBreakdownSectionProps) {
  const [expandedMonths, setExpandedMonths] = useState<Set<number>>(new Set());

  if (!monthly || monthly.length === 0) {
    return null;
  }

  const toggleMonth = (index: number) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedMonths(newExpanded);
  };

  const formatMonthLabel = (dateStart: string, dateEnd: string) => {
    const start = new Date(dateStart);
    const monthName = start.toLocaleDateString("en-US", { month: "long" });
    const year = start.getFullYear();
    return `${monthName} ${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-8"
    >
      <div
        className="p-6 rounded-3xl border border-white/30"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-medium text-gray-900">Monthly Breakdown</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Click on each month to see what the stars have in store for you.
        </p>

        <div className="space-y-3">
          {monthly.map((monthData, index) => {
            const isExpanded = expandedMonths.has(index);
            const monthIndex = new Date(monthData.dateStart).getMonth();
            const seasonColors = getSeasonalColors(monthIndex);
            const shortMonth = new Date(monthData.dateStart).toLocaleDateString("en-US", { month: "short" });

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="rounded-2xl overflow-hidden border border-indigo-100 bg-white/50"
              >
                <button
                  onClick={() => toggleMonth(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-indigo-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${seasonColors.bg}`}>
                      <span className="text-white text-sm font-semibold">
                        {shortMonth}
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-gray-800 block">
                        {formatMonthLabel(monthData.dateStart, monthData.dateEnd)}
                      </span>
                      <span className={`text-xs ${seasonColors.text}`}>
                        {seasonColors.label}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-indigo-100">
                    <div className="mt-4">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {monthData.reading || "No reading available for this month."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Period: {new Date(monthData.dateStart).toLocaleDateString()} - {new Date(monthData.dateEnd).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
