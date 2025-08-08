import { API_ENDPOINTS } from "./config";
import { apiClient, ApiResponse } from "./client";
import { UserProfileResponse } from "./auth";

// User profile update request interface
export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  gender?: "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY";
  birthDate?: string;
  birthTime?: string;
  birthCity?: string;
  birthCountry?: string;
}

// Plan response interface
export interface PlanResponse {
  hasActiveSubscription: boolean;
  planType?: string;
  expirationDate?: string;
  status?: string;
}

// Gender options for the UI
export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to provide" },
] as const;

// User API functions
export const userAPI = {
  /**
   * Update user profile information
   * @param profileData - Profile data to update
   * @returns Promise with updated user data or error
   */
  async updateProfile(
    profileData: UpdateUserProfileRequest
  ): Promise<ApiResponse<UserProfileResponse>> {
    const response = await apiClient.put<UserProfileResponse>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      profileData
    );

    // Auto-cache the updated profile data if the update was successful
    if (response.data && !response.error) {
      // Import authAPI to update the memory cache
      const { authAPI } = await import('./auth');
      authAPI.updateUserData(response.data);
      console.log('✅ Profile updated and cached in memory');
    }

    return response;
  },

  /**
   * Get user profile
   * @returns Promise with user profile data or error
   */
  async getProfile(): Promise<ApiResponse<UserProfileResponse>> {
    return apiClient.get<UserProfileResponse>(API_ENDPOINTS.USER.GET_PROFILE);
  },

  /**
   * Get user plan information
   * @returns Promise with user plan data or error
   */
  async getPlan(): Promise<ApiResponse<PlanResponse>> {
    return apiClient.get<PlanResponse>(API_ENDPOINTS.USER.GET_PLAN);
  },

  /**
   * Check if user profile is complete
   * @param user - User data to check
   * @returns Object indicating what's missing
   */
  checkProfileCompleteness(user: Partial<UserProfileResponse>) {
    const missing = {
      personalInfo: {
        firstName: !user.firstName,
        lastName: !user.lastName,
        gender: !user.gender,
      },
      birthInfo: {
        birthDate: !user.birthDate,
        birthTime: !user.birthTime,
        birthCity: !user.birthCity,
        birthCountry: !user.birthCountry,
      },
    };

    const needsPersonalInfo =
      missing.personalInfo.firstName ||
      missing.personalInfo.lastName ||
      missing.personalInfo.gender;

    const needsBirthInfo =
      missing.birthInfo.birthDate ||
      missing.birthInfo.birthTime ||
      missing.birthInfo.birthCity ||
      missing.birthInfo.birthCountry;

    return {
      missing,
      needsPersonalInfo,
      needsBirthInfo,
      isComplete: !needsBirthInfo, // Profile is complete if birth info is complete
    };
  },

  /**
   * Get completion percentage of user profile
   * @param user - User data
   * @returns Completion percentage (0-100) - prioritizes birth information
   */
  getProfileCompleteness(user: Partial<UserProfileResponse>): number {
    // Birth information fields (higher priority)
    const birthFields = ["birthDate", "birthTime", "birthCity", "birthCountry"];
    const personalFields = ["firstName", "lastName", "gender"];

    const completedBirthFields = birthFields.filter(
      (field) => user[field as keyof UserProfileResponse]
    );
    const completedPersonalFields = personalFields.filter(
      (field) => user[field as keyof UserProfileResponse]
    );

    // Birth info accounts for 70% of completion, personal info for 30%
    const birthCompletion =
      (completedBirthFields.length / birthFields.length) * 70;
    const personalCompletion =
      (completedPersonalFields.length / personalFields.length) * 30;

    return Math.round(birthCompletion + personalCompletion);
  },
};
