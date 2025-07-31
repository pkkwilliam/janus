"use client";

import { motion } from "framer-motion";
import { ArrowLeft, User, Star, Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppInit } from "@/hooks/useAppInit";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAppInit({ requireAuth: false });

  // Show loading state while checking authentication
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

  // If user is logged in, redirect to dashboard
  if (user) {
    router.push("/dashboard");
    return null;
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
              <Link href="/">
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
                    Your Profile
                  </h1>
                  <p className="text-gray-600">
                    Sign in to view and manage your profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Not Logged In Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-8"
      >
        <div
          className="p-8 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="p-6 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Star className="w-16 h-16 text-indigo-600" />
            </div>
          </div>

          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Create Your Mystical Profile
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Sign in to create your personalized profile and unlock the power of
            customized fortune readings, birth chart analysis, and spiritual insights
            tailored just for you.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-3">
              <div
                className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 w-fit mx-auto"
              >
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">Birth Information</h3>
              <p className="text-sm text-gray-600">
                Add your birth date, time, and location for accurate readings
              </p>
            </div>

            <div className="space-y-3">
              <div
                className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 w-fit mx-auto"
              >
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">Personal Details</h3>
              <p className="text-sm text-gray-600">
                Customize your experience with personal preferences
              </p>
            </div>

            <div className="space-y-3">
              <div
                className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 w-fit mx-auto"
              >
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">Fortune History</h3>
              <p className="text-sm text-gray-600">
                Track your readings and spiritual journey over time
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl text-white font-medium transition-all"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                }}
              >
                Sign In to Create Profile
              </motion.button>
            </Link>
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl font-medium text-gray-700 transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                Back to Home
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div
          className="p-6 rounded-3xl border border-white/30"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What you'll get with a profile:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Personalized Reports</p>
                <p className="text-sm text-gray-600">
                  Get fortune readings based on your unique birth information
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Progress Tracking</p>
                <p className="text-sm text-gray-600">
                  Monitor your spiritual journey and fortune trends
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Location-Based Insights</p>
                <p className="text-sm text-gray-600">
                  Readings adjusted for your geographical influences
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Reading History</p>
                <p className="text-sm text-gray-600">
                  Access all your past readings and insights anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}