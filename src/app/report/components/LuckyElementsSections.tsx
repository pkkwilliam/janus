"use client";

import { motion } from "framer-motion";
import { Palette, Hash, Gem, Lightbulb } from "lucide-react";
import LuckyElementCard from "./LuckyElementCard";

interface SubSectionProps {
  getCurrentContent: () => any;
}

export function LuckyColorSection({ getCurrentContent }: SubSectionProps) {
  return (
    <LuckyElementCard
      icon={<Palette className="w-5 h-5" />}
      title="Lucky Colors"
      subtitle="Exclusively Yours"
      iconBgGradient="bg-gradient-to-r from-pink-100 to-purple-100"
      iconTextColor="text-purple-600"
      subtitleColor="text-purple-600"
      delay={0.3}
      renderContent={() => (
        <div className="space-y-2">
          {(getCurrentContent()?.luckyColors || []).length > 0 ? (
            (getCurrentContent()?.luckyColors || []).map((color: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <span className="text-sm text-gray-700">{color}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic">
              No specific lucky colors for this period
            </div>
          )}
        </div>
      )}
    />
  );
}

export function LuckyNumberSection({ getCurrentContent }: SubSectionProps) {
  return (
    <LuckyElementCard
      icon={<Hash className="w-5 h-5" />}
      title="Lucky Numbers"
      subtitle="Power Numbers"
      iconBgGradient="bg-gradient-to-r from-blue-100 to-indigo-100"
      iconTextColor="text-indigo-600"
      subtitleColor="text-indigo-600"
      delay={0.4}
      renderContent={() => (
        <div className="flex gap-2 flex-wrap">
          {(getCurrentContent()?.luckyNumbers || []).length > 0 ? (
            (getCurrentContent()?.luckyNumbers || []).map((number: string | number, index: number) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium"
              >
                {number}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic">
              No specific lucky numbers for this period
            </div>
          )}
        </div>
      )}
    />
  );
}

export function LuckyGemstonesSection({ getCurrentContent }: SubSectionProps) {
  return (
    <LuckyElementCard
      icon={<Gem className="w-5 h-5" />}
      title="Lucky Gemstones"
      subtitle="Sacred Crystals"
      iconBgGradient="bg-gradient-to-r from-emerald-100 to-teal-100"
      iconTextColor="text-emerald-600"
      subtitleColor="text-emerald-600"
      delay={0.5}
      renderContent={() => (
        <div className="space-y-2">
          {(getCurrentContent()?.luckyGemstones || []).length > 0 ? (
            (getCurrentContent()?.luckyGemstones || []).map((gemstone: string, index: number) => (
              <div key={index} className="text-sm text-gray-700">
                {gemstone}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic">
              No specific lucky gemstones for this period
            </div>
          )}
        </div>
      )}
    />
  );
}

export function LuckyEnhancerSection({ getCurrentContent }: SubSectionProps) {
  const enhancers = getCurrentContent()?.luckyEnhancer || [];

  if (enhancers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.01, y: -3 }}
      className="md:col-span-3 group"
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
            transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Lucky Enhancement Suggestions
            </h3>
            <p className="text-xs text-amber-600 font-medium">
              Premium Insights
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {enhancers.map((enhancer: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <div className="text-sm text-gray-700 leading-relaxed">
                {enhancer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
