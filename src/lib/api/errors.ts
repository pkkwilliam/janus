// Error code dictionary for user-friendly messages
// This allows us to provide consistent, user-friendly error messages
// and makes internationalization easier in the future

export const ERROR_MESSAGES: Record<string, string> = {
  // Authentication Errors (bedrock.401.xxxx)
  'bedrock.401.0008': 'The verification code you entered is incorrect. Please check and try again.',
  'bedrock.401.0001': 'Your session has expired. Please log in again.',
  'bedrock.401.0002': 'Invalid email address format. Please check and try again.',
  'bedrock.401.0003': 'This email address is not registered. Please sign up first.',
  'bedrock.401.0004': 'Your account has been temporarily locked. Please try again later.',
  'bedrock.401.0005': 'Too many failed attempts. Please wait before trying again.',
  'bedrock.401.0006': 'Verification code has expired. Please request a new one.',
  'bedrock.401.0007': 'Email verification is required to continue.',
  
  // Server Errors (bedrock.500.xxxx)
  'bedrock.500.0001': 'Server is temporarily unavailable. Please try again later.',
  'bedrock.500.0002': 'Unable to send verification email. Please try again.',
  'bedrock.500.0003': 'Database connection error. Please try again later.',
  
  // Rate Limiting (bedrock.429.xxxx)
  'bedrock.429.0001': 'Too many requests. Please wait a moment before trying again.',
  'bedrock.429.0002': 'Rate limit exceeded for email verification. Please wait before requesting another code.',
  
  // User/Profile Errors (bedrock.400.xxxx)
  'bedrock.400.0001': 'Invalid birth date format. Please use YYYY-MM-DD format.',
  'bedrock.400.0002': 'Birth city is required for accurate readings.',
  'bedrock.400.0003': 'Birth time must be in HH:MM format.',
  'bedrock.400.0004': 'Invalid profile data. Please check your information.',
  'bedrock.400.0005': 'First name is required and must be between 1-50 characters.',
  'bedrock.400.0006': 'Last name is required and must be between 1-50 characters.',
  'bedrock.400.0007': 'Please select a valid gender option.',
  'bedrock.400.0008': 'Birth country is required for accurate readings.',
  'bedrock.400.0009': 'Profile update failed. Please try again later.',
  'bedrock.400.0010': 'Some required fields are missing. Please complete all fields.',
  
  // Reports/Readings Errors (bedrock.403.xxxx)
  'bedrock.403.0001': 'Complete your profile to request readings.',
  'bedrock.403.0002': 'You have reached your daily reading limit.',
  'bedrock.403.0003': 'This report is not available for your account type.',
  
  // Network/Connection Errors
  'NETWORK_ERROR': 'Network connection failed. Please check your internet connection and try again.',
  'TIMEOUT_ERROR': 'Request timed out. Please try again.',
  'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again or contact support.',
} as const;

// Get user-friendly error message from error code
export function getErrorMessage(errorCode?: string, fallbackMessage?: string): string {
  if (errorCode && ERROR_MESSAGES[errorCode]) {
    return ERROR_MESSAGES[errorCode];
  }
  
  // Return backend message if no mapping found, or default message
  return fallbackMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
}

// Check if an error code exists in our dictionary
export function hasErrorMapping(errorCode: string): boolean {
  return errorCode in ERROR_MESSAGES;
}

// Get all error codes for a specific category
export function getErrorCodesByCategory(prefix: string): Record<string, string> {
  return Object.entries(ERROR_MESSAGES)
    .filter(([code]) => code.startsWith(prefix))
    .reduce((acc, [code, message]) => {
      acc[code] = message;
      return acc;
    }, {} as Record<string, string>);
}

// Error severity levels for UI styling
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning', 
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Get error severity based on HTTP status or error code
export function getErrorSeverity(httpStatus?: number, errorCode?: string): ErrorSeverity {
  if (httpStatus) {
    if (httpStatus >= 500) return ErrorSeverity.CRITICAL;
    if (httpStatus === 429) return ErrorSeverity.WARNING;
    if (httpStatus >= 400) return ErrorSeverity.ERROR;
  }
  
  if (errorCode) {
    if (errorCode.includes('500')) return ErrorSeverity.CRITICAL;
    if (errorCode.includes('429')) return ErrorSeverity.WARNING;
    if (errorCode.includes('401') || errorCode.includes('403')) return ErrorSeverity.ERROR;
  }
  
  return ErrorSeverity.ERROR;
}