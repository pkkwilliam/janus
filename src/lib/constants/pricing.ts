// Pricing constants to eliminate magic numbers and improve maintainability

export const PRODUCT_IDS = {
  YEARLY: "p-1",
  MONTHLY: "p-2",
} as const;

export const PRICING = {
  YEARLY: {
    price: "1.6",
    total: "19.20",
    savings: "47%",
    period: "year",
  },
  MONTHLY: {
    price: "2",
    total: "2",
    savings: "0%",
    period: "month",
  },
} as const;

export const GLASS_MORPHISM_STYLES = {
  light: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  medium: {
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  premium: {
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
    backdropFilter: "blur(20px)",
    borderColor: "#667eea",
    boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
  },
} as const;

export const BUTTON_STYLES = {
  primary: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 12px 30px rgba(102, 126, 234, 0.4)",
  },
  secondary: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
  },
} as const;

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  },
  fadeInUpDelayed: (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
  }),
  scaleOnHover: {
    whileHover: { scale: 1.02, y: -3 },
    whileTap: { scale: 0.98 },
  },
} as const;

export const FREE_FEATURES = [
  "Basic weekly fortune readings",
  "General lucky colors & numbers",
  "Basic spiritual guidance",
  "Profile completion tracking",
  "Mobile-friendly access",
] as const;

export const PREMIUM_FEATURES = [
  "Everything in Free Journey",
  "Detailed lucky element recommendations",
  "Personalized wearing advice",
  "Advanced gemstone guidance",
  "Specific timing recommendations",
  "Priority customer support",
  "Ad-free experience",
  "Export readings to PDF",
] as const;

export const PREMIUM_FEATURE_DETAILS = [
  {
    icon: "Sparkles",
    title: "Lucky Element Guidance",
    description: "Discover specific elements, colors, and materials that enhance your fortune based on your birth chart and current cosmic alignment.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: "Crown",
    title: "Personalized Wearing Advice",
    description: "Get detailed recommendations on what jewelry, clothing colors, and accessories to wear for maximum luck and positive energy.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: "Star",
    title: "Advanced Timing",
    description: "Receive precise timing guidance for important decisions, meetings, and life events based on your personal fortune cycles.",
    color: "from-blue-500 to-cyan-600",
  },
] as const;

export const FAQS = [
  {
    question: "What makes Premium different from Free?",
    answer: "Premium provides detailed lucky element guidance, specific wearing advice, advanced timing recommendations, and personalized insights that go far beyond basic readings.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your Premium subscription at any time. Your premium features will remain active until the end of your current billing period.",
  },
  {
    question: "What happens after I subscribe to Premium?",
    answer: "You'll get instant access to all premium features including detailed lucky elements, personalized guidance, and advanced timing recommendations.",
  },
  {
    question: "How accurate are the lucky element recommendations?",
    answer: "Our recommendations are based on traditional Chinese metaphysics combined with AI analysis of your personal birth chart and current cosmic influences for maximum accuracy.",
  },
] as const;

export type PricingPlan = keyof typeof PRICING;
export type FeatureList = typeof FREE_FEATURES | typeof PREMIUM_FEATURES;
export type FAQ = {
  question: string;
  answer: string;
};
export type PremiumFeature = {
  icon: string;
  title: string;
  description: string;
  color: string;
};