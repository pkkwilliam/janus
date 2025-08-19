"use client";

import { motion } from "framer-motion";
import { Sparkles, Crown, Star } from "lucide-react";
import { PREMIUM_FEATURE_DETAILS, GLASS_MORPHISM_STYLES, ANIMATION_VARIANTS, PremiumFeature } from "@/lib/constants/pricing";

const iconMap = {
  Sparkles,
  Crown,
  Star,
};

interface FeatureCardProps {
  feature: PremiumFeature;
  index: number;
}

function PremiumFeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = iconMap[feature.icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="p-6 rounded-3xl"
      style={GLASS_MORPHISM_STYLES.light}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${
            feature.color.split(" ")[1]
          }, ${feature.color.split(" ")[3]})`,
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

interface FeatureShowcaseProps {
  className?: string;
}

export function FeatureShowcase({ className = "" }: FeatureShowcaseProps) {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          {...ANIMATION_VARIANTS.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Premium Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the advanced insights and guidance available with your
            Premium Journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PREMIUM_FEATURE_DETAILS.map((feature, index) => (
            <PremiumFeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}