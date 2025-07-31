"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Crown, Loader2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { subscriptionApi } from "@/lib/api/subscription";

type PaymentStatus = "checking" | "success" | "failed" | "error";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const orderId = searchParams.get("orderId");

  const [status, setStatus] = useState<PaymentStatus>("checking");
  const [error, setError] = useState<string | null>(null);
  const [checkCount, setCheckCount] = useState(0);
  const maxChecks = 20; // Prevent infinite polling

  useEffect(() => {
    if (!transactionId && !orderId) {
      setStatus("error");
      setError("Transaction ID or Order ID is missing");
      return;
    }

    checkPaymentStatus();
  }, [transactionId, orderId]);

  const checkPaymentStatus = async () => {
    if (checkCount >= maxChecks) {
      setStatus("error");
      setError("Payment verification timed out. Please contact support.");
      return;
    }

    try {
      if (orderId) {
        // New flow: Check order status
        const response = await subscriptionApi.getOrderDetail(orderId);

        if (response.error) {
          console.error("Order status check error:", response.error);
          setStatus("error");
          setError(response.error.message);
          return;
        }

        const orderStatus = response.data?.status;

        switch (orderStatus) {
          case "PAID":
            setStatus("success");
            break;
          case "CANCELLED":
          case "REFUNDED": 
            setStatus("failed");
            // Redirect to cancel page after a brief delay
            setTimeout(() => {
              router.push(`/cancel?orderId=${orderId}`);
            }, 2000);
            break;
          case "PAYMENT_PENDING":
            setCheckCount((prev) => prev + 1);
            // Schedule next check in 3 seconds
            setTimeout(() => {
              checkPaymentStatus();
            }, 3000);
            break;
          default:
            setStatus("error");
            setError("Unknown order status");
        }
      } else if (transactionId) {
        // Legacy flow: Check subscription status
        const response = await subscriptionApi.getSubscriptionStatus(
          transactionId
        );

        if (response.error) {
          console.error("Status check error:", response.error);
          setStatus("error");
          setError(response.error.message);
          return;
        }

        const result = response.data?.result;
        const interval = response.data?.nextQueryInterval;

        switch (result) {
          case "SUCCESS":
            setStatus("success");
            break;
          case "FAIL":
            setStatus("failed");
            // Redirect to cancel page after a brief delay
            setTimeout(() => {
              router.push(`/cancel?transactionId=${transactionId}`);
            }, 2000);
            break;
          case "REPEAT_QUERY":
            setCheckCount((prev) => prev + 1);
            // Schedule next check
            const intervalSeconds = parseInt(interval || "3");
            setTimeout(() => {
              checkPaymentStatus();
            }, intervalSeconds * 1000);
            break;
          default:
            setStatus("error");
            setError("Unknown payment status");
        }
      } else {
        setStatus("error");
        setError("No transaction ID or order ID provided");
      }
    } catch (err) {
      console.error("Payment status check failed:", err);
      setStatus("error");
      setError("Failed to verify payment status");
    }
  };

  if (!transactionId && !orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            Invalid Request
          </h1>
          <p className="text-gray-600 mb-6">
            Transaction ID or Order ID is missing from the URL.
          </p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-colors"
            >
              Return to Dashboard
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {status === "checking" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div
              className="p-8 rounded-3xl border border-white/30 mb-6"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 w-fit mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Verifying Your Payment
              </h1>
              <p className="text-gray-600 mb-6">
                Please wait while we confirm your subscription with Stripe...
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Check #{checkCount + 1} of {maxChecks}
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              This usually takes a few seconds. Please don't close this page.
            </p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div
              className="p-8 rounded-3xl border border-white/30 mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "#22c55e",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 w-fit mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Welcome to Premium!
              </h1>
              <p className="text-gray-600 mb-6">
                Your subscription has been successfully activated. You now have
                access to all premium features!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="p-3 bg-white/50 rounded-xl">
                  <Crown className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <div className="font-medium text-gray-900">
                    Premium Access
                  </div>
                </div>
                <div className="p-3 bg-white/50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="font-medium text-gray-900">
                    Instant Activation
                  </div>
                </div>
              </div>

              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-medium transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <Crown className="w-5 h-5" />
                  Access Premium Dashboard
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 text-center">
              {orderId ? `Order ID: ${orderId}` : `Transaction ID: ${transactionId}`}
            </p>
          </motion.div>
        )}

        {status === "failed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div
              className="p-8 rounded-3xl border border-white/30 mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "#ef4444",
              }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 w-fit mx-auto mb-6">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Payment Failed
              </h1>
              <p className="text-gray-600 mb-6">
                Your payment could not be processed. Redirecting to cancellation
                page...
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirecting...
              </div>
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div
              className="p-8 rounded-3xl border border-white/30 mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "#ef4444",
              }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 w-fit mx-auto mb-6">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Verification Error
              </h1>
              <p className="text-gray-600 mb-6">
                {error ||
                  "Unable to verify your payment status. Please try again or contact support."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setStatus("checking");
                    setError(null);
                    setCheckCount(0);
                    checkPaymentStatus();
                  }}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
                <Link href="/dashboard" className="flex-1">
                  <button className="w-full px-6 py-3 bg-gray-600 text-white rounded-2xl font-medium hover:bg-gray-700 transition-colors">
                    Return to Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {(transactionId || orderId) && (
              <p className="text-sm text-gray-500 text-center">
                {orderId ? `Order ID: ${orderId}` : `Transaction ID: ${transactionId}`}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
