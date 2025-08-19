// Report page style constants to eliminate code duplication and magic numbers

export const GLASSMORPHISM_STYLES = {
  light: {
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  medium: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  premium: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%)",
    backdropFilter: "blur(30px)",
    border: "1px solid transparent",
    backgroundClip: "padding-box",
    boxShadow: "0 12px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.1)",
  },
  tooltip: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    width: "min(20rem, calc(100vw - 2rem))",
    maxWidth: "24rem",
  },
} as const;

export const PREMIUM_GRADIENTS = {
  border: "linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(138, 43, 226, 0.4))",
  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 25%, rgba(138, 43, 226, 0.15) 75%, rgba(75, 0, 130, 0.2) 100%)",
  fullBorder: "linear-gradient(135deg, #FFD700, #FFA500, #8A2BE2, #4B0082)",
} as const;

export const ANIMATION_DELAYS = {
  HEADER: 0,
  READING: 0.1,
  THEMES: 0.2,
  LUCKY_COLORS: 0.3,
  LUCKY_NUMBERS: 0.4,
  LUCKY_GEMS: 0.5,
  LUCKY_ENHANCER: 0.6,
  SPIRITUAL_GUIDANCE: 0.7,
} as const;

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInUpDelayed: (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay },
  }),
  modalEntry: {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.9 },
  },
  dropdownEntry: {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
  },
  shimmerEffect: {
    animate: {
      background: [
        "radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)",
        "radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
      ],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

export const FLOATING_ELEMENTS = {
  sparkles: {
    count: 6, // Reduced from 12 for performance
    animation: {
      y: [0, -12, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.6, 1.4, 0.6],
      rotate: [0, 180, 360],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  gems: {
    count: 2, // Reduced from 4 for performance
    animation: {
      y: [0, -15, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [0.8, 1.2, 0.8],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

export const TYPE_GRADIENTS = {
  YEARLY: "bg-gradient-to-r from-purple-500 to-indigo-600",
  MONTHLY: "bg-gradient-to-r from-blue-500 to-cyan-600",
  WEEKLY: "bg-gradient-to-r from-green-500 to-emerald-600",
} as const;

export const LUCKY_ELEMENT_COLORS = {
  colors: {
    iconBg: "bg-gradient-to-r from-pink-100 to-purple-100",
    iconText: "text-purple-600",
    subtitle: "text-purple-600",
  },
  numbers: {
    iconBg: "bg-gradient-to-r from-blue-100 to-indigo-100",
    iconText: "text-indigo-600",
    subtitle: "text-indigo-600",
  },
  gemstones: {
    iconBg: "bg-gradient-to-r from-emerald-100 to-teal-100",
    iconText: "text-emerald-600",
    subtitle: "text-emerald-600",
  },
  enhancer: {
    iconBg: "bg-gradient-to-r from-amber-100 to-yellow-100",
    iconText: "text-amber-600",
    subtitle: "text-amber-600",
  },
} as const;

export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  DROPDOWN: 40,
  MODAL: 50,
} as const;