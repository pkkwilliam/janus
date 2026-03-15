// Feature flags for dashboard UI/UX experiments
// Toggle these to test different versions

export const DASHBOARD_FLAGS = {
  // GenericReportButton animations
  GENERIC_REPORT_BUTTON: {
    // "pulse" | "bounce" | "glow" | "shake" | "none"
    ATTRACT_ANIMATION: "pulse",
    // Whether to show a subtle continuous animation to draw attention
    SHOW_CONTINUOUS_ANIMATION: true,
    // Animation intensity: "subtle" | "medium" | "strong"
    ANIMATION_INTENSITY: "medium",
  },

  // CompleteProfileBanner animations
  COMPLETE_PROFILE_BANNER: {
    // "pulse" | "slide" | "glow" | "shake" | "none"
    ATTRACT_ANIMATION: "glow",
    // Whether to show a subtle continuous animation
    SHOW_CONTINUOUS_ANIMATION: true,
    // Animation intensity: "subtle" | "medium" | "strong"
    ANIMATION_INTENSITY: "medium",
    // Show a subtle border animation
    SHOW_BORDER_ANIMATION: true,
  },

  // StateBanner configuration
  STATE_BANNER: {
    // 2 | 3 - how many items to show before scroll
    MAX_VISIBLE_ITEMS: 2,
    // Whether to use horizontal layout (icon left, text right)
    USE_HORIZONTAL_LAYOUT: true,
  },

  // QuickAction configuration
  QUICK_ACTIONS: {
    // Whether to use compact horizontal cards
    USE_HORIZONTAL_LAYOUT: true,
    // Show subtle hover animation
    SHOW_HOVER_ANIMATION: true,
  },

  // Global animation settings
  ANIMATIONS: {
    // Reduce motion for accessibility
    REDUCE_MOTION: false,
    // Global animation speed multiplier
    SPEED_MULTIPLIER: 1,
  },
};

// Helper to get animation variants based on intensity
export const getAnimationIntensity = (intensity: string) => {
  switch (intensity) {
    case "subtle":
      return { scale: 1.01, duration: 2 };
    case "strong":
      return { scale: 1.05, duration: 0.8 };
    case "medium":
    default:
      return { scale: 1.03, duration: 1.2 };
  }
};
