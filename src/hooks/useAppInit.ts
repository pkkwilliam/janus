'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api/auth';
import { EmailVerifyResponse } from '@/lib/api/auth';

interface UseAppInitOptions {
  requireAuth?: boolean; // If true, redirect to login when no user
  redirectTo?: string;   // Custom redirect path for unauthenticated users
}

interface UseAppInitReturn {
  user: EmailVerifyResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * App-wide initialization hook that handles user profile loading
 * This should be called by all pages to ensure consistent user state
 * 
 * On site revisit (page refresh/direct URL): Always fetches fresh user data
 * On navigation within app: Uses memory cache for performance
 */
export function useAppInit(options: UseAppInitOptions = {}): UseAppInitReturn {
  const { requireAuth = false, redirectTo = '/auth/login' } = options;
  const router = useRouter();
  
  const [user, setUser] = useState<EmailVerifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData = await authAPI.loadUserProfile(forceRefresh);
      
      if (!userData) {
        // No user data available
        setUser(null);
        
        if (requireAuth) {
          // Redirect to login if authentication is required
          router.push(redirectTo);
          return;
        }
      } else {
        // User data successfully loaded
        setUser(userData);
      }
    } catch (err) {
      console.error('Error initializing app:', err);
      setError('Failed to load user profile');
      setUser(null);
      
      if (requireAuth) {
        router.push(redirectTo);
      }
    } finally {
      setIsLoading(false);
    }
  }, [requireAuth, redirectTo, router]);

  const refresh = async () => {
    await loadUser(true); // Force refresh
  };

  useEffect(() => {
    // Always force refresh on initial load (site revisit)
    // The loadUserProfile method will use cache for subsequent calls within the same session
    loadUser(true);
  }, [loadUser]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    refresh,
  };
}