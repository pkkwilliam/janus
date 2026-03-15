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
// import { reportsApi, ReportV2 as Report } from "@/lib/api/report_v2";
import { useAppInit } from "@/hooks/useAppInit";
import { FeedbackButton } from "@/components/ui/feedback-button";
import { FortuneCookieAnimation } from "@/components/fortune-cookie";
import WelcomeBackBanner from "@/app/dashboard/WelcomeBackBanner";
import ProfileCompletionBanner from "@/app/dashboard/ProfileCompletionBanner";
import SubscriptionUpgradeBanner from "@/app/dashboard/SubscriptionUpgradeBanner";
import SubscriptionSelectorOverlay from "@/app/dashboard/SubscriptionSelectorOverlay";
import StateBanner from "@/app/dashboard/StateBanner";
import QuickAction from "@/app/dashboard/QuickAction";
import ReportCard from "@/app/dashboard/ReportCard";
import GenericNoReportText from "@/app/dashboard/GenericNoReportText";
import CompleteProfileAlert from "@/app/dashboard/CompleteProfileAlert";
import GenericReportButton from "@/app/dashboard/GenericReportButton";

const SHOW_ORDER_HISHORY = true;
const SHOW_ALL_REPORT_BUTTON = false;
const SHOW_REPORT_FILTER = false;
const SHOW_GENERIC_NO_REPORT_TEXT = false;
const SHOW_COMPLETE_PROFILE_ALERT = false;

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
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [planLoading, setPlanLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showFortuneCookie, setShowFortuneCookie] = useState(false);
  const dashboardPageSize = 6;

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setShowFortuneCookie(true);
  };

  const handleFortuneCookieComplete = () => {
    if (selectedReport) {
      router.push(`/report?id=${selectedReport.id}`);
    }
  };

  useEffect(() => {
    if (searchParams.get("upgrade") === "true") {
      setShowSubscriptionSelector(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      loadReports();
      loadPlanInfo();
    }
  }, [user]);

  const loadPlanInfo = async () => {
    setPlanLoading(true);
    try {
      const planResponse = await userAPI.getPlan();
      setHasActiveSubscription(
        planResponse.data?.hasActiveSubscription || false,
      );
    } catch (error) {
      console.error("Failed to load plan information:", error);
      setHasActiveSubscription(false);
    } finally {
      setPlanLoading(false);
    }
  };

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

  const generateDailyReport = async () => {
    if (generatingReport) return;

    setGeneratingReport(true);
    setGenerationError(null);

    try {
      const response = await reportsApi.generateReport("DAILY");

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
    (report) => reportFilter === "ALL" || report.type === reportFilter,
  );

  // Calculate total reports and average score from actual reports data
  const totalReports = reports.length;
  const averageScore =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, report) => {
            const score = parseInt(report.reportContent?.fortuneScore || "0");
            return sum + score;
          }, 0) / reports.length,
        )
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
            gender:
              (user.gender as "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY") ||
              undefined,
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
    return <SubscriptionSelectorOverlay setShowSubscriptionSelector={setShowSubscriptionSelector} />
  }

  return (
    <div className="min-h-screen px-4 py-4 md:py-8 max-w-7xl mx-auto">
      {/* Header */}
        {!needsProfileCompletion && <WelcomeBackBanner user={user} />}

      {/* Profile Completion Banner */}
      {needsProfileCompletion
          && <ProfileCompletionBanner setShowBirthInfoForm={setShowBirthInfoForm} />}

      {/* Subscription Upgrade Banner */}
      {!planLoading && !hasActiveSubscription
          && <SubscriptionUpgradeBanner setShowSubscriptionSelector={setShowSubscriptionSelector} />}

      {/* Stats Overview - Mobile Optimized */}
      <StateBanner averageScore={averageScore} totalReports={totalReports} user={user}/>

      {/* Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 md:mb-8"
      >
        {/* Mobile: Stacked Layout */}
        <div className="md:hidden mb-4">
          <h2 className="text-lg font-light text-gray-900 mb-3">
            Your Fortune Reports
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              {SHOW_REPORT_FILTER && <div className="relative flex-1 min-w-0">
                  <select
                      value={reportFilter}
                      onChange={(e) =>
                          setReportFilter(
                              e.target.value as "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY",
                          )
                      }
                      className="w-full appearance-none bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                      <option value="ALL">All Reports</option>
                      <option value="YEARLY">🌟 Yearly</option>
                      <option value="MONTHLY">🌙 Monthly</option>
                      <option value="WEEKLY">⭐ Weekly</option>
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>}
              {SHOW_ALL_REPORT_BUTTON && <Link href="/reports" className="shrink-0">
                  <button className="w-full sm:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 transition-colors text-sm font-medium rounded-xl border border-indigo-200">
                      View All
                  </button>
              </Link>}
          </div>
        </div>

        {/* Desktop: Horizontal Layout */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-gray-900">
            Your Fortune Reports
          </h2>
          <div className="flex items-center gap-4">
              {SHOW_REPORT_FILTER && <div className="relative">
                  <select
                      value={reportFilter}
                      onChange={(e) =>
                          setReportFilter(
                              e.target.value as "ALL" | "YEARLY" | "MONTHLY" | "WEEKLY",
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
              </div>}
              {SHOW_ALL_REPORT_BUTTON && <Link href="/reports">
                  <button className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium">
                      View All Reports
                  </button>
              </Link>}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredReports.map((report, index) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  index={index}
                  onClick={() => handleReportClick(report)}
                />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                  {SHOW_GENERIC_NO_REPORT_TEXT && <GenericNoReportText reportFilter={reportFilter} reportLength={reports.length}/>}

                {/* Show Generate Report button only when no reports exist at all */}
                {reports.length === 0 && reportFilter === "ALL" && (
                  <div className="space-y-4">
                    <GenericReportButton
                        disabled={generatingReport || needsProfileCompletion}
                        generateDailyReport={generateDailyReport}
                        loading={generatingReport}
                    />

                    {SHOW_COMPLETE_PROFILE_ALERT
                        && needsProfileCompletion
                        && <CompleteProfileAlert setShowBirthInfoForm={setShowBirthInfoForm} />}

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
      <QuickAction
          hasActiveSubscription={hasActiveSubscription}
          setShowBirthInfoForm={setShowBirthInfoForm}
          setShowSubscriptionSelector={setShowSubscriptionSelector}
          showOrderHistory={SHOW_ORDER_HISHORY} />

      {/* Feedback Button */}
      <FeedbackButton />

      {/* Fortune Cookie Animation Overlay */}
      <FortuneCookieAnimation
        isOpen={showFortuneCookie}
        onClose={() => setShowFortuneCookie(false)}
        onComplete={handleFortuneCookieComplete}
        fortuneScore={100}
        fortuneText={
          selectedReport?.reportContent?.spiritualGuidance ||
          "Your destiny awaits..."
        }
        luckyNumbers={[]}
      />
    </div>
  );
}

export default function DashboardPage() {
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
      <DashboardContent />
    </Suspense>
  );
}
