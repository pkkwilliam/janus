"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Star,
  Clock,
  Eye,
  ChevronRight,
  ChevronLeft,
  Filter,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { reportsApi, Report } from "@/lib/api/reports";
import { useAppInit } from "@/hooks/useAppInit";

function ReportCard({ report, index }: { report: Report; index: number }) {
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
        const startOfYear = new Date(year, 0, 1);
        const weekNum = Math.ceil(
          ((endDate.getTime() - startOfYear.getTime()) / 86400000 +
            startOfYear.getDay() +
            1) /
            7
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

  const fortuneScore = parseInt(report.reportContent.fortuneScore);
  const typeBadge = getTypeBadge(report.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link href={`/report?id=${report.id}`}>
        <div
          className="group p-6 rounded-3xl border border-white/30 cursor-pointer h-full"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${typeBadge.className} flex items-center gap-1`}
                >
                  <span>{typeBadge.icon}</span>
                  {typeBadge.text}
                </span>
                <Calendar className="w-4 h-4 text-indigo-600" />
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
                fortuneScore
              )}`}
            >
              {fortuneScore}%
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
              {report.type.charAt(0) + report.type.slice(1).toLowerCase()}{" "}
              Fortune Report
            </h3>

            <div className="flex flex-wrap gap-1">
              {report.reportContent.keyThemes
                .slice(0, 3)
                .map((theme: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              {report.reportContent.keyThemes.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-full">
                  +{report.reportContent.keyThemes.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDate(report.endTime)}</span>
            </div>
            <div className="flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Report</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ReportsPage() {
  const router = useRouter();
  const { user, isLoading } = useAppInit({ requireAuth: true });

  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [reportFilter, setReportFilter] = useState<
    "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY"
  >("ALL");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreReports, setHasMoreReports] = useState(false);
  const pageSize = 12; // Show more reports per page than dashboard

  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user, currentPage]);

  const loadReports = async () => {
    setReportsLoading(true);
    setReportsError(null);

    try {
      const response = await reportsApi.getUserReportsPagination({
        pageRequest: currentPage,
        pageSize,
      });

      if (response.error) {
        setReportsError(response.error.message);
      } else if (response.data) {
        setReports(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setIsLast(response.data.last);
        setIsFirst(response.data.first);
        setHasMoreReports(!response.data.last);
      }
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReportsError("Failed to load reports");
    } finally {
      setReportsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (
    filter: "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY"
  ) => {
    setReportFilter(filter);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const loadMoreReports = async () => {
    if (loadingMore || !hasMoreReports) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const response = await reportsApi.getUserReportsPagination({
        pageRequest: nextPage,
        pageSize,
      });

      if (response.error) {
        setReportsError(response.error.message);
      } else if (response.data) {
        setReports((prev) => [...prev, ...(response?.data?.content ?? [])]);
        setCurrentPage(nextPage);
        setHasMoreReports(!response.data.last);
        setIsLast(response.data.last);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      }
    } catch (error) {
      console.error("Failed to load more reports:", error);
      setReportsError("Failed to load more reports");
    } finally {
      setLoadingMore(false);
    }
  };

  // Filter reports based on selected filter
  const filteredReports = reports.filter(
    (report) => reportFilter === "ALL" || report.type === reportFilter
  );

  // Show loading state while user data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <button className="p-2 rounded-xl hover:bg-white/50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-light text-gray-900">All Reports</h1>
            <p className="text-gray-600">
              Your complete fortune reading history
            </p>
          </div>
        </div>

        <div
          className="p-6 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={reportFilter}
                  onChange={(e) =>
                    handleFilterChange(
                      e.target.value as "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY"
                    )
                  }
                  className="appearance-none bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="ALL">All Reports</option>
                  <option value="YEARLY">🌟 Yearly</option>
                  <option value="MONTHLY">🌙 Monthly</option>
                  <option value="WEEKLY">⭐ Weekly</option>
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {totalElements > 0 && (
                <div className="text-sm text-gray-600">
                  Showing {filteredReports.length} of {totalElements} reports
                </div>
              )}
            </div>

            {/* Pagination Controls - Traditional */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={isFirst}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i;
                    if (totalPages > 5) {
                      if (currentPage < 2) {
                        pageNum = i;
                      } else if (currentPage > totalPages - 3) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600 hover:bg-white/50"
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={isLast}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Load More Button - Alternative to pagination */}
            {hasMoreReports && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={loadMoreReports}
                disabled={loadingMore}
                className="px-6 py-2 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reports Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {reportsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your reports...</p>
            </div>
          </div>
        ) : reportsError ? (
          <div className="text-center py-20">
            <div className="p-4 rounded-2xl bg-red-100 w-fit mx-auto mb-4">
              <Calendar className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Reports
            </h3>
            <p className="text-gray-600 mb-4">{reportsError}</p>
            <button
              onClick={loadReports}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredReports.map((report, index) => (
                <ReportCard key={report.id} report={report} index={index} />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-20">
                <div className="p-4 rounded-2xl bg-gray-100 w-fit mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Reports Found
                </h3>
                <p className="text-gray-600">
                  {reportFilter === "ALL"
                    ? reports.length === 0
                      ? "You don't have any reports yet. Request your first reading!"
                      : "No reports match your filter."
                    : `No ${reportFilter.toLowerCase()} reports found. Try a different filter.`}
                </p>
              </div>
            )}

            {/* Load More Button Below Grid */}
            {!reportsLoading &&
              !reportsError &&
              filteredReports.length > 0 &&
              hasMoreReports && (
                <div className="text-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={loadMoreReports}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading more reports...
                      </>
                    ) : (
                      <>
                        Load More Reports
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}
          </>
        )}
      </motion.div>
    </div>
  );
}
