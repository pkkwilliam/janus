import { API_ENDPOINTS } from "./config";
import { apiClient, ApiResponse } from "./client";

// In-memory cache for user profile (cleared on page refresh/revisit)
class UserProfileCache {
  private userProfile: UserProfileResponse | null = null;
  private isLoading = false;

  setProfile(profile: UserProfileResponse | null): void {
    this.userProfile = profile;
  }

  getProfile(): UserProfileResponse | null {
    return this.userProfile;
  }

  clearProfile(): void {
    this.userProfile = null;
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  getLoading(): boolean {
    return this.isLoading;
  }

  hasProfile(): boolean {
    return this.userProfile !== null;
  }
}

const userProfileCache = new UserProfileCache();

// Request/Response interfaces
export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  responseStatus: "SENT" | "ERROR";
  message?: string;
}

export interface EmailVerifyRequest {
  email: string;
  oneTimePassword: string;
}

export interface UserProfileResponse {
  sid: string;
  username: string;
  email: string;
  name?: string | null;
  nickname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  gender?: "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY" | null;
  imageUrl?: string | null;
  smsNumber?: string | null;
  countryCode?: string | null;
  status: string;
  preferLanguage?: string;
  birthDate?: string | null;
  birthTime?: string | null;
  birthCity?: string | null;
  birthCountry?: string | null;
  totalReports?: number;
  averageScore?: number;
  joinDate?: string | null;
  createTime: string;
  updateTime: string;
  grantedRoles: string[];
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: string[];
}

export interface OAuthLoginRequest {
  provider: "GOOGLE" | "FACEBOOK";
  authorizationCode: string;
}


export interface OAuthUrlResponse {
  oauthUrl: string;
}

// Auth API functions - now much cleaner with centralized error handling
export const authAPI = {
  /**
   * Request email verification code
   * @param email - User's email address
   * @returns Promise with verification response or error
   */
  async requestEmailVerification(
    email: string
  ): Promise<ApiResponse<EmailVerificationResponse>> {
    return apiClient.post<EmailVerificationResponse>(
      API_ENDPOINTS.AUTH.EMAIL_REQUEST_VERIFICATION,
      { email }
    );
  },

  /**
   * Verify email with one-time password
   * @param email - User's email address
   * @param oneTimePassword - 6-digit verification code
   * @returns Promise with user data or error
   */
  async verifyEmail(
    email: string,
    oneTimePassword: string
  ): Promise<ApiResponse<UserProfileResponse>> {
    return apiClient.post<UserProfileResponse>(
      API_ENDPOINTS.AUTH.EMAIL_VERIFY,
      { email, oneTimePassword }
    );
  },

  /**
   * Get OAuth request URL for provider
   * @param provider - OAuth provider ("GOOGLE" or "FACEBOOK")
   * @returns Promise with OAuth URL or error
   */
  async getOAuthRequestUrl(
    provider: "GOOGLE" | "FACEBOOK"
  ): Promise<ApiResponse<OAuthUrlResponse>> {
    return apiClient.get<OAuthUrlResponse>(
      `${API_ENDPOINTS.AUTH.OAUTH_GET_REQUEST_URL}/${provider}`
    );
  },

  /**
   * OAuth authentication for Google and Facebook
   * @param provider - OAuth provider ("GOOGLE" or "FACEBOOK")
   * @param authorizationCode - Authorization code from OAuth provider
   * @returns Promise with authentication response or error
   */
  async oauthLogin(
    provider: "GOOGLE" | "FACEBOOK",
    authorizationCode: string
  ): Promise<ApiResponse<UserProfileResponse>> {
    return apiClient.post<UserProfileResponse>(
      API_ENDPOINTS.AUTH.OAUTH_LOGIN,
      {
        provider,
        authorizationCode,
      }
    );
  },

  /**
   * Handle successful login (both email verification and OAuth)
   * @param userData - User data from authentication response
   */
  handleLoginSuccess(userData: UserProfileResponse): void {
    // Store user data in localStorage (unified format)
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userId', userData.sid);
    localStorage.setItem('userEmail', userData.email);
    
    // Cache user data in memory
    userProfileCache.setProfile(userData);
    
    // Dispatch custom event for navigation updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('authStateChange', { 
        detail: { type: 'login', user: userData } 
      }));
    }
    
    console.log('✅ User login successful - data stored and cached');
  },

  /**
   * Logout user and clear session
   */
  logout(): void {
    apiClient.clearAuthToken();
    userProfileCache.clearProfile();
    
    // Dispatch custom event for navigation updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('authStateChange', { 
        detail: { type: 'logout' } 
      }));
    }
    
    console.log("✅ User logged out successfully");
  },

  /**
   * Check if user is authenticated
   * @returns boolean indicating if user has valid session
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;

    const userData = localStorage.getItem("userData");
    const userId = localStorage.getItem("userId");

    return !!(userData && userId);
  },

  /**
   * Get current user data from memory cache
   * @returns User data or null
   */
  getCurrentUser(): UserProfileResponse | null {
    return userProfileCache.getProfile();
  },

  /**
   * Update user data in memory cache
   * @param userData - Updated user data
   */
  updateUserData(userData: Partial<UserProfileResponse>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      userProfileCache.setProfile(updatedUser);
      console.log("✅ User data updated in cache");
    }
  },

  /**
   * Centralized method to load user profile from API if token exists but no cached user
   * This handles the case when user revisits the website with a valid token
   * Always fetches fresh data on site revisit, uses memory cache for navigation
   * @param forceRefresh - Force refresh even if cached data exists
   * @returns Promise resolving to user data or null if authentication fails
   */
  async loadUserProfile(
    forceRefresh = false
  ): Promise<UserProfileResponse | null> {
    // Check if running in browser
    if (typeof window === "undefined") return null;

    // Check if already loading to prevent multiple simultaneous requests
    if (userProfileCache.getLoading()) {
      // Wait for existing request to complete
      while (userProfileCache.getLoading()) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return userProfileCache.getProfile();
    }

    // First check if user has a valid JWT token
    const token = localStorage.getItem("authToken");
    if (!token) {
      // No token, clear cache and return null
      userProfileCache.clearProfile();
      return null;
    }

    // Check if we already have cached user data and not forcing refresh
    if (!forceRefresh && userProfileCache.hasProfile()) {
      // User data already exists in memory cache (same session navigation)
      return userProfileCache.getProfile();
    }

    // Token exists but no cached user (or force refresh) - fetch from API
    userProfileCache.setLoading(true);

    try {
      const { userAPI } = await import("./user");
      const response = await userAPI.getProfile();

      if (response.error) {
        // API error - token might be invalid
        console.error("Failed to fetch user profile:", response.error.message);
        // Clear invalid token and cache
        localStorage.removeItem("authToken");
        userProfileCache.clearProfile();
        return null;
      }

      if (response.data) {
        // Successfully fetched profile, cache it in memory
        userProfileCache.setProfile(response.data);
        console.log("✅ User profile loaded from API and cached in memory");
        return response.data;
      }

      return null;
    } catch (error) {
      // Network or other error
      console.error("Error fetching user profile:", error);

      // If there's a network error but we have a token,
      // we might want to keep the token for retry later
      // Return null to indicate profile loading failed
      return null;
    } finally {
      userProfileCache.setLoading(false);
    }
  },

  /**
   * Clear user profile from memory cache
   */
  clearUserProfile(): void {
    userProfileCache.clearProfile();
  },
};
