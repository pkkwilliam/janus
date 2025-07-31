"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, ArrowRight, Loader2 } from "lucide-react";
import { subscriptionApi } from "@/lib/api/subscription";

interface SubscriptionSelectorProps {
  onSubscriptionStart?: () => void;
  className?: string;
}

export function SubscriptionSelector({
  onSubscriptionStart,
  className,
}: SubscriptionSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState<"MONTH" | "YEAR">("MONTH");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    onSubscriptionStart?.();

    try {
      // Create order - payment URL is now returned directly
      const productId = selectedPlan === "YEAR" ? "p-1" : "p-2";
      const orderResponse = await subscriptionApi.createOrder({
        buyerSubscription: {
          productId,
        },
      });

      if (orderResponse.error) {
        setError(orderResponse.error.message);
        return;
      }

      if (!orderResponse.data) {
        setError("Failed to create order");
        return;
      }

      if (orderResponse.data.requestUrl) {
        // New flow: payment URL returned directly from order creation
        window.location.href = orderResponse.data.requestUrl;
      } else {
        // Fallback: use the old two-step flow if requestUrl not provided
        const paymentResponse = await subscriptionApi.requestSubscriptionPayment(
          orderResponse.data.id
        );

        if (paymentResponse.error) {
          setError(paymentResponse.error.message);
          return;
        }

        if (paymentResponse.data?.requestUrl) {
          window.location.href = paymentResponse.data.requestUrl;
        } else {
          setError("Failed to create payment session");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Subscription error:", err);
    } finally {
      setLoading(false);
    }
  };

  const monthlyPrice = 2;
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
  const yearlySavings = monthlyPrice * 12 - yearlyPrice;

  return (
    <div className={className}>
      {/* Plan Selection */}
      <div className="space-y-4 mb-8">
        {/* Monthly Plan */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
            selectedPlan === "MONTH"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          onClick={() => setSelectedPlan("MONTH")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedPlan === "MONTH"
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPlan === "MONTH" && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Monthly Plan
                </h3>
                <p className="text-gray-600">
                  Perfect for trying premium features
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${monthlyPrice}
              </div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
          </div>
        </motion.div>

        {/* Yearly Plan */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
            selectedPlan === "YEAR"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          onClick={() => setSelectedPlan("YEAR")}
        >
          {/* Popular Badge */}
          <div className="absolute -top-3 left-6">
            <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full">
              Best Value - Save ${yearlySavings}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedPlan === "YEAR"
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPlan === "YEAR" && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Yearly Plan
                </h3>
                <p className="text-gray-600">
                  80% off - Best value for committed users
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-500 line-through">
                  ${monthlyPrice * 12}
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${yearlyPrice}
                </span>
              </div>
              <div className="text-sm text-gray-600">per year</div>
              <div className="text-sm text-green-600 font-medium">
                Save ${yearlySavings} (80% off)
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Included */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          What&rsquo;s included:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Subscribe Button */}
      <motion.button
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: loading
            ? "#9ca3af"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: loading ? "none" : "0 8px 24px rgba(102, 126, 234, 0.3)",
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Crown className="w-5 h-5" />
            Subscribe to Premium - $
            {selectedPlan === "MONTH" ? monthlyPrice : yearlyPrice}
            {selectedPlan === "YEAR" ? "/year" : "/month"}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>

      {/* Terms */}
      <p className="text-center text-sm text-gray-500 mt-4">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
        Cancel anytime.
      </p>
    </div>
  );
}

const features = [
  "Detailed lucky element recommendations",
  "Personalized wearing advice",
  "Advanced gemstone guidance",
  "Specific timing recommendations",
  "Priority customer support",
  "Ad-free experience",
  "Export readings to PDF",
  "Unlimited fortune readings",
];
