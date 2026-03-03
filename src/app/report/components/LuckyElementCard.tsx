"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LuckyElementCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  iconBgGradient: string;
  iconTextColor: string;
  subtitleColor: string;
  delay: number;
  renderContent: () => ReactNode;
}

export default function LuckyElementCard({
  icon,
  title,
  subtitle,
  iconBgGradient,
  iconTextColor,
  subtitleColor,
  delay,
  renderContent,
}: LuckyElementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <div
        className="relative p-6 rounded-3xl h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
          backdropFilter: "blur(30px)",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
          boxShadow:
            "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
        }}
      >
        {/* Gradient border using pseudo-element */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>

        {/* Premium indicator with pulse */}
        <div className="absolute top-3 right-3">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
          />
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className={`p-2 rounded-xl ${iconBgGradient}`}>
            <div className={iconTextColor}>{icon}</div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className={`text-xs font-medium ${subtitleColor}`}>{subtitle}</p>
          </div>
        </div>
        <div className="relative z-10">{renderContent()}</div>
      </div>
    </motion.div>
  );
}
