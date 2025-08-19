"use client";

import { motion } from "framer-motion";
import { PRICING } from "@/lib/constants/pricing";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
  className?: string;
}

export function PricingToggle({ isYearly, onToggle, className = "" }: PricingToggleProps) {
  const yearlyData = PRICING.YEARLY;
  const monthlyData = PRICING.MONTHLY;

  return (
    <div className={`flex items-center justify-center mb-4 ${className}`}>
      <div 
        className="bg-gray-100 rounded-xl p-1 flex"
        role="tablist"
        aria-label="Billing period selection"
      >
        <motion.button
          onClick={() => onToggle(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isYearly
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          role="tab"
          aria-selected={isYearly}
          aria-controls="yearly-pricing"
          tabIndex={isYearly ? 0 : -1}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Yearly
        </motion.button>
        <motion.button
          onClick={() => onToggle(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !isYearly
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          role="tab"
          aria-selected={!isYearly}
          aria-controls="monthly-pricing"
          tabIndex={!isYearly ? 0 : -1}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Monthly
        </motion.button>
      </div>
    </div>
  );
}

interface PricingDisplayProps {
  isYearly: boolean;
  className?: string;
}

export function PricingDisplay({ isYearly, className = "" }: PricingDisplayProps) {
  const currentPricing = isYearly ? PRICING.YEARLY : PRICING.MONTHLY;
  
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="text-5xl font-bold text-gray-900">
          ${currentPricing.price}
        </div>
        <div className="text-gray-600 text-xl">/{currentPricing.period}</div>
      </div>
      <div className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full inline-block">
        {isYearly
          ? `🎉 Save ${currentPricing.savings} vs monthly • $${currentPricing.total}/year`
          : `$${currentPricing.total}/month • No commitment`}
      </div>
    </div>
  );
}