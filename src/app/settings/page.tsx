"use client";

import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BirthInfoForm } from "@/components/profile/BirthInfoForm";
import { useAppInit } from "@/hooks/useAppInit";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading, refresh } = useAppInit({ requireAuth: true });

  const handleProfileComplete = (profileData: any) => {
    // Profile update is already handled in the form component and auto-cached
    // Refresh user data to get the updated profile
    refresh();
    
    // Navigate back to dashboard after successful update
    router.push("/dashboard");
  };

  // Show loading state while user data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <button className="p-2 rounded-xl hover:bg-white/50 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
              <div className="flex items-center gap-4">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-light text-gray-900 mb-1">
                    Profile Settings
                  </h1>
                  <p className="text-gray-600">
                    Update your personal information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <BirthInfoForm
          onComplete={handleProfileComplete}
          onSkip={() => router.push("/dashboard")}
          showSkip={true}
          initialData={{
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            gender: user.gender || undefined,
            birthDate: user.birthDate ? user.birthDate.replace(/\//g, "-") : "", // Convert from YYYY/MM/DD to YYYY-MM-DD for HTML input
            birthTime: user.birthTime || "",
            birthCity: user.birthCity || "",
            birthCountry: user.birthCountry || "", // Fallback for missing country
          }}
          isSettingsMode={true}
        />
      </motion.div>
    </div>
  );
}
