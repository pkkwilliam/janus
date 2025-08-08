// API Configuration for different environments
export const API_CONFIG = {
  development: {
    baseURL: "http://localhost:8080",
  },
  production: {
    baseURL: "https://api.fortune-cookie.me",
  },
};

// Get current environment
export const getEnvironment = (): "development" | "production" => {
  if (typeof window !== "undefined") {
    // Client-side environment detection
    const hostname = window.location.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.")
    ) {
      return "development";
    }
  }

  // Server-side environment detection
  const nodeEnv = process.env.NODE_ENV;
  const nextPublicEnv = process.env.NEXT_PUBLIC_ENVIRONMENT;

  if (nextPublicEnv === "production" || nodeEnv === "production") {
    return "production";
  }

  return "development";
};

// Get API base URL for current environment
export const getApiBaseUrl = (): string => {
  const env = getEnvironment();
  return API_CONFIG[env].baseURL;
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    EMAIL_REQUEST_VERIFICATION: "/login/v1/email_request_verification",
    EMAIL_VERIFY: "/login/v1/email_verify",
    OAUTH_LOGIN: "/oauth/v1/login_user",
    OAUTH_GET_REQUEST_URL: "/oauth/v1/get_request_url",
  },
  USER: {
    PROFILE: "/user/v1/profile",
    GET_PROFILE: "/user_profile/v1",
    UPDATE_PROFILE: "/user_profile/v1/update_user_profile",
    BIRTH_INFO: "/user/v1/birth_info",
    REPORTS_PAGINATION: "/user/report/v1/pagination",
    REPORT_DETAIL: "/user/report/v1/:id",
    REPORT_GENERATE: "/user/report/v1/:type/generate",
    TRANSLATE: "/user/translate/v1",
    GET_PLAN: "/user/plan/v1",
  },
  REPORTS: {
    LIST: "/reports/v1/list",
    DETAIL: "/reports/v1/detail",
    REQUEST: "/reports/v1/request",
  },
  PUBLIC: {
    FEEDBACK: "/public/feedback/v1",
  },
  PAYMENT: {
    CREATE_ORDER: "/user/order/v1",
    ORDER_DETAIL: "/user/order/v1/:orderId",
    ORDER_PAGINATION: "/user/order/v1/pagination",
    ORDER_PAYMENT: "/user/payment/v1/requestSubscriptionPayment/:orderId",
    // Deprecated endpoints - remove after migration
    CREATE_SUBSCRIPTION: "/user/payment/v1",
    SUBSCRIPTION_STATUS: "/user/payment/v1/:transactionId/status",
    REQUEST_SUBSCRIPTION_PAYMENT:
      "/user/payment/v1/requestSubscriptionPayment/:orderId",
  },
} as const;
