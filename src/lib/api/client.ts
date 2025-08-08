import { getApiBaseUrl } from "./config";
import { getErrorMessage, getErrorSeverity, ErrorSeverity } from "./errors";

// Standard backend error response structure
export interface BackendErrorResponse {
  httpStatus: string;
  errorCode: string;
  message: string;
  error: boolean;
}

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    code: string;
    message: string;
    severity: ErrorSeverity;
    httpStatus?: number;
    originalError?: unknown;
  };
}

// API request options
export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  timeout?: number;
  skipErrorHandling?: boolean;
}

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public httpStatus: number,
    public severity: ErrorSeverity,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic API client class
export class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number = 30000; // 30 seconds

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getApiBaseUrl();
  }

  // Generic request method with centralized error handling
  async request<T = unknown>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      body,
      timeout = this.defaultTimeout,
      skipErrorHandling = false,
      ...fetchOptions
    } = options;

    const url = `${this.baseUrl}${endpoint}`;

    // Default headers
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Merge headers
    const headers = {
      ...defaultHeaders,
      ...fetchOptions.headers,
    };

    // Prepare request config
    const config: RequestInit = {
      ...fetchOptions,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    // Add auth token if available (exclude /auth and /public endpoints)
    const shouldIncludeToken =
      !endpoint.startsWith("/auth") && !endpoint.startsWith("/public");
    const token = this.getAuthToken();

    if (token && shouldIncludeToken) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      console.log(`🌐 API Request: ${config.method || "GET"} ${url}`);
      if (body) {
        console.log("📤 Request Body:", body);
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      config.signal = controller.signal;

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      console.log(`📥 API Response: ${response.status} ${response.statusText}`);

      // Handle successful responses
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Response Data:", data);

        // Extract and store JWT token from response headers for auth endpoints
        this.handleTokenExtraction(endpoint, response);

        return {
          data,
        };
      }

      // @ts-expect-error GO PROD QUICK
      // Handle error responses
      return await this.handleErrorResponse(response, skipErrorHandling);
    } catch (error: unknown) {
      console.error("❌ API Request Failed:", error);

      if (skipErrorHandling) {
        throw error;
      }
      // @ts-expect-error GO PROD QUICK
      return this.handleNetworkError(error);
    }
  }

  // Handle HTTP error responses
  private async handleErrorResponse(
    response: Response,
    skipErrorHandling: boolean
  ): Promise<ApiResponse> {
    let errorData: BackendErrorResponse | null = null;

    try {
      errorData = await response.json();
      console.log("📥 Error Response:", errorData);
    } catch {
      // Response is not JSON
    }

    if (skipErrorHandling) {
      throw new ApiError(
        errorData?.message || `HTTP ${response.status}`,
        errorData?.errorCode || "UNKNOWN_ERROR",
        response.status,
        getErrorSeverity(response.status, errorData?.errorCode),
        errorData
      );
    }

    // Get user-friendly error message
    const userMessage = getErrorMessage(
      errorData?.errorCode,
      errorData?.message
    );

    const apiError = {
      code: errorData?.errorCode || "UNKNOWN_ERROR",
      message: userMessage,
      severity: getErrorSeverity(response.status, errorData?.errorCode),
      httpStatus: response.status,
      originalError: errorData,
    };

    console.log("🚫 Processed Error:", apiError);

    return {
      error: apiError,
    };
  }

  // Extract JWT token from response headers for auth endpoints
  private handleTokenExtraction(endpoint: string, response: Response): void {
    // Only extract tokens from authentication endpoints
    const authEndpoints = ["/login/v1/email_verify", "/oauth/v1/login_user"];
    const isAuthEndpoint = authEndpoints.some((authPath) =>
      endpoint.includes(authPath)
    );

    if (isAuthEndpoint) {
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        // Extract token (remove 'Bearer ' prefix if present)
        const token = authHeader.startsWith("Bearer ")
          ? authHeader.substring(7)
          : authHeader;

        if (token) {
          console.log("🔑 JWT Token extracted and stored");
          this.setAuthToken(token);
        }
      }
    }
  }

  // Handle network/connection errors
  private handleNetworkError(error: unknown): ApiResponse {
    let errorCode = "NETWORK_ERROR";
    let message =
      "Network connection failed. Please check your internet connection and try again.";

    if (error instanceof Error && error.name === "AbortError") {
      errorCode = "TIMEOUT_ERROR";
      message = "Request timed out. Please try again.";
    }

    const apiError = {
      code: errorCode,
      message: getErrorMessage(errorCode, message),
      severity: ErrorSeverity.ERROR,
      originalError: error,
    };

    console.log("🌐 Network Error:", apiError);

    return {
      error: apiError,
    };
  }

  // Convenience methods for different HTTP verbs
  async get<T>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, "method">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<ApiRequestOptions, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<ApiRequestOptions, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  }

  async delete<T>(
    endpoint: string,
    options?: Omit<ApiRequestOptions, "method">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  // Get auth token from localStorage
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  }

  // Set auth token in localStorage
  setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  // Clear auth token
  clearAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export convenience functions
export const { get, post, put, delete: del, request } = apiClient;
