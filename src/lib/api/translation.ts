import { apiClient, ApiResponse } from './client';
import { API_ENDPOINTS, getApiBaseUrl } from './config';

// Translation request structure
export interface TranslationRequest {
  content: {
    reading: string;
    keyThemes: string[];
    spiritualGuidance: string;
    luckyGemstones?: string[];
    luckyEnhancer?: string[];
    glossary: Array<{
      term: string;
      meaning: string;
      pinyin: string;
    }>;
  };
  targetLanguage: string;
  sourceLanguage: string;
}

// Translation response structure
export interface TranslatedContent {
  fortuneScore?: string | null;
  reading: string;
  keyThemes: string[];
  spiritualGuidance: string;
  luckyColors?: string[];
  luckyGemstones?: string[];
  luckyNumbers?: string[];
  luckyEnhancer?: string[];
  glossary: Array<{
    term: string;
    meaning: string;
    pinyin?: string | null;
  }>;
}

export interface TranslationResponse {
  success: boolean;
  translatedContent: TranslatedContent;
  error?: string | null;
}

// Language enum type (matching your Java backend)
export type LanguageCode = 
  | 'ENGLISH'
  | 'CHINESE_SIMPLIFIED' 
  | 'CHINESE_TRADITIONAL'
  | 'SPANISH'
  | 'FRENCH'
  | 'GERMAN'
  | 'ITALIAN'
  | 'PORTUGUESE'
  | 'RUSSIAN'
  | 'JAPANESE'
  | 'KOREAN'
  | 'ARABIC'
  | 'HINDI';

// Language interface for UI
export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

// Supported languages configuration
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'ENGLISH', name: 'English', flag: '🇺🇸' },
  { code: 'CHINESE_SIMPLIFIED', name: '简体中文', flag: '🇨🇳' },
  { code: 'CHINESE_TRADITIONAL', name: '繁體中文', flag: '🇹🇼' },
  { code: 'SPANISH', name: 'Español', flag: '🇪🇸' },
  { code: 'FRENCH', name: 'Français', flag: '🇫🇷' },
  { code: 'GERMAN', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ITALIAN', name: 'Italiano', flag: '🇮🇹' },
  { code: 'PORTUGUESE', name: 'Português', flag: '🇵🇹' },
  { code: 'RUSSIAN', name: 'Русский', flag: '🇷🇺' },
  { code: 'JAPANESE', name: '日本語', flag: '🇯🇵' },
  { code: 'KOREAN', name: '한국어', flag: '🇰🇷' },
  { code: 'ARABIC', name: 'العربية', flag: '🇸🇦' },
  { code: 'HINDI', name: 'हिन्दी', flag: '🇮🇳' },
];

// Translation API functions
export const translationApi = {
  /**
   * Translate report content to target language
   */
  async translateContent(
    content: TranslationRequest['content'],
    targetLanguage: LanguageCode,
    sourceLanguage: LanguageCode = 'ENGLISH'
  ): Promise<ApiResponse<TranslationResponse>> {
    console.log('🌍 Translation API - Starting translation request');
    console.log('🌍 Translation API - Target language:', targetLanguage);
    console.log('🌍 Translation API - Source language:', sourceLanguage);
    console.log('🌍 Translation API - Endpoint:', API_ENDPOINTS.USER.TRANSLATE);
    
    const requestBody: TranslationRequest = {
      content,
      targetLanguage,
      sourceLanguage,
    };

    console.log('🌍 Translation API - Using apiClient.post');
    
    // Double-check token before making request
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error('🚨 Translation API - No auth token found in localStorage!');
        throw new Error('Authentication token not found. Please log in again.');
      }
    }
    
    const response = await apiClient.post<TranslationResponse>(
      API_ENDPOINTS.USER.TRANSLATE,
      requestBody
    );
    
    console.log('🌍 Translation API - Response received:', response);
    return response;
  },

  /**
   * Get language by code
   */
  getLanguageByCode(code: LanguageCode): Language | undefined {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
  },

  /**
   * Get default language (English)
   */
  getDefaultLanguage(): Language {
    return SUPPORTED_LANGUAGES[0]; // English is first in the array
  },

  /**
   * Debug auth token - utility for troubleshooting
   */
  debugAuthToken(): void {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      console.log('🔍 Auth Token Debug:');
      console.log('  - Token exists:', !!token);
      console.log('  - Token preview:', token ? token.substring(0, 20) + '...' : 'null');
      console.log('  - Token length:', token ? token.length : 0);
      console.log('  - localStorage keys:', Object.keys(localStorage));
    } else {
      console.log('🔍 Auth Token Debug: Window not available (SSR)');
    }
  },

  /**
   * Fallback method using manual fetch with explicit authorization header
   * Use this if the apiClient approach is not working
   */
  async translateContentManual(
    content: TranslationRequest['content'],
    targetLanguage: LanguageCode,
    sourceLanguage: LanguageCode = 'ENGLISH'
  ): Promise<ApiResponse<TranslationResponse>> {
    console.log('🔧 Translation API - Using manual fetch method');
    
    if (typeof window === "undefined") {
      return {
        error: {
          code: 'SSR_ERROR',
          message: 'Translation not available during server-side rendering',
          severity: 'error' as any,
        }
      };
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      return {
        error: {
          code: 'AUTH_ERROR',
          message: 'Authentication token not found. Please log in again.',
          severity: 'error' as any,
        }
      };
    }

    const requestBody: TranslationRequest = {
      content,
      targetLanguage,
      sourceLanguage,
    };

    const url = `${getApiBaseUrl()}${API_ENDPOINTS.USER.TRANSLATE}`;
    
    console.log('🔧 Manual fetch - URL:', url);
    console.log('🔧 Manual fetch - Token preview:', token.substring(0, 20) + '...');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('🔧 Manual fetch - Response status:', response.status);
      console.log('🔧 Manual fetch - Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Manual fetch - Error response:', errorText);
        return {
          error: {
            code: 'TRANSLATION_ERROR',
            message: `Translation failed: ${response.status} ${response.statusText}`,
            severity: 'error' as any,
            httpStatus: response.status,
          }
        };
      }

      const data = await response.json();
      console.log('🔧 Manual fetch - Success response:', data);
      
      return { data };
    } catch (error) {
      console.error('🔧 Manual fetch - Network error:', error);
      return {
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error during translation request',
          severity: 'error' as any,
          originalError: error,
        }
      };
    }
  },
};