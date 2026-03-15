import React from 'react'
import {motion} from "framer-motion";

import {
    Calendar,
    Clock,
    Eye,
    ChevronRight,
} from "lucide-react";
import {Report} from "@/lib/api/reports";

function ReportCard({
                        report,
                        index,
                        onClick,
                    }: {
    report: Report;
    index: number;
    onClick?: () => void;
}) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 bg-green-50";
        if (score >= 60) return "text-yellow-600 bg-yellow-50";
        return "text-red-600 bg-red-50";
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "YEARLY":
                return {
                    text: "Yearly",
                    className:
                        "bg-gradient-to-r from-purple-500 to-indigo-600 text-white",
                    icon: "🌟",
                };
            case "MONTHLY":
                return {
                    text: "Monthly",
                    className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white",
                    icon: "🌙",
                };
            case "WEEKLY":
                return {
                    text: "Weekly",
                    className:
                        "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
                    icon: "⭐",
                };
            default:
                return {
                    text: type.charAt(0) + type.slice(1).toLowerCase(),
                    className: "bg-gray-200 text-gray-700",
                    icon: "📅",
                };
        }
    };

    const formatPeriod = (report: Report) => {
        const endDate = new Date(report.endTime);
        const year = endDate.getFullYear();

        switch (report.type) {
            case "YEARLY":
                return `${year}`;
            case "MONTHLY":
                return endDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                });
            case "WEEKLY":
                // Calculate week number
                const startOfYear = new Date(year, 0, 1);
                const weekNum = Math.ceil(
                    ((endDate.getTime() - startOfYear.getTime()) / 86400000 +
                        startOfYear.getDay() +
                        1) /
                    7,
                );
                return `Week ${weekNum}, ${year}`;
            default:
                return "";
        }
    };

    const formatSubPeriod = (report: Report) => {
        const endDate = new Date(report.endTime);

        switch (report.type) {
            case "YEARLY":
                return "Full Year Analysis";
            case "MONTHLY":
                return "Month Overview";
            case "WEEKLY":
                // Show date range for the week
                const weekStart = new Date(endDate);
                weekStart.setDate(endDate.getDate() - endDate.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return `${weekStart.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })} - ${weekEnd.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })}`;
            default:
                return "";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getCardSize = (type: string) => {
        if (type === "YEARLY") return "md:col-span-2 lg:col-span-1";
        return "";
    };

    const fortuneScore = parseInt(report.reportContent.fortuneScore);
    const typeBadge = getTypeBadge(report.type);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: index * 0.1}}
            whileHover={{y: -4, transition: {duration: 0.2}}}
            className={getCardSize(report.type)}
            onClick={onClick}
        >
            <div
                className="group p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/30 cursor-pointer h-full"
                style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
              <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${typeBadge.className} flex items-center gap-1`}
              >
                <span>{typeBadge.icon}</span>
                  {typeBadge.text}
              </span>
                            <Calendar className="w-4 h-4 text-indigo-600"/>
                            <span className="text-sm font-medium text-gray-700">
                {formatPeriod(report)}
              </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            {formatSubPeriod(report)}
                        </div>
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(
                            fortuneScore,
                        )}`}
                    >
                        {fortuneScore}%
                    </div>
                </div>

                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {report.type.charAt(0) + report.type.slice(1).toLowerCase()} Fortune
                        Report
                    </h3>

                    <div className="flex flex-wrap gap-1">
                        {report.reportContent.keyThemes
                            .slice(0, report.type === "YEARLY" ? 3 : 2)
                            .map((theme: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                                >
                  {theme}
                </span>
                            ))}
                        {report.reportContent.keyThemes.length >
                            (report.type === "YEARLY" ? 3 : 2) && (
                                <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-full">
                +
                                    {report.reportContent.keyThemes.length -
                                        (report.type === "YEARLY" ? 3 : 2)}{" "}
                                    more
              </span>
                            )}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4"/>
                        <span>{formatDate(report.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
                        <Eye className="w-4 h-4"/>
                        <span>View Report</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ReportCard