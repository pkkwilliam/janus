/**
 * Secure logging utility that prevents sensitive data exposure
 * Only logs in development and sanitizes sensitive information
 */

interface LogLevel {
  DEBUG: 'DEBUG';
  INFO: 'INFO';
  WARN: 'WARN';
  ERROR: 'ERROR';
}

const LOG_LEVELS: LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

/**
 * Sensitive data patterns to sanitize
 */
const SENSITIVE_PATTERNS = [
  /Bearer\s+[A-Za-z0-9\-._~+\/]+=*/gi, // JWT tokens
  /password.*[":]\s*"[^"]*"/gi, // passwords in objects
  /token.*[":]\s*"[^"]*"/gi, // tokens in objects
  /auth.*[":]\s*"[^"]*"/gi, // auth headers
  /\b[A-Za-z0-9]{20,}\b/g, // potential tokens (20+ chars)
  /\b4[0-9]{12}(?:[0-9]{3})?\b/g, // credit card numbers
  /\b[\w._%+-]+@[\w.-]+\.[A-Z]{2,}\b/gi, // email addresses (partial)
];

/**
 * Sanitize sensitive data from log messages
 */
function sanitizeData(data: any): any {
  if (typeof data === 'string') {
    let sanitized = data;
    SENSITIVE_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });
    return sanitized;
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  if (data && typeof data === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      // Redact sensitive keys entirely
      if (key.toLowerCase().includes('password') || 
          key.toLowerCase().includes('token') || 
          key.toLowerCase().includes('auth') ||
          key.toLowerCase().includes('secret')) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeData(value);
      }
    }
    return sanitized;
  }

  return data;
}

/**
 * Secure logger class
 */
class SecureLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: keyof LogLevel, message: string, data?: any) {
    // Only log in development
    if (!this.isDevelopment) {
      return;
    }

    const timestamp = new Date().toISOString();
    const sanitizedData = data ? sanitizeData(data) : undefined;

    switch (level) {
      case 'DEBUG':
        console.debug(`[${timestamp}] 🐛 ${message}`, sanitizedData);
        break;
      case 'INFO':
        console.log(`[${timestamp}] ℹ️ ${message}`, sanitizedData);
        break;
      case 'WARN':
        console.warn(`[${timestamp}] ⚠️ ${message}`, sanitizedData);
        break;
      case 'ERROR':
        console.error(`[${timestamp}] ❌ ${message}`, sanitizedData);
        break;
    }
  }

  debug(message: string, data?: any) {
    this.log('DEBUG', message, data);
  }

  info(message: string, data?: any) {
    this.log('INFO', message, data);
  }

  warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }

  error(message: string, data?: any) {
    this.log('ERROR', message, data);
  }

  /**
   * API-specific logging methods
   */
  apiRequest(method: string, url: string, headers?: Record<string, string>) {
    this.debug(`API Request: ${method} ${url}`, { 
      headers: this.sanitizeHeaders(headers) 
    });
  }

  apiResponse(status: number, statusText: string, url?: string) {
    this.debug(`API Response: ${status} ${statusText}`, { url });
  }

  apiError(status: number, error: any, url?: string) {
    this.error(`API Error: ${status}`, { 
      url,
      error: typeof error === 'string' ? error : error?.message || 'Unknown error'
    });
  }

  private sanitizeHeaders(headers?: Record<string, string>): Record<string, string> {
    if (!headers) return {};
    
    const sanitized: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase().includes('auth') || 
          key.toLowerCase().includes('token')) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}

// Export singleton instance
export const secureLogger = new SecureLogger();

// Export for testing
export { SecureLogger, sanitizeData };