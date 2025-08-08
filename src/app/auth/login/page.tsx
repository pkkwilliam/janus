"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Phone, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { authAPI } from "@/lib/api/auth";

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [canResendCode, setCanResendCode] = useState(true);

  const router = useRouter();

  const isEmail = emailOrPhone.includes("@");
  const isPhoneNumber = /^\+?[\d\s\-()]+$/.test(emailOrPhone);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      setCanResendCode(false);
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && !canResendCode) {
      setCanResendCode(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, canResendCode]);

  // Start countdown when code is sent
  const startCountdown = () => {
    setCountdown(60);
    setCanResendCode(false);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmail && !isPhoneNumber) {
      setError("Please enter a valid email or phone number");
      return;
    }

    // For now, only support email verification as per API
    if (!isEmail) {
      setError("Currently only email verification is supported");
      return;
    }

    setIsLoading(true);
    setError("");

    // Use the new centralized API - no try-catch needed!
    const response = await authAPI.requestEmailVerification(emailOrPhone);
    
    if (response.error) {
      // Error handling is centralized - just display the user-friendly message
      setError(response.error.message);
      setIsLoading(false);
      return;
    }

    // Success case
    if (response.data?.responseStatus === 'SENT') {
      setIsCodeSent(true);
      startCountdown(); // Start 60-second countdown
      console.log('✅ Verification code sent successfully');
    } else {
      setError('Failed to send verification code. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleGoogleOAuth = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Get OAuth URL from backend
      const response = await authAPI.getOAuthRequestUrl("GOOGLE");
      
      if (response.error) {
        setError(response.error.message || 'Failed to initialize Google OAuth');
        setIsLoading(false);
        return;
      }

      if (response.data?.oauthUrl) {
        // Redirect to Google OAuth
        window.location.href = response.data.oauthUrl;
      } else {
        setError('Failed to get OAuth URL. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      setError('Failed to initialize Google OAuth. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    // Use the new centralized API - no try-catch needed!
    const response = await authAPI.verifyEmail(emailOrPhone, code);
    
    if (response.error) {
      // Error handling is centralized - just display the user-friendly message
      setError(response.error.message);
      setIsLoading(false);
      return;
    }

    // Success case
    if (response.data) {
      console.log('✅ Email verification successful');
      
      // Use unified login success handler
      authAPI.handleLoginSuccess(response.data);
      
      router.push("/dashboard");
    } else {
      setError("Verification failed. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-radial from-purple-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-pink-100/20 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        <div
          className="p-8 rounded-3xl border border-white/30 shadow-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
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
            </motion.div>

            <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 font-light">
              Enter your details to continue your journey
            </p>
          </div>

          {/* OAuth Options */}
          <div className="space-y-4 mb-6">
            {/* Google OAuth - Enabled */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleGoogleOAuth}
              disabled={isLoading}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-gray-200/30 text-gray-700 font-medium hover:bg-gray-50/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </motion.button>


            {/* Divider */}
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/50"></div>
              </div>
              <div 
                className="relative px-4 text-sm text-gray-500 font-light"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                }}
              >
                or continue with email
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}
            className="space-y-6"
          >
            {!isCodeSent ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all font-light"
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                    }}
                    required
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600 font-light">
                    We sent a 6-digit code to
                    <br />
                    <span className="text-indigo-600 font-medium">
                      {emailOrPhone}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Check your email and enter the code below
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="Enter 6-digit code"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all text-center tracking-widest text-lg font-light"
                      style={{
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                      }}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm text-center p-3 rounded-2xl"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading || (!isCodeSent && !canResendCode)}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 md:py-4 rounded-2xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
              }}
            >
              {isLoading
                ? "Loading..."
                : isCodeSent
                ? "Verify & Login"
                : canResendCode
                ? "Send Code"
                : `Resend in ${countdown}s`}
            </motion.button>

            {isCodeSent && (
              <div className="space-y-3">
                {/* Resend Code Button */}
                <motion.button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!canResendCode || isLoading}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full py-2 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    color: canResendCode ? '#667eea' : '#9CA3AF',
                  }}
                >
                  {canResendCode ? 'Resend Code' : `Resend in ${countdown}s`}
                </motion.button>

                {/* Change Email Button */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsCodeSent(false);
                    setCode("");
                    setError("");
                    setCountdown(0);
                    setCanResendCode(true);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full text-sm text-gray-500 hover:text-indigo-600 transition-colors font-light"
                >
                  Change email address
                </motion.button>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 font-light">
            <p>
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
