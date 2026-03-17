"use client";

import { motion } from "framer-motion";

interface ScrollHintProps {
  delay?: number;
}

export function ScrollHint({ delay = 1 }: ScrollHintProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1"
    >
      <motion.span
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ←
      </motion.span>
      Swipe to explore
      <motion.span
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        →
      </motion.span>
    </motion.p>
  );
}
