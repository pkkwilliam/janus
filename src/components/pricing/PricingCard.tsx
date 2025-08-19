"use client";

import { motion } from "framer-motion";
import { Check, Crown, ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { GLASS_MORPHISM_STYLES, BUTTON_STYLES, ANIMATION_VARIANTS } from "@/lib/constants/pricing";

interface PricingCardProps {
  title: string;
  subtitle: string | React.ReactNode;
  price: string;
  period: string;
  features: readonly string[];
  isPopular?: boolean;
  isPremium?: boolean;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  isProcessing?: boolean;
  order?: number;
  className?: string;
  renderPricingToggle?: () => React.ReactNode;
}

export function PricingCard({
  title,
  subtitle,
  price,
  period,
  features,
  isPopular = false,
  isPremium = false,
  ctaText,
  ctaHref,
  onCtaClick,
  isProcessing = false,
  order = 1,
  className = "",
  renderPricingToggle,
}: PricingCardProps) {
  const cardVariants = ANIMATION_VARIANTS.fadeInUpDelayed(0.3 + order * 0.2);
  
  const cardStyles = isPremium 
    ? {
        ...GLASS_MORPHISM_STYLES.premium,
        border: "2px solid transparent",
      }
    : GLASS_MORPHISM_STYLES.light;

  const buttonStyles = isPremium ? BUTTON_STYLES.primary : BUTTON_STYLES.secondary;

  const IconComponent = isPremium ? Crown : Star;

  const CardContent = () => (
    <motion.div
      {...cardVariants}
      className={`relative ${isPremium ? 'transform md:scale-105 z-10' : 'md:order-2 opacity-75 hover:opacity-90 transition-opacity'} ${className}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="px-8 py-3 rounded-full text-sm font-bold text-white flex items-center gap-2"
            style={BUTTON_STYLES.primary}
          >
            <Crown className="w-4 h-4" />
            MOST POPULAR
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      )}

      <div
        className={`p-${isPremium ? '8' : '6'} rounded-${isPremium ? '3xl' : '3xl'} h-full relative overflow-hidden`}
        style={cardStyles}
      >
        {/* Floating decorations for premium */}
        {isPremium && (
          <>
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-amber-400" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="w-5 h-5 text-purple-400 opacity-50" />
            </div>
          </>
        )}

        {/* Header */}
        <div className={`text-center mb-${isPremium ? '8' : '6'}`}>
          <div 
            className={`w-${isPremium ? '20' : '14'} h-${isPremium ? '20' : '14'} rounded-2xl bg-gradient-to-r ${isPremium ? 'from-indigo-500 to-purple-600 shadow-xl' : 'from-gray-400 to-gray-500'} flex items-center justify-center mx-auto mb-4`}
          >
            <IconComponent className={`w-${isPremium ? '10' : '7'} h-${isPremium ? '10' : '7'} text-white`} />
          </div>
          
          <h3 className={`text-${isPremium ? '3xl font-bold' : 'xl font-medium'} text-gray-900 mb-2`}>
            {title}
          </h3>

          {/* Render pricing toggle if provided */}
          {renderPricingToggle && renderPricingToggle()}
          
          {/* Render subtitle (could be PricingDisplay component or simple text) */}
          {typeof subtitle === 'string' ? (
            <>
              <div className={`text-${isPremium ? '5xl font-bold' : '3xl font-light'} text-gray-${isPremium ? '900' : '700'} mb-1`}>
                ${price}
              </div>
              <div className={`text-gray-${isPremium ? '600' : '500'} ${isPremium ? 'text-xl' : 'text-sm'}`}>
                {subtitle}
              </div>
            </>
          ) : (
            <div className="mb-4">
              {subtitle}
            </div>
          )}
        </div>

        {/* Features */}
        <ul className={`space-y-${isPremium ? '4' : '3'} mb-${isPremium ? '8' : '6'}`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {isPremium ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : (
                <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              )}
              <span className={`text-gray-${isPremium ? '700' : '600'} ${isPremium ? 'font-medium' : 'text-sm'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {onCtaClick ? (
          <motion.button
            {...ANIMATION_VARIANTS.scaleOnHover}
            onClick={onCtaClick}
            disabled={isProcessing}
            className={`w-full flex items-center justify-center gap-2 py-${isPremium ? '5' : '3'} rounded-${isPremium ? '2xl' : 'xl'} font-${isPremium ? 'bold' : 'medium'} transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isPremium ? 'text-lg shadow-2xl text-white' : 'text-gray-600 hover:text-gray-700'}`}
            style={buttonStyles}
            aria-label={`${ctaText} - ${title}`}
          >
            {isPremium && <Crown className="w-6 h-6" />}
            {isProcessing ? "Processing..." : ctaText}
            {!isProcessing && isPremium && <ArrowRight className="w-6 h-6" />}
          </motion.button>
        ) : (
          <Link href={ctaHref || "#"} className="block">
            <motion.button
              {...ANIMATION_VARIANTS.scaleOnHover}
              className={`w-full py-${isPremium ? '5' : '3'} rounded-${isPremium ? '2xl' : 'xl'} font-${isPremium ? 'bold' : 'medium'} transition-all ${isPremium ? 'text-lg shadow-2xl text-white' : 'text-gray-600 hover:text-gray-700 border border-gray-300 hover:border-gray-400'}`}
              style={buttonStyles}
              aria-label={`${ctaText} - ${title}`}
            >
              {ctaText}
            </motion.button>
          </Link>
        )}

        {/* Additional info */}
        {!isPremium && (
          <p className="text-xs text-center text-gray-400 mt-2">
            Limited to basic features only
          </p>
        )}
      </div>
    </motion.div>
  );

  return <CardContent />;
}