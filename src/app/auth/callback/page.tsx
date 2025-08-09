"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { authAPI } from "@/lib/api/auth";

interface OAuthCallbackParams {
  provider?: 'google' | 'facebook';
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
  access_token?: string;
  token_type?: string;
  expires_in?: string;
}

// Component that handles OAuth callback logic with useSearchParams
function OAuthCallbackHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if user is already authenticated and redirect immediately
  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      console.log('User already authenticated, redirecting to dashboard');
      router.replace('/dashboard');
      return;
    }
  }, [router]);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // If user is already authenticated, redirect and don't process OAuth
        if (authAPI.isAuthenticated()) {
          router.replace('/dashboard');
          return;
        }

        // Extract all possible parameters from URL
        const rawProvider = searchParams.get('provider');
        const normalizedProvider = rawProvider?.toLowerCase() as 'google' | 'facebook' || undefined;
        
        const params: OAuthCallbackParams = {
          provider: normalizedProvider,
          code: searchParams.get('code') || undefined,
          state: searchParams.get('state') || undefined,
          error: searchParams.get('error') || undefined,
          error_description: searchParams.get('error_description') || undefined,
          access_token: searchParams.get('access_token') || undefined,
          token_type: searchParams.get('token_type') || undefined,
          expires_in: searchParams.get('expires_in') || undefined,
        };

        // Set debug info for backend team
        const debugParams = Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        
        // Add raw provider info for debugging
        const debugInfo = `Raw Provider: ${rawProvider}\nNormalized Provider: ${normalizedProvider}\n${debugParams}`;
        setDebugInfo(debugInfo);
        
        console.log('🔍 OAuth Callback Debug:', {
          rawProvider,
          normalizedProvider,
          params,
          allSearchParams: Object.fromEntries(searchParams.entries())
        });

        // Check for OAuth errors first
        if (params.error) {
          setStatus('error');
          setMessage(
            params.error_description || 
            `OAuth error: ${params.error}` ||
            'Authentication failed'
          );
          return;
        }

        // Validate required parameters
        if (!params.provider) {
          setStatus('error');
          setMessage('Missing provider parameter. Please try again.');
          return;
        }

        // Currently only support Google OAuth (Facebook UI removed, but backend ready)
        if (params.provider !== 'google') {
          setStatus('error');
          setMessage('Invalid provider. Only Google OAuth is currently supported.');
          return;
        }

        if (!params.code && !params.access_token) {
          setStatus('error');
          setMessage('Missing authorization code or access token. Please try again.');
          return;
        }

        // Get authorization code from OAuth provider
        const authorizationCode = params.code || params.access_token;

        if (!authorizationCode) {
          throw new Error('No authorization code received from OAuth provider');
        }

        // Use original raw provider (already uppercase from Google) or convert to uppercase
        const providerUpper = (rawProvider || params.provider?.toUpperCase()) as "GOOGLE" | "FACEBOOK";

        setMessage(`Processing ${params.provider} authentication...`);

        // Call OAuth login API
        const response = await authAPI.oauthLogin(providerUpper, authorizationCode);

        // Handle API response
        if (response.error) {
          setStatus('error');
          setMessage(response.error.message || 'Authentication failed');
          return;
        }

        if (response.data) {
          // Use unified login success handler
          authAPI.handleLoginSuccess(response.data);

          setStatus('success');
          setMessage('Authentication successful! Redirecting...');

          // Redirect to dashboard immediately (replace to prevent back navigation)
          // Clear browser history to prevent back navigation to OAuth pages
          if (typeof window !== 'undefined') {
            // Replace current history entry to prevent back navigation
            window.history.replaceState(null, '', '/dashboard');
          }
          
          // Small delay to show success message briefly
          setTimeout(() => {
            router.replace('/dashboard');
          }, 800);
        } else {
          throw new Error('No user data received from authentication');
        }

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(
          error instanceof Error 
            ? error.message 
            : 'An unexpected error occurred during authentication'
        );
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  const handleRetry = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-radial from-purple-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-pink-100/20 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Callback Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        <div
          className="p-8 rounded-3xl border border-white/30 shadow-2xl text-center"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div
              className="p-4 rounded-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              {status === 'loading' && (
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              )}
              {status === 'success' && (
                <CheckCircle className="w-8 h-8 text-green-600" />
              )}
              {status === 'error' && (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
          </motion.div>

          {/* Status Message */}
          <div className="mb-6">
            <h1 className="text-2xl font-light text-gray-900 tracking-tight mb-2">
              {status === 'loading' && 'Authenticating...'}
              {status === 'success' && 'Welcome!'}
              {status === 'error' && 'Authentication Failed'}
            </h1>
            <p className="text-gray-600 font-light">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          {status === 'error' && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleRetry}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-2xl text-white font-medium transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
              }}
            >
              Try Again
            </motion.button>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center text-green-600 font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Redirecting to dashboard...
            </motion.div>
          )}

          {/* Debug Information (for development) */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 rounded-2xl text-left"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Debug Info (Development Only):
              </h3>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">
                {debugInfo}
              </pre>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Main component that wraps the OAuth handler in Suspense
export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OAuthCallbackHandler />
    </Suspense>
  );
}