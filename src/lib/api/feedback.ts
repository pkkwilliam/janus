import { API_ENDPOINTS } from './config';
import { apiClient, ApiResponse } from './client';

// Feedback/Contact request interface
export interface FeedbackRequest {
  email: string;
  subject: string;
  content: string;
}

export interface FeedbackResponse {
  success: boolean;
  message?: string;
}

// Feedback API functions
export const feedbackAPI = {
  /**
   * Submit feedback or contact form
   * @param feedbackData - Contact form data
   * @returns Promise with success response or error
   */
  async submitFeedback(feedbackData: FeedbackRequest): Promise<ApiResponse<FeedbackResponse>> {
    return apiClient.post<FeedbackResponse>(
      API_ENDPOINTS.PUBLIC.FEEDBACK,
      feedbackData
    );
  },

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns boolean indicating if email is valid
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate feedback form data
   * @param data - Form data to validate
   * @returns Object with validation results
   */
  validateFeedbackForm(data: Partial<FeedbackRequest>) {
    const errors: Partial<FeedbackRequest> = {};

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!this.validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject?.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.length < 3) {
      errors.subject = 'Subject must be at least 3 characters';
    } else if (data.subject.length > 100) {
      errors.subject = 'Subject must be less than 100 characters';
    }

    if (!data.content?.trim()) {
      errors.content = 'Message is required';
    } else if (data.content.length < 10) {
      errors.content = 'Message must be at least 10 characters';
    } else if (data.content.length > 1000) {
      errors.content = 'Message must be less than 1000 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};