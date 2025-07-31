"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Star,
  TrendingUp,
  Clock,
  Eye,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Sparkles,
  Filter,
  Crown,
  Loader2,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BirthInfoForm } from "@/components/profile/BirthInfoForm";
import { SubscriptionSelector } from "@/components/subscription/SubscriptionSelector";
import { userAPI } from "@/lib/api/user";
import { authAPI } from "@/lib/api/auth";
import { apiClient } from "@/lib/api/client";
import { reportsApi, Report } from "@/lib/api/reports";
import { useAppInit } from "@/hooks/useAppInit";

// Mock user data
const mockUser = {
  name: "Sarah Chen",
  email: "sarah@example.com",
  joinDate: "2024-01-15",
  totalReports: 24,
  averageScore: 78,
  // Birth info - set to null to simulate incomplete profile
  birthDate: null,
  birthTime: null,
  birthCity: null,
  birthCountry: null,
};

// Mock reports data - this would come from API
const mockReports = [
  {
    id: "687d8dc487151063bfe7dfbf",
    type: "WEEKLY",
    period: {
      year: 2025,
      month: 7,
      week: 30,
      weekStart: "2025-07-20",
      weekEnd: "2025-07-26",
    },
    fortuneScore: 75,
    keyThemes: [
      "Career advancement",
      "Financial opportunities",
      "Health caution",
      "Relationship challenges",
    ],
    createdAt: "2025-07-21T00:45:56.007Z",
    status: "completed",
  },
  {
    id: "687d8dc487151063bfe7dfbe",
    type: "MONTHLY",
    period: {
      year: 2025,
      month: 7,
      monthName: "July",
    },
    fortuneScore: 82,
    keyThemes: [
      "Love & relationships",
      "Creative energy",
      "Financial stability",
      "Spiritual growth",
    ],
    createdAt: "2025-07-14T00:45:56.007Z",
    status: "completed",
  },
  {
    id: "687d8dc487151063bfe7dfbd",
    type: "WEEKLY",
    period: {
      year: 2025,
      month: 7,
      week: 28,
      weekStart: "2025-07-06",
      weekEnd: "2025-07-12",
    },
    fortuneScore: 68,
    keyThemes: [
      "Career transition",
      "Health focus",
      "Family matters",
      "Learning opportunities",
    ],
    createdAt: "2025-07-07T00:45:56.007Z",
    status: "completed",
  },
  {
    id: "687d8dc487151063bfe7dfc0",
    type: "YEARLY",
    period: {
      year: 2025,
    },
    fortuneScore: 88,
    keyThemes: [
      "Personal transformation",
      "Major life changes",
      "Spiritual awakening",
      "Success & prosperity",
      "Deep relationships",
    ],
    createdAt: "2025-01-01T00:00:00.000Z",
    status: "completed",
  },
  {
    id: "687d8dc487151063bfe7dfc1",
    type: "MONTHLY",
    period: {
      year: 2025,
      month: 6,
      monthName: "June",
    },
    fortuneScore: 76,
    keyThemes: [
      "Personal growth",
      "New beginnings",
      "Creative expression",
      "Inner wisdom",
    ],
    createdAt: "2025-06-01T00:00:00.000Z",
    status: "completed",
  },
  {
    id: "687d8dc487151063bfe7dfc2",
    type: "WEEKLY",
    period: {
      year: 2025,
      month: 6,
      week: 25,
      weekStart: "2025-06-15",
      weekEnd: "2025-06-21",
    },
    fortuneScore: 72,
    keyThemes: [
      "Professional development",
      "Communication skills",
      "Social connections",
      "Mental clarity",
    ],
    createdAt: "2025-06-16T00:00:00.000Z",
    status: "completed",
  },
];

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
        // Calculate week number
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={getCardSize(report.type)}
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

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading, refresh } = useAppInit({ requireAuth: true });
  const [showBirthInfoForm, setShowBirthInfoForm] = useState(false);
  const [showSubscriptionSelector, setShowSubscriptionSelector] =
    useState(false);
  const [reportFilter, setReportFilter] = useState<
    "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY"
  >("ALL");
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreReports, setHasMoreReports] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const dashboardPageSize = 6;

  useEffect(() => {
    if (searchParams.get("upgrade") === "true") {
      setShowSubscriptionSelector(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user]);

  const loadReports = async (reset = true) => {
    if (reset) {
      setReportsLoading(true);
      setCurrentPage(0);
    }
    setReportsError(null);

    try {
      const pageToLoad = reset ? 0 : currentPage;
      const response = await reportsApi.getUserReportsPagination({
        pageRequest: pageToLoad,
        pageSize: dashboardPageSize,
      });

      if (response.error) {
        setReportsError(response.error.message);
      } else if (response.data && response.data.content) {
        if (reset) {
          setReports(response.data.content);
        } else {
          setReports((prev) => [...prev, ...(response?.data?.content ?? [])]);
        }
        setHasMoreReports(!response.data.last);
      }
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReportsError("Failed to load reports");
    } finally {
      if (reset) {
        setReportsLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMoreReports = async () => {
    if (loadingMore || !hasMoreReports) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    try {
      const response = await reportsApi.getUserReportsPagination({
        pageRequest: nextPage,
        pageSize: dashboardPageSize,
      });

      if (response.error) {
        setReportsError(response.error.message);
      } else if (response.data) {
        setReports((prev) => [...prev, ...(response?.data?.content ?? [])]);
        setHasMoreReports(!response.data.last);
      }
    } catch (error) {
      console.error("Failed to load more reports:", error);
      setReportsError("Failed to load more reports");
    } finally {
      setLoadingMore(false);
    }
  };

  const generateYearlyReport = async () => {
    if (generatingReport) return;

    setGeneratingReport(true);
    setGenerationError(null);

    try {
      const response = await reportsApi.generateReport("YEARLY");

      if (response.error) {
        setGenerationError(response.error.message);
      } else if (response.data) {
        // Add the new report to the beginning of the list
        setReports((prev) => [response.data!, ...prev]);
        // Navigate to the new report
        router.push(`/report?id=${response.data!.id}`);
      }
    } catch (error) {
      console.error("Failed to generate report:", error);
      setGenerationError("Failed to generate report. Please try again.");
    } finally {
      setGeneratingReport(false);
    }
  };

  // Check if user needs to complete profile using the utility function
  const profileStatus = user ? userAPI.checkProfileCompleteness(user) : null;
  const needsProfileCompletion = profileStatus
    ? !profileStatus.isComplete
    : false;

  // Filter reports based on selected filter
  const filteredReports = reports.filter(
    (report) => reportFilter === "ALL" || report.type === reportFilter
  );

  // Calculate total reports and average score from actual reports data
  const totalReports = reports.length;
  const averageScore = reports.length > 0 
    ? Math.round(reports.reduce((sum, report) => {
        const score = parseInt(report.reportContent?.fortuneScore || '0');
        return sum + score;
      }, 0) / reports.length)
    : 0;

  const handleProfileComplete = (profileData: any) => {
    // Profile update is already handled in the form component and auto-cached
    // Just close the form and refresh user data from cache
    setShowBirthInfoForm(false);

    // Refresh the user data to get the updated profile
    refresh();
  };

  const handleSkipProfile = () => {
    setShowBirthInfoForm(false);
  };

  // Show loading state while user data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // This should not happen since useAppInit with requireAuth=true handles redirects
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    // Clear JWT token and cached user data
    authAPI.logout();

    // Redirect to login
    router.push("/auth/login");
  };

  // If profile form is open, show it as overlay
  if (showBirthInfoForm) {
    return (
      <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
        <BirthInfoForm
          onComplete={handleProfileComplete}
          onSkip={handleSkipProfile}
          showSkip={true}
          initialData={{
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            gender: (user.gender as "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY") || undefined,
            birthDate: user.birthDate ? user.birthDate.replace(/\//g, "-") : "", // Convert from YYYY/MM/DD to YYYY-MM-DD for HTML input
            birthTime: user.birthTime || "",
            birthCity: user.birthCity || "",
            birthCountry: user.birthCountry || "", // Fallback for missing country
          }}
        />
      </div>
    );
  }

  // If subscription selector is open, show it as overlay
  if (showSubscriptionSelector) {
    return (
      <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setShowSubscriptionSelector(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </button>
        </div>

        <div
          className="p-8 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="text-center mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 w-fit mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Upgrade to Premium
            </h1>
            <p className="text-gray-600">
              Unlock advanced insights and personalized guidance
            </p>
          </div>

          <SubscriptionSelector
            onSubscriptionStart={() => console.log("Subscription started")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div
          className="p-6 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <Sparkles className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-light text-gray-900 mb-1">
                  Welcome back,{" "}
                  {user.firstName ||
                    user.name?.split(" ")[0] ||
                    user.username?.split("@")[0] ||
                    "Friend"}
                </h1>
                <p className="text-gray-600">
                  Your spiritual journey continues
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/orders">
                <button
                  className="p-2 rounded-xl hover:bg-white/50 transition-colors"
                  title="Order History"
                >
                  <Package className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
              <Link href="/settings">
                <button
                  className="p-2 rounded-xl hover:bg-white/50 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl hover:bg-white/50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Completion Banner */}
      {needsProfileCompletion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            className="p-6 rounded-3xl border border-orange-200/50 cursor-pointer group"
            style={{
              background:
                "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => setShowBirthInfoForm(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Complete Your Cosmic Profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add your personal and birth information for more accurate
                    readings
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Subscription Upgrade Banner */}
      {!user.hasActiveSubscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div
            className="p-6 rounded-3xl border border-purple-200/50 cursor-pointer group"
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => setShowSubscriptionSelector(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Unlock Premium Features
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get unlimited reports, advanced insights, and personalized guidance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-purple-600">
                    Starting at $9.99/month
                  </div>
                  <div className="text-xs text-gray-500">
                    7-day free trial
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        <div
          className="p-6 rounded-3xl border border-white/30 text-center"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 w-fit mx-auto mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-light text-gray-900 mb-1">
            {totalReports}
          </div>
          <div className="text-sm text-gray-600">Total Reports</div>
        </div>

        <div
          className="p-6 rounded-3xl border border-white/30 text-center"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 w-fit mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-light text-gray-900 mb-1">
            {averageScore}%
          </div>
          <div className="text-sm text-gray-600">Average Fortune</div>
        </div>

        <div
          className="p-6 rounded-3xl border border-white/30 text-center"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 w-fit mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-light text-gray-900 mb-1">
            {Math.floor(
              (Date.now() - new Date(user.joinDate || user.createTime).getTime()) /
                (1000 * 60 * 60 * 24)
            )}
          </div>
          <div className="text-sm text-gray-600">Days Journey</div>
        </div>
      </motion.div>

      {/* Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-gray-900">
            Your Fortune Reports
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={reportFilter}
                onChange={(e) =>
                  setReportFilter(
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
            <Link href="/reports">
              <button className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium">
                View All Reports
              </button>
            </Link>
          </div>
        </div>

        {reportsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your reports...</p>
            </div>
          </div>
        ) : reportsError ? (
          <div className="text-center py-12">
            <div className="p-4 rounded-2xl bg-red-100 w-fit mx-auto mb-4">
              <Calendar className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Reports
            </h3>
            <p className="text-gray-600 mb-4">{reportsError}</p>
            <button
              onClick={() => loadReports(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => (
                <ReportCard key={report.id} report={report} index={index} />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 rounded-2xl bg-gray-100 w-fit mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Reports Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {reportFilter === "ALL"
                    ? reports.length === 0
                      ? "You don't have any reports yet. Generate your first reading!"
                      : "No reports match your filter."
                    : `No ${reportFilter.toLowerCase()} reports found. Try a different filter.`}
                </p>

                {/* Show Generate Report button only when no reports exist at all */}
                {reports.length === 0 && reportFilter === "ALL" && (
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generateYearlyReport}
                      disabled={generatingReport || needsProfileCompletion}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-medium hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-lg"
                    >
                      {generatingReport ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <div className="text-left">
                            <div className="font-medium">
                              Generating Your Yearly Report...
                            </div>
                            <div className="text-xs opacity-90">
                              This may take up to 1 minute
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2 rounded-lg bg-white/20">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">
                              Generate Yearly Report
                            </div>
                            <div className="text-xs opacity-90">
                              Get your comprehensive fortune analysis
                            </div>
                          </div>
                        </>
                      )}
                    </motion.button>

                    {needsProfileCompletion && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-orange-600 bg-orange-50 px-4 py-3 rounded-lg">
                        <p className="flex-1">
                          Please complete your profile first to generate
                          accurate reports
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowBirthInfoForm(true)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all text-xs flex items-center gap-2 whitespace-nowrap"
                        >
                          <User className="w-4 h-4" />
                          Complete Profile
                        </motion.button>
                      </div>
                    )}

                    {generationError && (
                      <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
                        {generationError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Load More Button */}
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
                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading more...
                      </>
                    ) : (
                      <>
                        Load More Reports
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}
          </>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-light text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className={`grid ${user.hasActiveSubscription ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
          <div
            className="p-6 rounded-3xl border border-white/30 text-center cursor-pointer group hover:scale-105 transition-transform"
            style={{
              background:
                "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => setShowBirthInfoForm(true)}
          >
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Update Profile
            </h3>
            <p className="text-sm text-gray-600">
              Personalize your spiritual journey
            </p>
          </div>

          {!user.hasActiveSubscription && (
            <div
              className="p-6 rounded-3xl border border-white/30 text-center cursor-pointer group hover:scale-105 transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                backdropFilter: "blur(20px)",
              }}
              onClick={() => setShowSubscriptionSelector(true)}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upgrade to Premium
              </h3>
              <p className="text-sm text-gray-600">
                Unlock unlimited reports & insights
              </p>
            </div>
          )}

          <Link href="/orders">
            <div
              className="p-6 rounded-3xl border border-white/30 text-center cursor-pointer group hover:scale-105 transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order History
              </h3>
              <p className="text-sm text-gray-600">
                View your subscription orders
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
