import type { Metadata } from "next";
import DashboardPage from './report_v1';

export const metadata: Metadata = {
  title: "Your Fortune Dashboard - Daily Readings & Reports | Fortune Cookie",
  description: "Access your personalized fortune dashboard. View your daily readings, lucky numbers, fortune scores, and spiritual guidance. Track your cosmic journey.",
  robots: {
    index: false,
    follow: false,
  },
};

export default DashboardPage;