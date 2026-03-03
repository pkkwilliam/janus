"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface SpiritualGuidanceSectionProps {
  getCurrentContent: () => any;
}

export default function SpiritualGuidanceSection({
  getCurrentContent,
}: SpiritualGuidanceSectionProps) {
  const guidance = getCurrentContent()?.spiritualGuidance;

  if (!guidance) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mb-8"
    >
      <div
        className="p-6 rounded-3xl border border-white/30 bg-gradient-to-r from-purple-50/50 to-indigo-50/50"
        style={{
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">
            Spiritual Guidance
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed italic">
          &ldquo;{guidance}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
